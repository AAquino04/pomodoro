// Recupera dados da home que estavam armazenados no localStorage
const pomodoroData = localStorage.getItem('data');
const data = JSON.parse(pomodoroData);

// Elementos do DOM para estilo
const title = document.querySelector("main .work-info h2");
const innerTimer = document.querySelector("main .inner-timer");

// Elementos do DOM para lógica do timer
const startBtn = document.getElementById('start');
const screenTimerMinutes = document.getElementById('timer-min');
const screenTimerSeconds = document.getElementById('timer-sec');

// Seta timer para valores iniciais vindos da home;
screenTimerMinutes.innerText = data.workTime;
screenTimerSeconds.innerText = "00";

// Dados do timer
let { workTime, breakTime, rounds } = data;
let seconds = 00;
let onBreak = false;

// Adiciona o evento de start ao botão
let startTimer;
startBtn.addEventListener('click', () => {
    if (!startTimer) {
        startTimer = setInterval(timer, 10);
    } else {
        alert("Cronômetro iniciado, aguarde o fim do ciclo atual.")
    }
})

// Timer
function timer() {
    // Para o cronômetro quando chega ao fim
    if (workTime === 0 && seconds === 0) {
        clearInterval(startTimer);

        /**
         * Caso termine o timer de descanso: Reset para o timer de trabalho
         * Caso contrário: Reset para o timer de descanso.
         */
        onBreak ? reset() : breakTimer();
    }

    // Adiciona zero a esquerda dos segundos se forem menos que 10
    if (seconds < 10) {
        screenTimerMinutes.innerText = workTime;
        screenTimerSeconds.innerText = `0${seconds}`;
    } else {
        screenTimerMinutes.innerText = workTime;
        screenTimerSeconds.innerText = seconds;
    }

    // Subtrai um minuto quando os segundos chegam a 0
    if (workTime !== 0 && seconds === 0) {
        seconds = 60;
        --workTime;
    }

    --seconds;
}

/**
 * Reseta o timer e seta startTimer para null,
 * possibilitando o início de outro round.
 */
function reset() {
    onBreak = false;
    updateStyle(onBreak);

    if (rounds > 0) {
        workTime = data.workTime;
        screenTimerMinutes.innerText = workTime;
        screenTimerSeconds.innerText = "00";
        startTimer = null;
    } else {
        title.innerText = "Fim!";
        innerTimer.style = "border-color: #dc0755";
        title.style = "color: #dc0755";
    }
}

function breakTimer() {
    onBreak = true;
    updateStyle(onBreak);

    workTime = data.breakTime;
    screenTimerMinutes.innerText = workTime;
    screenTimerSeconds.innerText = "00";
    startTimer = null;
    --rounds;
}

function updateStyle(onBreak) {
    if (onBreak) {
        title.innerText = "Descanso"
        innerTimer.style = "border-color: #F2C94C"
        title.style = "color: #F2C94C"
    } else {
        title.innerText = "Trabalho";
        innerTimer.style = "border-color: #219653"
        title.style = "color: #219653";
    }
}
