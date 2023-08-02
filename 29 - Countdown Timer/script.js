const timerButtons = document.querySelectorAll(".timer__button");

const displayTimer = function (seconds) {
  const timeLeftEl = document.querySelector(".display__time-left");

  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  //show 0 if < 10
  const paddedHours = hours < 10 ? "0" : "";
  const paddedMinutes = minutes < 10 ? "0" : "";
  const paddedSeconds = remainderSeconds < 10 ? "0" : "";
  const displayTime = `${paddedHours}${hours}:${paddedMinutes}${minutes}:${paddedSeconds}${remainderSeconds}`;

  //change text
  timeLeftEl.textContent = displayTime;
  document.title = displayTime;
};

const displayEndTime = function (timestamp) {
  const endTimeEl = document.querySelector(".display__end-time");

  const userLocale = navigator.language || navigator.userLanguage;
  const end = new Date(timestamp);
  new Intl.DateTimeFormat(userLocale).format(end);

  const hour = end.getHours();
  const minutes = end.getMinutes();
  const paddedMinutes = `${minutes < 10 ? "0" : ""}`;
  endTimeEl.textContent = `Be Back At ${hour}:${paddedMinutes}${minutes}`;
};

let countDown;
const timer = function (seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimer(seconds);
  displayEndTime(then);

  const audioMP3 = document.querySelector(".end-audio");
  audioMP3.currentTime = 0;

  countDown = setInterval(() => {
    //calculate how many seconds left. then - new Date
    //we can not use now variable from outside setInterval
    //because it was captured once already. we want to update Date.now()
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //play sound when timer is over
    if (secondsLeft === 0) {
      audioMP3.play();
    }

    //stop when seconds are 0
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }

    displayTimer(secondsLeft);
  }, 1000);
};

const startTimer = function () {
  const seconds = +this.dataset.time;
  timer(seconds);
};

timerButtons.forEach((timerButton) =>
  timerButton.addEventListener("click", startTimer)
);
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputMinutes = this.minutes.value * 60;
  timer(inputMinutes);
  this.reset();
});
