// NAVBAR TOGGLE FOR MOBILE
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("show");
  });

  // Close menu on link click (mobile)
  Array.from(links.querySelectorAll("a")).forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("show"))
  );
});

// PARTICLES.JS CONFIG (background)
particlesJS("particles-js", {
  particles: {
    number: { value: 160, density: { enable: true, value_area: 800 } },
    color: { value: "#FF7B02" },
    shape: { type: "circle" },

    /* small background stars + larger nodes mixed because "value" is high */
    opacity: { value: 1, random: true, anim: { enable: false } },

    /* we use varied size to get small stars + bigger nodes */
    size: { value: 6, random: true },

    line_linked: {
      enable: true,
      distance: 140,
      color: "#FF7B02",
      opacity: 0.3,
      width: 1,
    },

    move: {
      enable: true,
      speed: 0.9,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },

  interactivity: {
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true,
    },
  },

  retina_detect: true,
});

// Mapping color → images
const productImages = {
  Black: [
    "./pics/black-pic-1.jpg",
    "./pics/black-pic-2.jpg",
    "./pics/black-pic-3.jpg",
  ],
  Beige: [
    "./pics/white-pic-1.jpg",
    "./pics/white-pic-2.jpg",
    "./pics/white-pic-3.jpg",
  ],
};

const mainImg = document.getElementById("main-img");
const thumbButtons = document.querySelectorAll(".thumb");
const colorButtons = document.querySelectorAll(".color-pill");

function updateImages(color) {
  const imgs = productImages[color];

  // Update main image
  mainImg.src = imgs[0];

  // Update thumbnails dynamically
  thumbButtons.forEach((btn, index) => {
    btn.querySelector("img").src = imgs[index];
    btn.setAttribute("data-src", imgs[index]);
  });

  // First thumbnail active
  document
    .querySelectorAll(".thumb")
    .forEach((t) => t.classList.remove("active"));
  thumbButtons[0].classList.add("active");
}

// Color button click event
colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // toggle pill active style
    colorButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // call function to change images
    updateImages(btn.dataset.color);
  });
});

// Thumbnail click → change main image
thumbButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".thumb")
      .forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");

    mainImg.src = btn.getAttribute("data-src");
  });
});

// ORDER MODAL SCRIPT
(function () {
  // helpers
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => Array.from(document.querySelectorAll(s));
  const formatNumber = (n) => Number(n).toLocaleString("en-IN");

  // elements
  const modalWrap = qs("#order-modal");
  const backdrop = qs("#order-backdrop");
  const closeBtn = qs("#order-close");
  const cancelBtn = qs("#order-cancel");
  const buyNowBtn = qs("#buy-now"); // your buy now button
  const orderForm = qs("#order-form");
  const itemInput = qs("#order-item");
  const qtySelect = qs("#order-qty");
  const priceInput = qs("#order-price");
  const totalInput = qs("#order-total");
  const nameInput = qs("#order-name");
  const emailInput = qs("#order-email");
  const mobileInput = qs("#order-mobile");
  const pincodeInput = qs("#order-pincode");
  const streetInput = qs("#order-street");
  const areaInput = qs("#order-area");
  const cityInput = qs("#order-city");
  const stateInput = qs("#order-state");
  const msgBox = qs("#order-msg");

  // read product name & price from page (fallbacks)
  function readProductMeta() {
    const titleEl =
      document.querySelector(".prod-title") ||
      document.querySelector(".hero-title");
    const priceEl =
      document.querySelector(".price-main") ||
      document.querySelector(".price") ||
      null;

    const name = titleEl ? titleEl.textContent.trim() : "Product";
    let price = 449;
    if (priceEl) {
      // extract digits from innerText like "₹449"
      const text = priceEl.textContent.replace(/[^\d]/g, "");
      if (text) price = Number(text);
    }
    return { name, price };
  }

  // open modal & populate
  function openModal() {
    const meta = readProductMeta();
    itemInput.value = meta.name;
    priceInput.value = meta.price;
    populateQty();
    qtySelect.value = "1";
    updateTotal();
    msgBox.textContent = "";
    // show modal
    modalWrap.classList.add("open");
    modalWrap.setAttribute("aria-hidden", "false");
    // prevent page scroll
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalWrap.classList.remove("open");
    modalWrap.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  // populate qty select 1..10
  function populateQty() {
    qtySelect.innerHTML = "";
    for (let i = 1; i <= 10; i++) {
      const opt = document.createElement("option");
      opt.value = String(i);
      opt.textContent = String(i);
      qtySelect.appendChild(opt);
    }
  }

  function updateTotal() {
    const unit = Number(priceInput.value) || 0;
    const q = Number(qtySelect.value) || 1;
    const total = unit * q;
    totalInput.value = total;
  }

  // validations
  function validateForm() {
    msgBox.textContent = "";
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const mobile = mobileInput.value.trim();
    const pincode = pincodeInput.value.trim();

    if (!name) return { ok: false, msg: "Please enter your full name" };
    if (!/^\S+@\S+\.\S+$/.test(email))
      return { ok: false, msg: "Enter a valid email" };
    if (!/^\d{10}$/.test(mobile))
      return { ok: false, msg: "Enter 10 digit mobile number" };
    if (!/^\d{4,6}$/.test(pincode))
      return { ok: false, msg: "Enter valid pincode" };
    return { ok: true };
  }

  // save order to localStorage (demo)
  function saveOrder(order) {
    const key = "cm_orders_v1";
    const raw = localStorage.getItem(key) || "[]";
    let arr = [];
    try {
      arr = JSON.parse(raw);
    } catch (e) {
      arr = [];
    }
    arr.push(order);
    localStorage.setItem(key, JSON.stringify(arr));
  }

  // event bindings
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  } else {
    // fallback: if multiple buy buttons, listen to class
    document.addEventListener("click", (ev) => {
      const t =
        ev.target.closest &&
        ev.target.closest(".buy-large, .buy-btn, .buy-now");
      if (t) {
        ev.preventDefault();
        openModal();
      }
    });
  }

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  qtySelect.addEventListener("change", updateTotal);

  // Razorpay API Keys (Replace with your actual keys)
  const RAZORPAY_KEY_ID = "rzp_test_RhsXd5oiLcAkdb"; // e.g., 'rzp_test_xxxxxxxxxxxxxx'
  const RAZORPAY_KEY_SECRET = "4XPyJePSRXG1vMvv9Dcig2na"; // You'll need this for server-side order creation

 

  // New function to handle Razorpay payment
  function openRazorpayCheckout(orderData) {
    const totalAmountInPaise = orderData.total * 100; // Razorpay needs amount in lowest currency unit (Paise)

    // 💡 Note: For production, you must create a Razorpay Order ID
    // on your server and pass it here. For this client-side demo,
    // we use a simplified approach that requires a valid Key ID.
    // The amount will be charged directly.

    var options = {
      key: RAZORPAY_KEY_ID,
      amount: totalAmountInPaise,
      currency: "INR",
      name: itemInput.value,
      description: "Payment for " + itemInput.value,
      // "order_id": "", // If you create an order ID on the server, use it here
      handler: function (response) {
        // This function is called on successful payment

        // 1. You should verify this payment signature on your server
        //    to prevent fraud and confirm the transaction.

        // 2. Show success message
        msgBox.style.color = "#000000de";
        msgBox.textContent = `Payment Successful! ID: ${response.razorpay_payment_id}`;

        // 3. Save the order to local storage (or a server database)
        const finalOrder = {
          ...orderData,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          status: "Paid",
          paidAt: Date.now(),
        };
        saveOrder(finalOrder); // Save the order after payment confirmation

        // 4. Close modal after a delay
        setTimeout(closeModal, 1500);
      },
      prefill: {
        name: orderData.customer.name,
        email: orderData.customer.email,
        contact: orderData.customer.mobile,
      },
      theme: {
        color: "#ff7b02", // Your theme color
      },
    };

    // Handle payment failures
    options.modal = {
      ondismiss: function () {
        msgBox.style.color = "#ffb3b3";
        msgBox.textContent = "Payment cancelled or failed. Please try again.";
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  // 💥 UPDATED EVENT LISTENER FOR FORM SUBMISSION 💥
  orderForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const v = validateForm();
    if (!v.ok) {
      msgBox.textContent = v.msg;
      msgBox.style.color = "#ffb3b3";
      return;
    }

    // build order object
    const orderDetails = {
      id: "ORD_" + Date.now(),
      item: itemInput.value,
      unitPrice: Number(priceInput.value) || 0,
      quantity: Number(qtySelect.value) || 1,
      total: Number(totalInput.value) || 0, // This is the amount to pay
      customer: {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        mobile: mobileInput.value.trim(),
        address: {
          street: streetInput.value.trim(),
          area: areaInput.value.trim(),
          city: cityInput.value.trim(),
          state: stateInput.value.trim(),
          pincode: pincodeInput.value.trim(),
        },
      },
      createdAt: Date.now(),
      status: "Pending Payment", // Initial status
    };

    // Open Razorpay Checkout for payment
    openRazorpayCheckout(orderDetails);

    // Show a temporary message while the payment gateway loads
    msgBox.style.color = "#ffdca8";
    msgBox.textContent = "Opening secure payment gateway...";
  });

  // init: if quantity exists reflect total
  // populate qty on script load (in case modal opened programmatically)
  populateQty();
  updateTotal();

  // If you want to auto-open modal via URL hash (e.g., ...#order) support:
  if (location.hash === "#order") setTimeout(openModal, 400);
})();

/* === CUSTOM QUANTITY SELECT (connects to hidden #order-qty + updateTotal) === */
(function () {
  const cs = document.getElementById("cs-qty");
  const hiddenQty = document.getElementById("order-qty"); // hidden input existing
  if (!cs || !hiddenQty) return;

  const trigger = cs.querySelector(".cs-trigger");
  const valueSpan = cs.querySelector(".cs-value");
  const optionsPanel = cs.querySelector(".cs-options");
  const optionItems = Array.from(cs.querySelectorAll(".cs-options li"));

  // close any open selects
  function closeAll() {
    document.querySelectorAll(".custom-select.open").forEach((el) => {
      el.classList.remove("open");
      el.setAttribute("aria-expanded", "false");
    });
  }

  // set value (updates hidden input + visible label + active class + total)
  function setValue(v) {
    hiddenQty.value = String(v);
    cs.dataset.value = String(v);
    valueSpan.textContent = String(v);
    optionItems.forEach((li) =>
      li.classList.toggle("active", li.dataset.value === String(v))
    );
    // call your existing update function
    if (typeof updateTotal === "function") updateTotal();
  }

  // initialize (ensure hidden value used if any)
  setValue(hiddenQty.value || cs.dataset.value || "1");

  // toggle open
  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    const open = cs.classList.contains("open");
    closeAll();
    if (!open) {
      cs.classList.add("open");
      cs.setAttribute("aria-expanded", "true");
      // scroll active item into view
      const active = cs.querySelector(".cs-options li.active");
      if (active) active.scrollIntoView({ block: "center" });
    } else {
      cs.classList.remove("open");
      cs.setAttribute("aria-expanded", "false");
    }
  });

  // option click
  optionItems.forEach((li) => {
    li.addEventListener("click", function (e) {
      e.stopPropagation();
      const v = this.dataset.value;
      setValue(v);
      cs.classList.remove("open");
      cs.setAttribute("aria-expanded", "false");
      trigger.focus();
    });
  });

  // click outside closes
  document.addEventListener("click", function (e) {
    if (!cs.contains(e.target)) {
      cs.classList.remove("open");
      cs.setAttribute("aria-expanded", "false");
    }
  });

  // keyboard: open with Enter/Space, navigate
  cs.addEventListener("keydown", function (e) {
    const open = cs.classList.contains("open");
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      trigger.click();
      return;
    }
    if (!open) return;
    const idx = optionItems.findIndex((li) => li.classList.contains("active"));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(optionItems.length - 1, idx + 1);
      optionItems[next].click();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, idx - 1);
      optionItems[prev].click();
    } else if (e.key === "Escape") {
      cs.classList.remove("open");
      cs.setAttribute("aria-expanded", "false");
    }
  });

  // if modal opens, ensure custom select shows current value
  document.addEventListener("click", function (e) {
    // no-op but keeps behavior stable
  });
})();
