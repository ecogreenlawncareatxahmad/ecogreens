// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        
        // toggle button state
        hamburger.classList.toggle('active');
        const isActive = hamburger.classList.contains('active');
        
        // show/hide menu - force the class
        if (isActive) {
            navMenu.classList.add('active');
        } else {
            navMenu.classList.remove('active');
        }
        
        // prevent background scrolling when nav is open
        if (isActive) {
            document.body.classList.add('nav-open');
        } else {
            document.body.classList.remove('nav-open');
        }
        
        // accessibility: reflect expanded state
        try { 
            hamburger.setAttribute('aria-expanded', String(isActive)); 
        } catch(e){}
        
        // Debug log
        console.log('Menu toggled:', isActive);
        console.log('Menu has active class:', navMenu.classList.contains('active'));
        console.log('Menu computed style:', window.getComputedStyle(navMenu).transform);
    });
}

// Close mobile menu when clicking outside the menu (on mobile only)
document.addEventListener('click', (e) => {
    if (!navMenu || !hamburger) return;
    const isOpen = navMenu.classList.contains('active');
    if (!isOpen) return;
    const target = e.target;
    if (!navMenu.contains(target) && !hamburger.contains(target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            try { hamburger.setAttribute('aria-expanded', 'false'); } catch(e){}
        }
    }
});

// Close nav if viewport is resized to desktop width
const NAV_BREAKPOINT = 1260; // must match CSS (when hamburger appears at 1260px)
window.addEventListener('resize', () => {
    try {
        if (window.innerWidth > NAV_BREAKPOINT) {
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                try { hamburger.setAttribute('aria-expanded', 'false'); } catch(e){}
            }
        }
    } catch (e) { /* ignore in older browsers */ }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link, .nav-social-link-mobile').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            try { hamburger.setAttribute('aria-expanded', 'false'); } catch(e){}
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hero Video - Ensure video plays and handle autoplay restrictions
const heroVideo = document.getElementById('heroVideo') || document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    // Ensure the element attempts to load sources (helps when a local file is present)
    try { heroVideo.load(); } catch (e) { /* ignore */ }

    const heroPlayBtn = document.getElementById('heroPlay');

    const playHero = async () => {
        try {
            const p = heroVideo.play();
            if (p !== undefined) await p;
            // hide play button when playing
            if (heroPlayBtn) heroPlayBtn.style.display = 'none';
            return true;
        } catch (err) {
            console.log('Hero video autoplay prevented or failed:', err);
            // show play button so user can start the video
            if (heroPlayBtn) heroPlayBtn.style.display = 'flex';
            return false;
        }
    };

    // Try to play immediately and on load events
    playHero();
    heroVideo.addEventListener('loadedmetadata', playHero);
    heroVideo.addEventListener('loadeddata', playHero);
    heroVideo.addEventListener('canplay', playHero);

    // If play was prevented, allow the play button to start playback
    if (heroPlayBtn) {
        heroPlayBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            // Attempt to play again (user interaction)
            await playHero();
        });
    }

    // Attempt to play after first user interaction
    ['click','touchstart','scroll','keydown'].forEach(evt => {
        document.addEventListener(evt, playHero, { once: true });
    });

    // If paused while visible, try to resume and show play button when paused
    heroVideo.addEventListener('pause', () => {
        if (document.visibilityState === 'visible') playHero();
        if (heroPlayBtn) heroPlayBtn.style.display = 'flex';
    });

    // Hide play button when video starts playing
    heroVideo.addEventListener('playing', () => {
        if (heroPlayBtn) heroPlayBtn.style.display = 'none';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
// const contactForm = document.getElementById('contactForm');

// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         // Get form data
//         const formData = {
//             name: document.getElementById('name').value,
//             email: document.getElementById('email').value,
//             phone: document.getElementById('phone').value,
//             service: document.getElementById('service').value,
//             message: document.getElementById('message').value
//         };
        
//         // Here you would typically send this to a server
//         // For now, we'll just show an alert and log it
//         console.log('Form submitted:', formData);
        
//         // Show success message
//         alert('Thank you for your message! We will get back to you soon.');
        
//         // Reset form
//         contactForm.reset();
        
//         // In a real implementation, you would:
//         // 1. Send data to your backend/email service
//         // 2. Show a proper success message
//         // 3. Handle errors appropriately
//     });
// }

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, gallery items, and highlight cards
document.querySelectorAll('.service-card, .gallery-item, .highlight-card, .testimonial-card, .showcase-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Before/After Slider Functionality with Draggable Divider
document.querySelectorAll('.before-after-slider').forEach(slider => {
    const container = slider.querySelector('.slider-image-container');
    const afterImage = container.querySelector('.after-image');
    const divider = container.querySelector('.slider-divider');
    
    if (!container || !afterImage || !divider) return;
    
    let isDragging = false;
    
    const updateSlider = (clientX) => {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        
        divider.style.left = percentage + '%';
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };
    
    const handleMouseDown = (e) => {
        isDragging = true;
        container.style.cursor = 'col-resize';
        e.preventDefault();
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    };
    
    const handleMouseUp = () => {
        isDragging = false;
        container.style.cursor = 'col-resize';
    };
    
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        if (touch) {
            updateSlider(touch.clientX);
        }
    };
    
    // Mouse events
    divider.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousedown', (e) => {
        if (e.target === container || e.target === container.querySelector('img')) {
            handleMouseDown(e);
            updateSlider(e.clientX);
        }
    });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Touch events for mobile
    divider.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });
    container.addEventListener('touchstart', (e) => {
        if (e.target === container || e.target === container.querySelector('img')) {
            isDragging = true;
            const touch = e.touches[0];
            if (touch) {
                updateSlider(touch.clientX);
            }
            e.preventDefault();
        }
    });
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleMouseUp);
    
    // Initialize at 50% after page load
    setTimeout(() => {
        const rect = container.getBoundingClientRect();
        updateSlider(rect.left + rect.width / 2);
    }, 100);
});

// Showcase item click handler
document.querySelectorAll('.showcase-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            console.log('Showcase item clicked:', img.src);
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-light);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Image lazy loading enhancement
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Parallax effect for hero section (applies to video now)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const heroVideoEl = hero.querySelector('#heroVideo, .hero-video');
        if (heroVideoEl) {
            heroVideoEl.style.transform = `translateY(${scrolled * 0.25}px)`;
        }
    }
});

// Smooth image hover effects
document.querySelectorAll('.service-image, .gallery-item, .showcase-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});
