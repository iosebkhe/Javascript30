"use strict";

// Select all links
const allLinks = document.querySelectorAll("a");

const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

const highlightLink = function (e) {
  const linkCoordinates = this.getBoundingClientRect();
  const coordinates = {
    width: linkCoordinates.width,
    height: linkCoordinates.height,
    left: linkCoordinates.left + window.scrollX,
    top: linkCoordinates.top + window.scrollY,
  };
  const spanWidth = coordinates.width;
  const spanHeight = coordinates.height;
  const spanPositionX = coordinates.left;
  const spanPositionY = coordinates.top;
  highlight.style.width = `${spanWidth}px`;
  highlight.style.height = `${spanHeight}px`;
  highlight.style.transform = `translate(${spanPositionX}px, ${spanPositionY}px)`;
  console.log(linkCoordinates);
};

allLinks.forEach((link) => {
  link.addEventListener("mouseenter", highlightLink);
});
