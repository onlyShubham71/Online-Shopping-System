// =============================================
// grocery_productDetails.js
// Handles dynamic population and interactions
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    const name = params.get('name');
    const price = params.get('price');
    const img = params.get('img');
    const sub = params.get('sub');
    const badge = params.get('badge');

    if (name) {
        document.getElementById('product-title').innerText = name;
        document.title = `${name} - sprout. Details`;
    }
    if (price) document.getElementById('product-price').innerText = price;
    if (img) document.getElementById('product-img').src = img;
    if (sub) document.getElementById('spec-weight').innerText = sub;
    
    if (badge) {
        const badgeEl = document.getElementById('product-badge');
        badgeEl.innerText = badge;
        badgeEl.style.display = 'block';
    }

    // --- WISHLIST SYNC ---
    const likeBtn = document.getElementById('like-btn');
    let wishlist = JSON.parse(localStorage.getItem('pbssd_wishlist') || '[]');
    
    const checkWishlist = () => {
        const isLiked = wishlist.some(item => item.name === name);
        likeBtn.classList.toggle('liked', isLiked);
        likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    };
    checkWishlist();

    likeBtn.addEventListener('click', () => {
        const index = wishlist.findIndex(item => item.name === name);
        if (index === -1) {
            wishlist.push({ name, price, img });
            Swal.fire({ title: 'Saved!', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, icon: 'success' });
        } else {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('pbssd_wishlist', JSON.stringify(wishlist));
        checkWishlist();
    });

    // --- ADD TO CART SYNC ---
    const atcBtn = document.getElementById('pd-atc-btn');
    atcBtn.addEventListener('click', () => {
        // IndexedDB Logic for persistence (matching grocery.html)
        const request = indexedDB.open('PBSSDCartDB', 1);
        request.onsuccess = (e) => {
            const db = e.target.result;
            const tx = db.transaction(['cart_state'], 'readwrite');
            const store = tx.objectStore('cart_state');
            
            const getReq = store.get('count');
            getReq.onsuccess = () => {
                let count = getReq.result || 0;
                count++;
                store.put(count, 'count');
                
                // Visual Feedback
                atcBtn.innerHTML = '<i class="fas fa-check"></i> ADDED';
                atcBtn.style.background = '#5A8A5A';
                atcBtn.style.color = '#fff';
                
                Swal.fire({
                    title: 'Added to bag!',
                    text: `${name} is ready for checkout.`,
                    icon: 'success', 
                    toast: true, 
                    position: 'top-end',
                    showConfirmButton: false, 
                    timer: 1500
                });

                setTimeout(() => {
                    atcBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> ADD TO BAG';
                    atcBtn.style.background = '';
                    atcBtn.style.color = '';
                }, 2000);
            };
        };
        
        // Also store actual items in localStorage if cart.html expects it
        let cartItems = JSON.parse(localStorage.getItem('pbssd_cart') || '[]');
        cartItems.push({ name, price, img, id: Date.now() });
        localStorage.setItem('pbssd_cart', JSON.stringify(cartItems));
    });
});