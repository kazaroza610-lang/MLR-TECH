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

  /* ── Navigation entre étapes ─────────────────────────────── */
  function goToStep(n) {
    document.querySelectorAll('.cz-stepbox').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cz-step').forEach(s => s.classList.remove('active', 'done'));
    const target = { 1: 'stepModel', 2: 'stepType', 3: 'stepCustomize' }[n];
    document.getElementById(target).classList.add('active');
    document.querySelectorAll('.cz-step').forEach(s => {
      const sn = Number(s.dataset.step);
      if (sn === n) s.classList.add('active');
      if (sn < n) s.classList.add('done');
    });
    window.scrollTo({ top: document.querySelector('.cz-stepper').offsetTop - 100, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-go-step]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(Number(btn.dataset.goStep)));
  });

  /* ── Étape 1 : marques & modèles ──────────────────────────── */
  const brandsEl = document.getElementById('czBrands');
  const modelsWrap = document.getElementById('czModelsWrap');
  const modelsEl = document.getElementById('czModels');

  CASE_BRANDS.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'cz-brand-btn';
    btn.innerHTML = `<span class="cz-brand-icon">${brandIcon(b.id)}</span><span>${b.label}</span>`;
    btn.addEventListener('click', () => selectBrand(b));
    brandsEl.appendChild(btn);
  });

  function brandIcon() {
    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><line x1="11" y1="18" x2="13" y2="18"/></svg>`;
  }

  function selectBrand(brand) {
    state.brand = brand;
    document.querySelectorAll('.cz-brand-btn').forEach(b => b.classList.remove('active'));
    [...brandsEl.children].find((el, i) => CASE_BRANDS[i].id === brand.id)?.classList.add('active');

    modelsEl.innerHTML = '';
    brand.models.forEach(modelLabel => {
      const btn = document.createElement('button');
      btn.className = 'cz-model-btn';
      btn.textContent = modelLabel;
      btn.addEventListener('click', () => selectModel(modelLabel));
      modelsEl.appendChild(btn);
    });
    modelsWrap.hidden = false;
  }

  function selectModel(modelLabel) {
    state.model = modelLabel;
    document.querySelectorAll('.cz-model-btn').forEach(b => b.classList.toggle('active', b.textContent === modelLabel));

    deviceColorsEl.innerHTML = '';
    CASE_DEVICE_COLORS.forEach(c => {
      const sw = document.createElement('button');
      sw.className = 'cz-swatch';
      sw.style.background = c.hex;
      sw.title = c.label;
      sw.setAttribute('aria-label', c.label);
      sw.addEventListener('click', () => selectDeviceColor(c));
      deviceColorsEl.appendChild(sw);
    });
    deviceColorWrap.hidden = false;
  }

  function selectDeviceColor(color) {
    state.deviceColor = color;
    [...deviceColorsEl.children].forEach((el, i) => el.classList.toggle('active', CASE_DEVICE_COLORS[i].id === color.id));
    goToStep(2);
  }

  /* ── Étape 2 : types de coque ─────────────────────────────── */
  const typesEl = document.getElementById('czTypes');
  const caseColorWrap = document.getElementById('czCaseColorWrap');
  const caseColorsEl = document.getElementById('czCaseColors');
  const deviceColorWrap = document.getElementById('czDeviceColorWrap');
  const deviceColorsEl = document.getElementById('czDeviceColors');

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

  function selectType(type) {
    state.caseType = type;
    document.querySelectorAll('.cz-type-card').forEach((c, i) => c.classList.toggle('active', CASE_TYPES[i].id === type.id));

    caseColorsEl.innerHTML = '';
    CASE_COLORS.forEach(c => {
      const sw = document.createElement('button');
      sw.className = 'cz-swatch';
      sw.style.background = c.hex;
      sw.title = c.label;
      sw.setAttribute('aria-label', c.label);
      sw.addEventListener('click', () => selectCaseColor(c));
      caseColorsEl.appendChild(sw);
    });
    caseColorWrap.hidden = false;
  }

  function selectCaseColor(color) {
    state.productColor = color;
    [...caseColorsEl.children].forEach((el, i) => el.classList.toggle('active', CASE_COLORS[i].id === color.id));
    goToStep(3);
    updateSummary();
    renderPreview();
  }

  /* ── Étape 3 : canvas & outils ─────────────────────────────── */
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

  /* Texte */
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

    const silhouetteKey = state.brand ? state.brand.silhouette : 'generic';
    const sil = CASE_SILHOUETTES[silhouetteKey];

    const body = sil.body, zone = sil.printZone;
    const bx = body.x * S, by = body.y * S, bw = body.w * S, bh = body.h * S, br = body.radius * S;
    const zx = zone.x * S, zy = zone.y * S, zw = zone.w * S, zh = zone.h * S, zr = zone.radius * S;

    const deviceHex = state.deviceColor ? state.deviceColor.hex : '#111111';
    const productHex = state.productColor ? state.productColor.hex : '#e9e9e9';

    // Ombre légère sous le téléphone
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    roundedRectPath(ctx, bx, by, bw, bh, br);
    ctx.fillStyle = deviceHex;
    ctx.fill();
    ctx.restore();

    // Visuel utilisateur clippé dans la zone imprimable
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

    // Module caméra par-dessus
    ctx.save();
    ctx.fillStyle = '#0d0d0d';
    const cam = sil.camera;
    const camX = cam.x * S, camY = cam.y * S, camW = cam.w * S, camH = cam.h * S;
    if (cam.type === 'apple-module') {
      roundedRectPath(ctx, camX, camY, camW, camH, (cam.radius || 0.04) * S);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath(); ctx.arc(camX + camW * 0.3, camY + camH * 0.3, camW * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(camX + camW * 0.7, camY + camH * 0.3, camW * 0.18, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(camX + camW * 0.3, camY + camH * 0.7, camW * 0.18, 0, Math.PI * 2); ctx.fill();
    } else if (cam.type === 'samsung-strip') {
      roundedRectPath(ctx, camX, camY, camW, camH, camW * 0.4);
      ctx.fill();
      ctx.fillStyle = '#333';
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(camX + camW / 2, camY + camH * (0.22 + i * 0.3), camW * 0.32, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.arc(camX + camW / 2, camY + camH / 2, camW / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(camX + camW / 2, camY + camH / 2, camW * 0.32, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Contour de la coque
    roundedRectPath(ctx, bx, by, bw, bh, br);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.stroke();
  }

  /* ── Résumé ───────────────────────────────────────────────── */
  function updateSummary() {
    document.getElementById('czSumBrand').textContent = state.brand ? state.brand.label : '—';
    document.getElementById('czSumModel').textContent = state.model || '—';
    document.getElementById('czSumDeviceColor').textContent = state.deviceColor ? state.deviceColor.label : '—';
    document.getElementById('czSumType').textContent = state.caseType ? state.caseType.label : '—';
    document.getElementById('czSumCaseColor').textContent = state.productColor ? state.productColor.label : '—';
    document.getElementById('czSumSides').textContent = state.caseType ? CASE_SIDES_LABEL[state.caseType.sides] : '—';
    document.getElementById('czSumPrice').textContent = state.caseType ? formatPrice(state.caseType.price_eur) : '—';
  }

  renderPreview();

  /* ── Ajout au panier ──────────────────────────────────────── */
  document.getElementById('czAddToCart').addEventListener('click', () => {
    if (!state.brand || !state.model || !state.caseType) {
      showToast('Merci de compléter les 3 étapes avant d\'ajouter au panier.');
      return;
    }
    const hasArtwork = state.artworkType === 'collage'
      ? state.collageImages.some(Boolean)
      : !!state.image;
    if (!hasArtwork) {
      showToast('Ajoutez au moins une image avant de continuer.');
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
