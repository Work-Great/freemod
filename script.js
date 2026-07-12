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


// ===== Premium voice cast player =====
const voiceProPlayer = document.getElementById('voiceProPlayer');
const voiceProButtons = document.querySelectorAll('.voice-pro-play');
let activeVoiceProButton = null;

function formatVoiceProTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
}

function resetVoicePro(button) {
  if (!button) return;
  const card = button.closest('.voice-pro-card');
  button.classList.remove('is-playing');
  card?.classList.remove('is-playing');
  button.querySelector('.voice-pro-icon').textContent = '▶';
  button.querySelector('.voice-pro-text').textContent = 'ฟังตัวอย่างเสียง';
  const bar = card?.querySelector('.voice-pro-progress-bar');
  const time = card?.querySelector('.voice-pro-time');
  if (bar) bar.style.width = '0%';
  if (time) time.textContent = '00:00 / 00:00';
}

voiceProButtons.forEach(button => {
  button.addEventListener('click', async () => {
    if (!voiceProPlayer) return;
    const src = button.dataset.audio;
    const card = button.closest('.voice-pro-card');

    if (activeVoiceProButton === button && !voiceProPlayer.paused) {
      voiceProPlayer.pause();
      button.classList.remove('is-playing');
      card?.classList.remove('is-playing');
      button.querySelector('.voice-pro-icon').textContent = '▶';
      button.querySelector('.voice-pro-text').textContent = 'เล่นต่อ';
      return;
    }

    if (activeVoiceProButton && activeVoiceProButton !== button) {
      resetVoicePro(activeVoiceProButton);
    }

    const fullUrl = new URL(src, window.location.href).href;
    if (voiceProPlayer.src !== fullUrl) {
      voiceProPlayer.src = src;
      voiceProPlayer.currentTime = 0;
    }

    activeVoiceProButton = button;
    button.classList.add('is-playing');
    card?.classList.add('is-playing');
    button.querySelector('.voice-pro-icon').textContent = '❚❚';
    button.querySelector('.voice-pro-text').textContent = 'หยุดชั่วคราว';

    try {
      await voiceProPlayer.play();
    } catch (error) {
      resetVoicePro(button);
      activeVoiceProButton = null;
      alert(`ยังไม่พบไฟล์เสียง: ${src}`);
    }
  });
});

if (voiceProPlayer) {
  voiceProPlayer.addEventListener('timeupdate', () => {
    if (!activeVoiceProButton) return;
    const card = activeVoiceProButton.closest('.voice-pro-card');
    const duration = voiceProPlayer.duration;
    const current = voiceProPlayer.currentTime;
    const bar = card?.querySelector('.voice-pro-progress-bar');
    const time = card?.querySelector('.voice-pro-time');

    if (bar && Number.isFinite(duration) && duration > 0) {
      bar.style.width = `${(current / duration) * 100}%`;
    }
    if (time) {
      time.textContent = `${formatVoiceProTime(current)} / ${formatVoiceProTime(duration)}`;
    }
  });

  voiceProPlayer.addEventListener('ended', () => {
    resetVoicePro(activeVoiceProButton);
    activeVoiceProButton = null;
  });
}

