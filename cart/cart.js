const FOOD_CATALOG = {
    "burger": {
        id: "burger",
        name: "Burger",
        price: 150,
        image: "images/burger.jpg"
    },
    "french fries":
    {
        id: "french-fries",
        name: "French Fries",
        price: 30,
        image: "images/Fries.jpg"
    },
    "frenchfries":
    {
        id: "french-fries",
        name: "French Fries",
        price: 30, image:
            "images/Fries.jpg"
    },
    "coke":
    {
        id: "coke",
        name: "Coke",
        price: 5, image:
            "images/coke.jpg"
    },
    "vegburger":
    {
        id: "vegburger",
        name: "Veg Burger",
        price: 10,
        image: "images/vegburgger.jpg"
    },
    "veg burger":
    {
        id: "vegburger",
        name: "Veg Burger",
        price: 10, image:
            "images/vegburgger.jpg"
    },
    "redbull":
    {
        id: "redbull",
        name: "Red Bull",
        price: 5, image:
            "images/redbull.jpg"
    },
    "red bull":
        { id: "redbull", name: "Red Bull", price: 5, image: "images/redbull.jpg" },
    "cappuccino":
        { id: "cappuccino", name: "Cappuccino", price: 20, image: "images/cappuccino.jpg" },
    "popcorn":
        { id: "popcorn", name: "Popcorn", price: 120, image: "images/popcorn.png" },
    "coffee":
        { id: "coffee", name: "Coffee", price: 30, image: "images/COFFEE.png" },
    "pizza":
        { id: "pizza", name: "Pizza", price: 200, image: "images/pizza.png" },
    "chips":
        { id: "chips", name: "Chips", price: 15, image: "images/chips.jpg" },
    "sprit":
        { id: "sprit", name: "Sprit", price: 10, image: "images/sprit.png" },
    "sprite":
        { id: "sprit", name: "Sprit", price: 10, image: "images/sprit.png" },
    "pepsi":
        { id: "pepsi", name: "Pepsi", price: 5, image: "images/Pepsi.jpg" },
    "chocobar":
        { id: "chocobar", name: "Choco Bar", price: 20, image: "images/Chocobar.jpg" },
    "choco bar":
        { id: "chocobar", name: "Choco Bar", price: 20, image: "images/Chocobar.jpg" },
    "corn":
        { id: "corn", name: "Corn", price: 10, image: "images/corn.jpg" },
    "combo":
        { id: "combo", name: "Combo Meal", price: 180, image: "images/combo.jpg" },
    "offer1":
        { id: "offer1", name: "Burger Deal", price: 160, image: "images/offer1.jpg" },
    "offer2":
        { id: "offer2", name: "Crispy Fries Offer", price: 40, image: "images/offer2.jpg" },
    "offer3":
        { id: "offer3", name: "Combo Special", price: 199, image: "images/offer3.jpg" },
    "offer4":
        { id: "offer4", name: "Red Bull Energy", price: 12, image: "images/offer4.jpg" }
};
function getCart() {
    try {
        const saved = localStorage.getItem('theater_cart');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}
function saveCart(cart) {
    try {
        localStorage.setItem('theater_cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
    updateCartBadges();
}

function getResolvedImagePath(imgSrc) {
    if (!imgSrc) return "images/popcorn.png";
    const isCartPage = window.location.pathname.includes('/cart/') || window.location.pathname.endsWith('cart.html');
    if (isCartPage) {
        if (imgSrc.startsWith('../')) return imgSrc;
        return '../' + imgSrc;
    } else {
        if (imgSrc.startsWith('../')) return imgSrc.substring(3);
        return imgSrc;
    }
}

function buy(name, price, image) {

    if (!name) {
        processPayment();
        return;
    }

    const key = String(name).toLowerCase().trim();
    const catalogItem = FOOD_CATALOG[key] || {};

    const id = catalogItem.id || key.replace(/\s+/g, '-');
    const displayName = catalogItem.name || name;
    const itemPrice = typeof price === 'number' ? price : (catalogItem.price || Number(price) || 0);
    const itemImage = image || catalogItem.image || `images/${id}.jpg`;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === id || item.name.toLowerCase() === displayName.toLowerCase());

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: displayName,
            price: itemPrice,
            image: itemImage,
            quantity: 1
        });
    }

    saveCart(cart);
    showToast(`Added ${displayName} to cart!`);


    if (document.getElementById('cart-items')) {
        renderCart();
    }
}

function changeQuantity(id, delta) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart(cart);
        renderCart();
    }
}
function removeFromCart(id) {
    let cart = getCart();
    const item = cart.find(i => i.id === id);
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
    if (item) {
        showToast(`Removed ${item.name} from cart`);
    }
}

function clearCart() {
    const cart = getCart();
    if (cart.length === 0) return;
    if (confirm("Are you sure you want to clear your cart?")) {
        saveCart([]);
        renderCart();
        showToast("Cart cleared");
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!cartItemsContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🍿</div>
                <h3>Your Cart is Empty</h3>
                <p>You haven't added any movie snacks yet!</p>
                <button class="browse-btn" onclick="window.location.href='../home.html'">Browse Menu</button>
            </div>
        `;
        if (totalPriceEl) totalPriceEl.textContent = '$0.00';
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('disabled');
        }
        return;
    }

    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('disabled');
    }

    let total = 0;
    let html = '';

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const imgSrc = getResolvedImagePath(item.image);

        html += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${imgSrc}" alt="${item.name}" class="cart-item-img" onerror="this.src='../images/popcorn.png'">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-unit-price">$${item.price.toFixed(2)} each</p>
                    <div class="cart-item-controls">
                        <div class="qty-control">
                            <button class="qty-btn minus" onclick="changeQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
                            <span class="qty-count">${item.quantity}</span>
                            <button class="qty-btn plus" onclick="changeQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Remove item">
                            🗑️ Remove
                        </button>
                    </div>
                </div>
                <div class="cart-item-subtotal">
                    <span class="subtotal-label">Subtotal</span>
                    <span class="subtotal-value">$${subtotal.toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    if (totalPriceEl) {
        totalPriceEl.textContent = `$${total.toFixed(2)}`;
    }
}

function updateCartBadges() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const badges = document.querySelectorAll('.cart-badge');

    badges.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

function processPayment() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty! Please add delicious snacks before proceeding to payment.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const confirmPayment = confirm(`🎬 Complete Order?\n\nTotal Amount: $${total.toFixed(2)}\nItems: ${cart.reduce((sum, i) => sum + i.quantity, 0)}\n\nClick OK to confirm payment and seat delivery.`);

    if (confirmPayment) {
        alert(`🎉 Thank you for your order!\n\nYour snacks are being prepared and will be delivered directly to your theater seat.\n\nEnjoy the movie! 🍿🥤`);
        saveCart([]);
        renderCart();
    }
}

function showToast(message) {
    let toast = document.getElementById('theater-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'theater-toast';
        toast.className = 'theater-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});

window.addEventListener('storage', (e) => {
    if (e.key === 'theater_cart') {
        updateCartBadges();
        if (document.getElementById('cart-items')) {
            renderCart();
        }
    }
});
