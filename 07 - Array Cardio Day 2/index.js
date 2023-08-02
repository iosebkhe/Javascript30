// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const atLeast19 = people.some((person) => {
  const year = new Date().getFullYear();
  return year - person.year >= 19;
});
console.log("=== is at least one person 19 or older?");
console.log(atLeast19);

// Array.prototype.every() // is everyone 19 or older?
const everyone19OrOlder = people.every((person) => {
  const year = new Date().getFullYear();
  return year - person.year >= 19;
});
console.log("=== is everyone 19 or older?");
console.log(everyone19OrOlder);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const findComment = comments.find((comment) => comment.id === 823423);
console.log("=== find the comment with the ID of 823423");
console.log(findComment);

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
const commentIndex = comments.findIndex((comment) => comment.id === 823423);
console.log("=== delete the comment with the ID of 823423");
console.log("Comment index = ", commentIndex);

const newComments = [
  ...comments.slice(0, commentIndex),
  ...comments.slice(commentIndex + 1),
];
console.log("New Comments = ", newComments);

const container = document.querySelector(".code-block");
const button = document.querySelector(".scroll");
const arrowSVG = document.querySelector(".arrow-down");

let scrollDirectionDown = true;

button.addEventListener("click", () => {
  if (scrollDirectionDown) {
    container.scrollBy({ top: container.clientHeight / 2, behavior: "smooth" });
  } else {
    container.scrollBy({
      top: -(container.clientHeight / 2),
      behavior: "smooth",
    });
  }

  // Check if at bottom of container
  if (container.scrollHeight - container.scrollTop === container.clientHeight) {
    if (scrollDirectionDown) {
      scrollDirectionDown = false;
      arrowSVG.style.transform = "rotate(180deg)";
    }
  } else if (!scrollDirectionDown && container.scrollTop === 0) {
    scrollDirectionDown = true;
    arrowSVG.style.transform = "rotate(0deg)";
  }
});
