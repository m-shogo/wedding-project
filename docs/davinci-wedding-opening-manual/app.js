(() => {
  const STORAGE_KEY = 'davinci-wedding-opening-manual-progress-v1';
  const checks = [...document.querySelectorAll('[data-progress]')];
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');

  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (_) {
      return {};
    }
  };

  const save = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const render = () => {
    const done = checks.filter((check) => check.checked).length;
    const total = checks.length;
    progressText.textContent = `${done} / ${total}`;
    progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;

    checks.forEach((check) => {
      check.closest('.step')?.classList.toggle('is-done', check.checked);
    });
  };

  const state = load();
  checks.forEach((check) => {
    check.checked = Boolean(state[check.dataset.progress]);
    check.addEventListener('change', () => {
      state[check.dataset.progress] = check.checked;
      save(state);
      render();
    });
  });

  render();
})();
