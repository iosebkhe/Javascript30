const inbox = document.querySelector(".inbox");
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
const checkAllBtn = document.querySelector(".btn-checkAll");
const uncheckAllBtn = document.querySelector(".btn-uncheckAll");

let lastChecked = checkboxes[0];

const handleCheck = function (e) {
  let inBetween = false;
  if (
    e.shiftKey &&
    e.target.checked &&
    lastChecked !== e.target &&
    lastChecked.checked
  ) {
    checkboxes.forEach((checkbox) => {
      if (checkbox === e.target || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = e.target;
};

inbox.addEventListener("click", (e) => {
  if (e.target.type === "checkbox") {
    handleCheck(e);
  }
});

checkAllBtn.addEventListener("click", function () {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
});

uncheckAllBtn.addEventListener("click", function () {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
});
