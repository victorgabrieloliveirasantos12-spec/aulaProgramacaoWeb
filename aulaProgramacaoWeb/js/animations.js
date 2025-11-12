// Enhanced menu toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('#main-nav');
    const submenuItems = document.querySelectorAll('.has-submenu');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            
            // Animate hamburger
            menuToggle.classList.toggle('active');
        });
    }

    // Handle submenu interactions
    submenuItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');

        if (link && submenu) {
            // For touch devices
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    submenu.style.display = 
                        submenu.style.display === 'block' ? 'none' : 'block';
                }
            });

            // For keyboard navigation
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    submenu.style.display = 
                        submenu.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, section').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Add some animation classes to our CSS
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .slide-in {
        animation: slideIn 0.3s ease-out forwards;
    }
`;
document.head.appendChild(style);