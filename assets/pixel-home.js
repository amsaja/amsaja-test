
(() => {
  const bag = document.querySelector('.bag-hotspot');
  const message = document.getElementById('punch-message');
  if (!bag || !message) return;

  let timer = null;
  bag.addEventListener('click', () => {
    window.clearTimeout(timer);
    message.classList.add('show');
    timer = window.setTimeout(() => message.classList.remove('show'), 1600);
  });
})();
