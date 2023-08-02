const sliderEL = document.querySelector(".items");

let isDown = false;
let startX;
let scrollLeft;

sliderEL.addEventListener("mousedown", (e) => {
  isDown = true;
  sliderEL.classList.add("active");
  //in case if there is a space between scrollable container and body
  startX = e.pageX - sliderEL.offsetLeft;

  //store how much scrollable element was scrolled
  scrollLeft = sliderEL.scrollLeft;
});

sliderEL.addEventListener("mouseleave", () => {
  isDown = false;
  sliderEL.classList.remove("active");
});

sliderEL.addEventListener("mouseup", () => {
  isDown = false;
  sliderEL.classList.remove("active");
});

sliderEL.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  //dynamically get cursor coordinate
  const cursorX = e.pageX - sliderEL.offsetLeft;
  //calculate how much element scrolled after mouse move and initial click
  const sliderScrolled = startX - cursorX;
  //sum this values and assign it to slider.scrollLeft
  sliderEL.scrollLeft = scrollLeft + sliderScrolled;
});
