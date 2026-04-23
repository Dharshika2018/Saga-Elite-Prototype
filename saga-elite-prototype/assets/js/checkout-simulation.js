// This file simulates the checkout process for the Saga Elite platform.

document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');
    const paymentMethodSelect = document.getElementById('payment-method');
    const submitButton = document.getElementById('submit-button');

    // Simulated cart items
    const cartItems = [
        { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
        { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    ];

    function calculateTotal() {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    function displayOrderSummary() {
        orderSummary.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            orderSummary.appendChild(itemElement);
        });
        totalAmount.textContent = `$${calculateTotal()}`;
    }

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedPaymentMethod = paymentMethodSelect.value;
        alert(`Checkout completed using ${selectedPaymentMethod}. Total amount: $${calculateTotal()}`);
        // Here you would typically handle the payment processing
    });

    displayOrderSummary();
});