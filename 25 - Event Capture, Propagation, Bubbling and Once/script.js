const allDivs = document.querySelectorAll(".div");

const button = document.querySelector(".btn-once");

const logText = function (e) {
  //Event Bubbling
  //When you click on element, browser also clicks his ancestors, up to DOCUMENT
  //Because of this in the console first we got the element we clicked and also its parent elements.
  console.log(this.classList.value);
  //with this element no longer bubbles up.
  // e.stopPropagation();
};

//Capture means: we will run the function during capture and not during bubbling. TOP TO DOWN - WHEN CAPTURE : true
//once - removes event listener after first run
allDivs.forEach((div) =>
  div.addEventListener("click", logText, { capture: false, once: false })
);

button.addEventListener(
  "click",
  function () {
    alert("I Alerted ONLY ONCE. Because on event listener option ONCE is TRUE");
  },
  { once: true }
);
