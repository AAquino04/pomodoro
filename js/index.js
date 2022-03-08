// Elementos do DOM para estilo
const title = document.querySelector("main .work-info h2");
const innerTimer = document.querySelector("main .inner-timer");
const roundBullets = document.querySelectorAll("main .rounds span");
// Elementos do DOM para lógica do timer
const startBtn = document.getElementById('start');
const screenTimerMinutes = document.getElementById('timer-min');
const screenTimerSeconds = document.getElementById('timer-sec');

// Seta timer para valores iniciais vindos da home;
screenTimerMinutes.innerText = data.workTime;
screenTimerSeconds.innerText = "00";

let timerState;
let pausedMinSec;

startBtn.addEventListener('click', () => {
    if (!timerState) {
        startBtn.innerHTML = "&#8214"
        timerState = setInterval(timer, 100);
    } else if (timerState === 'paused') {
        resumeTimer(...pausedMinSec);
    } else if (timerState === 'end') {
        alert("Você completou todos os ciclos, volte ao início e defina novos ciclos.")
    } else {
        pausedMinSec = pauseTimer();
    }
})
