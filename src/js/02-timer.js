import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

document.addEventListener("DOMContentLoaded", function () {
  const datetimePicker = document.getElementById("datetime-picker");
  const startButton = document.querySelector("[data-start]");
  const daysElement = document.querySelector("[data-days]");
  const hoursElement = document.querySelector("[data-hours]");
  const minutesElement = document.querySelector("[data-minutes]");
  const secondsElement = document.querySelector("[data-seconds]");

  let countdownIntervalId;
  let targetDate;

  flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate < new Date()) {
        window.alert("Please choose a date in the future");
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
        targetDate = selectedDate;
      }
    },
  });

  startButton.addEventListener("click", function () {
    countdownIntervalId = setInterval(updateCountdown, 1000);
    startButton.disabled = true;
  });

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }
});