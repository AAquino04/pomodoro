// Coleta dados dos inputs da home e armazena no localStorage.
const inputBtn = document.getElementById('start');
const workTime = document.getElementById('work-time');
const breakTime = document.getElementById('break-time');
const roundsInput = document.getElementById('rounds');

inputBtn.addEventListener('click', () => {
    pomodoroInputs = Array.from(document.querySelectorAll('input[type=number]'));
    pomodoroData = {
        workTime: workTime.value,
        breakTime: breakTime.value,
        rounds: roundsInput.value
    }

    localStorage.setItem('data', JSON.stringify(pomodoroData));
})