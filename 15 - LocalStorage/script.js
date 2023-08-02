"use strict";

const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearAllBtn = document.querySelector(".btn-clear");
const checkAllBtn = document.querySelector(".btn-checkAll");
const uncheckAllBtn = document.querySelector(".btn-uncheckAll");

// Store all data in items array
// get items from local storage or initialize empty array
const items = JSON.parse(localStorage.getItem("items")) || [];

//adding items into array
const addItem = function (e) {
  e.preventDefault();
  const text = this.querySelector(`[name="item"]`).value;
  const item = {
    text: text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);

  // set items in local storage
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
};

// delete item from array on btn click
const deleteItem = function (e) {
  if (!e.target.matches(".btn-del")) {
    return;
  }
  const index = e.target.dataset.item;
  items.splice(index, 1);
  populateList(items, itemsList);

  // set updated items in local storage
  if (items.length) {
    localStorage.setItem("items", JSON.stringify(items));
  } else {
    localStorage.clear();
  }
};



const populateList = function (items = [], platesList) {
  platesList.innerHTML = items
    .map((item, index) => {
      return `
    <li>
    <input type="checkbox" data-index=${index} id="item${index}" ${
        item.done ? "checked" : ""
      } />
    <label for="item${index}">${item.text}</label>
    <button data-item=${index} class="btn-del">❌</button>
    </li>
    `;
    })
    .join("");

  const delBtns = document.querySelectorAll(".btn-del");
  delBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", deleteItem);
  });
};

const toggleDone = function (e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
};

const clearAllItems = function (e) {
  if (!e.target.matches(".btn-clear")) return;
  items.length = 0;
  // set updated items in local storage
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
};

const checkAllItems = function (e) {
  if (!e.target.matches(".btn-checkAll")) return;
  items.forEach((item) => {
    if (item.done) return;
    item.done = true;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
};

const uncheckAllItems = function (e) {
  if (!e.target.matches(".btn-uncheckAll")) return;
  items.forEach((item) => {
    if (!item.done) return;
    item.done = false;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
};

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
clearAllBtn.addEventListener("click", clearAllItems);
checkAllBtn.addEventListener("click", checkAllItems);
uncheckAllBtn.addEventListener("click", uncheckAllItems);
// call functions on page load to get items from local storage
populateList(items, itemsList);
