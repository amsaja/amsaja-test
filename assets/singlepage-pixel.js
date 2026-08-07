
(() => {
  const links = [...document.querySelectorAll('.floating-dock a[data-section]')];
  const sections = links
    .map(a => document.getElementById(a.dataset.section))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(a => a.classList.toggle('active', a.dataset.section === visible.target.id));
    }, {rootMargin:'-25% 0px -55% 0px', threshold:[0,.15,.35,.6]});
    sections.forEach(s => observer.observe(s));
  }
})();
