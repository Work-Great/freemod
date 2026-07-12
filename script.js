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
// ===== Voice Demo Player =====

const voiceDemoPlayer = document.getElementById("voiceDemoPlayer");
const voiceButtons = document.querySelectorAll(".voice-play-btn");

let activeVoiceButton = null;

function formatVoiceTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function resetVoiceButton(button) {
  if (!button) return;

  button.classList.remove("is-playing");

  const icon = button.querySelector(".voice-play-icon");
  const text = button.querySelector(".voice-play-text");
  const card = button.closest(".voice-demo-card");
  const progressBar = card?.querySelector(".voice-progress-bar");
  const time = card?.querySelector(".voice-time");

  if (icon) {
    icon.textContent = "▶";
  }

  if (text) {
    text.textContent = "ฟังตัวอย่างเสียง";
  }

  if (progressBar) {
    progressBar.style.width = "0%";
  }

  if (time) {
    time.textContent = "00:00 / 00:00";
  }
}

voiceButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    if (!voiceDemoPlayer) return;

    const audioSrc = button.dataset.audio;

    if (!audioSrc) return;

    // กดปุ่มเดิมระหว่างที่เสียงกำลังเล่น = หยุดชั่วคราว
    if (
      activeVoiceButton === button &&
      !voiceDemoPlayer.paused
    ) {
      voiceDemoPlayer.pause();

      button.classList.remove("is-playing");

      const icon = button.querySelector(".voice-play-icon");
      const text = button.querySelector(".voice-play-text");

      if (icon) {
        icon.textContent = "▶";
      }

      if (text) {
        text.textContent = "เล่นต่อ";
      }

      return;
    }

    // ถ้ากดตัวละครใหม่ ให้รีเซ็ตปุ่มตัวเก่า
    if (
      activeVoiceButton &&
      activeVoiceButton !== button
    ) {
      resetVoiceButton(activeVoiceButton);
    }

    const fullAudioUrl = new URL(
      audioSrc,
      window.location.href
    ).href;

    // เปลี่ยนไฟล์เฉพาะตอนกดคนละเสียง
    if (voiceDemoPlayer.src !== fullAudioUrl) {
      voiceDemoPlayer.src = audioSrc;
      voiceDemoPlayer.currentTime = 0;
    }

    activeVoiceButton = button;

    button.classList.add("is-playing");

    const icon = button.querySelector(".voice-play-icon");
    const text = button.querySelector(".voice-play-text");

    if (icon) {
      icon.textContent = "❚❚";
    }

    if (text) {
      text.textContent = "หยุดชั่วคราว";
    }

    try {
      await voiceDemoPlayer.play();
    } catch (error) {
      resetVoiceButton(button);
      activeVoiceButton = null;

      alert(`ไม่พบไฟล์เสียง: ${audioSrc}`);
    }
  });
});

if (voiceDemoPlayer) {
  // อัปเดตแถบเวลาและเวลาเล่น
  voiceDemoPlayer.addEventListener("timeupdate", () => {
    if (!activeVoiceButton) return;

    const card = activeVoiceButton.closest(
      ".voice-demo-card"
    );

    const progressBar = card?.querySelector(
      ".voice-progress-bar"
    );

    const time = card?.querySelector(
      ".voice-time"
    );

    const duration = voiceDemoPlayer.duration;
    const currentTime = voiceDemoPlayer.currentTime;

    if (
      progressBar &&
      Number.isFinite(duration) &&
      duration > 0
    ) {
      const percent =
        (currentTime / duration) * 100;

      progressBar.style.width = `${percent}%`;
    }

    if (time) {
      time.textContent =
        `${formatVoiceTime(currentTime)} / ${formatVoiceTime(duration)}`;
    }
  });

  // เล่นจบแล้วรีเซ็ตปุ่ม
  voiceDemoPlayer.addEventListener("ended", () => {
    resetVoiceButton(activeVoiceButton);
    activeVoiceButton = null;
  });

  // โหลดไฟล์เสียงไม่ได้
  voiceDemoPlayer.addEventListener("error", () => {
    if (!activeVoiceButton) return;

    const audioSrc =
      activeVoiceButton.dataset.audio ||
      "ไฟล์เสียง";

    resetVoiceButton(activeVoiceButton);
    activeVoiceButton = null;

    alert(`โหลดไฟล์เสียงไม่ได้: ${audioSrc}`);
  });
}
