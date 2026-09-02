(() => {
  const STORAGE_KEY = 'davinci-wedding-opening-manual-progress-v1';
  const checks = [...document.querySelectorAll('[data-progress]')];
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');
  const nowSection = document.querySelector('.now-section');
  const todayCard = document.querySelector('.today-card');
  const musicCheck = document.querySelector('[data-progress="music-on-timeline"]');

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

  const renderStudioState = () => {
    if (!musicCheck || !nowSection) return;

    const done = musicCheck.checked;
    nowSection.classList.toggle('is-complete', done);

    const pill = nowSection.querySelector('.status-pill');
    if (pill) pill.textContent = done ? 'DONE ✓' : 'STEP 01';

    if (!todayCard) return;
    const kicker = todayCard.querySelector('.today-kicker');
    const title = todayCard.querySelector(':scope > strong');
    const text = todayCard.querySelector(':scope > p:not(.today-kicker)');
    const link = todayCard.querySelector('.primary-button');

    if (done) {
      if (kicker) kicker.textContent = 'NEXT';
      if (title) title.textContent = '次は、曲に目印。';
      if (text) text.textContent = 'WELCOME、サビ、ラストの位置を曲の上に見えるようにする。';
      if (link) {
        link.textContent = '曲の流れを見る →';
        link.setAttribute('href', '#timeline');
      }
    } else {
      if (kicker) kicker.textContent = 'TODAY';
      if (title) title.textContent = 'まず、曲を置く。';
      if (text) text.textContent = 'StaRtをA1に置いて、再生できるところまで。今日はここから。';
      if (link) {
        link.textContent = 'やる →';
        link.setAttribute('href', '#now');
      }
    }
  };

  const render = () => {
    const done = checks.filter((check) => check.checked).length;
    const total = checks.length;
    if (progressText) progressText.textContent = `${done} / ${total}`;
    if (progressBar) progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;

    checks.forEach((check) => {
      check.closest('.step')?.classList.toggle('is-done', check.checked);
    });

    renderStudioState();
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
