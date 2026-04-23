// This file handles local storage persistence for cart and wishlist.

const CART_KEY = 'sagaEliteCart';
const WISHLIST_KEY = 'sagaEliteWishlist';

// Save cart to local storage
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save wishlist to local storage
function saveWishlist(wishlist) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// Load wishlist from local storage
function loadWishlist() {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
}

// Clear cart from local storage
function clearCart() {
    localStorage.removeItem(CART_KEY);
}

// Clear wishlist from local storage
function clearWishlist() {
    localStorage.removeItem(WISHLIST_KEY);
}

// Export functions for use in other modules
export { saveCart, loadCart, saveWishlist, loadWishlist, clearCart, clearWishlist };