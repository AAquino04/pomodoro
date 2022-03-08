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

let startTimer;
startBtn.addEventListener('click', () => {
    if (!startTimer) {
        startTimer = setInterval(timer, 10);
    } else {
        alert("Cronômetro iniciado, aguarde o fim do ciclo atual.")
    }
})
