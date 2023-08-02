const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

const cities = [];

const prom = fetch(endpoint)
  .then((res) => res.json())
  .then((data) => cities.push(...data));

const findMatches = function (wordToMatch, cities) {
  return cities.filter((place) => {
    // if the city or state matches the search
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
};

const numberWithComas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const displayMatches = function () {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span>Popul: ${numberWithComas(place.population)}</span>
    </li>`;
    })
    .join("");

  suggestions.innerHTML = html;
};

searchInput.addEventListener("change", displayMatches);

window.addEventListener("keydown", function (e) {
  if (!searchInput.value !== "" || searchInput.value !== " ") {
    return;
  }
  e.key === "Enter" && displayMatches();
});
