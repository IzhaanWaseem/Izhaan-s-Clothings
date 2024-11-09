document.addEventListener('DOMContentLoaded', () => {
    // Form validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields');
        } else {
            alert('Message sent successfully');
            contactForm.reset();
        }
    });
    
    // Dynamic welcome message
    const heroSection = document.getElementById('hero');
    const currentTime = new Date().getHours();
    let greeting;
    
    if (currentTime < 12) {
        greeting = 'Good Morning';
    } else if (currentTime < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    
    const welcomeMessage = document.createElement('p');
    welcomeMessage.textContent = `${greeting}, welcome to Izhaan's Clothings!`;
    heroSection.appendChild(welcomeMessage);
    
    // Product filter
    const productFilter = document.getElementById('product-filter');
    productFilter.addEventListener('keyup', () => {
        const filterValue = productFilter.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(filterValue)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Login modal functionality
    const loginLink = document.getElementById('login-link');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');

    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        loginModal.style.display = 'flex';
    });

    loginModal.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === '' || password === '') {
            alert('Please fill in all fields');
        } else {
            alert('Login successful');
            loginModal.style.display = 'none';
            loginForm.reset();
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const cartLink = document.getElementById("cart-link");
    const cartModal = document.getElementById("cart-modal");
    const thankYouModal = document.getElementById("thank-you-modal");
    const closeCart = document.getElementById("close-cart");
    const closeThankYou = document.getElementById("close-thank-you");
    const checkoutBtn = document.getElementById("checkout-btn");
    const cartItems = document.getElementById("cart-items");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button) => {
        // Remove any existing event listeners before adding a new one
        button.removeEventListener("click", handleAddToCart);
        button.addEventListener("click", handleAddToCart);
    });

    function handleAddToCart(e) {
        const productCard = e.target.closest(".product-card");
        const productName = productCard.querySelector("h3").innerText;
        const productPrice = productCard.querySelector("p").innerText;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `<p>${productName} - ${productPrice}</p>`;
        cartItems.appendChild(cartItem);
        alert(`${productName} added to cart!`);
    }

    cartLink.addEventListener("click", (e) => {
        e.preventDefault();
        cartModal.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    checkoutBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
        thankYouModal.style.display = "block";
    });

    closeThankYou.addEventListener("click", () => {
        thankYouModal.style.display = "none";
        cartItems.innerHTML = "";  // Clear the cart items after checkout
    });
});
