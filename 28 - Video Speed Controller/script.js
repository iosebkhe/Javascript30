const speed = document.querySelector(".speed");
const speedBar = document.querySelector(".speed-bar");
const videoEl = document.querySelector(".flex");

let isDown = false;

const handleVideoSpeed = function (e) {
  if (!isDown) return;
  e.preventDefault();
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const height = Math.round(percent * 100) + "%";
  const min = 0.5;
  const max = 3;
  const playbackRate = percent * (max - min) + min;
  speedBar.style.height = height;
  speedBar.textContent = playbackRate.toFixed(1) + "x";
  videoEl.playbackRate = playbackRate;
};

speed.addEventListener("mouseup", () => (isDown = false));

speed.addEventListener("mousemove", handleVideoSpeed);

speed.addEventListener("mousedown", () => (isDown = true));

speed.addEventListener("mouseleave", () => (isDown = false));
