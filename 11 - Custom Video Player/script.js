// Get elements
const player = document.querySelector(".player");
const customControls = player.querySelector("player__controls");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtns = player.querySelectorAll("[data-skip]");
const btnFullScreen = player.querySelector(".player__button-fullscreen");
const ranges = player.querySelectorAll(".player__slider");

// Functions
const togglePlay = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateBtn = function () {
  const icon = this.paused ? "▶" : "▮▮";
  toggle.textContent = icon;
};

const skip = function (amount) {
  video.currentTime += amount;
};

let isRangeUpdating = false;
const handleRangeUpdate = function () {
  if (!isRangeUpdating) {
    return;
  }

  video[this.name] = this.value;
};

const handleProgress = function () {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = function (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const handleFullScreen = function () {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
};

// Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    skip(+btn.dataset.skip);
  });
});

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) => {
  range.addEventListener("mousedown", (e) => {
    isRangeUpdating = true;
  });
  range.addEventListener("mousemove", handleRangeUpdate);
  range.addEventListener("mouseup", () => (isRangeUpdating = false));
  range.addEventListener("mouseout", () => (isRangeUpdating = false));
});

progress.addEventListener("click", scrub);
let mouseDown = false;
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

btnFullScreen.addEventListener("click", handleFullScreen);
window.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" && skip(-10); // Rewind 10 seconds
  e.key === "ArrowRight" && skip(10); // Forward 10 seconds
});
