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
        const price = parseFloat(productPrice.replace('$', ''));
        
        // Check if item already exists in cart
        const existingItem = Array.from(cartItems.children).find(
            item => item.querySelector('.item-name').textContent === productName
        );

        if (existingItem) {
            // Update quantity if item exists
            const quantitySpan = existingItem.querySelector('.quantity');
            const quantity = parseInt(quantitySpan.textContent) + 1;
            quantitySpan.textContent = quantity;
        } else {
            // Add new item if it doesn't exist
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span class="item-name">${productName}</span>
                <span class="price">${productPrice}</span>
                <span class="quantity">1</span>
                <button class="remove-item">Remove</button>
            `;
            cartItems.appendChild(cartItem);

            // Add remove functionality
            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                cartItem.remove();
                updateCartTotal();
            });
        }
        
        updateCartTotal();
        alert(`${productName} added to cart!`);
    }

    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.price').textContent;
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const price = parseFloat(priceText.replace('$', ''));
            total += price * quantity;
        });
        
        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
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
        cartItems.innerHTML = "";  // Clear the cart items
        updateCartTotal();  // Reset the total to $0.00
    });

    closeThankYou.addEventListener("click", () => {
        thankYouModal.style.display = "none";
        cartItems.innerHTML = "";  // Clear the cart items after checkout
    });
});

// Get modal elements
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const closeLogin = document.getElementById('close-login');
const closeSignup = document.getElementById('close-signup');

// Store user data (in real app, this would be in a database)
let users = [
    // Add a test user for development
    {
        name: "izhaan",
        email: "izhaan@gmail.com",
        password: "izhaan123"
    }
];
let currentUser = null;

// Event Listeners
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'flex';
});

closeLogin.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.getElementById('login-form').reset();
});

closeSignup.addEventListener('click', () => {
    signupModal.style.display = 'none';
    document.getElementById('signup-form').reset();
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Find user
    const user = users.find(u => u.email === email);
    
    if (user && user.password === password) {
        currentUser = user;
        loginModal.style.display = 'none';
        loginLink.textContent = `Welcome, ${user.name}`;
        document.getElementById('login-form').reset();
        alert('Successfully logged in!');
        
        // Optional: Log the current users array and logged-in user for debugging
        console.log('Current users:', users);
        console.log('Logged in user:', currentUser);
    } else {
        alert('Invalid email or password');
    }
});

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    // Basic validation
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    
    // Clear form and close modal
    document.getElementById('signup-form').reset();
    signupModal.style.display = 'none';
    
    // Optional: Log the updated users array for debugging
    console.log('Updated users:', users);
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.getElementById('login-form').reset();
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
        document.getElementById('signup-form').reset();
    }
});
