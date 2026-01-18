# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TheoryQ** is a static educational website teaching quantum computing fundamentals through 7 progressive lessons. Built with vanilla HTML/CSS/JavaScript (no build tools, no frameworks, no dependencies). Designed for YouTube lessons and self-paced learning with nature-inspired aesthetics (earth tones: greens and browns).

**Key Philosophy**: Every concept must have an interactive, hands-on demonstration. Learn by doing, not just reading.

## Running the Project

```bash
# No build step required - just open in browser
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

Or simply open `index.html` directly in any modern browser.

## Architecture

### File Organization Pattern

The project follows a **lesson-based structure** where each lesson is self-contained:

```
Lesson N:
├── lessonN.html        # HTML structure + content
├── lessonN.js          # Interactive logic for that lesson
└── styles.css          # Shared styles (single file for all lessons)
```

**Exception**: Lessons 5-7 share `lessons567.js` for code consolidation.

### Component System

Despite no framework, the codebase follows a **consistent component pattern**:

1. **Interactive Blocks**: Container for all interactive demos
   - `.interactive-block` → Visual wrapper
   - `.demo-area` → Where the interaction happens
   - `.note` → Explanatory callout

2. **Quantum Circuits**: Standard visual representation
   - `.circuit-display` → Container
   - `.qubit-wire` → Horizontal quantum wire (2px line)
   - `.gate-box` → Gate representation (H, X, Z, etc.)
   - `.measurement-box` → 📊 emoji for measurement

3. **CNOT Gates** (two-qubit operations):
   - `.cnot-gate-container` → Wrapper with relative positioning
   - `.gate-cnot-control` → Solid dot (●) at top
   - `.gate-cnot-target` → Circle with ⊕ at bottom
   - **Connection line**: Drawn via CSS `::after` pseudo-element on control gate
   - Line must connect from control center to target center (3px wide, green)

4. **Bloch Sphere** (3D qubit state visualization):
   - Created via `bloch-sphere.js` reusable component
   - SVG-based with radial gradient for 3D effect
   - API: `createBlochSphere(containerId, {width, height, radius})`
   - Returns controller with `updateProbability(prob0)` and `updateState(theta, phi)`
   - Used in Lesson 3 (Hadamard) and Lesson 4 (Superposition)

5. **Quiz System**: Generic quiz checker
   - Each quiz has answers object: `{q1: 'b', q2: 'a', ...}`
   - Each quiz has feedback object with correct/incorrect messages
   - Shared `checkQuizGeneric()` function (in lessons567.js)
   - Visual feedback: green for correct, red for incorrect

### JavaScript Patterns

**All JavaScript is vanilla ES5-compatible** (no ES6+ features like arrow functions, template literals in production code). This ensures broad browser compatibility.

**Common patterns**:
- Element selection: `document.getElementById()` or `document.querySelector()`
- Event listeners: Always in `DOMContentLoaded` wrapper
- String concatenation: Use `+` not template literals
- Random measurement: `Math.random() < 0.5 ? 0 : 1`
- Result display: Build HTML string, set via `.innerHTML`

**State Management**:
- Global variables for current state (e.g., `window.cnotControl`, `currentBlochState`)
- No framework needed - direct DOM manipulation
- Update UI immediately on state change

### CSS Architecture

**Single monolithic file** (`styles.css`) organized by sections:

1. **CSS Variables** (`:root`): All colors, spacing, sizes defined here
2. **Layout Structure**: `.page-layout`, `.sidebar`, `.main-content`
3. **Lesson 1-7 specific components**: Organized by lesson in comments
4. **Quantum circuit elements**: Gates, wires, measurements
5. **Interactive elements**: Buttons, sliders, result badges
6. **Quiz styling**: Questions, options, feedback

**CNOT Connection Implementation**:
```css
.cnot-gate-container .gate-cnot-control::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: calc(2rem + 45px);  /* Distance from control to target */
    background: var(--primary-color);
    transform: translate(-50%, 0);
    z-index: -1;
}
```

## Key Technical Decisions

### Why No Build Tools?
- **Simplicity**: Easy to understand, modify, and deploy
- **Accessibility**: Anyone can view source and learn
- **Performance**: No bundle bloat, instant page loads
- **Portability**: Works anywhere with a browser

### Why Vanilla JavaScript?
- **No dependencies**: Self-contained, no supply chain risk
- **Educational**: Students can read and understand all code
- **Lightweight**: Total JS ~20KB across all lessons
- **Future-proof**: No framework updates to worry about

### Why Single CSS File?
- **Consistency**: Shared styles ensure visual coherence
- **Simplicity**: One place to update colors/spacing
- **Performance**: Single HTTP request, cached across all pages
- **Size**: Only ~30KB minified despite all styles

## Design Constraints

### Strict Nature Theme
- **Colors**: ONLY use colors from `:root` variables (greens, browns, cream)
- **No purple/pink/neon**: Violates calm, nature-inspired aesthetic
- **No flashy animations**: Keep interactions smooth but subtle

### Educational Requirements
- **Every concept needs interaction**: No pure text sections
- **Progressive complexity**: Lesson N builds on Lesson N-1
- **Immediate feedback**: Users see results instantly
- **No prerequisites**: Accessible to complete beginners

### Visual Consistency
- **Quantum notation**: Always use |0⟩, |1⟩, |+⟩, |ψ⟩ (not ket0, psi, etc.)
- **Circuit left-to-right**: Time flows left to right in circuits
- **Measurement emoji**: Use 📊 consistently (not 🔬 or 🎯)

## Adding New Interactive Elements

When adding interactivity:

1. **Create demo structure**:
   ```html
   <div class="interactive-block">
       <h3>Title</h3>
       <div class="demo-area">
           <!-- Your interactive UI -->
           <button class="btn-primary" onclick="yourFunction()">Action</button>
           <div id="result-container"></div>
       </div>
       <p class="note">Explanation of what happened</p>
   </div>
   ```

2. **Implement function in lesson JS**:
   ```javascript
   function yourFunction() {
       // Do calculation
       const result = /* quantum operation */;

       // Update UI
       document.getElementById('result-container').textContent = result;
   }
   ```

3. **Style if needed** (add to `styles.css` in appropriate section)

4. **Test cross-browser**: Chrome, Firefox, Safari minimum

## Bloch Sphere Integration

To add Bloch sphere to a lesson:

1. **HTML**: Add container div with unique ID
   ```html
   <div id="my-bloch-container"></div>
   ```

2. **Load script**: Include before lesson script
   ```html
   <script src="bloch-sphere.js"></script>
   <script src="lessonN.js"></script>
   ```

3. **Initialize in JavaScript**:
   ```javascript
   let bloch = null;
   document.addEventListener('DOMContentLoaded', function() {
       bloch = createBlochSphere('my-bloch-container', {
           width: 300,
           height: 300,
           radius: 100
       });

       // Update state
       bloch.updateProbability(1.0);  // |0⟩ state
   });
   ```

4. **Control via buttons/sliders**:
   ```javascript
   function applyGate() {
       bloch.updateProbability(0.5);  // Equal superposition
   }
   ```

## Common Issues

### CNOT Line Too Long/Short
- Adjust `height: calc(2rem + 45px)` in `.gate-cnot-control::after`
- Value depends on gap between qubit wires
- Test with different content after target gate

### Quiz Not Working
- Ensure `data-question="N"` attribute on `.quiz-question`
- Check answer object keys match input `name` attributes
- Verify `checkAnswersLN()` function name matches HTML `onclick`
- Ensure feedback div has id `feedback-N`

### Bloch Sphere Not Appearing
- Check container ID matches `createBlochSphere()` call
- Verify `bloch-sphere.js` loaded before lesson script
- Console errors will show if container not found

### Styles Not Applying
- All lessons share `styles.css` - check selector specificity
- Use browser DevTools to verify CSS variable values
- Ensure class names match exactly (case-sensitive)

## File Naming Conventions

- **Lessons**: `lessonN.html` and `lessonN.js` (where N = 2-7)
- **Lesson 1**: `index.html` and `script.js` (entry point)
- **Shared components**: `bloch-sphere.js`, `lessons567.js`
- **Styles**: Single `styles.css` file
- **Docs**: `README.md`, `STYLE_GUIDE.md`, this file
- **Test files**: `test_*.html` or `*_demo.html` (not for production)

## Important: Do Not Change

- Color palette (nature theme is core identity)
- Lesson structure (7 lessons, established progression)
- Quantum notation (standard ket notation)
- No build tools (vanilla is intentional)
- No frameworks (simplicity is a feature)

## References

- **IQM Academy**: Pedagogical inspiration (https://www.iqmacademy.com)
- **STYLE_GUIDE.md**: Complete visual design reference
- **README.md**: Full feature list and learning objectives
