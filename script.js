// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Load existing cart from sessionStorage or use empty array
let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // clear previous
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // After rendering, attach event listeners to all buttons
  const buttons = document.querySelectorAll(".add-to-cart-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      addToCart(this);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // clear before re-render
  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add remove handlers
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = Number(this.getAttribute("data-index"));
      removeFromCart(idx);
    });
  });
}

// Add item to cart
function addToCart(buttonElement) {
  const productId = Number(buttonElement.getAttribute("data-id"));
  const item = products.find((p) => p.id === productId);
  if (item) {
    cartItems.push(item);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

// Clear cart
function clearCart() {
  cartItems.length = 0; // empty array
  sessionStorage.removeItem("cart");
  renderCart();
}

// Attach clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
