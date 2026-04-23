// This file simulates real-time events and toast notifications.

document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'fixed top-0 right-0 p-4 z-50';
    document.body.appendChild(toastContainer);

    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'bg-blue-500 text-white p-3 rounded shadow-lg mb-2';
        toast.innerText = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, duration);
    }

    // Simulate real-time events
    setInterval(() => {
        const messages = [
            'New drop available!',
            'Product back in stock!',
            'Limited time offer on selected items!',
            'Your order has been shipped!',
            'New notification from admin.'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showToast(randomMessage);
    }, 5000);
});