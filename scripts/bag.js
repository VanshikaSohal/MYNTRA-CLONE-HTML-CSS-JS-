// ✅ File: scripts/index.js
let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

function addToBag(itemId) {
  if (!bagItems.includes(itemId)) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    displayBagIcon();
    alert("Added to Bag!");
  }
}

function displayItemsOnHomePage() {
  const itemsContainer = document.querySelector(".items-container");
  if (!itemsContainer) return;

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


function displayBagItems() {
  const container = document.querySelector(".bag-items-container");
  const summary = document.querySelector(".bag-summary");
  if (!container || !summary) return;

  let innerHTML = "";
  let totalPrice = 0;
  let totalDiscount = 0;

  bagItems.forEach(({ id, quantity }) => {
  const item = items.find((product) => product.id === id);

    if (!item) return;

    totalPrice += item.original_price;
    totalDiscount += item.original_price - item.current_price;

    innerHTML += `
      <div class="bag-item-container">
        <div class="item-left-part">
          <img class="bag-item-img" src="${item.image}" alt="${item.item_name}" />
        </div>
        <div class="item-right-part">
          <div class="company-name">${item.company}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
          </div>
          <div class="return-period">
            <span class="return-period-days">${item.return_period} days</span> return available
          </div>
          <div class="delivery-details">
            Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
          </div>
          <div class="remove-from-cart" data-id="${item.id}">X</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = innerHTML;

  const summaryHTML = `
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${bagItems.length} Items)</div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">Rs ${totalPrice}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">- Rs ${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">FREE</span>
      </div>
      <hr />
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">Rs ${totalPrice - totalDiscount}</span>
      </div>
    </div>
    <button class="btn-place-order">PLACE ORDER</button>
  `;

  summary.innerHTML = summaryHTML;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((id) => id !== itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagItems();
  displayBagIcon();
}

document.addEventListener("DOMContentLoaded", () => {
  displayBagItems();
  displayBagIcon();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-from-cart")) {
    const itemId = e.target.getAttribute("data-id");
    removeFromBag(itemId);
  }
});