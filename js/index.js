// Elementos do DOM para estilo
const title = document.querySelector("main .work-info h2");
const innerTimer = document.querySelector("main .inner-timer");
const roundBullets = document.querySelectorAll("main .rounds span");

// Elementos do DOM para o timer
const startBtn = document.getElementById('start');
const screenTimerMinutes = document.getElementById('timer-min');
const screenTimerSeconds = document.getElementById('timer-sec');

// Recupera dados da home que estavam armazenados no localStorage
const pomodoroData = localStorage.getItem('data');
const data = JSON.parse(pomodoroData);

// Dados do timer
let { workTime, breakTime, rounds } = data;
let seconds = 0;
let onBreak = false;
let timerState;
let pausedMinSec;

// Seta timer para valores iniciais vindos da home;
screenTimerMinutes.innerText = String(workTime).padStart(2, "0");
screenTimerSeconds.innerText = String(seconds).padStart(2, "0");

startBtn.addEventListener('click', () => {
    if (!timerState) {
        startBtn.innerHTML = "&#8214";

        timerState = setInterval(timer, 1000);

    } else if (timerState === 'paused') {
        resumeTimer(...pausedMinSec);

    } else if (timerState === 'end') {
        alert("Você completou todos os ciclos, volte ao início e defina novos ciclos.");

    } else {
        pausedMinSec = pauseTimer();
    }
})

function timer() {
    // Para o cronômetro quando chega ao fim e chama funções de reset
    if (workTime === 0 && seconds === 0) {
        clearInterval(timerState);

        /**
         * Caso termine o timer de descanso: Reset para o timer de trabalho
         * Caso contrário: Reset para o timer de descanso.
         */
        onBreak ? reset() : breakTimer();
    }

    // Subtrai um minuto quando os segundos chegam a 0
    if (workTime !== 0 && seconds === 0) {
        seconds = 59;
        --workTime;
    }

    // Adiciona zero a esquerda dos minutos e segundos se forem menos que 10
    screenTimerMinutes.innerText = String(workTime).padStart(2, "0");
    screenTimerSeconds.innerText = String(seconds).padStart(2, "0");
    --seconds;
}

/**
 * Reseta o timer e seta timerState para null,
 * possibilitando o início de outro round.
 */
function reset() {
    onBreak = false;
    updateStyle(onBreak);
    startBtn.innerHTML = "&#9655;"

    if (rounds > 0) {
        workTime = data.workTime;
        screenTimerMinutes.innerText = String(workTime).padStart(2, "0");
        screenTimerSeconds.innerText = String(seconds).padStart(2, "0");
        timerState = null;
    } else {
        title.innerText = "Fim!";
        roundBullets.forEach(el => el.style = "color: #dc0755");
        title.style = "color: #dc0755";
        innerTimer.style = "border-color: #dc0755";
        timerState = "end";
    }
}

/**
 * Seta o timer para o tempo de descanso e reseta timerState,
 * possibilitando o início de outro round de trabalho.
 */
function breakTimer() {
    onBreak = true;
    updateStyle(onBreak);
    startBtn.innerHTML = "&#9655;"

    workTime = data.breakTime;
    screenTimerMinutes.innerText = String(workTime).padStart(2, "0");
    screenTimerSeconds.innerText = String(seconds).padStart(2, "0");
    timerState = null;
    --rounds;
}

/**
 * Pausa o timer, muda o símbolo no botão de start,
 * por fim, retorna o tempo do momento da pausa em um array: 
 * [minutos, segundos].
 */
function pauseTimer() {
    clearInterval(timerState);
    timerState = "paused";

    startBtn.innerHTML = "&#9655;"

    const pausedMinutes = parseInt(screenTimerMinutes.innerText);
    const pausedSeconds = parseInt(screenTimerSeconds.innerText);

    return [pausedMinutes, pausedSeconds]
}

/** 
 * Muda os minutos e segundos para os valores recebidos por parâmetro,
 * altera o ícone do botão de start,
 * reinicia o cronômetro com os novos valores;
 */
function resumeTimer(pausedMinutes, pausedSeconds) {
    startBtn.innerHTML = "&#8214;"

    workTime = pausedMinutes;
    seconds = pausedSeconds;
    timerState = setInterval(timer, 1000);
}

// Estiliza os elementos para informar em que etapa o usuário está.
function updateStyle(onBreak) {
    if (onBreak) {
        title.innerText = "Descanso";
        roundBullets.forEach(el => el.style = "color: #F2C94C");
        innerTimer.style = "border-color: #F2C94C";
        title.style = "color: #F2C94C";
    } else {
        title.innerText = "Trabalho";
        roundBullets.forEach(el => el.style = "color: #219653");
        innerTimer.style = "border-color: #219653";
        title.style = "color: #219653";
    }
}