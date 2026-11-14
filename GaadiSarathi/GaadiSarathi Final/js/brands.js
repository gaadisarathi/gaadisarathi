(() => {
  const search = document.getElementById('brandSearch');
  const filters = [...document.querySelectorAll('.brand-filter')];
  const cards = [...document.querySelectorAll('.brand-card')];
  const groups = [...document.querySelectorAll('.brand-directory-group')];
  const empty = document.getElementById('brandEmpty');
  if (!search || !cards.length) return;

  // Keep a clear text fallback if a third-party logo endpoint is unavailable.
  document.querySelectorAll('.brand-logo img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = img.parentElement.querySelector('b');
      if (fallback) fallback.style.display = 'block';
    }, { once: true });
  });

  let active = 'all';
  function update() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matchesText = card.dataset.name.toLowerCase().includes(query);
      const categories = (card.dataset.category || '').split(/\s+);
      const matchesFilter = active === 'all' || categories.includes(active);
      const show = matchesText && matchesFilter;
      card.hidden = !show;
      if (show) visible++;
    });
    groups.forEach(group => {
      group.hidden = ![...group.querySelectorAll('.brand-card')].some(card => !card.hidden);
    });
    empty.hidden = visible !== 0;
  }
  search.addEventListener('input', update);
  filters.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.filter;
    filters.forEach(item => item.classList.toggle('active', item === button));
    update();
  }));
  update();
})();
