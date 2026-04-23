/*
Acceptance coverage simulation map:
- Registration -> OTP -> login: auth panel toggles and state feedback in auth page.
- Drop publish -> drop:live: admin test controls emit realtime toast.
- Variant cart and checkout: product page selection + cart + checkout simulation.
- Manual payment behavior: checkout sets verification_pending and pending for manual/cash methods.
- Admin status change notifications: event bus toasts for order updates and order:new.
- Gift tier assignment: computed at checkout, hidden until confirmed/paid.
- WhatsApp opt-in/out: profile toggle and admin logs listing.
- Top-5 analytics: admin dashboard rankings from mock data.
*/
(function () {
  const STORAGE_KEY = "saga_state_v1";
  const PAGE = document.body.dataset.page || "";

  const ENDPOINTS = {
    auth: "/api/v1/auth",
    google: "/api/v1/google",
    products: "/api/v1/products",
    drops: "/api/v1/drops",
    orders: "/api/v1/orders",
    image: "/api/v1/image",
    user: "/api/v1/user",
    notifications: "/api/v1/notifications",
    whatsapp: "/api/v1/whatsapp"
  };

  const fallbackState = {
    role: "guest",
    userId: "u-001",
    cart: [],
    wishlist: [],
    notifications: window.SAGA_MOCK ? [...window.SAGA_MOCK.notifications] : []
  };

  const state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackState));
        return { ...fallbackState };
      }
      return { ...fallbackState, ...JSON.parse(raw) };
    } catch (_err) {
      return { ...fallbackState };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    syncBadges();
  }

  function formatLkr(amount) {
    return new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(amount);
  }

  function todayIso() {
    return new Date().toISOString();
  }

  function getRole() {
    return state.role;
  }

  function setRole(role) {
    state.role = role;
    saveState();
    window.location.reload();
  }

  function getCurrentUser() {
    return window.SAGA_MOCK.users.find(u => u.id === state.userId) || window.SAGA_MOCK.users[0];
  }

  function cartItemsExpanded() {
    return state.cart.map(item => {
      const product = window.SAGA_MOCK.products.find(p => p.id === item.productId);
      if (!product) return null;
      const variant = product.variants.find(v => v.id === item.variantId);
      if (!variant) return null;
      const unit = Math.round(product.basePrice * (1 - product.discountPercent / 100)) + variant.priceAdjustment;
      return { ...item, product, variant, unit, lineTotal: item.qty * unit };
    }).filter(Boolean);
  }

  function cartTotal() {
    return cartItemsExpanded().reduce((sum, line) => sum + line.lineTotal, 0);
  }

  function assignGiftTier(amount) {
    if (amount >= 10000) return "Elite";
    if (amount >= 6000) return "Premium";
    if (amount >= 3000) return "Standard";
    if (amount >= 1000) return "Basic";
    return "Basic";
  }

  function showToast(text) {
    const stack = document.getElementById("toast-stack");
    if (!stack) return;
    const node = document.createElement("div");
    node.className = "toast";
    node.textContent = text;
    stack.appendChild(node);
    setTimeout(() => node.remove(), 3200);
  }

  const EventBus = {
    emit(name, payload) {
      showToast(name + ": " + (payload?.message || payload?.title || "event received"));
    }
  };

  function syncBadges() {
    document.querySelectorAll("[data-cart-count]").forEach(node => {
      node.textContent = String(state.cart.reduce((sum, i) => sum + i.qty, 0));
    });
    document.querySelectorAll("[data-wishlist-count]").forEach(node => {
      node.textContent = String(state.wishlist.length);
    });
  }

  function roleGate() {
    const role = getRole();
    document.querySelectorAll("[data-role-min]").forEach(node => {
      const req = node.dataset.roleMin;
      const map = { guest: 0, user: 1, admin: 2, superadmin: 3 };
      const ok = map[role] >= map[req];
      if (!ok) node.classList.add("hidden");
    });
    document.querySelectorAll("[data-guest-block]").forEach(node => {
      if (role === "guest") node.setAttribute("disabled", "disabled");
    });
    const roleLabel = document.getElementById("active-role");
    if (roleLabel) roleLabel.textContent = role.toUpperCase();
  }

  function initRoleSwitcher() {
    const select = document.getElementById("role-switcher");
    if (!select) return;
    select.value = getRole();
    select.addEventListener("change", e => setRole(e.target.value));
  }

  function navActive() {
    const key = PAGE;
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.dataset.nav === key) link.classList.add("active");
    });
  }

  function mountHome() {
    const dropWrap = document.getElementById("featured-drops");
    if (dropWrap) {
      const liveDrops = window.SAGA_MOCK.drops.filter(d => d.isPublished && !d.isArchived).slice(0, 2);
      dropWrap.innerHTML = liveDrops.map(d => `
        <article class="surface-card p-4 gold-ring">
          <img src="${d.banner}" loading="lazy" width="1200" height="700" alt="${d.name} campaign" class="h-44 w-full rounded-lg object-cover" onerror="this.parentNode.classList.add('image-fallback')" />
          <div class="mt-3 flex items-center justify-between">
            <h3 class="font-display text-xl">${d.name}</h3>
            <span class="status-chip status-live">Live</span>
          </div>
          <p class="mt-2 text-sm text-zinc-300">${d.description}</p>
          <a href="drop-detail.html?id=${d.id}" class="mt-4 inline-block text-sm font-bold text-[#f2ca50]">View Drop</a>
        </article>
      `).join("");
    }
  }

  function mountDrops() {
    const wrap = document.getElementById("drops-grid");
    if (!wrap) return;
    wrap.innerHTML = window.SAGA_MOCK.drops.filter(d => d.isPublished).map(d => `
      <article class="surface-card p-4">
        <img src="${d.banner}" loading="lazy" width="1200" height="700" alt="${d.name} drop banner" class="h-44 w-full rounded-lg object-cover" />
        <div class="mt-3 flex items-center justify-between">
          <h3 class="font-display">${d.name}</h3>
          <span class="status-chip ${new Date(d.releaseDate) > new Date() ? "status-upcoming" : "status-live"}">${new Date(d.releaseDate) > new Date() ? "Upcoming" : "Live"}</span>
        </div>
        <p class="mt-2 text-sm text-zinc-300">${d.description}</p>
        <a href="drop-detail.html?id=${d.id}" class="mt-4 inline-block text-sm text-[#f2ca50]">Explore</a>
      </article>
    `).join("");
  }

  function selectedDrop() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || window.SAGA_MOCK.drops[0].id;
    return window.SAGA_MOCK.drops.find(d => d.id === id) || window.SAGA_MOCK.drops[0];
  }

  function selectedProduct() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || window.SAGA_MOCK.products[0].id;
    return window.SAGA_MOCK.products.find(p => p.id === id) || window.SAGA_MOCK.products[0];
  }

  function mountDropDetail() {
    const d = selectedDrop();
    const title = document.getElementById("drop-title");
    const desc = document.getElementById("drop-description");
    const image = document.getElementById("drop-banner");
    if (title) title.textContent = d.name;
    if (desc) desc.textContent = d.description;
    if (image) image.src = d.banner;

    const productsWrap = document.getElementById("drop-products");
    if (productsWrap) {
      productsWrap.innerHTML = window.SAGA_MOCK.products.filter(p => p.dropId === d.id).map(p => `
        <article class="surface-card p-4">
          <img src="${p.images[0]}" loading="lazy" width="1000" height="1200" alt="${p.name}" class="h-48 w-full rounded-lg object-cover" />
          <h3 class="mt-3 font-semibold">${p.name}</h3>
          <p class="text-sm text-zinc-400">${formatLkr(p.basePrice)}</p>
          <a class="mt-3 inline-block text-sm text-[#f2ca50]" href="product-detail.html?id=${p.id}">View Product</a>
        </article>
      `).join("");
    }

    const countdown = document.getElementById("drop-countdown");
    if (countdown) {
      countdown.textContent = "02d 06h 14m";
    }
  }

  function mountProduct() {
    const p = selectedProduct();
    const variantSelect = document.getElementById("variant-select");
    const title = document.getElementById("product-title");
    const desc = document.getElementById("product-description");
    const price = document.getElementById("product-price");
    const img = document.getElementById("product-image");
    const stock = document.getElementById("stock-status");

    if (title) title.textContent = p.name;
    if (desc) desc.textContent = p.description;
    if (price) price.textContent = formatLkr(Math.round(p.basePrice * (1 - p.discountPercent / 100)));
    if (img) img.src = p.images[0];

    if (variantSelect) {
      variantSelect.innerHTML = p.variants.map(v => `<option value="${v.id}">${v.size} / ${v.color} / ${v.sku}</option>`).join("");
      variantSelect.addEventListener("change", () => {
        const v = p.variants.find(x => x.id === variantSelect.value);
        if (stock && v) stock.textContent = v.stock > 0 ? `In stock: ${v.stock}` : "Out of stock";
      });
      const first = p.variants[0];
      if (stock) stock.textContent = first.stock > 0 ? `In stock: ${first.stock}` : "Out of stock";
    }

    const limitedTag = document.getElementById("limited-tag");
    if (limitedTag) {
      limitedTag.textContent = p.isLimited ? `Limited item. Max ${p.maxPerUser} per user.` : "Standard availability.";
    }

    const addBtn = document.getElementById("add-cart-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        if (getRole() === "guest") return showToast("Please login to add items.");
        const variantId = variantSelect.value;
        const qty = Number(document.getElementById("qty-input")?.value || 1);
        const existing = state.cart.find(i => i.productId === p.id && i.variantId === variantId);
        if (existing) existing.qty += qty;
        else state.cart.push({ productId: p.id, variantId, qty, dateAdded: todayIso() });
        saveState();
        showToast("Added to cart");
      });
    }

    const wishBtn = document.getElementById("add-wish-btn");
    if (wishBtn) {
      wishBtn.addEventListener("click", () => {
        if (getRole() === "guest") return showToast("Please login to use wishlist.");
        if (!state.wishlist.includes(p.id)) state.wishlist.push(p.id);
        saveState();
        showToast("Added to wishlist");
      });
    }
  }

  function mountCart() {
    const wrap = document.getElementById("cart-lines");
    const totalNode = document.getElementById("cart-total");
    if (!wrap || !totalNode) return;
    const lines = cartItemsExpanded();
    if (!lines.length) {
      wrap.innerHTML = '<p class="text-zinc-400">Your cart is empty.</p>';
      totalNode.textContent = formatLkr(0);
      return;
    }
    wrap.innerHTML = lines.map((line, idx) => `
      <article class="surface-card p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-semibold">${line.product.name}</h3>
            <p class="text-sm text-zinc-400">${line.variant.size} / ${line.variant.color} / ${line.variant.sku}</p>
            <p class="text-sm">${formatLkr(line.unit)} x ${line.qty}</p>
          </div>
          <div class="text-right">
            <p class="font-bold text-[#f2ca50]">${formatLkr(line.lineTotal)}</p>
            <button data-remove-cart="${idx}" class="mt-2 text-xs text-red-300">Remove</button>
          </div>
        </div>
      </article>
    `).join("");
    totalNode.textContent = formatLkr(cartTotal());
    wrap.querySelectorAll("[data-remove-cart]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.cart.splice(Number(btn.dataset.removeCart), 1);
        saveState();
        mountCart();
      });
    });
  }

  function mountCheckout() {
    const totalNode = document.getElementById("checkout-total");
    if (totalNode) totalNode.textContent = formatLkr(cartTotal());

    const submit = document.getElementById("place-order-btn");
    const method = document.getElementById("payment-method");
    const summary = document.getElementById("checkout-result");
    if (!submit || !method || !summary) return;

    submit.addEventListener("click", () => {
      if (!state.cart.length) return showToast("Cart is empty");
      const selected = method.value;
      const total = cartTotal();
      const tier = assignGiftTier(total);
      const online = ["PayHere", "GooglePay", "card", "LankaPay"].includes(selected);
      const order = {
        id: "ord-" + Math.floor(Math.random() * 9000 + 1000),
        userId: state.userId,
        items: state.cart.map(i => ({ productId: i.productId, variantId: i.variantId, qty: i.qty })),
        totalAmount: total,
        paymentMethod: selected,
        paymentStatus: online ? "paid" : "pending",
        orderStatus: online ? "confirmed" : "verification_pending",
        giftTier: tier,
        giftReveal: online,
        createdAt: todayIso()
      };
      if (!online) {
        order.expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      }
      window.SAGA_MOCK.orders.unshift(order);
      state.cart = [];
      saveState();
      EventBus.emit("order:new", { message: "New order created" });
      if (online) EventBus.emit("order:statusUpdate", { message: "Order confirmed" });

      summary.innerHTML = `
        <div class="surface-card p-4">
          <p class="font-semibold text-[#f2ca50]">Order ${order.id} placed.</p>
          <p class="text-sm mt-1">Status: ${order.orderStatus} | Payment: ${order.paymentStatus}</p>
          <p class="text-sm mt-1">Gift Tier: ${order.giftTier} ${order.giftReveal ? "(revealed)" : "(hidden until confirmation)"}</p>
          ${!online ? '<p class="text-sm mt-2 text-amber-300">Manual/cash orders must be confirmed within 15 minutes.</p>' : ""}
        </div>
      `;
    });
  }

  function mountOrders() {
    const wrap = document.getElementById("orders-list");
    if (!wrap) return;
    const mine = window.SAGA_MOCK.orders.filter(o => o.userId === state.userId || getRole() === "admin" || getRole() === "superadmin");
    wrap.innerHTML = mine.map(o => `
      <article class="surface-card p-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="font-semibold">${o.id}</h3>
            <p class="text-sm text-zinc-400">${formatLkr(o.totalAmount)} | ${o.paymentMethod}</p>
          </div>
          <div class="flex gap-2">
            <span class="status-chip ${o.orderStatus.includes("pending") ? "status-pending" : "status-confirmed"}">${o.orderStatus}</span>
            <span class="status-chip ${o.paymentStatus === "paid" ? "status-confirmed" : "status-pending"}">${o.paymentStatus}</span>
          </div>
        </div>
        <a class="mt-3 inline-block text-sm text-[#f2ca50]" href="order-detail.html?id=${o.id}">View details</a>
      </article>
    `).join("");
  }

  function mountOrderDetail() {
    const id = new URLSearchParams(window.location.search).get("id");
    const order = window.SAGA_MOCK.orders.find(o => o.id === id) || window.SAGA_MOCK.orders[0];
    const idNode = document.getElementById("order-id");
    const statusNode = document.getElementById("order-status");
    const payNode = document.getElementById("payment-status");
    const giftNode = document.getElementById("gift-view");
    if (idNode) idNode.textContent = order.id;
    if (statusNode) statusNode.textContent = order.orderStatus;
    if (payNode) payNode.textContent = order.paymentStatus;
    if (giftNode) {
      giftNode.textContent = order.giftReveal ? `Gift tier ${order.giftTier}: Revealed` : `Gift tier ${order.giftTier}: Hidden until payment confirmation`;
    }
  }

  function mountProfile() {
    const user = getCurrentUser();
    const nameNode = document.getElementById("profile-name");
    const emailNode = document.getElementById("profile-email");
    const waInput = document.getElementById("whatsapp-number");
    const waOpt = document.getElementById("whatsapp-opt");
    if (nameNode) nameNode.value = user.name;
    if (emailNode) emailNode.value = user.email;
    if (waInput) waInput.value = user.whatsappNumber || "+94";
    if (waOpt) waOpt.checked = !!user.whatsappOptIn;

    const save = document.getElementById("save-profile-btn");
    if (save) {
      save.addEventListener("click", () => {
        const valid = /^\+94\d{9}$/.test(waInput.value);
        if (waOpt.checked && !valid) {
          showToast("Use Sri Lankan format +94XXXXXXXXX");
          return;
        }
        user.whatsappNumber = waInput.value;
        user.whatsappOptIn = waOpt.checked;
        showToast("Profile updated");
      });
    }
  }

  function mountNotifications() {
    const wrap = document.getElementById("notification-list");
    if (!wrap) return;
    wrap.innerHTML = state.notifications.map((n, idx) => `
      <article class="surface-card p-4 ${n.isRead ? "opacity-75" : ""}">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">${n.title}</h3>
          <span class="status-chip status-upcoming">${n.type}</span>
        </div>
        <p class="mt-1 text-sm text-zinc-300">${n.message}</p>
        <button data-mark-read="${idx}" class="mt-3 text-xs text-[#f2ca50]">${n.isRead ? "Mark unread" : "Mark read"}</button>
      </article>
    `).join("");
    wrap.querySelectorAll("[data-mark-read]").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.markRead);
        state.notifications[i].isRead = !state.notifications[i].isRead;
        saveState();
        mountNotifications();
      });
    });
  }

  function mountAdminDashboard() {
    const best = [...window.SAGA_MOCK.products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 5);
    const wish = [...window.SAGA_MOCK.products].sort((a, b) => b.wishCount - a.wishCount).slice(0, 5);
    const bestNode = document.getElementById("top-best");
    const wishNode = document.getElementById("top-wish");
    if (bestNode) bestNode.innerHTML = best.map(p => `<li>${p.name} <span class="text-zinc-400">(${p.soldCount})</span></li>`).join("");
    if (wishNode) wishNode.innerHTML = wish.map(p => `<li>${p.name} <span class="text-zinc-400">(${p.wishCount})</span></li>`).join("");
  }

  function mountAdminWhatsApp() {
    const wrap = document.getElementById("wa-logs");
    if (!wrap) return;
    wrap.innerHTML = window.SAGA_MOCK.whatsappLogs.map(log => `
      <tr class="border-b border-zinc-800">
        <td class="py-2">${log.metaMessageId}</td>
        <td>${log.phoneNumber}</td>
        <td>${log.templateName}</td>
        <td><span class="status-chip ${log.status === "failed" ? "status-failed" : "status-confirmed"}">${log.status}</span></td>
        <td><button class="text-xs text-[#f2ca50]">Resend</button></td>
      </tr>
    `).join("");
  }

  function mountAdminGifts() {
    const wrap = document.getElementById("gift-table");
    if (!wrap) return;
    wrap.innerHTML = window.SAGA_MOCK.gifts.map(g => `
      <tr class="border-b border-zinc-800">
        <td class="py-2">${g.tier}</td>
        <td>${g.name}</td>
        <td>${g.stock}</td>
        <td><button class="text-xs text-[#f2ca50]">Adjust</button></td>
      </tr>
    `).join("");
  }

  function mountAdminTestControls() {
    const wrap = document.getElementById("admin-test-controls");
    if (!wrap) return;
    const events = ["notification:new", "order:statusUpdate", "drop:live", "offer:broadcast", "order:new"];
    wrap.innerHTML = events.map(name => `<button data-emit="${name}" class="rounded-md border border-[#f2ca50]/30 px-3 py-1 text-xs hover:bg-[#f2ca50]/10">${name}</button>`).join(" ");
    wrap.querySelectorAll("[data-emit]").forEach(btn => {
      btn.addEventListener("click", () => EventBus.emit(btn.dataset.emit, { message: "Triggered from test controls" }));
    });
  }

  function mountAuth() {
    const tabs = document.querySelectorAll("[data-auth-tab]");
    const panes = document.querySelectorAll("[data-auth-pane]");
    if (!tabs.length || !panes.length) return;
    tabs.forEach(tab => tab.addEventListener("click", () => {
      const key = tab.dataset.authTab;
      panes.forEach(p => p.classList.toggle("hidden", p.dataset.authPane !== key));
      tabs.forEach(t => t.classList.remove("bg-[#f2ca50]", "text-black"));
      tab.classList.add("bg-[#f2ca50]", "text-black");
    }));
  }

  function boot() {
    document.getElementById("year-now")?.append(String(new Date().getFullYear()));
    document.getElementById("endpoint-preview")?.append(JSON.stringify(ENDPOINTS, null, 2));
    initRoleSwitcher();
    roleGate();
    navActive();
    syncBadges();
    mountAdminTestControls();

    if (PAGE === "home") mountHome();
    if (PAGE === "drops") mountDrops();
    if (PAGE === "drop-detail") mountDropDetail();
    if (PAGE === "product") mountProduct();
    if (PAGE === "auth") mountAuth();
    if (PAGE === "cart") mountCart();
    if (PAGE === "checkout") mountCheckout();
    if (PAGE === "orders") mountOrders();
    if (PAGE === "order-detail") mountOrderDetail();
    if (PAGE === "profile") mountProfile();
    if (PAGE === "notifications") mountNotifications();
    if (PAGE === "admin-dashboard") mountAdminDashboard();
    if (PAGE === "admin-whatsapp") mountAdminWhatsApp();
    if (PAGE === "admin-gifts") mountAdminGifts();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
