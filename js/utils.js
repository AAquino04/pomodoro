// Recupera dados da home que estavam armazenados no localStorage
const pomodoroData = localStorage.getItem('data');
const data = JSON.parse(pomodoroData);
// Dados do timer
let { workTime, breakTime, rounds } = data;
let seconds = 00;
let onBreak = false;

function timer() {
    // Para o cronômetro quando chega ao fim e chama funções de reset
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
        roundBullets.forEach(el => el.style = "color: #dc0755");
        title.style = "color: #dc0755";
        innerTimer.style = "border-color: #dc0755";
    }
}

/**
 * Seta o timer para o tempo de descanso e reseta startTimer,
 * possibilitando o início de outro round de trabalho.
 */
function breakTimer() {
    onBreak = true;
    updateStyle(onBreak);

    workTime = data.breakTime;
    screenTimerMinutes.innerText = workTime;
    screenTimerSeconds.innerText = "00";
    startTimer = null;
    --rounds;
}

// Estiliza os elementos para informar em que etapa o usuário está.
function updateStyle(onBreak) {
    if (onBreak) {
        title.innerText = "Descanso";
        roundBullets.forEach(el => el.style = "color: #F2C94C");
        innerTimer.style = "border-color: #F2C94C";
        title.style = "color: #F2C94C";
        roundBullets.style = "color: #F2C94C";
    } else {
        title.innerText = "Trabalho";
        roundBullets.forEach(el => el.style = "color: #219653");
        innerTimer.style = "border-color: #219653";
        title.style = "color: #219653";
        roundBullets.style = "color: #219653";
    }
}