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
    if (progressText) progressText.textContent = `${done} / ${total}`;
    if (progressBar) progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;

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

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        const original = button.textContent;
        button.textContent = 'コピー済み';
        button.classList.add('is-copied');
        window.setTimeout(() => {
          button.textContent = original;
          button.classList.remove('is-copied');
        }, 1400);
      } catch (_) {
        button.textContent = '選択してコピー';
      }
    });
  });

  render();
})();
