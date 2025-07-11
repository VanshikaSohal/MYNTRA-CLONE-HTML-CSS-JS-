
let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
console.log("index.js successfully loaded");

function addToBag(itemId) {
  itemId = String(itemId);
  const existingItem = bagItems.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
    alert("Quantity increased!");
  } else {
    bagItems.push({ id: itemId, quantity: 1 });
    alert(" Item Added to Bag!");
  }
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayItemsOnHomePage() {
  const itemsContainer = document.querySelector(".items-container");
  let innerHTML = "";

  items.forEach((item) => {
    innerHTML += `
      <div class="item-container">
        <img src="${item.image}" class="item-image" />
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" data-id="${item.id}">Add to Bag</button>
      </div>
    `;
  });

  itemsContainer.innerHTML = innerHTML;
}

function displayBagIcon() {
  const bagIcon = document.getElementById("bag-count");
  const totalItems = bagItems.reduce((sum, item) => sum + item.quantity, 0);
  if (bagIcon) {
    bagIcon.innerText = totalItems;
  }
}

function onLoad() {
  displayItemsOnHomePage();
  displayBagIcon();
}

window.addEventListener("DOMContentLoaded", onLoad);

document.addEventListener("DOMContentLoaded", () => {
  displayItemsOnHomePage();
  displayBagIcon();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-add-bag")) {
    const itemId = e.target.getAttribute("data-id");
    console.log("Add to Bag clicked", itemId);  // ✅ Console test
    addToBag(itemId);
  }
});

console.log("Add to Bag clicked", itemId);
