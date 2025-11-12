import { $, $$ } from '../config.js';
import { APP_CONFIG } from '../config.js';

export class AnimationManager {
    constructor() {
        this.menuToggle = $('.menu-toggle');
        this.mainNav = $('#main-nav');
        this.submenuItems = $$('.has-submenu');
        this.observer = null;
    }

    init() {
        this.setupMenuToggle();
        this.setupSubmenuInteractions();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
        this.injectAnimationStyles();
    }

    setupMenuToggle() {
        if (this.menuToggle && this.mainNav) {
            this.menuToggle.addEventListener('click', () => {
                const isExpanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
                this.menuToggle.setAttribute('aria-expanded', !isExpanded);
                this.mainNav.classList.toggle('active');
                this.menuToggle.classList.toggle('active');
            });
        }
    }

    setupSubmenuInteractions() {
        this.submenuItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.submenu');

            if (link && submenu) {
                // Para dispositivos touch
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= APP_CONFIG.ui.breakpoints.mobile) {
                        e.preventDefault();
                        submenu.style.display = 
                            submenu.style.display === 'block' ? 'none' : 'block';
                    }
                });

                // Para navegação por teclado
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        submenu.style.display = 
                            submenu.style.display === 'block' ? 'none' : 'block';
                    }
                });
            }
        });
    }

    setupSmoothScroll() {
        $$('a[href^="#"]').forEach(anchor => {
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
    }

    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Não remover a observação para elementos que precisam
                    // de animação constante (como o hero)
                    if (!entry.target.classList.contains('hero')) {
                        this.observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observar elementos com animação
        $$('.animate-on-scroll').forEach(el => {
            this.observer.observe(el);
        });

        // Configurar o efeito de digitação do hero
        this.setupTypewriterEffect();
    }

    setupTypewriterEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (!heroTitle) return;

        const originalText = heroTitle.innerHTML;
        const highlight = heroTitle.querySelector('.highlight');
        const words = originalText.split(' ');
        heroTitle.textContent = '';

        if (highlight) {
            highlight.style.opacity = '0';
            highlight.style.animation = 'fadeIn 0.5s ease forwards 0.5s';
        }
        
        words.forEach((word, index) => {
            if (word.trim()) {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.opacity = '0';
                span.style.animation = `fadeIn 0.5s ease forwards ${index * 0.15}s`;
                heroTitle.appendChild(span);
            }
        });
    }

    injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(20px);
                transition: all var(--transition-normal);
            }

            .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY(0);
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }

            .animate-float {
                animation: float 6s ease-in-out infinite;
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

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            .slide-in {
                animation: slideIn 0.6s ease-out forwards;
            }

            .fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }

            .menu-toggle.active {
                transform: rotate(180deg);
            }

            .submenu {
                transition: transform 0.3s ease-out;
                transform-origin: top;
            }

            .submenu.active {
                transform: scaleY(1);
            }
        `;
        document.head.appendChild(style);
    }
}