// ====== ULTIMATE PORTFOLIO SCRIPT ======

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 NEXUS PORTFOLIO LOADED! 🔥');
    
    // ====== PRELOADER ======
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('loaded');
            
            // Start all animations after preloader
            initAnimations();
        }, 500);
    }, 2000);

    // ====== CUSTOM CURSOR ======
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Move cursor with mouse
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Outline follows with delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, {
            duration: 500,
            fill: 'forwards'
        });
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .tech-item, .project-card, .skill-category');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        });
    });

    // ====== THEME TOGGLE ======
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('nexus-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition
        html.style.transition = 'all 0.5s ease';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('nexus-theme', newTheme);
        
        // Add sparkle effect
        createSparkles(50);
        
        // Remove transition after animation
        setTimeout(() => {
            html.style.transition = '';
        }, 500);
    });

    // ====== MOBILE MENU ======
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ====== SCROLL PROGRESS ======
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
        
        // Header effect on scroll
        const header = document.querySelector('.glass-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ====== BACK TO TOP ======
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add bounce effect
        backToTop.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTop.style.transform = '';
        }, 300);
    });

    // ====== TYPING EFFECT ======
    const typingText = document.querySelector('.typing-text');
    const words = ['EXPERIENCES', 'SOLUTIONS', 'WEBSITES', 'APPS', 'DREAMS'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting chars
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing chars
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Speed variations
        let typeSpeed = isDeleting ? 50 : 100;
        
        // If word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing after preloader
    setTimeout(typeEffect, 2500);

    // ====== ANIMATED COUNTERS ======
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Start counters when hero section is in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    heroObserver.observe(document.getElementById('home'));

    // ====== SKILL BARS ANIMATION ======
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = `${width}%`;
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 300);
        });
    }
    
    // Animate when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (document.getElementById('skills')) {
        skillsObserver.observe(document.getElementById('skills'));
    }

    // ====== SKILL CATEGORIES ======
    const categories = document.querySelectorAll('.category');
    const categoryContents = document.querySelectorAll('.skill-category-content');
    
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all
            categories.forEach(c => c.classList.remove('active'));
            categoryContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            category.classList.add('active');
            const categoryId = category.getAttribute('data-category');
            document.getElementById(categoryId).classList.add('active');
            
            // Add click effect
            category.style.transform = 'scale(0.95)';
            setTimeout(() => {
                category.style.transform = '';
            }, 200);
        });
    });

    // ====== PROJECT FILTER ======
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ====== CONTACT FORM ======
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('🎉 Message sent successfully!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
                
                // Add celebration effect
                createConfetti(100);
            }, 2000);
        });
    }

    // ====== SCROLL INDICATOR ======
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });

    // ====== PARTICLE BACKGROUND ======
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--primary);
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: floatParticle ${duration}s linear ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ====== FLOATING ANIMATIONS ======
    function initAnimations() {
        // Add floating animation to elements
        const floatingElements = document.querySelectorAll('.tech-item, .badge, .project-card');
        
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('float-in');
        });
        
        // Create particles
        createParticles();
        
        // Add CSS for float-in animation
        const floatStyle = document.createElement('style');
        floatStyle.textContent = `
            .float-in {
                animation: floatElement 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                opacity: 0;
                transform: translateY(30px);
            }
            
            @keyframes floatElement {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(floatStyle);
    }

    // ====== NOTIFICATION SYSTEM ======
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--glass);
                backdrop-filter: blur(20px);
                border: var(--border);
                border-radius: var(--radius);
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 9999;
                transform: translateX(100%);
                opacity: 0;
                animation: slideIn 0.3s ease forwards;
                max-width: 400px;
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--text);
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: var(--transition);
            }
            
            .notification-close:hover {
                color: var(--primary);
                background: rgba(99, 102, 241, 0.1);
            }
            
            @keyframes slideIn {
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(notificationStyle);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
                notificationStyle.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    notification.remove();
                    notificationStyle.remove();
                }, 300);
            }
        }, 5000);
    }

    // ====== SPARKLE EFFECT ======
    function createSparkles(count) {
        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            const duration = Math.random() * 1 + 0.5;
            const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            sparkle.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${posX}px;
                top: ${posY}px;
                pointer-events: none;
                z-index: 9998;
                opacity: 0;
                transform: scale(0);
                animation: sparkle ${duration}s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            // Remove after animation
            setTimeout(() => {
                sparkle.remove();
            }, duration * 1000);
        }
        
        // Add sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkle {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(sparkleStyle);
        
        // Remove style after animation
        setTimeout(() => {
            sparkleStyle.remove();
        }, 1000);
    }

    // ====== CONFETTI EFFECT ======
    function createConfetti(count) {
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const width = Math.random() * 10 + 5;
            const height = Math.random() * 10 + 5;
            const posX = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 1;
            const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = Math.random() > 0.5 ? 'circle' : 'rect';
            
            confetti.style.cssText = `
                position: fixed;
                width: ${width}px;
                height: ${height}px;
                background: ${color};
                border-radius: ${shape === 'circle' ? '50%' : '2px'};
                left: ${posX}px;
                top: -20px;
                pointer-events: none;
                z-index: 9998;
                opacity: 0;
                transform: rotate(0deg);
                animation: confettiFall ${duration}s ease-out ${delay}s forwards;
            `;
            
            document.body.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
        
        // Add confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg);
                }
                10% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(100vh) rotate(${Math.random() * 720 - 360}deg);
                }
            }
        `;
        document.head.appendChild(confettiStyle);
        
        // Remove style after animation
        setTimeout(() => {
            confettiStyle.remove();
        }, 4000);
    }

    // ====== KEYBOARD SHORTCUTS ======
    document.addEventListener('keydown', (e) => {
        // Toggle theme with Ctrl/Cmd + T
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Toggle menu with Ctrl/Cmd + M
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            menuToggle.click();
        }
        
        // Show secret message with Ctrl/Cmd + Shift + U
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'U') {
            e.preventDefault();
            showNotification('🎮 You found the secret! UMMMAAAWWWHHH! 😄', 'success');
            createConfetti(200);
        }
    });

    // ====== PAGE VISIBILITY ======
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Tab became visible - add welcome back effect
            document.title = '👋 Welcome Back! | Nexus';
            setTimeout(() => {
                document.title = 'Ghulam Rasool | Nexus Pro';
            }, 2000);
        }
    });

    // ====== CONSOLE GREETING ======
    console.log('%c🚀 NEXUS PORTFOLIO 🚀', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cBuilt with ❤️ by Ghulam Rasool', 'font-size: 16px; color: #8b5cf6;');
    console.log('%cUMAAAAWWWHHH! 😄', 'font-size: 18px; color: #06b6d4; font-weight: bold;');
    console.log('%cTry these shortcuts:', 'font-size: 14px; color: #10b981;');
    console.log('%c• Ctrl+T: Toggle Theme', 'color: #f59e0b;');
    console.log('%c• Ctrl+M: Toggle Menu', 'color: #f59e0b;');
    console.log('%c• Ctrl+Shift+U: Secret!', 'color: #ef4444;');
});

// ====== WINDOW LOAD EVENT ======
window.addEventListener('load', function() {
    // Ensure everything is loaded
    setTimeout(() => {
        // Add loaded class for final transitions
        document.body.classList.add('fully-loaded');
        
        // Show welcome message
        setTimeout(() => {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--glass);
                    backdrop-filter: blur(20px);
                    border: var(--border);
                    border-radius: var(--radius-xl);
                    padding: 2rem;
                    text-align: center;
                    z-index: 9999;
                    animation: fadeInOut 2s ease forwards;
                ">
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">🚀 NEXUS READY!</h3>
                    <p style="color: var(--text-light);">Portfolio Successfully Loaded!</p>
                </div>
            `;
            
            document.body.appendChild(welcomeMsg);
            
            // Remove after animation
            setTimeout(() => {
                welcomeMsg.remove();
            }, 2000);
            
            // Add CSS for animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                style.remove();
            }, 2000);
        }, 500);
    }, 1000);
});

// ====== RESIZE HANDLER ======
window.addEventListener('resize', function() {
    // Update any responsive elements here
    const header = document.querySelector('.glass-header');
    if (window.innerWidth > 768) {
        header.classList.remove('scrolled');
    }
});

// ====== ERROR HANDLING ======
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    // You could send this to an analytics service
});

// ====== PERFORMANCE MONITORING ======
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navTiming = perfEntries[0];
                console.log('Page loaded in:', navTiming.loadEventEnd - navTiming.startTime, 'ms');
            }
        }, 0);
    });
}

// ====== SERVICE WORKER FOR PWA (Optional) ======
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ====== FINAL CELEBRATION ======
setTimeout(() => {
    console.log('%c🎉 CONGRATULATIONS! 🎉', 'font-size: 32px; font-weight: bold; color: #8b5cf6;');
    console.log('%cYour ULTIMATE Portfolio is READY!', 'font-size: 20px; color: #06b6d4;');
    console.log('%cGo ahead and deploy it! 🚀', 'font-size: 18px; color: #10b981; font-weight: bold;');
}, 3000);