(() => {
  const STORAGE_KEY = 'davinci-wedding-opening-manual-progress-v1';
  const MARKER_KEYS = [
    'marker-016',
    'marker-038',
    'marker-058',
    'marker-108',
    'marker-128',
    'marker-148',
    'marker-200'
  ];

  const checks = [...document.querySelectorAll('[data-progress]')];
  const progressText = document.getElementById('progressText');
  const progressBar = document.getElementById('progressBar');
  const nowSection = document.querySelector('.now-section');
  const todayCard = document.querySelector('.today-card');
  const musicCheck = document.querySelector('[data-progress="music-on-timeline"]');
  const markerProgress = document.getElementById('markerProgress');
  const markerDoneTitle = document.getElementById('markerDoneTitle');
  const markerDoneText = document.getElementById('markerDoneText');
  const markerCelebration = document.getElementById('markerCelebration');

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

  const state = load();

  const markerDoneCount = () => MARKER_KEYS.filter((key) => Boolean(state[key])).length;

  const renderJourney = () => {
    const musicDone = Boolean(state['music-on-timeline']);
    const markersDone = markerDoneCount();
    const allMarkersDone = markersDone === MARKER_KEYS.length;

    const journeyMusic = document.getElementById('journeyMusic');
    const journeyMarkers = document.getElementById('journeyMarkers');
    const journeyScenes = document.getElementById('journeyScenes');

    if (journeyMusic) journeyMusic.textContent = musicDone ? '✓ 曲を置いた' : '① 曲を置く';
    if (journeyMarkers) journeyMarkers.textContent = allMarkersDone ? '✓ 目印できた' : `② 目印を置く${markersDone ? ` ${markersDone}/7` : ''}`;
    if (journeyScenes) journeyScenes.textContent = allMarkersDone ? '③ 好きな場面を作る ← 次' : '③ 好きな場面を作る';
  };

  const renderStudioState = () => {
    const musicDone = Boolean(state['music-on-timeline']);
    const allMarkersDone = markerDoneCount() === MARKER_KEYS.length;

    if (nowSection && musicCheck) {
      nowSection.classList.toggle('is-complete', musicDone);
      const pill = nowSection.querySelector('.status-pill');
      if (pill) pill.textContent = musicDone ? 'DONE ✓' : 'STEP 01';

      const nextStepButton = nowSection.querySelector('.next-step-button');
      if (nextStepButton) nextStepButton.hidden = !musicDone;
    }

    if (!todayCard) return;

    const kicker = todayCard.querySelector('.today-kicker');
    const title = todayCard.querySelector(':scope > strong');
    const text = todayCard.querySelector(':scope > p:not(.today-kicker)');
    const link = todayCard.querySelector('.primary-button');

    if (allMarkersDone) {
      if (kicker) kicker.textContent = 'NEXT SCENE';
      if (title) title.textContent = '次は、好きな場面。';
      if (text) text.textContent = '冒頭、歌詞、写真、紹介、カウントダウン。作りたいところから選ぶ。';
      if (link) {
        link.textContent = 'どこを作る？ →';
        link.setAttribute('href', '#want');
      }
      return;
    }

    if (musicDone) {
      if (kicker) kicker.textContent = 'NEXT';
      if (title) title.textContent = '次は、曲に目印。';
      if (text) text.textContent = 'WELCOME、サビ、ラストの位置を曲の上に見えるようにする。';
      if (link) {
        link.textContent = '目印をつける →';
        link.setAttribute('href', './markers.html');
      }
      return;
    }

    if (kicker) kicker.textContent = 'TODAY';
    if (title) title.textContent = 'まず、曲を置く。';
    if (text) text.textContent = 'StaRtをA1に置いて、再生できるところまで。今日はここから。';
    if (link) {
      link.textContent = 'やる →';
      link.setAttribute('href', '#now');
    }
  };

  const renderMarkerState = () => {
    const done = markerDoneCount();
    const allDone = done === MARKER_KEYS.length;

    if (markerProgress) markerProgress.textContent = `${done} / ${MARKER_KEYS.length}`;

    if (markerDoneTitle) {
      markerDoneTitle.textContent = allDone ? '曲の地図、できた。' : '目印が並んだら、演出へ。';
    }

    if (markerDoneText) {
      markerDoneText.textContent = allDone
        ? 'ここからは順番じゃなくていい。作りたい場面を選んで、その場で仕上げていく。'
        : 'ここからは好きな場所から作る。「冒頭を作りたい」「サビを作りたい」で選べばいい。';
    }

    if (markerCelebration) markerCelebration.hidden = !allDone;
  };

  const render = () => {
    const done = checks.filter((check) => check.checked).length;
    const total = checks.length;

    if (progressText) progressText.textContent = `${done} / ${total}`;
    if (progressBar) progressBar.style.width = `${total ? (done / total) * 100 : 0}%`;

    checks.forEach((check) => {
      check.closest('.step')?.classList.toggle('is-done', check.checked);
      check.closest('.marker-item')?.classList.toggle('is-done', check.checked);
    });

    renderJourney();
    renderStudioState();
    renderMarkerState();
  };

  checks.forEach((check) => {
    check.checked = Boolean(state[check.dataset.progress]);

    check.addEventListener('change', () => {
      const key = check.dataset.progress;
      state[key] = check.checked;

      checks
        .filter((other) => other !== check && other.dataset.progress === key)
        .forEach((other) => {
          other.checked = check.checked;
        });

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
