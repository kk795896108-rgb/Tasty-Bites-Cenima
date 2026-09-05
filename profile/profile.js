document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart');
    if (cartContainer) {
        cartContainer.innerHTML = `
            <button onclick="window.location.href='../cart/cart.html'" class="cart-btn" aria-label="Cart">
                🛒
                <span class="cart-badge">0</span>
            </button>
        `;
                if (typeof updateCartBadges === 'function') {
            updateCartBadges();
        }
    }
});
const username=localStorage.getItem("username");
const mobile=localStorage.getItem("mobileNumber");
const seat=localStorage.getItem("seatNumber");

document.getElementById("username").value=username||"";
document.getElementById("mobile").value=mobile||"";
document.getElementById("seat").value=seat||"";