const clock = document.getElementById('clock');
const alarmForm = document.getElementById('alarm-form');
const hourSelect = document.getElementById('hour');
const minuteSelect = document.getElementById('minute');
const ampmSelect = document.getElementById('ampm');
const alarmList = document.getElementById('alarm-list');
const alarmAudio = document.getElementById('alarm-audio');

let alarms = [];

for (let i = 1; i <= 12; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i.toString().padStart(2, '0');
  hourSelect.appendChild(option);
}

for (let i = 0; i < 60; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i.toString().padStart(2, '0');
  minuteSelect.appendChild(option);
}

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // 0 => 12

  const displayTime = `${pad(h)}:${pad(m)}:${pad(s)} ${ampm}`;
  clock.textContent = displayTime;

  const currentTimeToCompare = `${pad(h)}:${pad(m)} ${ampm}`;
  alarms.forEach((alarm, index) => {
    if (alarm === currentTimeToCompare) {
      playAlarm();
      
      alarms.splice(index, 1);
      renderAlarms();
    }
  });
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function playAlarm() {
  alarmAudio.play();
}

alarmForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (alarms.length >= 5) {
    alert("⚠️ Only 5 alarms allowed.");
    return;
  }

  const hour = hourSelect.value;
  const minute = minuteSelect.value;
  const ampm = ampmSelect.value;

  const alarmTime = `${pad(hour)}:${pad(minute)} ${ampm}`;
  if (!alarms.includes(alarmTime)) {
    alarms.push(alarmTime);
    renderAlarms();
  }
});

function renderAlarms() {
  alarmList.innerHTML = '';
  alarms.forEach((alarm, index) => {
    const li = document.createElement('li');
    li.textContent = alarm;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => {
      alarms.splice(index, 1);
      renderAlarms();
    };

    li.appendChild(removeBtn);
    alarmList.appendChild(li);
  });
}

setInterval(updateClock, 1000);
