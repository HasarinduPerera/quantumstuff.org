/**
 * Quantum Learning Platform - Main JavaScript
 * Handles: Theme toggling, mobile menu, navigation
 */

// ============================================
// CRITICAL: Apply theme IMMEDIATELY to prevent flash
// ============================================
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Theme is already loaded from localStorage above
    const currentTheme = html.getAttribute('data-theme');
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            // Update aria-expanded
            const isExpanded = mobileMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Active Navigation Link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-menu a, .mobile-menu-list a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    setActiveNavLink();
    initSmoothScroll();
    initNavbarScroll();
});

// Expose theme toggle for external use
window.toggleTheme = toggleTheme;
