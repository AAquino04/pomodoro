// Recupera dados da home que estavam armazenados no localStorage
const pomodoroData = localStorage.getItem('data');
const data = JSON.parse(pomodoroData);

// Elementos do DOM
const startBtn = document.getElementById('start');
const screenTimerMinutes = document.getElementById('timer-min');
const screenTimerSeconds = document.getElementById('timer-sec');
const title = document.querySelector("main .work-info h2");
screenTimerMinutes.innerText = data.workTime;
screenTimerSeconds.innerText = "00";

// Dados do timer
let { workTime, breakTime, rounds } = data;
let seconds = 00;

// Adiciona o evento  de start ao botão
let startTimer;
startBtn.addEventListener('click', () => {
    if (!startTimer) {
        startTimer = setInterval(timer, 100);
    } else {
        alert("Você já completou todos os ciclos, volte ao início e comece outro ciclo.")
    }
})

// Timer
function timer() {
    // Adiciona zero a esquerda dos segundos se forem menos que 10
    if (seconds < 10) {
        screenTimerMinutes.innerText = workTime;
        screenTimerSeconds.innerText = `0${seconds}`;
    } else {
        screenTimerMinutes.innerText = workTime;
        screenTimerSeconds.innerText = seconds;
    }

    // Para o cronômetro quando chega ao fim
    if (workTime === 0 && seconds === 0) {
        clearInterval(startTimer);
        reset();
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
    if (rounds > 0) {
        workTime = data.workTime;
        screenTimerMinutes.innerText = workTime;
        screenTimerSeconds.innerText = "00";
        startTimer = null;
        --rounds;
    } else {
        title.innerText = "Fim!";
    }
}
