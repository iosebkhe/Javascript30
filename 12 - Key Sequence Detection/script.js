const pressed = [];
const secretCode = "ziziko";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const text = document.querySelector(".secret-word");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = "60px cursive";
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.fillText(
  "Type secret word and see magic.",
  canvas.width / 2,
  canvas.height / 3
);

var confettiSettings = {
  target: canvas,
  max: 1000,
  size: 1.6,
  animate: true,
  rotate: true,
};
var confetti = new ConfettiGenerator(confettiSettings);

window.addEventListener("keyup", (e) => {
  pressed.push(e.key);
  if (pressed.length > secretCode.length) {
    pressed.splice(0, 1);
  }
  if (pressed.join("") === secretCode) {
    confetti.render();
    text.classList.add("active");
  } else {
    null;
  }
});
