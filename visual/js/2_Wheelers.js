// =============================================
// 2_Wheelers.js — Hero Carousel + Dynamic Products
// Theme: Bikes & Cycles (White & Green)
// =============================================

// Hero Carousel Data — Bikes & Cycles
const heroProducts = [
    {
        name: "Apex Mountain Pro X9",
        price: "₹1,03,920",
        tag: "BEST SELLER",
        img: "../assets/hero_bike_1.png",
        link: "2_Wheelers_ProductDetails.html?name=Apex%20Mountain%20Pro%20X9&price=₹1,03,920&img=../assets/hero_bike_1.png&cat=Mountain%20Bikes&rating=4.8&reviews=2450&originalPrice=₹1,75,920&desc=Full%20suspension%20carbon%20fiber%20frame%20with%2029-inch%20wheels.&badge=Best%20Seller",
        bg: "linear-gradient(135deg, rgba(9, 18, 9, 0.92), rgba(13, 38, 13, 0.88)), url('../assets/hero_bike_1.png')",
        desc: "Conquer every trail with the Apex Mountain Pro X9. Full suspension, carbon fiber frame, and 29-inch wheels built for the toughest terrain."
    },
    {
        name: "Velocity Road Racer",
        price: "₹71,920",
        tag: "TRENDING NOW",
        img: "../assets/hero_bike_2.png",
        link: "../template/2_Wheelers_ProductDetails.html?name=Velocity%20Road%20Racer&price=₹71,920&img=../assets/hero_bike_2.png&cat=Road%20Bikes&rating=4.7&reviews=1890&originalPrice=₹1,03,920&badge=Trending",
        bg: "linear-gradient(135deg, rgba(7, 15, 7, 0.9), rgba(20, 40, 20, 0.85)), url('../assets/hero_bike_2.png')",
        desc: "Aerodynamic design meets lightweight engineering. Dominate every road with precision Shimano gears and a featherweight alloy frame."
    },
    {
        name: "EcoVolt E-Bike 500",
        price: "₹1,31,920",
        tag: "NEW ARRIVAL",
        img: "../assets/hero_ebike.png",
        link: "../template/2_Wheelers_ProductDetails.html?name=EcoVolt%20E-Bike%20500&price=₹1,31,920&img=../assets/hero_ebike.png&cat=Electric%20Bikes&rating=4.9&reviews=3120&originalPrice=₹1,75,920&badge=New%20Arrival",
        bg: "linear-gradient(135deg, rgba(5, 12, 5, 0.92), rgba(15, 35, 15, 0.88)), url('../assets/hero_ebike.png')",
        desc: "Go farther, go greener. 500W motor, 80km range, and regenerative braking — the future of urban commuting is electric."
    },
    {
        name: "CityGlide Hybrid 7",
        price: "₹43,920",
        tag: "BEST DEAL",
        img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=600&h=600&fit=crop",
        link: "../template/2_Wheelers_ProductDetails.html?name=CityGlide%20Hybrid%207&price=₹43,920&img=https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&h=300&fit=crop&cat=Hybrid%20Bikes&rating=4.5&reviews=1560&originalPrice=₹59,920&badge=Best%20Deal",
        bg: "linear-gradient(135deg, rgba(10, 20, 10, 0.88), rgba(25, 50, 25, 0.82))",
        desc: "The perfect blend of comfort and speed. 21-speed drivetrain, ergonomic saddle, and puncture-resistant tires for everyday adventures."
    },
    {
        name: "KidStar BMX Blaze",
        price: "₹22,320",
        tag: "KIDS FAVORITE",
        img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=600&h=600&fit=crop",
        link: "../template/2_Wheelers_ProductDetails.html?name=KidStar%20BMX%20Blaze&price=₹22,320&img=https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=400&h=300&fit=crop&cat=BMX%20Bikes&rating=4.6&reviews=980&originalPrice=₹31,920&badge=Kids%20Favorite",
        bg: "linear-gradient(135deg, rgba(8, 16, 8, 0.9), rgba(18, 36, 18, 0.85))",
        desc: "Built tough for young riders. Reinforced steel frame, trick-ready pegs, and vibrant green graphics that pop on the skatepark."
    },
    {
        name: "TrailBlazer Fat Tire",
        price: "₹79,120",
        tag: "ADVENTURE READY",
        img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&h=600&fit=crop",
        link: "../template/2_Wheelers_ProductDetails.html?name=TrailBlazer%20Fat%20Tire&price=₹79,120&img=https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&h=300&fit=crop&cat=Fat%20Tire%20Bikes&rating=4.7&reviews=1240&originalPrice=₹1,03,920&badge=Adventure%20Ready",
        bg: "linear-gradient(135deg, rgba(6, 14, 6, 0.9), rgba(22, 44, 22, 0.86))",
        desc: "4.8-inch fat tires crush sand, snow, and mud. Hydro disc brakes and a dropper post make this beast unstoppable anywhere."
    }
];

// DOM Elements
const carouselInner = document.getElementById('hero-carousel-inner');
const carouselDots = document.getElementById('hero-carousel-nav');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const progressFill = document.getElementById('carousel-progress-fill');

let currentHeroSlide = 0;
let carouselTimer;
const SLIDE_DURATION = 5000; // 5 seconds auto-slide (gives user time to interact)

// ---- Swipe / Drag State ----
let isDragging = false;
let dragStartX = 0;
let dragCurrentX = 0;
let dragStartTime = 0;
const SWIPE_THRESHOLD = 50;       // min px to count as swipe
const VELOCITY_THRESHOLD = 0.3;   // px/ms — fast flick triggers even short swipes

// Render Hero Carousel
function renderHeroCarousel() {
    if (!carouselInner || !carouselDots) return;

    heroProducts.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = product.bg;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';

        slide.innerHTML = `
            <div class="hero-content">
                <div class="hero-text">
                    <span class="category-tag">${product.tag}</span>
                    <h1>Ride The <span style="color:var(--accent-green)">Future</span></h1>
                    <p>${product.desc}</p>
                </div>
                <div class="hero-product-display">
                    <div class="hero-card">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="hero-price">${product.price}</p>
                        <button class="btn-light" onclick="window.location.href='${product.link}'">VIEW PRODUCT</button>
                    </div>
                </div>
            </div>
        `;
        carouselInner.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.onclick = () => showHeroSlide(index, index > currentHeroSlide ? 'next' : 'prev');
        carouselDots.appendChild(dot);
    });

    if (prevBtn) prevBtn.onclick = () => { prevHeroSlide(); };
    if (nextBtn) nextBtn.onclick = () => { nextHeroSlide(); };

    // Attach touch + mouse swipe handlers
    initSwipeHandlers();

    startCarouselAutoPlay();
}

// Show Slide — circular loop via modulo
function showHeroSlide(index, direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    // Wrap index for circular loop
    index = ((index % heroProducts.length) + heroProducts.length) % heroProducts.length;

    if (index === currentHeroSlide) return;

    slides.forEach(s => {
        s.classList.remove('next-slide', 'prev-slide', 'active');
        s.style.transform = '';
        s.style.opacity = '';
    });
    dots.forEach(d => d.classList.remove('active'));

    currentHeroSlide = index;
    const activeSlide = slides[currentHeroSlide];
    activeSlide.classList.add('active');
    activeSlide.classList.add(direction === 'next' ? 'next-slide' : 'prev-slide');
    dots[currentHeroSlide].classList.add('active');

    startCarouselAutoPlay();
}

function nextHeroSlide() {
    let next = (currentHeroSlide + 1) % heroProducts.length;
    showHeroSlide(next, 'next');
}

function prevHeroSlide() {
    let prev = (currentHeroSlide - 1 + heroProducts.length) % heroProducts.length;
    showHeroSlide(prev, 'prev');
}

// Auto-Play with Progress Bar
function startCarouselAutoPlay() {
    clearInterval(carouselTimer);

    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = '0%';
        progressFill.offsetHeight; // force reflow
        progressFill.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressFill.style.width = '100%';
    }

    carouselTimer = setInterval(nextHeroSlide, SLIDE_DURATION);
}

function pauseCarouselAutoPlay() {
    clearInterval(carouselTimer);
    if (progressFill) {
        progressFill.style.transition = 'none';
        progressFill.style.width = progressFill.offsetWidth + 'px'; // freeze
    }
}

// =============================================
// Touch + Mouse Swipe / Drag Handlers
// =============================================
function initSwipeHandlers() {
    const carousel = document.querySelector('.hero-carousel');
    if (!carousel) return;

    // Prevent image dragging interfering
    carousel.addEventListener('dragstart', e => e.preventDefault());

    // --- Touch Events ---
    carousel.addEventListener('touchstart', onDragStart, { passive: true });
    carousel.addEventListener('touchmove', onDragMove, { passive: false });
    carousel.addEventListener('touchend', onDragEnd);
    carousel.addEventListener('touchcancel', onDragEnd);

    // --- Mouse Events ---
    carousel.addEventListener('mousedown', onDragStart);
    carousel.addEventListener('mousemove', onDragMove);
    carousel.addEventListener('mouseup', onDragEnd);
    carousel.addEventListener('mouseleave', onDragEnd);
}

function getClientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
    // Don't hijack button clicks
    if (e.target.closest('.carousel-control, .carousel-dot, .btn-light, .add-to-cart')) return;

    isDragging = true;
    dragStartX = getClientX(e);
    dragCurrentX = dragStartX;
    dragStartTime = Date.now();

    pauseCarouselAutoPlay();

    // Add grabbing cursor
    document.querySelector('.hero-carousel').style.cursor = 'grabbing';

    // Show active slide immediately for drag feedback
    const activeSlide = document.querySelectorAll('.carousel-slide')[currentHeroSlide];
    if (activeSlide) {
        activeSlide.style.transition = 'none';
    }
}

function onDragMove(e) {
    if (!isDragging) return;

    // Prevent vertical scroll while swiping horizontally
    if (e.cancelable && e.touches) e.preventDefault();

    dragCurrentX = getClientX(e);
    const deltaX = dragCurrentX - dragStartX;

    // Visual drag feedback — shift the active slide
    const activeSlide = document.querySelectorAll('.carousel-slide')[currentHeroSlide];
    if (activeSlide) {
        const dampedDelta = deltaX * 0.4; // Dampen for smooth feel
        activeSlide.style.transform = `translateX(${dampedDelta}px)`;
        // Slight opacity reduction while dragging
        activeSlide.style.opacity = `${1 - Math.abs(deltaX) / 1500}`;
    }
}

function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    document.querySelector('.hero-carousel').style.cursor = '';

    const deltaX = dragCurrentX - dragStartX;
    const elapsed = Date.now() - dragStartTime;
    const velocity = Math.abs(deltaX) / elapsed; // px/ms

    // Reset the visual offset on the current slide
    const activeSlide = document.querySelectorAll('.carousel-slide')[currentHeroSlide];
    if (activeSlide) {
        activeSlide.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        activeSlide.style.transform = '';
        activeSlide.style.opacity = '';
    }

    // Determine swipe direction — threshold or velocity based
    if (Math.abs(deltaX) > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
        if (deltaX < 0) {
            // Swiped LEFT → go to NEXT slide (circular)
            nextHeroSlide();
        } else {
            // Swiped RIGHT → go to PREV slide (circular)
            prevHeroSlide();
        }
    } else {
        // Didn't swipe far enough — snap back and resume auto-play
        startCarouselAutoPlay();
    }
}

// =============================================
// Dynamic Product Categories — 2 Wheelers
// =============================================

const categories = [
    { name: "Premium Mountain Bikes", tagline: "CONQUER EVERY TRAIL" },
    { name: "Road & Racing Bikes", tagline: "SPEED MACHINES" },
    { name: "Electric Bikes", tagline: "RIDE THE FUTURE" },
    { name: "Cycling Helmets", tagline: "SAFETY FIRST" },
    { name: "Bike Locks & Security", tagline: "PROTECT YOUR RIDE" },
    { name: "Cycling Gloves", tagline: "GRIP & COMFORT" },
    { name: "Bike Lights & Reflectors", tagline: "BE SEEN, BE SAFE" },
    { name: "Tyres & Inner Tubes", tagline: "ROLL ON" },
    { name: "Cycling Apparel", tagline: "RIDE IN STYLE" },
    { name: "Bike Repair Kits", tagline: "FIX IT FAST" },
    { name: "Water Bottles & Cages", tagline: "STAY HYDRATED" },
    { name: "Saddles & Seats", tagline: "COMFORT ZONE" },
    { name: "Bike Pumps", tagline: "PRESSURE PERFECT" },
    { name: "Cycling Shoes", tagline: "PEDAL POWER" },
    { name: "Bike Stands & Storage", tagline: "PARK SMART" },
    { name: "GPS & Bike Computers", tagline: "TRACK YOUR RIDE" },
    { name: "Kids Bikes & Gear", tagline: "LITTLE RIDERS" },
    { name: "Bike Bells & Horns", tagline: "RING THE RIDE" },
    { name: "Panniers & Bike Bags", tagline: "CARRY IT ALL" }
];

const products = [
    { name: "Pro Edition", price: "₹11,999", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=300&fit=crop" },
    { name: "Trail Master", price: "₹7,120", img: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=400&h=300&fit=crop" },
    { name: "Urban Cruiser", price: "₹15,920", img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=400&h=300&fit=crop" },
    { name: "Speed Elite", price: "₹19,960", img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=400&h=300&fit=crop" }
];

const badges = [
    { text: "Best Seller", class: "badge-best" },
    { text: "Top Pick", class: "badge-deal" },
    { text: "New", class: "badge-new" },
    { text: "Trending", class: "badge-best" }
];

function renderDynamicCategories() {
    const container = document.getElementById('dynamic-categories');
    if (!container) return;

    categories.forEach((catObj, index) => {
        const section = document.createElement('section');
        section.className = 'container';
        // Alternate white and light-green backgrounds
        section.style.background = index % 2 === 0 ? '#ffffff' : 'var(--light-green)';

        section.innerHTML = `
            <div class="section-header">
                <div>
                    <span class="section-tagline">${catObj.tagline}</span>
                    <h2>${catObj.name}</h2>
                </div>
                <a href="2_Wheelers_AllProducts.html" class="view-all">View All <i class="fas fa-chevron-right"></i></a>
            </div>
            <div class="product-scroll-container">
                ${products.map(p => {
            const b = badges[Math.floor(Math.random() * badges.length)];
            const rating = (4 + Math.random()).toFixed(1);
            const reviews = Math.floor(Math.random() * 2000) + 500;
            return `
                    <div class="product-card" onclick="window.location.href='2_Wheelers_ProductDetails.html?name=${encodeURIComponent(catObj.name + ' ' + p.name)}&price=${encodeURIComponent(p.price)}&img=${encodeURIComponent(p.img)}&cat=${encodeURIComponent(catObj.name)}&badge=${encodeURIComponent(b.text)}&rating=${rating}&reviews=${reviews}'">
                        <div class="image-wrapper">
                            <img src="${p.img}" class="product-image" alt="${p.name}">
                            <span class="product-badge ${b.class}">${b.text}</span>
                        </div>
                        <div class="product-info">
                            <h3>${p.name}</h3>
                            <div class="rating">
                                <i class="fas fa-star"></i> ${rating} <span>(${reviews})</span>
                            </div>
                            <div class="product-price">
                                <span class="price-current">${p.price}</span>
                            </div>
                            <div class="action-buttons">
                                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.name}', '${p.price}', '${p.img}')">
                                    <i class="fas fa-shopping-cart"></i> Add
                                </button>
                                <button class="btn-buy-now" onclick="event.stopPropagation(); buyNow('${p.name}', '${p.price}', '${p.img}')">
                                    <i class="fas fa-bolt"></i> Buy
                                </button>
                            </div>
                        </div>
                    </div>
                    `;
        }).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

function buyNow(pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    const product = {
        name: pName,
        price: numericPrice,
        image: pImg
    };
    sessionStorage.setItem('um_cart', JSON.stringify([product]));
    window.location.href = '../../templates/payment_gateway.html';
}

function addToCart(pName, pPrice, pImg) {
    const numericPrice = parseInt(pPrice.replace(/[^0-9]/g, ''));
    let cart = JSON.parse(sessionStorage.getItem('um_cart') || '[]');
    cart.push({
        name: pName,
        price: numericPrice,
        image: pImg
    });
    sessionStorage.setItem('um_cart', JSON.stringify(cart));
    if (window.updateCartBadge) window.updateCartBadge();
    
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${pName} added to cart!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animations for toast
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    renderHeroCarousel();
    renderDynamicCategories();
    
});
