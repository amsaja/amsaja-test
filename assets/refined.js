
(() => {
  const items = [...document.querySelectorAll('[data-media-item]')];
  const prev = document.getElementById('media-prev');
  const next = document.getElementById('media-next');
  const status = document.getElementById('media-page-status');
  if (!items.length || !prev || !next || !status) return;

  const pageSize = 5;
  const pages = Math.ceil(items.length / pageSize);
  let page = 0;

  function render() {
    items.forEach((item, i) => {
      const show = Math.floor(i / pageSize) === page;
      item.hidden = !show;
      item.style.display = show ? "grid" : "none";
      item.setAttribute("aria-hidden", show ? "false" : "true");
    });
    status.textContent = `${page + 1} / ${pages}`;
    prev.disabled = page === 0;
    next.disabled = page === pages - 1;
  }

  prev.addEventListener('click', () => {
    if (page <= 0) return;
    page -= 1;
    render();
    document.getElementById('press')?.scrollIntoView({behavior:'smooth', block:'start'});
  });
  next.addEventListener('click', () => {
    if (page >= pages - 1) return;
    page += 1;
    render();
    document.getElementById('press')?.scrollIntoView({behavior:'smooth', block:'start'});
  });

  render();
})();
