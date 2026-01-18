// Lesson Page Interactive Elements
// Updated for quantumstuff.org design

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    // Create mobile toggle button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.innerHTML = '☰ Menu';
        toggleBtn.setAttribute('aria-label', 'Toggle sidebar menu');
        document.body.appendChild(toggleBtn);

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);

        const sidebar = document.querySelector('.sidebar');

        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });

        overlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }

    // Highlight current lesson in sidebar
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});
