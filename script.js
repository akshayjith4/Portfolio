// Portfolio Website Interactions
(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        typing: {
            text: "Akshayjith P S",
            speed: 100,
            elementId: "typing-text"
        },
        hacking: {
            alertDuration: 3000,
            message: "⚠️ SYSTEM BREACH DETECTED! 🔴 \nEncrypting all files… 95% complete... 💀 ERROR: Just kidding! You're safe… for now."
        },
        scroll: {
            triggerOffset: 0.75,
            heroSectionId: "hero"
        },
        shortcuts: {
            hackKey: "h",
            flappyKey: "f",
            flappyUrl: "https://flappybird.io/",
            themeKey: "t"
        },
        breakpoints: {
            mobile: 768
        },
        theme: {
            storageKey: "portfolio-theme",
            default: "dark"
        }
    };

    // DOM Elements Cache
    const elements = {
        typingText: null,
        hackingAlert: null,
        hackTrigger: null,
        flappyTrigger: null,
        sections: null,
        hero: null,
        themeToggle: null
    };

    // State Management
    const state = {
        isTypingComplete: false,
        isHackingModeActive: false,
        scrollHandler: null,
        currentTheme: CONFIG.theme.default,
        preHackTheme: null
    };

    /**
     * Initialize the application
     */
    function init() {
        cacheElements();
        initThemeSystem();
        setupEventListeners();
        initializeAnimations();
    }

    /**
     * Cache DOM elements for better performance
     */
    function cacheElements() {
        elements.typingText = document.getElementById(CONFIG.typing.elementId);
        elements.hackingAlert = document.getElementById("hacking-alert");
        elements.hackTrigger = document.getElementById("hack-trigger");
        elements.flappyTrigger = document.getElementById("flappy-trigger");
        elements.sections = document.querySelectorAll("section");
        elements.hero = document.getElementById(CONFIG.scroll.heroSectionId);
    }

    /**
     * Initialize theme system
     */
    function initThemeSystem() {
        // Create theme toggle button
        elements.themeToggle = document.createElement('button');
        elements.themeToggle.className = 'theme-toggle';
        elements.themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
        elements.themeToggle.innerHTML = '🌓';
        
        // Add to header
        const headerContainer = document.querySelector('header .container');
        if (headerContainer) {
            headerContainer.appendChild(elements.themeToggle);
        }

        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem(CONFIG.theme.storageKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            state.currentTheme = savedTheme;
        } else {
            state.currentTheme = systemPrefersDark ? 'dark' : 'light';
        }

        // Apply initial theme
        applyTheme(state.currentTheme);
    }

    /**
     * Apply theme to document
     */
    function applyTheme(theme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${theme}-mode`);
        state.currentTheme = theme;
        
        // Update toggle button icon
        if (elements.themeToggle) {
            elements.themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            elements.themeToggle.setAttribute('aria-label', 
                `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
        
        // Save to localStorage
        localStorage.setItem(CONFIG.theme.storageKey, theme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        
        // Show brief theme change notification
        showThemeNotification(newTheme);
    }

    /**
     * Show theme change notification
     */
    function showThemeNotification(theme) {
        if (elements.hackingAlert) {
            elements.hackingAlert.textContent = `Switched to ${theme} mode`;
            elements.hackingAlert.classList.add('show');
            
            setTimeout(() => {
                elements.hackingAlert.classList.remove('show');
            }, 1500);
        }
    }

    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Scroll events with throttling
        state.scrollHandler = throttle(revealSections, 100);
        window.addEventListener("scroll", state.scrollHandler, { passive: true });
        
        // Keyboard events
        document.addEventListener("keydown", handleKeyboardShortcuts);
        
        // Theme toggle event
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener("click", toggleTheme);
        }
        
        // Mobile touch events
        if (elements.hackTrigger) {
            elements.hackTrigger.addEventListener("click", handleMobileHackTrigger);
        }
        
        if (elements.flappyTrigger) {
            elements.flappyTrigger.addEventListener("click", handleMobileFlappyTrigger);
        }

        // Handle page visibility changes
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(CONFIG.theme.storageKey)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    /**
     * Initialize animations and effects
     */
    function initializeAnimations() {
        // Start typing effect
        if (elements.typingText) {
            typeEffect();
        }

        // Make hero section immediately visible
        if (elements.hero) {
            elements.hero.classList.add("visible");
        }

        // Initial section reveal check
        revealSections();
    }

    /**
     * Typing effect for hero section
     */
    function typeEffect() {
        let i = 0;
        const text = CONFIG.typing.text;
        
        function type() {
            if (i < text.length && elements.typingText) {
                elements.typingText.textContent += text.charAt(i);
                i++;
                setTimeout(type, CONFIG.typing.speed);
            } else {
                state.isTypingComplete = true;
            }
        }
        
        // Clear any existing content
        elements.typingText.textContent = "";
        type();
    }

    /**
     * Reveal sections when they come into view
     */
    function revealSections() {
        elements.sections.forEach((section) => {
            if (isElementInViewport(section, CONFIG.scroll.triggerOffset)) {
                section.classList.add("visible");
            }
        });
    }

    /**
     * Check if element is in viewport
     */
    function isElementInViewport(element, offsetFactor = 1) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        return rect.top < viewportHeight * offsetFactor;
    }

    /**
     * Handle keyboard shortcuts
     */
    function handleKeyboardShortcuts(event) {
        const key = event.key.toLowerCase();
        
        // H key - Hacking mode
        if (key === CONFIG.shortcuts.hackKey && !state.isHackingModeActive) {
            event.preventDefault();
            activateHackingMode();
        }
        
        // Shift + F - Flappy Bird
        if (event.shiftKey && key === CONFIG.shortcuts.flappyKey) {
            event.preventDefault();
            redirectToFlappyBird();
        }

        // T key - Theme toggle
        if (key === CONFIG.shortcuts.themeKey) {
            event.preventDefault();
            toggleTheme();
        }
    }

    /**
     * Activate hacking mode effects
     */
    function activateHackingMode() {
        state.isHackingModeActive = true;
        
        // Store current theme before applying hacking mode
        state.preHackTheme = state.currentTheme;
        
        // Add hacking mode class
        document.body.classList.add("hacking-mode");
        
        // Show alert
        if (elements.hackingAlert) {
            elements.hackingAlert.textContent = CONFIG.hacking.message;
            elements.hackingAlert.classList.add("show");
        }

        // Set timeout to remove effects
        setTimeout(() => {
            deactivateHackingMode();
        }, CONFIG.hacking.alertDuration);
    }

    /**
     * Deactivate hacking mode
     */
    function deactivateHackingMode() {
        document.body.classList.remove("hacking-mode");
        
        // Restore the original theme
        if (state.preHackTheme) {
            applyTheme(state.preHackTheme);
        }
        
        if (elements.hackingAlert) {
            elements.hackingAlert.classList.remove("show");
        }
        
        state.isHackingModeActive = false;
        state.preHackTheme = null;
    }

    /**
     * Redirect to Flappy Bird game
     */
    function redirectToFlappyBird() {
        window.location.href = CONFIG.shortcuts.flappyUrl;
    }

    /**
     * Handle mobile hack trigger
     */
    function handleMobileHackTrigger() {
        if (isMobile() && !state.isHackingModeActive) {
            activateHackingMode();
        }
    }

    /**
     * Handle mobile flappy trigger
     */
    function handleMobileFlappyTrigger() {
        if (isMobile()) {
            redirectToFlappyBird();
        }
    }

    /**
     * Check if device is mobile-sized
     */
    function isMobile() {
        return window.innerWidth <= CONFIG.breakpoints.mobile;
    }

    /**
     * Handle page visibility changes
     */
    function handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden, remove scroll listener to save resources
            window.removeEventListener("scroll", state.scrollHandler);
        } else {
            // Page is visible, re-add scroll listener
            window.addEventListener("scroll", state.scrollHandler, { passive: true });
            // Recheck sections when coming back to the page
            revealSections();
        }
    }

    /**
     * Throttle function calls for better performance
     */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Cleanup function for potential use
     */
    function cleanup() {
        window.removeEventListener("scroll", state.scrollHandler);
        document.removeEventListener("keydown", handleKeyboardShortcuts);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        
        if (elements.themeToggle) {
            elements.themeToggle.removeEventListener("click", toggleTheme);
        }
        
        if (elements.hackTrigger) {
            elements.hackTrigger.removeEventListener("click", handleMobileHackTrigger);
        }
        
        if (elements.flappyTrigger) {
            elements.flappyTrigger.removeEventListener("click", handleMobileFlappyTrigger);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose cleanup for potential use
    window.portfolioApp = {
        cleanup: cleanup,
        revealSections: revealSections,
        toggleTheme: toggleTheme,
        getCurrentTheme: () => state.currentTheme
    };

})();
