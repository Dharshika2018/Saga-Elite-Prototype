# Saga Elite Claude Master Prompt

Copy everything below and paste into Claude.

---

You are a senior frontend engineer and product designer.
Build a complete, runnable, multi-page web prototype for the project below using only HTML, CSS, JavaScript, and Tailwind CSS (CDN version).

Project: SAGA ELITE SE Limited Edition Fashion Platform
Tagline: Rare Fit Forever
Region: Sri Lanka
Currency: LKR

Core context:
- This is a drop-based fashion ecommerce platform for Sri Lankan youth.
- The prototype must reflect premium limited-edition brand positioning.
- Implement frontend-only behavior with realistic mock data and simulation for API, auth, realtime, and admin operations.

==================================================
1) HARD CONSTRAINTS
==================================================

- Use plain HTML files + shared CSS/JS only.
- Use Tailwind via CDN.
- No React, no build tool, no backend runtime.
- Produce responsive UI for mobile (minimum 360px), tablet, and desktop.
- Accessibility baseline: semantic structure, alt text, labels, keyboard focus visibility, color contrast.
- Use only ASCII characters in source code.
- Include no TODO placeholders.

==================================================
2) BRAND AND VISUAL SYSTEM (MANDATORY)
==================================================

Design direction:
- Base: black/charcoal luxury fashion aesthetic.
- Accent: gold.
- Text: light gray/white on dark surfaces.

Required color tokens:
- saga-primary: #f2ca50
- saga-primary-container: #d4af37
- saga-surface: #131313
- saga-surface-lowest: #0e0e0e
- saga-surface-container: #1f1f1f
- saga-surface-variant: #353535
- saga-on-surface: #e2e2e2

Theme rules:
- Define CSS variables for all tokens.
- Extend Tailwind config to expose these colors.
- Avoid generic template look. Make visual hierarchy bold and editorial.
- Keep dark theme with strong gold highlights and subtle gradients.
- Add restrained motion: page reveal, stagger cards, interactive hover/focus transitions.

Typography:
- Use expressive heading font and clean body font from Google Fonts.
- Example pairing: Cinzel for headings, Manrope for body text.

==================================================
3) FILE OUTPUT FORMAT (MANDATORY)
==================================================

Return your answer as multiple files.
For each file use this format exactly:

File: path/filename.ext
```language
...full file content...
```

Do not add commentary outside file blocks.

==================================================
4) REQUIRED FILE STRUCTURE
==================================================

Create at least these files:

- index.html
- drops.html
- drop-detail.html
- product-detail.html
- auth.html
- cart.html
- checkout.html
- orders.html
- order-detail.html
- profile.html
- notifications.html

- admin/dashboard.html
- admin/drops.html
- admin/products.html
- admin/orders.html
- admin/home-images.html
- admin/notifications.html
- admin/whatsapp.html
- admin/gifts.html
- admin/account.html

- assets/css/styles.css
- assets/js/app.js
- assets/js/mock-data.js

Optional but preferred:
- components header/footer partials as JS template strings.

==================================================
5) PAGE REQUIREMENTS
==================================================

Public/customer flow pages:

1. Home:
- Hero banner with luxury campaign visual
- Featured live/upcoming drops
- Category highlights (Unisex, Boys, Girls)
- Offer cards and countdown urgency block
- CTA to browse drops

2. Drops listing:
- Grid of published drops
- Release date badges
- Status chips (Live, Upcoming, Ended)

3. Drop detail:
- Drop hero, description, release window
- Countdown timer mock
- Associated products grid

4. Product detail:
- Gallery, brand, category, pricing, discount display
- Variant selector (size, color)
- Stock status by variant
- Quantity picker
- Add to cart and wishlist actions
- Limited purchase notice if applicable

5. Auth page:
- Login, register, OTP verify, resend OTP, forgot/reset flow in tabs/panels
- Google sign-in and sign-up buttons (UI only)
- Admin blocked from Google auth note

6. Cart:
- Server-side cart simulation view
- Item rows with selected variant details
- Quantity update and remove
- Order summary in LKR

7. Checkout:
- Address selection + add new address form
- Contact number field
- Payment method selection:
  PayHere, Google Pay, card, LankaPay, cash, manual bank transfer
- Order review and place order action
- Manual payment proof upload UI state

8. Orders list:
- User order history list
- Status and payment badges
- Filters by status

9. Order detail:
- Item breakdown
- Payment and order status timeline
- Gift tier state
- Payment proof area for manual payment orders

10. Profile:
- Personal info
- Address book with default flag
- Password change form
- WhatsApp opt-in toggle with number validation hint (+94XXXXXXXXX)

11. Notifications:
- Notification list grouped by type:
  drop, offer, order, admin, reminder, system
- Mark as read/unread UI

Admin flow pages:

12. Admin Dashboard:
- KPI cards
- Top 5 best-selling products
- Top 5 most wishlisted products
- Recent orders table

13. Admin Drops:
- Create/edit/archive/publish drop UI
- Slug preview

14. Admin Products:
- Product CRUD form
- Variant management rows (SKU, size, color, stock, price adjustment)
- Toggle isLimited, maxPerUser, isActive

15. Admin Orders:
- All orders table
- Status update actions
- Manual payment verification actions approve/reject

16. Admin Home Images:
- Hero/ad/logo/category banner manager
- Reorder and soft-delete controls

17. Admin Notifications:
- Broadcast composer
- List/edit/delete notifications

18. Admin WhatsApp Logs:
- Message log table (sent, delivered, read, failed)
- Resend failed action

19. Admin Gifts:
- Gift tier management (Basic/Standard/Premium/Elite)
- Inventory controls and gift assignment preview

20. Admin Account:
- Profile and password update

==================================================
6) FUNCTIONAL BEHAVIOR SIMULATION (FR-ALIGNED)
==================================================

Implement frontend simulation in JavaScript:

- Role switcher in top nav for demo:
  guest, user, admin, superadmin.
- Enforce role-based visibility and action locking in UI.
- Mock auth session restore and logout state.
- Product variant stock recalculation display.
- Cart and wishlist mutation with localStorage.
- Checkout flow with two order outcomes:
  - Online methods: orderStatus=confirmed, paymentStatus=paid
  - Manual/cash: orderStatus=verification_pending, paymentStatus=pending
- 15-minute expiry simulation message for manual/cash pending orders.
- Gift tier assignment by total amount:
  Basic: 1000-2999
  Standard: 3000-5999
  Premium: 6000-9999
  Elite: 10000+
- Gift details hidden until confirmed/paid state.

==================================================
7) REALTIME AND API MOCKS
==================================================

Create mock API namespace constants matching:
- /api/v1/auth
- /api/v1/google
- /api/v1/products
- /api/v1/drops
- /api/v1/orders
- /api/v1/image
- /api/v1/user
- /api/v1/notifications
- /api/v1/whatsapp

Simulate realtime events with a tiny in-browser event bus and visual toasts for:
- notification:new
- order:statusUpdate
- drop:live
- offer:broadcast
- order:new

Add an Admin Test Controls panel (dev-only UI) to trigger these events.

==================================================
8) DEMO DATA REQUIREMENTS
==================================================

Provide rich mock data objects for:
- Users with roles and isActive/isVerified flags
- Drops with release/end dates, published and archived states
- Products with:
  artNo, name, description, brand, category, discountPercent,
  variants with SKU, size, color, stock, priceAdjustment,
  isLimited, maxPerUser, soldCount, wishCount
- Orders with item variants, statuses, payment methods, payment proof URLs/hashes
- Notifications
- WhatsApp message logs
- Gifts and gift assignments

Use realistic Sri Lankan names, addresses, and phone number patterns.
All monetary values must be in LKR.

==================================================
9) DEMO IMAGE POLICY
==================================================

Use royalty-free placeholder image URLs from Unsplash or Pexels only.
Map image categories:
- Hero fashion campaign
- Product close-ups / flat lays
- Lifestyle shots
- Drop banners
- Category banners
- Admin thumbnails

Image implementation rules:
- lazy loading enabled
- object-fit cover
- explicit width/height to reduce layout shift
- meaningful alt text
- fallback background block if image fails

==================================================
10) NON-FUNCTIONAL UX QUALITY
==================================================

- Mobile-first layout decisions.
- Clear loading, success, and error states.
- Keyboard navigable controls.
- Consistent spacing scale and card system.
- Professional status chips for:
  pending, verification_pending, confirmed, shipped, delivered, cancelled,
  and payment: pending, paid, failed.

==================================================
11) ACCEPTANCE SELF-CHECK (GENERATE IN CODE COMMENTS)
==================================================

At the top of assets/js/app.js, add a block comment listing how the prototype demonstrates:
- User registration -> OTP -> login journey (UI simulation)
- Drop publish -> drop:live event
- Variant cart and checkout
- Manual payment verification_pending behavior
- Admin status change -> user/admin notification simulation
- Gift tier assignment and hidden reveal until confirmation
- WhatsApp opt-in/out toggle behavior and message log screen
- Top 5 analytics cards/tables in admin dashboard

==================================================
12) FINAL OUTPUT REQUIREMENTS
==================================================

- Deliver complete code for every file.
- Ensure file paths are consistent.
- Ensure JavaScript references existing DOM nodes safely.
- Ensure navigation links work between pages.
- Ensure no syntax errors.
- Keep code clean and readable.

Now generate the full project files.

---

## Optional Variant Prompt: Rapid MVP

If you want a faster output from Claude, use this shorter variant.

Build a multi-page Saga Elite fashion ecommerce prototype using HTML, CSS, JavaScript, and Tailwind CDN. Use a luxury dark theme with gold accents. Required tokens: #f2ca50, #d4af37, #131313, #0e0e0e, #1f1f1f, #353535, #e2e2e2. Generate pages for home, drops, drop detail, product detail, auth, cart, checkout, orders, order detail, profile, notifications, and admin pages for dashboard/drops/products/orders/home-images/notifications/whatsapp/gifts/account. Use shared assets/css/styles.css, assets/js/app.js, assets/js/mock-data.js. Include role switcher, cart/wishlist simulation, checkout outcomes by payment method, gift tiers, notifications, and mock realtime event triggers. Use Unsplash/Pexels demo images with lazy loading and alt text. Return files only in "File: path" + fenced code format.