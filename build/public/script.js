// Simple JavaScript for the furniture store website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would normally send the email to your server
                alert('Спасибо за подписку! Мы будем держать вас в курсе наших новостей и акций.');
                emailInput.value = '';
            }
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.product-actions .btn-primary');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Here you would normally add the product to the cart in your app state
            alert(`Товар "${productName}" добавлен в корзину!`);
        });
    });
    
    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.product-actions .btn-icon');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Toggle active class to show it's been favorited
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.style.backgroundColor = '#8B5A2B';
                this.style.color = 'white';
                // Here you would normally add the product to favorites in your app state
                alert(`Товар "${productName}" добавлен в избранное!`);
            } else {
                this.style.backgroundColor = 'transparent';
                this.style.color = '#666666';
                // Here you would normally remove the product from favorites in your app state
                alert(`Товар "${productName}" удален из избранного!`);
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
});
