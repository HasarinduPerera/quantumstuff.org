/**
 * Accessibility Features - Enhanced
 * High Contrast Mode, Font Size Controls, Text-to-Speech
 */

// ============================================
// Text-to-Speech (unchanged)
// ============================================
class TextToSpeech {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isReading = false;
        this.isPaused = false;
        this.currentUtterance = null;
    }

    speak(text) {
        if (!this.synth) return;
        this.stop();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.lang = 'en-US';
        utterance.onstart = () => { this.isReading = true; this.currentUtterance = utterance; };
        utterance.onend = () => { this.isReading = false; this.currentUtterance = null; };
        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
            this.isReading = false;
            this.currentUtterance = null;
        }
    }
}

// ============================================
// Enhanced Accessibility Toolbar
// ============================================
class AccessibilityToolbar {
    constructor() {
        this.tts = new TextToSpeech();
        this.currentFontSize = localStorage.getItem('fontSize') || 'normal';
        this.isDyslexiaFontEnabled = localStorage.getItem('dyslexiaFont') === 'true';
        this.init();
    }

    init() {
        this.createToolbar();
        this.attachEventListeners();
        this.applyFontSize(this.currentFontSize);
        this.applyDyslexiaFont(this.isDyslexiaFontEnabled);
    }

    createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'a11y-toolbar';
        toolbar.className = 'a11y-toolbar';
        toolbar.innerHTML = `
            <button id="a11y-toggle" class="a11y-toggle" aria-label="Accessibility Options">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="5" r="2"></circle>
                    <path d="M4 10h16"></path>
                    <path d="M12 9v12"></path>
                    <path d="M8 14l-4 8"></path>
                    <path d="M16 14l4 8"></path>
                </svg>
            </button>
            <div id="a11y-panel" class="a11y-panel" hidden>
                <h3>Accessibility</h3>
                
                <div class="a11y-section">
                    <h4>Theme</h4>
                    <button id="a11y-high-contrast" class="a11y-option">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2v20"></path>
                        </svg>
                        High Contrast Mode
                    </button>
                </div>

                <div class="a11y-section">
                    <h4>Font Size</h4>
                    <div style="display: flex; gap: 8px;">
                        <button id="a11y-font-decrease" class="a11y-btn">A-</button>
                        <button id="a11y-font-reset" class="a11y-btn">A</button>
                        <button id="a11y-font-increase" class="a11y-btn">A+</button>
                    </div>
                </div>

                <div class="a11y-section">
                    <h4>Dyslexia Support</h4>
                    <button id="a11y-dyslexia-font" class="a11y-option">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        Dyslexia-Friendly Font
                    </button>
                </div>

                <div class="a11y-section">
                    <h4>Read Aloud</h4>
                    <button id="a11y-read-page" class="a11y-option">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        </svg>
                        Read Page
                    </button>
                    <button id="a11y-stop-reading" class="a11y-option" disabled>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="6" y="6" width="12" height="12"></rect>
                        </svg>
                        Stop
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(toolbar);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('a11y-toggle');
        const panel = document.getElementById('a11y-panel');

        // Toggle panel
        toggleBtn.addEventListener('click', () => {
            const isHidden = panel.hasAttribute('hidden');
            panel.toggleAttribute('hidden');
            toggleBtn.setAttribute('aria-expanded', isHidden);
        });

        // High contrast mode
        document.getElementById('a11y-high-contrast').addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'high-contrast' ? 'light' : 'high-contrast';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (window.updateThemeIcon) window.updateThemeIcon(newTheme);
        });

        // Font size controls
        document.getElementById('a11y-font-decrease').addEventListener('click', () => {
            const sizes = ['small', 'normal', 'large', 'xlarge'];
            const idx = sizes.indexOf(this.currentFontSize);
            if (idx > 0) this.applyFontSize(sizes[idx - 1]);
        });

        document.getElementById('a11y-font-reset').addEventListener('click', () => {
            this.applyFontSize('normal');
        });

        document.getElementById('a11y-font-increase').addEventListener('click', () => {
            const sizes = ['small', 'normal', 'large', 'xlarge'];
            const idx = sizes.indexOf(this.currentFontSize);
            if (idx < 3) this.applyFontSize(sizes[idx + 1]);
        });

        // Read aloud
        const readBtn = document.getElementById('a11y-read-page');
        const stopBtn = document.getElementById('a11y-stop-reading');

        readBtn.addEventListener('click', () => {
            const main = document.querySelector('main');
            if (main) {
                const text = Array.from(main.querySelectorAll('h1, h2, h3, p, li'))
                    .map(el => el.textContent.trim()).filter(t => t).join('. ');
                this.tts.speak(text);
                readBtn.disabled = true;
                stopBtn.disabled = false;
            }
        });

        stopBtn.addEventListener('click', () => {
            this.tts.stop();
            readBtn.disabled = false;
            stopBtn.disabled = true;
        });

        // Dyslexia-friendly font
        document.getElementById('a11y-dyslexia-font').addEventListener('click', () => {
            this.isDyslexiaFontEnabled = !this.isDyslexiaFontEnabled;
            this.applyDyslexiaFont(this.isDyslexiaFontEnabled);
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            const toolbar = document.getElementById('a11y-toolbar');
            if (!toolbar.contains(e.target) && !panel.hasAttribute('hidden')) {
                panel.setAttribute('hidden', '');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    applyFontSize(size) {
        document.documentElement.className = document.documentElement.className
            .replace(/font-\w+/g, '').trim();
        document.documentElement.classList.add(`font-${size}`);
        this.currentFontSize = size;
        localStorage.setItem('fontSize', size);
    }

    applyDyslexiaFont(enabled) {
        if (enabled) {
            document.body.classList.add('dyslexia-friendly');
        } else {
            document.body.classList.remove('dyslexia-friendly');
        }
        this.isDyslexiaFontEnabled = enabled;
        localStorage.setItem('dyslexiaFont', enabled);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AccessibilityToolbar());
} else {
    new AccessibilityToolbar();
}
