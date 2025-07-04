
// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Apply the theme
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle theme on button click
    themeToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // Update theme if system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!savedTheme) {  // Only update if user hasn't set a preference
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
    
    // Update the theme icon based on current theme
    function updateThemeIcon(theme) {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (theme === 'dark') {
            sunIcon.style.opacity = '0';
            sunIcon.style.visibility = 'hidden';
            moonIcon.style.opacity = '1';
            moonIcon.style.visibility = 'visible';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.visibility = 'visible';
            moonIcon.style.opacity = '0';
            moonIcon.style.visibility = 'hidden';
        }
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('#typingText');
    const texts = [
        "I'm on a journey to master full-stack development, combining my healthcare background with modern tech skills to build impactful solutions. Currently learning through hands-on projects and embracing the problem-solving process.",
        "Healthcare Technology Enthusiast",
        "Beginner Full-Stack Dev",
        "Administrative Professional",
        "Problem Solver",
        "Innovator"
    ];
    
    if (!typingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                
                // Add a small delay for staggered animation
                const delay = Array.from(skillBars).indexOf(progressBar) * 200;
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, delay);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}


// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}

// Animated Background
function initAnimatedBackground() {
    const codeSnippets = [
        'const developer = "passionate";',
        'function solve(problem) { return solution; }',
        'let skills = [...growing];',
        'if (challenge) { overcome(); }',
        'while (learning) { improve(); }'
    ];
    
    const codeContainer = document.querySelector('.code-snippets');
    if (!codeContainer) return;
    
    codeSnippets.forEach((snippet, index) => {
        const codeElement = document.createElement('div');
        codeElement.className = 'code-snippet';
        codeElement.textContent = snippet;
        codeElement.style.animationDelay = `${index * 4}s`;
        codeContainer.appendChild(codeElement);
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animated Code Snippets - Optimized for performance
function initAnimatedCodeSnippets() {
    const container = document.querySelector('.code-snippets');
    if (!container) return;
    
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let lastScrollY = 0;
    let ticking = false;
    let animationFrameId = null;

    // Initial positioning
    function positionSnippets() {
        // Reduced snippet count for better performance
        const snippetCount = Math.min(8, Math.floor(viewportWidth / 200)); 
        
        // Clear existing snippets
        container.innerHTML = '';
        
        // Add snippets
        for (let i = 0; i < snippetCount; i++) {
            const snippet = document.createElement('div');
            snippet.className = 'code-snippet';
            snippet.setAttribute('data-speed', (0.2 + (i * 0.05)).toFixed(2));
            
            // Random code snippets
            const snippetsText = [
                'const developer = "Romano Muller"',
                'function buildFuture() { return innovation; }',
                'while(learning) { skills++; }',
                'import { passion } from \'./healthcare\'',
                'export default Solutions;',
                'class Developer { constructor() { this.skills = []; } }',
                'const creativity = new Limitless();',
                'async function solveProblem() { return solution; }'
            ];
            
            snippet.textContent = snippetsText[i % snippetsText.length];
            container.appendChild(snippet);
        }
        
        // Position all snippets
        document.querySelectorAll('.code-snippet').forEach((snippet, index) => {
            const speed = parseFloat(snippet.dataset.speed) || 0.5;
            const size = 100 + (Math.random() * 40); // More consistent sizes
            
            // Random position with better distribution
            const left = Math.random() * (viewportWidth * 1.5) - (viewportWidth * 0.25);
            const top = Math.random() * (viewportHeight * 2);
            
            // Set initial position
            snippet.style.left = `${left}px`;
            snippet.style.top = `${top}px`;
            snippet.style.fontSize = `${size}%`;
            
            // Random rotation for visual interest
            const rotation = (Math.random() * 20) - 10;
            const scale = 0.8 + (Math.random() * 0.4);
            snippet.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            
            // Initial opacity
            snippet.style.opacity = '0';
        });
    }

    // Animate on scroll with throttling
    function animateSnippets() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const snippets = document.querySelectorAll('.code-snippet');
                
                snippets.forEach((snippet, index) => {
                    const speed = parseFloat(snippet.dataset.speed) || 0.5;
                    const yPos = -currentScrollY * speed * 0.8;
                    
                    // Get viewport-relative position
                    const rect = snippet.getBoundingClientRect();
                    const isInView = (
                        rect.top < viewportHeight * 1.2 && 
                        rect.bottom > -viewportHeight * 0.2 &&
                        rect.left < viewportWidth * 1.2 && 
                        rect.right > -viewportWidth * 0.2
                    );
                    
                    if (isInView) {
                        // Simplified parallax effect
                        const xOffset = Math.sin(currentScrollY * 0.001 + index) * 15 * speed;
                        const rotation = (Math.sin(currentScrollY * 0.0005 + index) * 10);
                        
                        snippet.style.transform = `translateY(${yPos}px) translateX(${xOffset}px) rotate(${rotation}deg)`;
                        
                        // Fade in when in view
                        const distanceFromCenter = Math.abs(rect.top + rect.height/2 - viewportHeight/2);
                        const maxDistance = viewportHeight * 0.8;
                        const opacity = 1 - (distanceFromCenter / maxDistance);
                        
                        snippet.style.opacity = Math.max(0.3, Math.min(0.8, opacity)).toString();
                    } else {
                        snippet.style.opacity = '0';
                    }
                });
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            
            ticking = true;
        }
    }

    // Handle window resize with debouncing
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;
            positionSnippets();
        }, 250);
    }

    // Initialize
    positionSnippets();
    
    // Event listeners with passive option for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', animateSnippets, { passive: true });
    
    // Clean up function to prevent memory leaks
    function cleanup() {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', animateSnippets);
        cancelAnimationFrame(animationFrameId);
    }
    
    // Add cleanup to window unload event
    window.addEventListener('unload', cleanup, { passive: true });
}

// Vitals Monitor Effect - Optimized for performance
function initVitalsMonitorEffect() {
    const vitalsPulse = document.querySelector('.vitals-pulse');
    if (!vitalsPulse) return;
    
    let pulsePhase = 0;
    let lastTime = 0;
    let animationFrameId = null;
    let isVisible = false;
    
    // Check if element is in viewport to save resources
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        
        if (isVisible && !animationFrameId) {
            animationFrameId = requestAnimationFrame(updatePulse);
        } else if (!isVisible && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }, { threshold: 0.1 });
    
    observer.observe(vitalsPulse);
    
    function updatePulse(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        // Throttle updates for better performance (update every ~30ms)
        if (deltaTime < 30) {
            animationFrameId = requestAnimationFrame(updatePulse);
            return;
        }
        
        // Smooth pulse animation with reduced complexity
        pulsePhase = (pulsePhase + deltaTime * 0.0008) % (Math.PI * 2);
        
        // Simplified pulse pattern
        const pulseIntensity = Math.max(0, Math.sin(pulsePhase * 2) * 0.5 + 0.5);
        
        // Dynamic gradient with fewer color calculations
        const hue1 = 200;
        const hue2 = 190;
        
        vitalsPulse.style.background = `
            linear-gradient(
                135deg,
                hsla(${hue1}, 80%, 60%, ${0.1 + pulseIntensity * 0.3}) 0%,
                hsla(${hue2}, 90%, 50%, ${0.2 + pulseIntensity * 0.4}) 100%
            )
        `;
        
        // Simplified movement
        const x = Math.sin(pulsePhase * 0.7) * 10;
        const y = Math.cos(pulsePhase * 0.5) * 5;
        vitalsPulse.style.transform = `translate(${x}px, ${y}px)`;
        
        // Simplified blur effect
        const blur = 5 + Math.sin(pulsePhase * 2) * 2;
        vitalsPulse.style.filter = `blur(${blur}px)`;
        
        animationFrameId = requestAnimationFrame(updatePulse);
    }
    
    // Clean up function
    function cleanup() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        observer.disconnect();
    }
    
    // Add cleanup to window unload event
    window.addEventListener('unload', cleanup, { passive: true });
    
    // Start animation if element is visible
    if (isVisible) {
        animationFrameId = requestAnimationFrame(updatePulse);
    }
}

// Initialize all functionality when DOM is loaded - Optimized for performance
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Critical UI elements first - these affect visible content immediately
        initThemeToggle();
        initTypingAnimation();
        initSmoothScrolling();
        initLazyLoading(); // Add lazy loading for images
        
        // Delay non-critical animations to improve initial page load
        setTimeout(() => {
            initSkillAnimations();
            initTimelineAnimation();
        }, 100);
        
        // Further delay heavy animations
        setTimeout(() => {
            initAnimatedCodeSnippets();
            initVitalsMonitorEffect();
            initAnimatedBackground();
        }, 300);
        
        // Use a more efficient approach for window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initSkillAnimations();
            }, 250);
        }, { passive: true });
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
});

// Lazy loading for images to improve performance
function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src], video[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const media = entry.target;
                    media.src = media.dataset.src;
                    
                    // If there's a srcset attribute
                    if (media.dataset.srcset) {
                        media.srcset = media.dataset.srcset;
                    }
                    
                    media.classList.add('loaded');
                    imageObserver.unobserve(media);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src], video[data-src]');
        
        // Simple scroll-based lazy loading
        function lazyLoad() {
            lazyImages.forEach(image => {
                if (image.getBoundingClientRect().top <= window.innerHeight && 
                    image.getBoundingClientRect().bottom >= 0 && 
                    getComputedStyle(image).display !== 'none') {
                    
                    image.src = image.dataset.src;
                    
                    if (image.dataset.srcset) {
                        image.srcset = image.dataset.srcset;
                    }
                    
                    image.classList.add('loaded');
                }
            });
        }
        
        // Initial check
        lazyLoad();
        
        // Add throttled scroll event
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    lazyLoad();
                    scrollTimeout = null;
                }, 200);
            }
        }, { passive: true });
    }
}
