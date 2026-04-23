# Claude Master Prototype Prompt

## Overview
This document contains the prompt used to generate the full multi-page prototype for the Saga Elite limited-edition fashion platform. The prompt is designed to guide the AI in creating a comprehensive and functional web application that meets the specified requirements.

## Prompt

Create a multi-page web application for a limited-edition fashion platform called "Saga Elite". The application should be built using HTML, CSS, JavaScript, and Tailwind CSS. The following pages and functionalities must be included:

### Public Pages
1. **Home Page (index.html)**: 
   - Sticky header
   - Hero section with a slider
   - Countdown timer for the next drop
   - Featured drops grid
   - Category highlights
   - Active products grid
   - Footer

2. **Drops Page (drops.html)**: 
   - Grid of published drops from mock data
   - Filter and sort options

3. **Drop Detail Page (drop-detail.html)**: 
   - Hero banner
   - Description
   - Release window dates
   - Live countdown timer
   - Associated products grid

4. **Product Detail Page (product-detail.html)**: 
   - Image gallery
   - Price display
   - Variant selector
   - Action buttons

5. **Authentication Page (auth.html)**: 
   - Login, registration, OTP verification, and password reset panels

6. **Cart Page (cart.html)**: 
   - Shopping cart contents
   - Item details
   - Order summary
   - Button to proceed to checkout

7. **Checkout Page (checkout.html)**: 
   - Review items
   - Select shipping addresses
   - Choose payment methods

8. **Orders Page (orders.html)**: 
   - User's order history
   - Order details and status

9. **Order Detail Page (order-detail.html)**: 
   - Detailed information about a specific order
   - Status timeline and items breakdown

10. **Profile Page (profile.html)**: 
    - View and edit account information
    - Personal info, address book, and WhatsApp notifications

11. **Notifications Page (notifications.html)**: 
    - List of notifications for the user
    - Filtering options

### Admin Pages
1. **Admin Dashboard (admin/dashboard.html)**: 
   - KPIs, analytics, and recent orders

2. **Manage Drops (admin/drops.html)**: 
   - Create new drops and edit existing ones

3. **Manage Products (admin/products.html)**: 
   - Add and edit product details

4. **Manage Orders (admin/orders.html)**: 
   - View and manage all orders
   - Update order statuses

5. **Manage Home Images (admin/home-images.html)**: 
   - Upload and delete images

6. **Manage Notifications (admin/notifications.html)**: 
   - Compose and view notifications

7. **WhatsApp Logs (admin/whatsapp-logs.html)**: 
   - Display WhatsApp message logs for admin review

8. **Manage Gifts (admin/gifts.html)**: 
   - Manage gift tiers and associated gifts

9. **Account Management (admin/account.html)**: 
   - Admin account management features
   - Change passwords

### Shared Assets
- Design tokens
- Reusable styling
- Mock data models
- Role switcher
- Cart/wishlist persistence
- Checkout simulation
- Gift-tier logic
- Real-time event toast simulation

## Instructions
1. Use the provided specifications to create the necessary HTML, CSS, and JavaScript files.
2. Ensure that the application is responsive and user-friendly.
3. Implement mock data for testing purposes.
4. Follow best practices for code organization and documentation.