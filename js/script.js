document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. MOBILE MENU TOGGLE
    // ============================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // ============================================================
    // 2. ACTIVE NAV LINK HIGHLIGHTING
    // ============================================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('nav-active');
        }
    });

    // ============================================================
    // 3. SCROLL REVEAL — Intersection Observer
    // ============================================================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ============================================================
    // 4. TYPING ANIMATION — Hero subtitle
    // ============================================================
    const typingElement = document.getElementById('typing-text');

    if (typingElement) {
        const phrases = [
            'Full Stack Developer',
            'MERN Stack Enthusiast',
            'Problem Solver',
            'Tech Explorer'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400; // Pause before next phrase
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    // ============================================================
    // 5. COUNTER ANIMATION — Stats
    // ============================================================
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-count'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const isDecimal = target % 1 !== 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out cubic
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = target * easeOut;

                        if (isDecimal) {
                            counter.textContent = current.toFixed(2) + suffix;
                        } else {
                            counter.textContent = Math.floor(current) + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (isDecimal) {
                                counter.textContent = target.toFixed(2) + suffix;
                            } else {
                                counter.textContent = target + suffix;
                            }
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(c => counterObserver.observe(c));
    }

    // ============================================================
    // 6. HEADER SCROLL EFFECT
    // ============================================================
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
            header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        } else {
            header.style.boxShadow = '';
            header.style.borderBottomColor = '';
        }

        lastScroll = currentScroll;
    }, { passive: true });

});
