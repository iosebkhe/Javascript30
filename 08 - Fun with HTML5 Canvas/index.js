const canvas = document.querySelector("#draw");
const btnContainer = document.querySelector(".social-container");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

ctx.font = "100px cursive";
ctx.fillStyle = "#000";
ctx.textAlign = "center";
ctx.fillText("Draw on me...", canvas.width / 2, canvas.height / 2);

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

const draw = function (e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;

  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 10) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
};
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  btnContainer.classList.add("noSelect");
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  btnContainer.classList.remove("noSelect");
});
canvas.addEventListener("mouseout", () => (isDrawing = false));
