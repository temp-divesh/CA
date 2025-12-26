// Enhanced animations and interactions

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initPageLoadSequence();
    initNavbarScrollBehavior();
    initMagneticHover();
    initRippleEffect();
    initTextReveal();
    initScrollTriggeredMessages();
    initScrollIndicator();
    initEnhancedMessageHover();
    
    // Legacy animations (if needed)
    animateCounters();
    observeElements();
    addParallaxEffect();
});

// 1. Page Load Animation Sequence
function initPageLoadSequence() {
    const heroContent = document.querySelector('.hero-content');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const aiBotPreview = document.querySelector('.ai-bot-preview');
    
    // Trigger animations in sequence - faster timing for GIF
    if (heroContent) {
        setTimeout(() => heroContent.classList.add('animate-in'), 50);
    }
    if (heroSubtitle) {
        setTimeout(() => heroSubtitle.classList.add('animate-in'), 50);
    }
    if (heroCta) {
        setTimeout(() => heroCta.classList.add('animate-in'), 50);
    }
    if (aiBotPreview) {
        setTimeout(() => aiBotPreview.classList.add('animate-in'), 50);
    }
}

// 2. Navbar Scroll Behavior
function initNavbarScrollBehavior() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// 3. Magnetic Hover Effect on CTA Button
function initMagneticHover() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    let isHovering = false;
    
    ctaButton.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    ctaButton.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Limit movement to 8px max for subtlety
        const moveX = Math.max(-8, Math.min(8, x * 0.12));
        const moveY = Math.max(-8, Math.min(8, y * 0.12));
        
        // Combine with existing hover transform
        ctaButton.style.setProperty('--magnetic-x', `${moveX}px`);
        ctaButton.style.setProperty('--magnetic-y', `${moveY}px`);
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        isHovering = false;
        ctaButton.style.setProperty('--magnetic-x', '0');
        ctaButton.style.setProperty('--magnetic-y', '0');
    });
}

// 4. Ripple Effect on Button Click
function initRippleEffect() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    ctaButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// 5. Text Reveal Animation for Hero Title
function initTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Add animate class first
    heroTitle.classList.add('animate-text');
    
    // Split by lines (handling <br>)
    const lines = heroTitle.innerHTML.split(/<br\s*\/?>/i);
    
    // Wrap each line's words
    const wrappedLines = lines.map((line, lineIndex) => {
        // Split by words, preserving spaces
        const words = line.split(/(\s+)/).filter(word => word.length > 0);
        
        const wrappedWords = words.map(word => {
            if (word.trim() === '') {
                return word; // Preserve spaces
            }
            return `<span class="word">${word}</span>`;
        });
        
        return wrappedWords.join('');
    });
    
    // Rejoin with <br> tags
    heroTitle.innerHTML = wrappedLines.join('<br>');
    
    // Set animation delays dynamically for each word - faster and more visible
    const wordElements = heroTitle.querySelectorAll('.word');
    wordElements.forEach((word, index) => {
        const delay = 0.3 + (index * 0.1);
        word.style.animationDelay = `${delay}s`;
    });
}

// 6. Scroll-Triggered Message Animations
function initScrollTriggeredMessages() {
    const messages = document.querySelectorAll('.message');
    if (messages.length === 0) return;
    
    const botPreview = document.querySelector('.ai-bot-preview');
    if (!botPreview) return;
    
    // Messages start visible, but we can add scroll-triggered re-animation
    // For initial load, show them immediately but with a slight delay - faster for GIF
    setTimeout(() => {
        messages.forEach((message, index) => {
            setTimeout(() => {
                message.classList.add('animate-in');
            }, index * 100);
        });
    }, 1200); // After other animations - faster
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Messages are already visible, but we can trigger re-animation if needed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(botPreview);
}

// 7. Scroll Indicator
function initScrollIndicator() {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-indicator-text">Scroll</div>
        <div class="scroll-indicator-arrow"></div>
    `;
    document.body.appendChild(scrollIndicator);
    
    // Hide on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// 8. Enhanced Message Hover (handled in CSS, but can add JS if needed)
function initEnhancedMessageHover() {
    // Most hover effects are handled in CSS
    // This function can be extended for additional JS-based interactions
}

// Legacy functions (keeping for compatibility)

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
    }, { passive: true });
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
