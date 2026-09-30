/* =========================================================
   NEXORA SHOP - COMPLETE SCRIPT.JS
   Developer: GAURAV KUMAR
   ========================================================= */


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const CART_KEY = "nexoraCart";
const WISHLIST_KEY = "nexoraWishlist";
const USERS_KEY = "nexoraUsers";
const CURRENT_USER_KEY = "nexoraCurrentUser";
const ORDERS_KEY = "nexoraOrders";
const LAST_ORDER_KEY = "nexoraLastOrder";


/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        rating: 4.5,
        discount: 20,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        description: "Premium wireless headphones with comfortable design and clear sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 1999,
        rating: 4.4,
        discount: 15,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        description: "Modern smartwatch for everyday activity tracking and notifications."
    },

    {
        id: 3,
        name: "Running Shoes",
        category: "Footwear",
        price: 2499,
        rating: 4.6,
        discount: 25,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable running shoes designed for daily workouts and running."
    },

    {
        id: 4,
        name: "Travel Backpack",
        category: "Fashion",
        price: 999,
        rating: 4.3,
        discount: 10,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description: "Durable travel backpack with spacious compartments."
    },

    {
        id: 5,
        name: "Smartphone",
        category: "Electronics",
        price: 12999,
        rating: 4.7,
        discount: 12,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
        description: "Modern smartphone with a beautiful display and powerful performance."
    },

    {
        id: 6,
        name: "Laptop",
        category: "Electronics",
        price: 45999,
        rating: 4.6,
        discount: 18,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
        description: "Powerful laptop suitable for study, work and entertainment."
    },

    {
        id: 7,
        name: "Men's T-Shirt",
        category: "Fashion",
        price: 699,
        rating: 4.2,
        discount: 30,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable casual cotton T-shirt for everyday wear."
    },

    {
        id: 8,
        name: "Sports Shoes",
        category: "Footwear",
        price: 1899,
        rating: 4.4,
        discount: 20,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        description: "Stylish sports shoes with comfortable cushioning."
    },

    {
        id: 9,
        name: "Face Cream",
        category: "Beauty",
        price: 499,
        rating: 4.1,
        discount: 15,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
        description: "Lightweight face cream for everyday skincare."
    },

    {
        id: 10,
        name: "Gaming Controller",
        category: "Gaming",
        price: 2499,
        rating: 4.5,
        discount: 10,
        image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80",
        description: "Responsive gaming controller for an immersive gaming experience."
    },

    {
        id: 11,
        name: "Table Lamp",
        category: "Home",
        price: 799,
        rating: 4.3,
        discount: 12,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
        description: "Modern table lamp suitable for study rooms and bedrooms."
    },

    {
        id: 12,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1799,
        rating: 4.5,
        discount: 20,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        description: "Portable Bluetooth speaker with powerful sound."
    }

];


/* =========================================================
   GLOBAL DATA
   ========================================================= */

let cart = getStorage(CART_KEY, []);
let wishlist = getStorage(WISHLIST_KEY, []);


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function getStorage(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error("Storage error:", error);

        return fallback;
    }
}


function setStorage(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}


/* =========================================================
   MONEY FORMAT
   ========================================================= */

function money(amount) {

    return "₹" +
        Number(amount || 0).toLocaleString("en-IN");

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   TOAST MESSAGE
   ========================================================= */

function showToast(message) {

    let toast = document.getElementById("nexoraToast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "nexoraToast";

        toast.style.position = "fixed";
        toast.style.bottom = "25px";
        toast.style.right = "25px";
        toast.style.zIndex = "99999";
        toast.style.padding = "14px 20px";
        toast.style.borderRadius = "10px";
        toast.style.background = "#111827";
        toast.style.color = "#fff";
        toast.style.fontSize = "15px";
        toast.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
        toast.style.transition = "0.3s";

        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.opacity = "1";

    clearTimeout(window.nexoraToastTimer);

    window.nexoraToastTimer = setTimeout(() => {

        toast.style.opacity = "0";

    }, 2200);

}


/* =========================================================
   CART STORAGE
   ========================================================= */

function saveCart() {

    setStorage(CART_KEY, cart);

}


/* =========================================================
   WISHLIST STORAGE
   ========================================================= */

function saveWishlist() {

    setStorage(WISHLIST_KEY, wishlist);

}


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    document
        .querySelectorAll("#cartCount")
        .forEach(element => {

            element.textContent = count;

        });

}


/* =========================================================
   WISHLIST COUNT
   ========================================================= */

function updateWishlistCount() {

    document
        .querySelectorAll("#wishlistCount")
        .forEach(element => {

            element.textContent = wishlist.length;

        });

}


/* =========================================================
   AUTHENTICATION
   ========================================================= */

function getUsers() {

    return getStorage(
        USERS_KEY,
        []
    );

}


function saveUsers(users) {

    setStorage(
        USERS_KEY,
        users
    );

}


function getCurrentUser() {

    return getStorage(
        CURRENT_USER_KEY,
        null
    );

}


function setCurrentUser(user) {

    setStorage(
        CURRENT_USER_KEY,
        user
    );

}


function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    showToast("Logged out successfully");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 500);

}


/* =========================================================
   UPDATE LOGIN NAVIGATION
   ========================================================= */

function updateAuthUI() {

    const loginNav =
        document.getElementById("loginNav");

    if (!loginNav) {
        return;
    }

    const user = getCurrentUser();

    if (user) {

        loginNav.textContent =
            "👤 " + user.name;

        loginNav.href = "account.html";

    } else {

        loginNav.textContent =
            "Login";

        loginNav.href =
            "login.html";

    }

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    const isWishlisted =
        wishlist.includes(product.id);

    return `

        <article class="product-card">

            <div
                class="product-image"
                onclick="openProduct(${product.id})"
            >

                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                    loading="lazy"
                >

                ${
                    product.discount
                    ?
                    `<span class="discount-badge">
                        ${product.discount}% OFF
                    </span>`
                    :
                    ""
                }

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${escapeHTML(product.category)}
                </p>

                <h3
                    onclick="openProduct(${product.id})"
                    style="cursor:pointer;"
                >
                    ${escapeHTML(product.name)}
                </h3>


                <div class="rating">

                    ⭐ ${product.rating}

                </div>


                <div class="price">

                    ${money(product.price)}

                </div>


                <div class="product-actions">

                    <button
                        class="wishlist-btn"
                        onclick="toggleWishlist(${product.id})"
                        title="Wishlist"
                    >
                        ${isWishlisted ? "❤️" : "🤍"}
                    </button>


                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts(list = products) {

    const container =
        document.getElementById(
            "productContainer"
        );

    if (!container) {
        return;
    }


    if (!list.length) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>No products found</h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        list
            .map(createProductCard)
            .join("");

}


/* =========================================================
   DISPLAY PRODUCTS
   Compatibility with older HTML
   ========================================================= */

function displayProducts(list = products) {

    renderProducts(list);

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function filterCategory(category) {

    if (
        !category ||
        category.toLowerCase() === "all"
    ) {

        renderProducts(products);

        updateActiveFilter("All");

        return;
    }


    const filtered =
        products.filter(product =>
            product.category.toLowerCase() ===
            category.toLowerCase()
        );


    renderProducts(filtered);

    updateActiveFilter(category);

}


/* =========================================================
   ACTIVE FILTER
   ========================================================= */

function updateActiveFilter(text) {

    const element =
        document.getElementById(
            "activeFilter"
        );

    if (element) {

        element.textContent =
            text || "All Products";

    }

}


/* =========================================================
   SHOW ALL PRODUCTS
   ========================================================= */

function showAllProducts() {

    renderProducts(products);

    updateActiveFilter("All");

}


/* =========================================================
   CATEGORIES
   ========================================================= */

function renderCategories() {

    const container =
        document.getElementById(
            "categoryGrid"
        );

    if (!container) {
        return;
    }


    const categories = [
        "All",
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];


    container.innerHTML =
        categories
            .map(category => `

                <button
                    class="category-btn"
                    type="button"
                    onclick="filterCategory('${category}')"
                >
                    ${escapeHTML(category)}
                </button>

            `)
            .join("");

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        ) ||
        document.getElementById(
            "productSearchInput"
        );


    if (!input) {
        return;
    }


    const search =
        input.value
            .trim()
            .toLowerCase();


    if (!search) {

        renderProducts(products);

        return;
    }


    const filtered =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(search)

            ||

            product.category
                .toLowerCase()
                .includes(search)

            ||

            product.description
                .toLowerCase()
                .includes(search)

        );


    renderProducts(filtered);

    updateActiveFilter(
        `Search: ${input.value}`
    );


    const productSection =
        document.getElementById("products");

    if (productSection) {

        productSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   PRODUCT SEARCH PAGE / BUTTON
   ========================================================= */

function goToSearch() {

    const input =
        document.getElementById(
            "productSearchInput"
        );

    if (!input) {
        return;
    }


    const query =
        input.value.trim();


    if (!query) {

        window.location.href =
            "index.html";

        return;
    }


    window.location.href =
        "index.html?search=" +
        encodeURIComponent(query);

}


/* =========================================================
   SORT PRODUCTS
   ========================================================= */

function sortProducts(type) {

    let sorted = [
        ...products
    ];


    if (type === "low") {

        sorted.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (type === "high") {

        sorted.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (type === "rating") {

        sorted.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    renderProducts(sorted);

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(productId) {

    productId =
        Number(productId);


    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) {

        showToast("Product not found");

        return;
    }


    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                productId
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity || 0) + 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            category: product.category,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    showToast(
        `${product.name} added to cart`
    );


    if (
        document.getElementById(
            "cartContainer"
        )
    ) {

        renderCartPage();

    }

}


/* =========================================================
   BUY NOW
   ========================================================= */

function buyNow(productId) {

    productId =
        Number(productId);


    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) {
        return;
    }


    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                productId
        );


    if (existing) {

        existing.quantity = 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            category: product.category,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();


    window.location.href =
        "checkout.html";

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(productId, change) {

    productId =
        Number(productId);


    const item =
        cart.find(
            product =>
                Number(product.id) ===
                productId
        );


    if (!item) {
        return;
    }


    item.quantity =
        Number(item.quantity || 1) +
        Number(change);


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    Number(product.id) !==
                    productId
            );

    }


    saveCart();

    updateCartCount();

    renderCartPage();

}


/* =========================================================
   SET QUANTITY
   ========================================================= */

function setQuantity(productId, quantity) {

    productId =
        Number(productId);


    quantity =
        Number(quantity);


    const item =
        cart.find(
            product =>
                Number(product.id) ===
                productId
        );


    if (!item) {
        return;
    }


    if (quantity <= 0) {

        removeFromCart(productId);

        return;
    }


    item.quantity =
        quantity;


    saveCart();

    updateCartCount();

    renderCartPage();

}


/* =========================================================
   REMOVE FROM CART
   ========================================================= */

function removeFromCart(productId) {

    productId =
        Number(productId);


    cart =
        cart.filter(
            item =>
                Number(item.id) !==
                productId
        );


    saveCart();

    updateCartCount();

    renderCartPage();

    showToast(
        "Product removed from cart"
    );

}


/* =========================================================
   CART TOTALS
   ========================================================= */

function getCartSubtotal() {

    return cart.reduce(
        (total, item) =>
            total +
            (
                Number(item.price) *
                Number(item.quantity || 1)
            ),
        0
    );

}


function getShipping() {

    const subtotal =
        getCartSubtotal();

    if (!subtotal) {
        return 0;
    }

    return 0;
}


function getCartTotal() {

    return (
        getCartSubtotal() +
        getShipping()
    );

}


/* =========================================================
   CART SUMMARY
   ========================================================= */

function updateCartSummary() {

    const subtotal =
        getCartSubtotal();

    const shipping =
        getShipping();

    const total =
        subtotal + shipping;


    const subtotalElement =
        document.getElementById(
            "cartSubtotal"
        );

    const shippingElement =
        document.getElementById(
            "cartShipping"
        );

    const totalElement =
        document.getElementById(
            "cartTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            money(subtotal);

    }


    if (shippingElement) {

        shippingElement.textContent =
            shipping === 0
                ? "FREE"
                : money(shipping);

    }


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


/* =========================================================
   CART PAGE
   ========================================================= */

function setupCartPage() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    if (!container) {
        return;
    }


    renderCartPage();

}


function renderCartPage() {

    const container =
        document.getElementById(
            "cartContainer"
        );


    if (!container) {
        return;
    }


    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    Your cart is empty 🛒
                </h2>

                <p>
                    Add some products to continue shopping.
                </p>

                <a
                    href="index.html"
                    class="primary-btn"
                >
                    Start Shopping
                </a>

            </div>

        `;

        updateCartSummary();

        return;
    }


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p =>
                        Number(p.id) ===
                        Number(item.id)
                );


            if (!product) {
                return "";
            }


            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${product.image}"
                            alt="${escapeHTML(product.name)}"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h3>
                            ${escapeHTML(product.name)}
                        </h3>

                        <p>
                            ${escapeHTML(product.category)}
                        </p>

                        <strong>
                            ${money(product.price)}
                        </strong>

                    </div>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            onclick="changeQuantity(${product.id}, -1)"
                        >
                            −
                        </button>


                        <span>
                            ${Number(item.quantity || 1)}
                        </span>


                        <button
                            type="button"
                            onclick="changeQuantity(${product.id}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <div class="cart-item-total">

                        <strong>
                            ${money(
                                product.price *
                                Number(item.quantity || 1)
                            )}
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeFromCart(${product.id})"
                    >
                        🗑️ Remove
                    </button>

                </div>

            `;

        }).join("");


    updateCartSummary();

}


/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlist(productId) {

    productId =
        Number(productId);


    if (
        wishlist.includes(productId)
    ) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(productId);

        showToast(
            "Added to wishlist ❤️"
        );

    }


    saveWishlist();

    updateWishlistCount();

    renderProducts();


    if (
        document.getElementById(
            "wishlistContainer"
        )
    ) {

        renderWishlist();

    }

}


function showWishlist() {

    window.location.href =
        "wishlist.html";

}


/* =========================================================
   WISHLIST PAGE
   ========================================================= */

function setupWishlistPage() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );

    if (!container) {
        return;
    }


    renderWishlist();

}


function renderWishlist() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );


    if (!container) {
        return;
    }


    const items =
        products.filter(
            product =>
                wishlist.includes(
                    product.id
                )
        );


    if (!items.length) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    Your wishlist is empty ❤️
                </h2>

                <p>
                    Add products to your wishlist.
                </p>

                <a
                    href="index.html"
                    class="primary-btn"
                >
                    Continue Shopping
                </a>

            </div>

        `;

        return;
    }


    container.innerHTML =
        items.map(product => `

            <article class="wishlist-card">

                <div class="wishlist-image">

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                    >

                </div>


                <div class="wishlist-info">

                    <p>
                        ${escapeHTML(product.category)}
                    </p>

                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>

                    <div>
                        ⭐ ${product.rating}
                    </div>

                    <h3>
                        ${money(product.price)}
                    </h3>


                    <div class="product-actions">

                        <button
                            class="secondary-btn wishlist-view"
                            data-id="${product.id}"
                            onclick="openProduct(${product.id})"
                        >
                            View
                        </button>


                        <button
                            class="primary-btn wishlist-cart"
                            data-id="${product.id}"
                            onclick="addToCart(${product.id})"
                        >
                            🛒 Add to Cart
                        </button>


                        <button
                            class="remove-btn"
                            onclick="toggleWishlist(${product.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

function openProduct(productId) {

    window.location.href =
        "product.html?id=" +
        encodeURIComponent(productId);

}


function loadProductDetails() {

    const container =
        document.getElementById(
            "productDetails"
        );


    if (!container) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            params.get("id")
        );


    const product =
        products.find(
            p =>
                Number(p.id) ===
                productId
        );


    if (!product) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    Product not found
                </h2>

                <p>
                    The product you're looking for does not exist.
                </p>

                <a
                    href="index.html"
                    class="primary-btn"
                >
                    Back to Shop
                </a>

            </div>

        `;

        return;
    }


    const isWishlisted =
        wishlist.includes(product.id);


    container.innerHTML = `

        <div class="product-detail-container">

            <div class="product-detail-image">

                <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}"
                >

            </div>


            <div class="product-detail-info">

                <p class="product-category">
                    ${escapeHTML(product.category)}
                </p>


                <h1>
                    ${escapeHTML(product.name)}
                </h1>


                <div class="detail-rating">

                    ⭐ ${product.rating}

                </div>


                <div class="detail-price">

                    ${money(product.price)}

                </div>


                ${
                    product.discount
                    ?
                    `<p>
                        🔥 ${product.discount}% OFF
                    </p>`
                    :
                    ""
                }


                <p class="product-description">

                    ${escapeHTML(product.description)}

                </p>


                <div class="detail-buttons">

                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        🛒 Add to Cart
                    </button>


                    <button
                        class="buy-now-btn"
                        onclick="buyNow(${product.id})"
                    >
                        Buy Now
                    </button>


                    <button
                        class="wishlist-btn"
                        onclick="toggleWishlist(${product.id})"
                    >
                        ${
                            isWishlisted
                            ? "❤️ Remove Wishlist"
                            : "🤍 Add Wishlist"
                        }
                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   LOGIN PAGE
   ========================================================= */

function setupAuthPage() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    const signupForm =
        document.getElementById(
            "signupForm"
        );


    if (
        !loginForm &&
        !signupForm
    ) {

        return;
    }


    /* LOGIN */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "loginEmail"
                    )?.value
                        .trim()
                        .toLowerCase();


                const password =
                    document.getElementById(
                        "loginPassword"
                    )?.value;


                const message =
                    document.getElementById(
                        "loginMessage"
                    );


                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>
                            item.email ===
                            email &&
                            item.password ===
                            password
                    );


                if (!user) {

                    if (message) {

                        message.textContent =
                            "Invalid email or password.";

                    }

                    return;
                }


                setCurrentUser({

                    id: user.id,

                    name: user.name,

                    email: user.email

                });


                const redirect =
                    new URLSearchParams(
                        window.location.search
                    ).get("redirect");


                window.location.href =
                    redirect ||
                    "index.html";

            }
        );

    }


    /* SIGNUP */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "signupName"
                    )?.value
                        .trim();


                const email =
                    document.getElementById(
                        "signupEmail"
                    )?.value
                        .trim()
                        .toLowerCase();


                const password =
                    document.getElementById(
                        "signupPassword"
                    )?.value;


                const confirmPassword =
                    document.getElementById(
                        "signupConfirmPassword"
                    )?.value;


                const message =
                    document.getElementById(
                        "signupMessage"
                    );


                if (
                    !name ||
                    !email ||
                    !password
                ) {

                    if (message) {

                        message.textContent =
                            "Please fill all fields.";

                    }

                    return;
                }


                if (
                    password.length < 6
                ) {

                    if (message) {

                        message.textContent =
                            "Password must contain at least 6 characters.";

                    }

                    return;
                }


                if (
                    password !==
                    confirmPassword
                ) {

                    if (message) {

                        message.textContent =
                            "Passwords do not match.";

                    }

                    return;
                }


                const users =
                    getUsers();


                const exists =
                    users.some(
                        user =>
                            user.email ===
                            email
                    );


                if (exists) {

                    if (message) {

                        message.textContent =
                            "An account with this email already exists.";

                    }

                    return;
                }


                const newUser = {

                    id:
                        Date.now(),

                    name:
                        name,

                    email:
                        email,

                    password:
                        password

                };


                users.push(
                    newUser
                );


                saveUsers(users);


                setCurrentUser({

                    id:
                        newUser.id,

                    name:
                        newUser.name,

                    email:
                        newUser.email

                });


                const redirect =
                    new URLSearchParams(
                        window.location.search
                    ).get("redirect");


                window.location.href =
                    redirect ||
                    "index.html";

            }
        );

    }


    /* SHOW SIGNUP */

    const showSignup =
        document.getElementById(
            "showSignup"
        );


    const showLogin =
        document.getElementById(
            "showLogin"
        );


    const signupCard =
        document.getElementById(
            "signupCard"
        );


    const loginCard =
        document.getElementById(
            "loginCard"
        );


    if (showSignup) {

        showSignup.addEventListener(
            "click",
            function() {

                if (loginCard) {
                    loginCard.style.display =
                        "none";
                }

                if (signupCard) {
                    signupCard.style.display =
                        "block";
                }

            }
        );

    }


    if (showLogin) {

        showLogin.addEventListener(
            "click",
            function() {

                if (signupCard) {
                    signupCard.style.display =
                        "none";
                }

                if (loginCard) {
                    loginCard.style.display =
                        "block";
                }

            }
        );

    }

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function setupCheckoutPage() {

    const form =
        document.getElementById(
            "checkoutForm"
        );


    if (!form) {
        return;
    }


    if (!cart.length) {

        const layout =
            document.querySelector(
                ".checkout-layout"
            );


        if (layout) {

            layout.innerHTML = `

                <div class="empty-state">

                    <h2>
                        Your cart is empty 🛒
                    </h2>

                    <p>
                        Add products before checkout.
                    </p>

                    <a
                        href="index.html"
                        class="primary-btn"
                    >
                        Start Shopping
                    </a>

                </div>

            `;

        }

        return;
    }


    const currentUser =
        getCurrentUser();


    /* Prefill user */

    if (currentUser) {

        const name =
            document.getElementById(
                "fullName"
            );

        const email =
            document.getElementById(
                "email"
            );


        if (
            name &&
            !name.value
        ) {

            name.value =
                currentUser.name;

        }


        if (
            email &&
            !email.value
        ) {

            email.value =
                currentUser.email;

        }

    }


    renderCheckoutItems();


    form.addEventListener(
        "submit",
        handleCheckoutSubmit
    );

}


function renderCheckoutItems() {

    const container =
        document.getElementById(
            "checkoutItems"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p =>
                        Number(p.id) ===
                        Number(item.id)
                );


            if (!product) {
                return "";
            }


            return `

                <div class="checkout-item">

                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                    >

                    <div>

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <p>
                            Qty:
                            ${Number(item.quantity || 1)}
                        </p>

                    </div>


                    <strong>
                        ${money(
                            product.price *
                            Number(item.quantity || 1)
                        )}
                    </strong>

                </div>

            `;

        }).join("");


    const subtotal =
        getCartSubtotal();


    const total =
        getCartTotal();


    const subtotalElement =
        document.getElementById(
            "checkoutSubtotal"
        );


    const totalElement =
        document.getElementById(
            "checkoutTotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            money(subtotal);

    }


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


/* =========================================================
   PLACE ORDER
   ========================================================= */

function handleCheckoutSubmit(event) {

    event.preventDefault();


    if (!cart.length) {

        showToast(
            "Your cart is empty"
        );

        return;
    }


    const name =
        document.getElementById(
            "fullName"
        )?.value.trim();


    const phone =
        document.getElementById(
            "phone"
        )?.value.trim();


    const email =
        document.getElementById(
            "email"
        )?.value.trim();


    const address =
        document.getElementById(
            "address"
        )?.value.trim();


    const city =
        document.getElementById(
            "city"
        )?.value.trim();


    const pincode =
        document.getElementById(
            "pincode"
        )?.value.trim();


    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const payment =
        paymentElement
            ? paymentElement.value
            : "cod";


    if (
        !name ||
        !phone ||
        !email ||
        !address ||
        !city ||
        !pincode
    ) {

        showToast(
            "Please fill all delivery details"
        );

        return;
    }


    const subtotal =
        getCartSubtotal();


    const shipping =
        getShipping();


    const total =
        subtotal + shipping;


    const orderId =
        "NXR" +
        Date.now()
            .toString()
            .slice(-8);


    const currentUser =
        getCurrentUser();


    const order = {

        orderId:

            orderId,

        user:

            currentUser
                ? currentUser.email
                : email,

        customer: {

            name:
                name,

            phone:
                phone,

            email:
                email,

            address:
                address,

            city:
                city,

            pincode:
                pincode

        },

        items:

            cart.map(item => ({

                id:
                    item.id,

                name:
                    item.name,

                price:
                    item.price,

                image:
                    item.image,

                quantity:
                    item.quantity

            })),

        subtotal:
            subtotal,

        shipping:
            shipping,

        total:
            total,

        payment:
            payment,

        status:
            "Order Placed",

        date:
            new Date().toISOString()

    };


    const orders =
        getStorage(
            ORDERS_KEY,
            []
        );


    orders.push(order);


    setStorage(
        ORDERS_KEY,
        orders
    );


    setStorage(
        LAST_ORDER_KEY,
        order
    );


    /* Clear cart */

    cart = [];

    saveCart();

    updateCartCount();


    window.location.href =
        "order-success.html";

}


/* =========================================================
   ORDER SUCCESS
   ========================================================= */

function setupOrderSuccess() {

    const orderIdElement =
        document.getElementById(
            "orderId"
        );


    const orderTotalElement =
        document.getElementById(
            "orderTotal"
        );


    if (
        !orderIdElement &&
        !orderTotalElement
    ) {

        return;
    }


    const order =
        getStorage(
            LAST_ORDER_KEY,
            null
        );


    if (!order) {

        if (orderIdElement) {

            orderIdElement.textContent =
                "-";

        }


        if (orderTotalElement) {

            orderTotalElement.textContent =
                "₹0";

        }

        return;
    }


    if (orderIdElement) {

        orderIdElement.textContent =
            order.orderId || "-";

    }


    if (orderTotalElement) {

        orderTotalElement.textContent =
            money(order.total || 0);

    }

}


/* =========================================================
   ACCOUNT PAGE
   ========================================================= */

function setupAccountPage() {

    const accountContainer =
        document.getElementById(
            "accountContainer"
        );


    if (!accountContainer) {
        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        accountContainer.innerHTML = `

            <div class="empty-state">

                <h2>
                    Login Required 🔐
                </h2>

                <p>
                    Please login to view your account and orders.
                </p>

                <a
                    href="login.html?redirect=account.html"
                    class="primary-btn"
                >
                    Login
                </a>

            </div>

        `;

        return;
    }


    const accountName =
        document.getElementById(
            "accountName"
        );


    const accountEmail =
        document.getElementById(
            "accountEmail"
        );


    if (accountName) {

        accountName.textContent =
            currentUser.name;

    }


    if (accountEmail) {

        accountEmail.textContent =
            currentUser.email;

    }


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function() {

                if (
                    confirm(
                        "Do you want to logout?"
                    )
                ) {

                    logout();

                }

            }
        );

    }


    const orders =
        getStorage(
            ORDERS_KEY,
            []
        );


    const userOrders =
        orders
            .filter(
                order =>
                    order.user ===
                    currentUser.email
            )
            .reverse();


    const ordersContainer =
        document.getElementById(
            "ordersContainer"
        );


    if (!ordersContainer) {
        return;
    }


    if (!userOrders.length) {

        ordersContainer.innerHTML = `

            <div class="empty-state">

                <h3>
                    No orders yet 📦
                </h3>

                <p>
                    Your completed orders will appear here.
                </p>

                <a
                    href="index.html"
                    class="primary-btn"
                >
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    ordersContainer.innerHTML =
        userOrders.map(order => {

            const date =
                new Date(
                    order.date
                );


            const formattedDate =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        day:
                            "2-digit",

                        month:
                            "short",

                        year:
                            "numeric"
                    }
                );


            const itemCount =
                order.items
                    ? order.items.reduce(
                        (total, item) =>
                            total +
                            Number(
                                item.quantity || 0
                            ),
                        0
                    )
                    : 0;


            return `

                <div class="order-card">

                    <h3>
                        Order #${escapeHTML(order.orderId)}
                    </h3>

                    <p>
                        📅 ${formattedDate}
                    </p>

                    <p>
                        📦 ${itemCount} item(s)
                    </p>

                    <p>
                        💳 Payment:
                        ${escapeHTML(
                            order.payment || "N/A"
                        )}
                    </p>

                    <p>
                        Status:
                        <strong>
                            ${escapeHTML(
                                order.status || "Order Placed"
                            )}
                        </strong>
                    </p>

                    <h3>
                        Total:
                        ${money(order.total)}
                    </h3>

                </div>

            `;

        }).join("");

}


/* =========================================================
   HOME PAGE
   ========================================================= */

function setupHomePage() {

    const productContainer =
        document.getElementById(
            "productContainer"
        );


    if (!productContainer) {
        return;
    }


    renderCategories();


    const params =
        new URLSearchParams(
            window.location.search
        );


    const search =
        params.get("search");


    if (search) {

        const input =
            document.getElementById(
                "searchInput"
            );


        if (input) {

            input.value =
                search;

        }


        searchProducts();

    } else {

        renderProducts(products);

    }


    const sortSelect =
        document.getElementById(
            "sortSelect"
        );


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            function() {

                sortProducts(
                    this.value
                );

            }
        );

    }


    const shopNowBtn =
        document.getElementById(
            "shopNowBtn"
        );


    if (shopNowBtn) {

        shopNowBtn.addEventListener(
            "click",
            function() {

                const productsSection =
                    document.getElementById(
                        "products"
                    );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchForm =
        document.getElementById(
            "searchForm"
        );


    if (searchForm) {

        searchForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                searchProducts();

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    searchProducts();

                }

            }
        );

    }

}


/* =========================================================
   PRODUCT PAGE SEARCH
   ========================================================= */

function setupProductSearch() {

    const input =
        document.getElementById(
            "productSearchInput"
        );


    if (!input) {
        return;
    }


    input.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                goToSearch();

            }

        }
    );

}


/* =========================================================
   GLOBAL INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        updateWishlistCount();

        updateAuthUI();


        setupHomePage();

        setupProductSearch();

        loadProductDetails();

        setupWishlistPage();

        setupCartPage();

        setupAuthPage();

        setupCheckoutPage();

        setupOrderSuccess();

        setupAccountPage();

    }
);