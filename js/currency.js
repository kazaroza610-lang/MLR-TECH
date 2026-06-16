const EUR_TO_AR = 4500;
let currentCurrency = localStorage.getItem('mlr-currency') || 'EUR';

function formatPrice(eur) {
  if (currentCurrency === 'AR') {
    const ar = Math.round(eur * EUR_TO_AR);
    return ar.toLocaleString('fr-FR') + ' Ar';
  }
  return eur % 1 === 0
    ? eur + ' €'
    : eur.toFixed(2).replace('.', ',') + ' €';
}

function setCurrency(c) {
  currentCurrency = c;
  localStorage.setItem('mlr-currency', c);
  document.querySelectorAll('.currency-select').forEach(s => s.value = c);
  document.querySelectorAll('[data-price-eur]').forEach(el => {
    el.textContent = formatPrice(parseFloat(el.dataset.priceEur));
  });
  if (typeof updateCartDisplay === 'function') updateCartDisplay();
}

function initCurrencySelects() {
  document.querySelectorAll('.currency-select').forEach(s => {
    s.value = currentCurrency;
    s.addEventListener('change', e => setCurrency(e.target.value));
  });
}
