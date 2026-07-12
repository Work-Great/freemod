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
const voiceDemoPlayer=document.getElementById('voiceDemoPlayer');
const voiceButtons=document.querySelectorAll('.voice-play-btn');
let activeVoiceButton=null;
function fmt(t){if(!Number.isFinite(t))return'00:00';const m=Math.floor(t/60),s=Math.floor(t%60);return`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`}
function resetVoice(btn){if(!btn)return;btn.classList.remove('is-playing');btn.querySelector('.voice-play-icon').textContent='▶';btn.querySelector('.voice-play-text').textContent='ฟังตัวอย่างเสียง';const card=btn.closest('.voice-demo-card');card.querySelector('.voice-progress-bar').style.width='0%';card.querySelector('.voice-time').textContent='00:00 / 00:00'}
voiceButtons.forEach(btn=>btn.addEventListener('click',async()=>{
  const src=btn.dataset.audio;
  if(activeVoiceButton===btn&&!voiceDemoPlayer.paused){voiceDemoPlayer.pause();return}
  if(activeVoiceButton&&activeVoiceButton!==btn)resetVoice(activeVoiceButton);
  const full=new URL(src,location.href).href;
  if(voiceDemoPlayer.src!==full){voiceDemoPlayer.src=src;voiceDemoPlayer.currentTime=0}
  activeVoiceButton=btn;
  btn.classList.add('is-playing');
  btn.querySelector('.voice-play-icon').textContent='❚❚';
  btn.querySelector('.voice-play-text').textContent='หยุดชั่วคราว';
  try{await voiceDemoPlayer.play()}catch(e){resetVoice(btn);activeVoiceButton=null;alert('ยังไม่พบไฟล์เสียง Demo กรุณาอัปโหลดไฟล์ MP3 ไปยังโฟลเดอร์ audio')}
}));
if(voiceDemoPlayer){
  voiceDemoPlayer.addEventListener('timeupdate',()=>{
    if(!activeVoiceButton)return;
    const card=activeVoiceButton.closest('.voice-demo-card');
    const d=voiceDemoPlayer.duration,c=voiceDemoPlayer.currentTime;
    if(Number.isFinite(d)&&d>0)card.querySelector('.voice-progress-bar').style.width=`${c/d*100}%`;
    card.querySelector('.voice-time').textContent=`${fmt(c)} / ${fmt(d)}`;
  });
  voiceDemoPlayer.addEventListener('pause',()=>{if(!activeVoiceButton||voiceDemoPlayer.ended)return;activeVoiceButton.classList.remove('is-playing');activeVoiceButton.querySelector('.voice-play-icon').textContent='▶';activeVoiceButton.querySelector('.voice-play-text').textContent='เล่นต่อ'});
  voiceDemoPlayer.addEventListener('ended',()=>{resetVoice(activeVoiceButton);activeVoiceButton=null});
}
