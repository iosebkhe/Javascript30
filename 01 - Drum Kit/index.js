"use strict";
const keys = document.querySelectorAll(".key");

const playSound = function (e) {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  const key = document.querySelector(`.key[data-key="${e.key}"]`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");
};

const removeTransition = function (e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
};

keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);
