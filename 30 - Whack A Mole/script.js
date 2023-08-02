const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const playTime = document.querySelector(".game-time > span");
const moles = document.querySelectorAll(".mole");
const topScore = document.querySelector(".top-score span");

let lastHole;
let gameTime = 10;
let timeUp = false;
let score = 0;
let playInterval;
let highestScore = JSON.parse(localStorage.getItem("topScore")) || 0;
topScore.textContent = highestScore;

const randomTime = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

const randomHole = function (holes) {
  const indx = Math.floor(Math.random() * holes.length);
  const hole = holes[indx];
  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;

  return hole;
};

const showMoles = function () {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) showMoles();
  }, time);
};

const gameSeconds = function () {
  playInterval = setInterval(() => {
    gameTime--;
    playTime.textContent = gameTime;
    if (gameTime === 0) {
      clearInterval(playInterval);
    }
  }, 1000);
};

const setHighScore = function () {
  if (score > highestScore) {
    highestScore = score;
    topScore.textContent = highestScore;
    const jsonHighestScore = JSON.stringify(highestScore);
    localStorage.setItem("topScore", jsonHighestScore);
  }
};

const startGame = function () {
  clearInterval(playInterval);
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  gameTime = 10;
  playTime.textContent = gameTime;
  showMoles();
  gameSeconds();
  setTimeout(() => {
    timeUp = true;
    setHighScore();
  }, 10000);
};
const kickMole = function (e) {
  if (!e.isTrusted) return;
  this.classList.remove("up");
  score++;
  scoreBoard.textContent = score;
};

moles.forEach((mole) => mole.addEventListener("click", kickMole));
