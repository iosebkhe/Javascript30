const linksForHover = document.querySelectorAll(".cool > li");
const dropdownBG = document.querySelector(".dropdown-background");
const nav = document.querySelector(".top");

const handleEnter = function () {
  this.classList.add("trigger-enter");
  dropdownBG.classList.add("open");

  //select dropdown dynamically
  const dropdown = this.querySelector(".dropdown");
  const {
    width: dropdownWidth,
    height: dropdownHeight,
    x: dropdownX,
    y: dropdownY,
  } = dropdown.getBoundingClientRect();

  const { x: navX, y: navY } = nav.getBoundingClientRect();

  dropdownBG.style.width = dropdownWidth + "px";
  dropdownBG.style.height = dropdownHeight + "px";
  dropdownBG.style.transform = `translate(${dropdownX - navX}px, ${
    dropdownY - navY
  }px)`;
};

const handleLeave = function () {
  this.classList.remove("trigger-enter");
  dropdownBG.classList.remove("open");
};

linksForHover.forEach((link) => {
  link.addEventListener("mouseenter", handleEnter);
  link.addEventListener("mouseleave", handleLeave);
});
