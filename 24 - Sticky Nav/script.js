const nav = document.querySelector("#main");
const header = document.querySelector(".header");

const topOfNav = nav.offsetTop;
function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + "px";
    document.body.classList.add("fixed-nav");
  } else {
    document.body.classList.remove("fixed-nav");
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener("scroll", fixNav);

//WITH INTERSECTION OBSERVER API
// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     console.log(ent);
//     if (!ent.isIntersecting) {
//       document.body.classList.add("fixed-nav");
//     }

//     if (ent.isIntersecting) {
//       document.body.classList.remove("fixed-nav");
//     }
//   },
//   {
//     root: null,
//     threshold: 0,
//     rootMargin: 0 + "px",
//   }
// );
// obs.observe(header);
