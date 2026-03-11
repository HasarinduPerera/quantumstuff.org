(function () {
    const script = document.currentScript;
    const root = script ? (script.getAttribute('data-root') || './') : './';

    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 360px;">
                <div class="footer-section">
                    <h4>Learn</h4>
                    <ul class="footer-links">
                        <li><a href="${root}tutorials/basics/lessons/lesson1.html">Quantum Computing Basics</a></li>
                        <li><a href="${root}playground.html">Playground</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Project</h4>
                    <ul class="footer-links">
                        <li><a href="${root}about.html">About</a></li>
                        <li><a href="https://github.com/HasarinduPerera/quantumstuff.org" target="_blank" rel="noopener">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 quantumstuff.org - A Non-Profit Educational Initiative | Open Source | Free Forever</p>
            </div>
        </div>
    `;
})();
