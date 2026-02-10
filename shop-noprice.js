document.addEventListener("DOMContentLoaded", () => {
  const cart = [];

  // Add a reusable alert box
  const alertBox = document.createElement("div");
  alertBox.style.position = "fixed";
  alertBox.style.bottom = "20px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.background = "#005bbb";
  alertBox.style.color = "white";
  alertBox.style.padding = "10px 20px";
  alertBox.style.borderRadius = "6px";
  alertBox.style.fontWeight = "bold";
  alertBox.style.display = "none";
  alertBox.style.zIndex = "1000";
  document.body.appendChild(alertBox);

  function showMessage(message) {
    alertBox.textContent = message;
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 2000); // hides after 2 seconds
  }

  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-btn")) {
      const productCard = e.target.closest(".product-card");
      const itemName = productCard?.dataset?.name || "Unnamed Product";
      addToCart(itemName);
      showMessage(`✔ ${itemName} added to cart`);
    }
  });

  function addToCart(itemName) {
    cart.push(itemName);
    displayCart();
  }

  function displayCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      cartItems.appendChild(li);
    });
  }

  window.checkout = function () {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Store items in localStorage
  localStorage.setItem("cartItems", JSON.stringify(cart));

  // Redirect to cart page
  window.location.href = "cart.html";
  };

}


)
