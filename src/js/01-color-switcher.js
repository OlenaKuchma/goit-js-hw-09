const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

function disableStartButton() {
  disableButton(startBtn);
}

function enableStartButton() {
  enableButton(startBtn);
}

function disableStopButton() {
  disableButton(stopBtn);
}

function enableStopButton() {
  enableButton(stopBtn);
}

startBtn.addEventListener("click", () => {
  if (!timerId) {
    timerId = setInterval(() => {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, 1000);
    disableButton(startBtn);
    enableStopButton();
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  disableButton(stopBtn);
  enableStartButton();

});