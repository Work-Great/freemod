const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const pages = document.querySelectorAll('.page');
const navItems = navLinks.querySelectorAll('a');

function pauseVideosOutside(pageId) {
  document.querySelectorAll('video').forEach(video => {
    const ownerPage = video.closest('.page');
    if (!ownerPage || ownerPage.id !== pageId) {
      video.pause();
    }
  });
}

function showPage(pageId) {
  pauseVideosOutside(pageId);

  pages.forEach(page => {
    page.classList.toggle('active-page', page.id === pageId);
  });

  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${pageId}`);
  });

  navLinks.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const pageId = link.getAttribute('href').replace('#', '');
    const target = document.getElementById(pageId);
    if (!target || !target.classList.contains('page')) return;
    event.preventDefault();
    history.replaceState(null, '', `#${pageId}`);
    showPage(pageId);
  });
});

const startPage = location.hash.replace('#', '') || 'home';
showPage(document.getElementById(startPage) ? startPage : 'home');


const projectData = {
  demo: {
    type: 'Five Hearts 2 Demo',
    title: 'Five Hearts Under One Roof 2 Demo',
    percent: 10,
    desc: 'เริ่มวางระบบสำหรับเวอร์ชันเดโมแล้ว ตอนนี้อยู่ช่วงเตรียมไฟล์และทดสอบโครงสร้าง Mod',
    tasks: [
      ['รวบรวมไฟล์วิดีโอ/เสียง', 100, 'เริ่มแยกไฟล์ที่ต้องใช้สำหรับทำพากย์ไทย'],
      ['แปลบท', 100, 'ยังไม่เริ่มแปลบทเต็ม'],
      ['อัดเสียงพากย์', 0, 'รอรายชื่อนักพากย์และบทพูด'],
      ['ตัดต่อเสียงลงคลิป', 0, 'จะเริ่มหลังมีไฟล์เสียงพากย์'],
      ['ทดสอบในเกม', 10, 'เริ่มเช็กวิธีแทนไฟล์เดิมในเกม'],
      ['ปล่อยดาวน์โหลด', 0, 'ยังไม่พร้อมปล่อย']
    ]
  },
  full: {
    type: 'Five Hearts 2 Full Game',
    title: 'Five Hearts Under One Roof 2',
    percent: 3,
    desc: 'เริ่มวางระบบสำหรับตัวเกมภาค 2 แล้ว ตอนนี้อยู่ช่วงเตรียมไฟล์และทดสอบโครงสร้าง Mod',
    tasks: [
      ['รวบรวมไฟล์วิดีโอ/เสียง', 10, 'เริ่มแยกไฟล์ที่ต้องใช้สำหรับทำพากย์ไทย'],
      ['แปลบท', 0, 'ยังไม่เริ่มแปลบทเต็ม'],
      ['อัดเสียงพากย์', 0, 'รอรายชื่อนักพากย์และบทพูด'],
      ['ตัดต่อเสียงลงคลิป', 0, 'จะเริ่มหลังมีไฟล์เสียงพากย์'],
      ['ทดสอบในเกม', 5, 'เริ่มเช็กวิธีแทนไฟล์เดิมในเกม'],
      ['ปล่อยดาวน์โหลด', 0, 'ยังไม่พร้อมปล่อย']
    ]
  },
  season1: {
    type: 'Five Hearts 1',
    title: 'Five Hearts Under One Roof 1',
    percent: 0,
    desc: 'โปรเจกต์ภาคแรกยังอยู่ในแผนงาน ยังไม่เริ่มผลิตจริง',
    tasks: [
      ['รวบรวมไฟล์วิดีโอ/เสียง', 0, 'ยังไม่เริ่มรวบรวมไฟล์'],
      ['แปลบท', 0, 'ยังไม่เริ่มแปลบทเต็ม'],
      ['อัดเสียงพากย์', 0, 'รอรายชื่อนักพากย์และบทพูด'],
      ['ตัดต่อเสียงลงคลิป', 0, 'จะเริ่มหลังมีไฟล์เสียงพากย์'],
      ['ทดสอบในเกม', 0, 'ยังไม่เริ่มทดสอบในเกม'],
      ['ปล่อยดาวน์โหลด', 0, 'ยังไม่พร้อมปล่อย']
    ]
  }
};

const detailBox = document.getElementById('projectDetail');
const detailClose = document.getElementById('detailClose');
const detailType = document.getElementById('detailType');
const detailTitle = document.getElementById('detailTitle');
const detailDesc = document.getElementById('detailDesc');
const detailPercent = document.getElementById('detailPercent');
const detailBar = document.getElementById('detailBar');
const detailTasks = document.getElementById('detailTasks');

function renderProjectDetail(key) {
  const data = projectData[key];
  if (!data || !detailBox) return;
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.toggle('active-project', card.dataset.project === key);
  });
  detailType.textContent = data.type;
  detailTitle.textContent = data.title;
  detailDesc.textContent = data.desc;
  detailPercent.textContent = `${data.percent}%`;
  detailBar.style.width = `${data.percent}%`;
  detailTasks.innerHTML = data.tasks.map(([name, pct, note]) => `
    <div class="task-item">
      <div class="task-top"><span>${name}</span><span>${pct}%</span></div>
      <div class="progress"><div class="progress-bar" style="width:${pct}%"></div></div>
      <p class="task-note">${note}</p>
    </div>
  `).join('');
  detailBox.classList.add('show');
  detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => renderProjectDetail(card.dataset.project));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      renderProjectDetail(card.dataset.project);
    }
  });
});

if (detailClose) {
  detailClose.addEventListener('click', () => {
    detailBox.classList.remove('show');
    document.querySelectorAll('.project-card').forEach(card => card.classList.remove('active-project'));
  });
}

// Voice demo player
const voiceDemoPlayer = document.getElementById('voiceDemoPlayer');
const voiceButtons = document.querySelectorAll('.voice-play-btn');
let activeVoiceButton = null;

// Web Audio API สำหรับให้คลื่นขยับตามเสียงจริง
let audioContext = null;
let analyser = null;
let mediaSource = null;
let timeData = null;
let frequencyData = null;
let animationFrameId = null;

function fmt(time) {
  if (!Number.isFinite(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getVoiceCard(button) {
  return button ? button.closest('.voice-demo-card') : null;
}

function getWaveBars(button) {
  const card = getVoiceCard(button);
  return card ? [...card.querySelectorAll('.voice-wave span')] : [];
}

function setWaveIdle(button) {
  const bars = getWaveBars(button);
  bars.forEach((bar, index) => {
    const idleHeights = [6, 9, 12, 8, 10, 7];
    bar.style.height = `${idleHeights[index % idleHeights.length]}px`;
    bar.style.opacity = '.38';
  });
}

function ensureAudioAnalyser() {
  if (!voiceDemoPlayer) return false;

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;

    audioContext = new AudioContextClass();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -20;

    timeData = new Uint8Array(analyser.fftSize);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);

    mediaSource = audioContext.createMediaElementSource(voiceDemoPlayer);
    mediaSource.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return true;
}

function updateWaveFromAudio() {
  if (!activeVoiceButton || !analyser || voiceDemoPlayer.paused || voiceDemoPlayer.ended) {
    animationFrameId = null;
    return;
  }

  const bars = getWaveBars(activeVoiceButton);
  if (!bars.length) {
    animationFrameId = requestAnimationFrame(updateWaveFromAudio);
    return;
  }

  analyser.getByteTimeDomainData(timeData);
  analyser.getByteFrequencyData(frequencyData);

  // วัดระดับเสียงจริงด้วย RMS
  let sumSquares = 0;
  for (let i = 0; i < timeData.length; i++) {
    const normalized = (timeData[i] - 128) / 128;
    sumSquares += normalized * normalized;
  }

  const rms = Math.sqrt(sumSquares / timeData.length);

  // ถ้าเสียงเบามากหรือเงียบ ให้คลื่นหยุดเกือบนิ่ง
  const silenceThreshold = 0.018;
  const isSilent = rms < silenceThreshold;

  bars.forEach((bar, index) => {
    if (isSilent) {
      bar.style.height = `${5 + (index % 3)}px`;
      bar.style.opacity = '.30';
      return;
    }

    // กระจายแต่ละแท่งไปยังย่านความถี่ต่างกัน
    const binStart = 2;
    const usableBins = Math.max(1, frequencyData.length - binStart);
    const binIndex = binStart + Math.floor((index / bars.length) * usableBins);
    const frequencyLevel = frequencyData[Math.min(binIndex, frequencyData.length - 1)] / 255;

    // ผสมระดับความดังรวมกับข้อมูลความถี่
    const loudness = Math.min(1, rms * 7.5);
    const mixedLevel = Math.min(1, (frequencyLevel * 0.68) + (loudness * 0.72));

    const minHeight = 6;
    const maxHeight = 39;
    const height = minHeight + mixedLevel * (maxHeight - minHeight);

    bar.style.height = `${height.toFixed(1)}px`;
    bar.style.opacity = `${Math.min(1, 0.48 + mixedLevel * 0.62)}`;
  });

  animationFrameId = requestAnimationFrame(updateWaveFromAudio);
}

function startWave(button) {
  if (!button) return;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  setWaveIdle(button);

  if (ensureAudioAnalyser()) {
    animationFrameId = requestAnimationFrame(updateWaveFromAudio);
  }
}

function stopWave(button) {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  setWaveIdle(button);
}

function setButtonState(button, state) {
  if (!button) return;

  const icon = button.querySelector('.voice-play-icon');
  const text = button.querySelector('.voice-play-text');

  button.classList.toggle('is-playing', state === 'playing');

  if (state === 'playing') {
    icon.textContent = '❚❚';
    text.textContent = 'หยุดชั่วคราว';
    button.setAttribute('aria-label', 'หยุดตัวอย่างเสียงชั่วคราว');
    startWave(button);
  } else {
    icon.textContent = '▶';
    text.textContent = state === 'paused' ? 'เล่นต่อ' : 'ฟังตัวอย่างเสียง';
    button.setAttribute(
      'aria-label',
      state === 'paused' ? 'เล่นตัวอย่างเสียงต่อ' : 'ฟังตัวอย่างเสียง'
    );
    stopWave(button);
  }
}

function resetVoice(button) {
  if (!button) return;

  setButtonState(button, 'idle');

  const card = getVoiceCard(button);
  const progressBar = card?.querySelector('.voice-progress-bar');
  const timeLabel = card?.querySelector('.voice-time');

  if (progressBar) progressBar.style.width = '0%';
  if (timeLabel) timeLabel.textContent = '00:00 / 00:00';
}

voiceButtons.forEach(button => {
  setWaveIdle(button);

  button.addEventListener('click', async () => {
    const source = button.dataset.audio;
    if (!source || !voiceDemoPlayer) return;

    if (activeVoiceButton === button && !voiceDemoPlayer.paused) {
      voiceDemoPlayer.pause();
      return;
    }

    if (activeVoiceButton && activeVoiceButton !== button) {
      voiceDemoPlayer.pause();
      resetVoice(activeVoiceButton);
    }

    const fullSource = new URL(source, location.href).href;

    if (voiceDemoPlayer.src !== fullSource) {
      voiceDemoPlayer.src = source;
      voiceDemoPlayer.currentTime = 0;
    }

    activeVoiceButton = button;

    // ต้องสร้าง/ปลุก AudioContext หลังผู้ใช้กดปุ่ม
    ensureAudioAnalyser();
    setButtonState(button, 'playing');

    try {
      await voiceDemoPlayer.play();
    } catch (error) {
      resetVoice(button);
      activeVoiceButton = null;
      alert('ยังไม่พบไฟล์เสียง Demo กรุณาอัปโหลดไฟล์ MP3 ไปยังโฟลเดอร์ audio');
    }
  });
});

if (voiceDemoPlayer) {
  voiceDemoPlayer.addEventListener('loadedmetadata', () => {
    if (!activeVoiceButton) return;
    const card = getVoiceCard(activeVoiceButton);
    const timeLabel = card?.querySelector('.voice-time');

    if (timeLabel) {
      timeLabel.textContent =
        `${fmt(voiceDemoPlayer.currentTime)} / ${fmt(voiceDemoPlayer.duration)}`;
    }
  });

  voiceDemoPlayer.addEventListener('timeupdate', () => {
    if (!activeVoiceButton) return;

    const card = getVoiceCard(activeVoiceButton);
    const progressBar = card?.querySelector('.voice-progress-bar');
    const timeLabel = card?.querySelector('.voice-time');
    const duration = voiceDemoPlayer.duration;
    const current = voiceDemoPlayer.currentTime;

    if (progressBar && Number.isFinite(duration) && duration > 0) {
      progressBar.style.width = `${(current / duration) * 100}%`;
    }

    if (timeLabel) {
      timeLabel.textContent = `${fmt(current)} / ${fmt(duration)}`;
    }
  });

  voiceDemoPlayer.addEventListener('play', () => {
    if (activeVoiceButton) setButtonState(activeVoiceButton, 'playing');
  });

  voiceDemoPlayer.addEventListener('pause', () => {
    if (!activeVoiceButton || voiceDemoPlayer.ended) return;
    setButtonState(activeVoiceButton, 'paused');
  });

  voiceDemoPlayer.addEventListener('ended', () => {
    resetVoice(activeVoiceButton);
    activeVoiceButton = null;
  });

  voiceDemoPlayer.addEventListener('error', () => {
    if (!activeVoiceButton) return;
    resetVoice(activeVoiceButton);
    activeVoiceButton = null;
  });
}
