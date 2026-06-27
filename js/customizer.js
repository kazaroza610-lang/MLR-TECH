/* ── Configurateur de coques personnalisées ─────────────────── */
(function () {
  if (!document.getElementById('czCanvas')) return; // page différente

  const state = {
    brand: null,
    model: null,
    deviceColor: null,
    caseType: null,
    productColor: null,
    artworkType: 'single', // 'single' | 'collage'
    image: null,       // HTMLImageElement uploadé (mode single)
    collageImages: [null, null, null, null], // mode collage
    zoom: 1,
    rotation: 0,
    mirrorH: false,
    mirrorV: false,
    offsetX: 0,
    offsetY: 0,
    filter: 'none',
    text: '',
    textSize: 24,
    textColor: '#ffffff',
    textPos: 'top',
  };

  const canvas = document.getElementById('czCanvas');
  const ctx = canvas.getContext('2d');
  const CANVAS_SIZE = canvas.width;
  const canvasPlaceholder = document.getElementById('czCanvasPlaceholder');

  /* Préchargement des templates photo réels (Apple / Samsung / générique) */
  const TEMPLATE_IMAGES = {};
  const tintCache = {};
  Object.keys(CASE_SILHOUETTES).forEach(key => {
    const img = new Image();
    img.onload = () => renderPreview();
    img.src = CASE_SILHOUETTES[key].image;
    TEMPLATE_IMAGES[key] = img;
  });

  const modelImageCache = {};
  function getModelImage(src) {
    if (modelImageCache[src]) return modelImageCache[src];
    const img = new Image();
    img.onload = () => renderPreview();
    img.src = src;
    modelImageCache[src] = img;
    return img;
  }

  /* Détermine le template à utiliser : photo dédiée au modèle si on en a une,
     sinon la photo générique de la marque (Apple / Samsung / autres). */
  function getActiveTemplate() {
    if (state.brand && state.model) {
      const modelKey = state.brand.id + '|' + state.model;
      const modelTpl = CASE_MODEL_TEMPLATES[modelKey];
      if (modelTpl) return { cacheKey: modelKey, img: getModelImage(modelTpl.image), zone: modelTpl.printZone };
    }
    const silhouetteKey = state.brand ? state.brand.silhouette : 'generic';
    const sil = CASE_SILHOUETTES[silhouetteKey];
    return { cacheKey: silhouetteKey, img: TEMPLATE_IMAGES[silhouetteKey], zone: sil.printZone };
  }

  function getTintedTemplate(cacheKey, img, color) {
    if (!img.complete || !img.naturalWidth) return null;
    const tintKey = cacheKey + '_' + (color ? color.id : 'none');
    if (tintCache[tintKey]) return tintCache[tintKey];
    const off = document.createElement('canvas');
    off.width = img.naturalWidth;
    off.height = img.naturalHeight;
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, 0);
    if (color) {
      octx.globalCompositeOperation = 'source-atop';
      octx.globalAlpha = 0.35;
      octx.fillStyle = color.hex;
      octx.fillRect(0, 0, off.width, off.height);
      octx.globalAlpha = 1;
      octx.globalCompositeOperation = 'source-over';
    }
    tintCache[tintKey] = off;
    return off;
  }

  /* ── Onglets de la sidebar (Produit / Photo / Texte) ──────── */
  document.querySelectorAll('.cz-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cz-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.cz-panel-page').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel' + capitalize(tab.dataset.tab)).classList.add('active');
    });
  });
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ── Lignes déroulantes du panneau Produit ────────────────── */
  const ROW_EXPANDS = ['brand', 'model', 'deviceColor', 'caseType', 'caseColor'];
  function toggleRow(name) {
    const expand = document.getElementById('expand' + capitalize(name));
    const wasOpen = !expand.hidden;
    ROW_EXPANDS.forEach(n => { document.getElementById('expand' + capitalize(n)).hidden = true; });
    expand.hidden = wasOpen; // referme si déjà ouvert, sinon ouvre
  }
  document.querySelectorAll('.cz-row').forEach(row => {
    row.addEventListener('click', () => toggleRow(row.dataset.row));
  });

  /* ── Marques ───────────────────────────────────────────────── */
  const brandsEl = document.getElementById('czBrands');
  const modelsEl = document.getElementById('czModels');
  const modelSearch = document.getElementById('czModelSearch');

  CASE_BRANDS.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'cz-brand-btn';
    btn.innerHTML = `<span class="cz-brand-icon">${brandIcon()}</span><span>${b.label}</span>`;
    btn.addEventListener('click', () => selectBrand(b));
    brandsEl.appendChild(btn);
  });

  function brandIcon() {
    return `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`;
  }

  function renderModels(filter) {
    modelsEl.innerHTML = '';
    const q = (filter || '').trim().toLowerCase();
    state.brand.models
      .filter(m => !q || m.toLowerCase().includes(q))
      .forEach(modelLabel => {
        const btn = document.createElement('button');
        btn.className = 'cz-model-btn';
        btn.textContent = modelLabel;
        if (state.model === modelLabel) btn.classList.add('active');
        btn.addEventListener('click', () => selectModel(modelLabel));
        modelsEl.appendChild(btn);
      });
    if (!modelsEl.children.length) {
      modelsEl.innerHTML = '<p class="cz-no-results">Aucun modèle trouvé.</p>';
    }
  }
  modelSearch.addEventListener('input', () => renderModels(modelSearch.value));

  function selectBrand(brand) {
    state.brand = brand;
    state.model = null;
    document.querySelectorAll('.cz-brand-btn').forEach((b, i) => b.classList.toggle('active', CASE_BRANDS[i].id === brand.id));
    document.getElementById('rowBrandValue').textContent = brand.label;
    document.getElementById('rowModelValue').textContent = 'Choisir';

    modelSearch.value = '';
    renderModels('');
    toggleRow('model'); // referme marque, ouvre modèle automatiquement
    document.getElementById('expandModel').hidden = false;
    document.getElementById('expandBrand').hidden = true;
  }

  function selectModel(modelLabel) {
    state.model = modelLabel;
    document.querySelectorAll('.cz-model-btn').forEach(b => b.classList.toggle('active', b.textContent === modelLabel));
    document.getElementById('rowModelValue').textContent = modelLabel;

    // Valeurs par défaut pour un aperçu immédiat, modifiables ensuite
    if (!state.deviceColor) selectDeviceColor(CASE_DEVICE_COLORS[0], true);
    if (!state.caseType) selectType(CASE_TYPES[0], true);
    if (!state.productColor) selectCaseColor(CASE_COLORS[0], true);

    document.getElementById('expandModel').hidden = true;
    if (canvasPlaceholder) canvasPlaceholder.hidden = true;
    updateSummary();
    renderPreview();
  }

  /* ── Couleur de l'appareil ─────────────────────────────────── */
  const deviceColorsEl = document.getElementById('czDeviceColors');
  CASE_DEVICE_COLORS.forEach(c => {
    const sw = document.createElement('button');
    sw.className = 'cz-swatch';
    sw.style.background = c.hex;
    sw.title = c.label;
    sw.setAttribute('aria-label', c.label);
    sw.addEventListener('click', () => selectDeviceColor(c));
    deviceColorsEl.appendChild(sw);
  });

  function selectDeviceColor(color, silent) {
    state.deviceColor = color;
    [...deviceColorsEl.children].forEach((el, i) => el.classList.toggle('active', CASE_DEVICE_COLORS[i].id === color.id));
    document.getElementById('rowDeviceColorValue').textContent = color.label;
    const dot = document.getElementById('rowDeviceColorSwatch');
    dot.style.background = color.hex;
    dot.hidden = false;
    if (!silent) {
      document.getElementById('expandDeviceColor').hidden = true;
      renderPreview();
    }
  }

  /* ── Type de coque ─────────────────────────────────────────── */
  const typesEl = document.getElementById('czTypes');
  CASE_TYPES.forEach(type => {
    const card = document.createElement('button');
    card.className = 'cz-type-card';
    card.innerHTML = `
      ${type.popular ? '<span class="cz-badge-popular">Populaire</span>' : ''}
      <h3>${type.label}</h3>
      <p class="cz-type-desc">${type.description}</p>
      <p class="cz-type-sides">${CASE_SIDES_LABEL[type.sides]}</p>
      <p class="cz-type-price">${formatPrice(type.price_eur)}</p>
    `;
    card.addEventListener('click', () => selectType(type));
    typesEl.appendChild(card);
  });

  function selectType(type, silent) {
    state.caseType = type;
    document.querySelectorAll('.cz-type-card').forEach((c, i) => c.classList.toggle('active', CASE_TYPES[i].id === type.id));
    document.getElementById('rowCaseTypeValue').textContent = type.label;
    if (!silent) {
      document.getElementById('expandCaseType').hidden = true;
      updateSummary();
      renderPreview();
    }
  }

  /* ── Couleur de la coque ───────────────────────────────────── */
  const caseColorsEl = document.getElementById('czCaseColors');
  CASE_COLORS.forEach(c => {
    const sw = document.createElement('button');
    sw.className = 'cz-swatch';
    sw.style.background = c.hex;
    sw.title = c.label;
    sw.setAttribute('aria-label', c.label);
    sw.addEventListener('click', () => selectCaseColor(c));
    caseColorsEl.appendChild(sw);
  });

  function selectCaseColor(color, silent) {
    state.productColor = color;
    [...caseColorsEl.children].forEach((el, i) => el.classList.toggle('active', CASE_COLORS[i].id === color.id));
    document.getElementById('rowCaseColorValue').textContent = color.label;
    const dot = document.getElementById('rowCaseColorSwatch');
    dot.style.background = color.hex;
    dot.hidden = false;
    if (!silent) {
      document.getElementById('expandCaseColor').hidden = true;
      renderPreview();
    }
  }

  /* ── Onglet Photo : upload / collage / ajustements / filtres ── */
  const uploadZone = document.getElementById('czUploadZone');
  const fileInput = document.getElementById('czFileInput');
  const uploadWarning = document.getElementById('czUploadWarning');
  const collageZone = document.getElementById('czCollageZone');
  const collageInput = document.getElementById('czCollageInput');
  let activeCollageSlot = 0;

  document.querySelectorAll('.cz-artwork-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.artworkType = btn.dataset.artwork;
      document.querySelectorAll('.cz-artwork-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      uploadZone.hidden = state.artworkType !== 'single';
      collageZone.hidden = state.artworkType !== 'collage';
      document.getElementById('czAdjustGroup').hidden = state.artworkType !== 'single' || !state.image;
      document.getElementById('czFilterGroup').hidden = state.artworkType !== 'single' || !state.image;
      renderPreview();
    });
  });

  document.querySelectorAll('.cz-collage-slot').forEach(slot => {
    slot.addEventListener('click', () => {
      activeCollageSlot = Number(slot.dataset.slot);
      collageInput.click();
    });
  });
  collageInput.addEventListener('change', () => {
    if (collageInput.files[0]) handleCollageFile(collageInput.files[0], activeCollageSlot);
  });

  function handleCollageFile(file, slotIndex) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        state.collageImages[slotIndex] = img;
        const slotEl = document.querySelector(`.cz-collage-slot[data-slot="${slotIndex}"]`);
        slotEl.innerHTML = '';
        slotEl.style.backgroundImage = `url(${reader.result})`;
        slotEl.classList.add('filled');
        renderPreview();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadZone.addEventListener('click', () => fileInput.click());
  uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    uploadWarning.hidden = true;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      uploadWarning.textContent = 'Format non supporté. Utilisez JPG, PNG ou WEBP.';
      uploadWarning.hidden = false;
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      uploadWarning.textContent = 'Fichier trop lourd (max 20 Mo).';
      uploadWarning.hidden = false;
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 1200 || img.height < 1200) {
          uploadWarning.textContent = `Résolution faible (${img.width}×${img.height}px) — pour une impression nette, utilisez une image d'au moins 1200×1200 px.`;
          uploadWarning.hidden = false;
        }
        state.image = img;
        state.zoom = 1; state.rotation = 0; state.offsetX = 0; state.offsetY = 0;
        state.mirrorH = false; state.mirrorV = false; state.filter = 'none';
        document.getElementById('czZoom').value = 100;
        document.getElementById('czRotation').value = 0;
        document.querySelectorAll('.cz-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'none'));
        document.getElementById('czAdjustGroup').hidden = false;
        document.getElementById('czFilterGroup').hidden = false;
        uploadZone.classList.add('has-image');
        renderPreview();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /* Sliders / boutons d'ajustement */
  document.getElementById('czZoom').addEventListener('input', e => {
    state.zoom = Number(e.target.value) / 100;
    renderPreview();
  });
  document.getElementById('czRotation').addEventListener('input', e => {
    state.rotation = Number(e.target.value);
    renderPreview();
  });
  document.getElementById('czMirrorH').addEventListener('click', () => { state.mirrorH = !state.mirrorH; renderPreview(); });
  document.getElementById('czMirrorV').addEventListener('click', () => { state.mirrorV = !state.mirrorV; renderPreview(); });

  document.querySelectorAll('.cz-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      document.querySelectorAll('.cz-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPreview();
    });
  });

  /* Drag de l'image sur le canvas */
  let dragging = false, dragStartX = 0, dragStartY = 0, startOffsetX = 0, startOffsetY = 0;
  function pointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }
  function dragStart(e) {
    if (!state.image) return;
    dragging = true;
    const p = pointerPos(e);
    dragStartX = p.x; dragStartY = p.y;
    startOffsetX = state.offsetX; startOffsetY = state.offsetY;
  }
  function dragMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const p = pointerPos(e);
    const scale = CANVAS_SIZE / canvas.getBoundingClientRect().width;
    state.offsetX = startOffsetX + (p.x - dragStartX) * scale;
    state.offsetY = startOffsetY + (p.y - dragStartY) * scale;
    renderPreview();
  }
  function dragEnd() { dragging = false; }
  canvas.addEventListener('mousedown', dragStart);
  canvas.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);
  canvas.addEventListener('touchstart', dragStart, { passive: true });
  canvas.addEventListener('touchmove', dragMove, { passive: false });
  canvas.addEventListener('touchend', dragEnd);

  /* ── Onglet Texte ──────────────────────────────────────────── */
  document.getElementById('czTextInput').addEventListener('input', e => { state.text = e.target.value; renderPreview(); });
  document.getElementById('czTextSize').addEventListener('input', e => { state.textSize = Number(e.target.value); renderPreview(); });
  document.getElementById('czTextColor').addEventListener('input', e => { state.textColor = e.target.value; renderPreview(); });
  document.querySelectorAll('.cz-pos-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.textPos = btn.dataset.pos;
      document.querySelectorAll('.cz-pos-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPreview();
    });
  });

  /* ── Rendu canvas ─────────────────────────────────────────── */
  function cssFilterFor(name) {
    switch (name) {
      case 'grayscale': return 'grayscale(1)';
      case 'sepia': return 'sepia(1)';
      case 'vintage': return 'sepia(0.4) contrast(1.1) brightness(1.05) saturate(1.3)';
      case 'contrast': return 'contrast(1.4)';
      default: return 'none';
    }
  }

  function roundedRectPath(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function renderPreview() {
    const S = CANVAS_SIZE;
    ctx.clearRect(0, 0, S, S);
    if (!state.brand || !state.model) return;

    const active = getActiveTemplate();

    // Le template (400×800) est centré dans le canvas carré en conservant son ratio
    const TPL_RATIO = 0.5; // largeur / hauteur du template source
    const marginY = S * 0.04;
    const drawH = S - marginY * 2;
    const drawW = drawH * TPL_RATIO;
    const drawX = (S - drawW) / 2;
    const drawY = marginY;

    const zone = active.zone;
    const zx = drawX + zone.x * drawW, zy = drawY + zone.y * drawH;
    const zw = zone.w * drawW, zh = zone.h * drawH, zr = zone.radius * drawW;

    const productHex = state.productColor ? state.productColor.hex : '#e9e9e9';

    // Ombre légère sous le téléphone
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 12;
    roundedRectPath(ctx, drawX, drawY, drawW, drawH, drawW * 0.16);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fill();
    ctx.restore();

    // Visuel utilisateur clippé dans la zone imprimable (intérieur réel du template)
    roundedRectPath(ctx, zx, zy, zw, zh, zr);
    ctx.save();
    ctx.clip();
    ctx.fillStyle = productHex;
    ctx.fillRect(zx, zy, zw, zh);

    if (state.artworkType === 'collage') {
      const cols = 2, rows = 2, gap = 4;
      const cw = (zw - gap) / cols, ch = (zh - gap) / rows;
      state.collageImages.forEach((img, i) => {
        if (!img) return;
        const col = i % cols, row = Math.floor(i / cols);
        const cellX = zx + col * (cw + gap), cellY = zy + row * (ch + gap);
        const scale = Math.max(cw / img.width, ch / img.height);
        const dw = img.width * scale, dh = img.height * scale;
        ctx.save();
        roundedRectPath(ctx, cellX, cellY, cw, ch, 6);
        ctx.clip();
        ctx.drawImage(img, cellX + (cw - dw) / 2, cellY + (ch - dh) / 2, dw, dh);
        ctx.restore();
      });
    } else if (state.image) {
      const cx = zx + zw / 2 + state.offsetX;
      const cy = zy + zh / 2 + state.offsetY;
      const baseScale = Math.max(zw / state.image.width, zh / state.image.height);
      const scale = baseScale * state.zoom;

      ctx.translate(cx, cy);
      ctx.rotate(state.rotation * Math.PI / 180);
      ctx.scale(state.mirrorH ? -1 : 1, state.mirrorV ? -1 : 1);
      ctx.filter = cssFilterFor(state.filter);
      ctx.drawImage(
        state.image,
        -(state.image.width * scale) / 2,
        -(state.image.height * scale) / 2,
        state.image.width * scale,
        state.image.height * scale
      );
      ctx.filter = 'none';
    }
    ctx.restore();

    // Texte optionnel
    if (state.text) {
      ctx.save();
      ctx.font = `bold ${state.textSize}px Arial, sans-serif`;
      ctx.fillStyle = state.textColor;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;
      const tx = zx + zw / 2;
      const ty = state.textPos === 'top' ? zy + zh * 0.18 : state.textPos === 'bottom' ? zy + zh * 0.92 : zy + zh / 2;
      ctx.fillText(state.text, tx, ty);
      ctx.restore();
    }

    // Photo réelle du téléphone (cadre + caméra) par-dessus : son intérieur
    // transparent laisse apparaître le visuel dessiné juste au-dessus.
    const tinted = getTintedTemplate(active.cacheKey, active.img, state.deviceColor);
    if (tinted) {
      ctx.drawImage(tinted, drawX, drawY, drawW, drawH);
    }
  }

  /* ── Résumé (zone canvas) ──────────────────────────────────── */
  function updateSummary() {
    const modelEl = document.getElementById('czSumModel');
    modelEl.textContent = state.brand && state.model ? `${state.brand.label} ${state.model}` : 'Aucun modèle sélectionné';
    document.getElementById('czSumPrice').textContent = state.caseType ? formatPrice(state.caseType.price_eur) : '—';
  }

  renderPreview();

  /* ── Ajout au panier ──────────────────────────────────────── */
  document.getElementById('czAddToCart').addEventListener('click', () => {
    if (!state.brand || !state.model || !state.caseType) {
      showToast('Choisissez une marque, un modèle et un type de coque.');
      return;
    }
    const hasArtwork = state.artworkType === 'collage'
      ? state.collageImages.some(Boolean)
      : !!state.image;
    if (!hasArtwork) {
      showToast('Ajoutez une photo (onglet Photo) avant de continuer.');
      return;
    }

    // Export compressé pour le panier (max ~800px)
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 800;
    exportCanvas.height = 800;
    const exportCtx = exportCanvas.getContext('2d');
    exportCtx.drawImage(canvas, 0, 0, 800, 800);
    const previewImage = exportCanvas.toDataURL('image/jpeg', 0.8);

    addCustomToCart({
      caseLabel: `Coque personnalisée — ${state.model} — ${state.caseType.label}`,
      price_eur: state.caseType.price_eur,
      previewImage,
      meta: {
        brand: state.brand.label,
        model: state.model,
        deviceColor: state.deviceColor ? state.deviceColor.label : null,
        caseType: state.caseType.label,
        caseColor: state.productColor ? state.productColor.label : null,
        sides: CASE_SIDES_LABEL[state.caseType.sides],
        artworkType: state.artworkType,
      },
    });
  });
})();
