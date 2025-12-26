// Smooth animations and interactions

document.addEventListener('DOMContentLoaded', () => {
    // Animate stats counter
    animateCounters();
    
    // Add scroll animations
    observeElements();
    
    // Add parallax effect to background
    addParallaxEffect();
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '');
        }
    }, stepTime);
}

// Intersection Observer for fade-in animations
function observeElements() {
    const elements = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Parallax effect for background
function addParallaxEffect() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const bgGlow = document.querySelector('.bg-glow');
                
                if (bgGlow) {
                    bgGlow.style.transform = `translate(-50%, ${-50 + scrolled * 0.1}%) scale(1)`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Add typing effect to terminal command
function initTerminalTyping() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        // Animation is handled by CSS
        // This function can be extended for more complex typing effects
    }
}

// Add cursor blink to terminal
function addCursorBlink() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (terminalOutput) {
        // Cursor effect is handled by CSS
    }
}

// Initialize on load
initTerminalTyping();
addCursorBlink();
