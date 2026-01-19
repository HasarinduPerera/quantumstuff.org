# Quantum Utils API Documentation

`quantum-utils.js` provides reusable functions for quantum simulations, visualizations, quizzes, and UI updates in QuantumStuff lessons.

**Location:** `tutorials/basics/js/quantum-utils.js`

---

## Table of Contents

- [Quantum Simulation](#quantum-simulation)
- [Quiz System](#quiz-system)
- [Histograms & Visualization](#histograms--visualization)
- [Animation Utilities](#animation-utilities)
- [Circuit Simulation](#circuit-simulation)
- [State Descriptions](#state-descriptions)
- [Utility Functions](#utility-functions)
- [Usage Examples](#usage-examples)

---

## Quantum Simulation

### `measureQubit(prob0)`

Simulates measuring a qubit in superposition.

**Parameters:**
- `prob0` (number): Probability of measuring |0⟩ (between 0 and 1)

**Returns:**
- (number): 0 or 1

**Example:**
```javascript
// 70% chance of measuring |0⟩
const result = measureQubit(0.7);
console.log(result); // 0 or 1
```

---

### `performMeasurements(prob0, count)`

Performs multiple measurements and returns statistics.

**Parameters:**
- `prob0` (number): Probability of measuring |0⟩
- `count` (number): Number of measurements to perform

**Returns:**
- (object): Statistics object with properties:
  - `zeros` (number): Count of |0⟩ measurements
  - `ones` (number): Count of |1⟩ measurements
  - `results` (array): Array of individual measurement results
  - `prob0` (number): Measured probability of |0⟩
  - `prob1` (number): Measured probability of |1⟩

**Example:**
```javascript
const stats = performMeasurements(0.5, 100);
console.log(`|0⟩: ${stats.zeros}, |1⟩: ${stats.ones}`);
// |0⟩: 52, |1⟩: 48 (approximately 50/50)
```

---

### `applyHadamard(inputState)`

Applies Hadamard gate (creates equal superposition).

**Parameters:**
- `inputState` (number): 0 or 1

**Returns:**
- (number): Probability of measuring |0⟩ after H gate (always 0.5)

**Example:**
```javascript
const prob0 = applyHadamard(0); // Returns 0.5
const prob0_alt = applyHadamard(1); // Also returns 0.5
```

---

### `applyXGate(inputState)`

Applies X gate (bit flip / quantum NOT).

**Parameters:**
- `inputState` (number): 0 or 1

**Returns:**
- (number): Flipped state (deterministic)

**Example:**
```javascript
const newState = applyXGate(0); // Returns 1
const flippedAgain = applyXGate(newState); // Returns 0
```

---

## Quiz System

### `checkQuiz(answers, feedback, scoreElementId, buttonElement)`

Generic quiz checker for all lessons. Checks answers, displays feedback, and celebrates perfect scores with confetti!

**Parameters:**
- `answers` (object): Correct answers `{q1: 'a', q2: 'b', ...}`
- `feedback` (object): Optional custom feedback messages `{q1: {correct: '', incorrect: ''}, ...}`
- `scoreElementId` (string): ID of element to display score
- `buttonElement` (HTMLElement): Button element for confetti origin

**Returns:**
- (number): Score as percentage (0-100)

**Example:**
```javascript
function checkMyQuiz(btn) {
    const answers = {
        q1: 'b',  // Question 1 correct answer is 'b'
        q2: 'a',  // Question 2 correct answer is 'a'
        q3: 'c'   // Question 3 correct answer is 'c'
    };

    const feedback = {
        q1: {
            correct: 'Yes! Superposition is key.',
            incorrect: 'Think about quantum states.'
        }
    };

    const score = checkQuiz(answers, feedback, 'quiz-score', btn);
    console.log(`Score: ${score}%`);
}
```

**HTML Setup:**
```html
<div class="quiz-question">
    <p><strong>Q1:</strong> What is superposition?</p>
    <div class="quiz-options">
        <label><input type="radio" name="q1" value="a"> Option A</label>
        <label><input type="radio" name="q1" value="b"> Correct option</label>
    </div>
    <div class="feedback" id="feedback-1"></div>
</div>

<button onclick="checkMyQuiz(this)">Check Answers</button>
<div id="quiz-score"></div>
```

---

## Histograms & Visualization

### `createHistogram(stats, containerId, maxHeight)`

Creates a visual histogram showing measurement results.

**Parameters:**
- `stats` (object): Statistics object with `zeros` and `ones` properties
- `containerId` (string): ID of container element
- `maxHeight` (number, optional): Maximum bar height in pixels (default: 200)

**Example:**
```javascript
const stats = performMeasurements(0.7, 100);
createHistogram(stats, 'histogram-container', 250);
```

**HTML Setup:**
```html
<div id="histogram-container"></div>
```

---

### `displayResultBadges(results, containerId)`

Displays measurement results as individual badges (good for small counts).

**Parameters:**
- `results` (array): Array of measurement results `[0, 1, 0, 1, ...]`
- `containerId` (string): ID of container element

**Example:**
```javascript
const stats = performMeasurements(0.5, 10);
displayResultBadges(stats.results, 'results-badges');
// Displays: |0⟩ |1⟩ |0⟩ |0⟩ |1⟩ ...
```

---

### `displayStats(stats, elementId)`

Creates a simple text statistics display.

**Parameters:**
- `stats` (object): Statistics object with `zeros` and `ones`
- `elementId` (string): ID of element to update

**Example:**
```javascript
const stats = performMeasurements(0.6, 100);
displayStats(stats, 'stats-display');
// Shows: "|0⟩: 58 (58%) | |1⟩: 42 (42%)"
```

---

## Animation Utilities

### `animateProperty(elementId, property, newValue, duration)`

Animates a CSS property change.

**Parameters:**
- `elementId` (string): ID of element to animate
- `property` (string): CSS property name (e.g., 'width', 'opacity')
- `newValue` (string): New value for the property
- `duration` (number, optional): Animation duration in ms (default: 300)

**Example:**
```javascript
animateProperty('progress-bar', 'width', '75%', 500);
```

---

### `highlightElement(elementId, duration)`

Adds a temporary highlight flash to an element.

**Parameters:**
- `elementId` (string): ID of element to highlight
- `duration` (number, optional): Highlight duration in ms (default: 1000)

**Example:**
```javascript
// Flash an element when something important happens
highlightElement('measurement-result', 800);
```

---

## Circuit Simulation

### `simulateCircuit(initialState, gates)`

Simulates a quantum circuit with multiple gates.

**Parameters:**
- `initialState` (number): Starting state (0 or 1)
- `gates` (array): Array of gate names `['H', 'X', 'H']`

**Returns:**
- (object): Result object with properties:
  - `finalProb0` (number): Final probability of measuring |0⟩
  - `inSuperposition` (boolean): Whether final state is in superposition
  - `measurements` (object): Sample measurements statistics

**Supported Gates:**
- `'H'` - Hadamard (creates superposition)
- `'X'` - Pauli-X (bit flip)

**Example:**
```javascript
// Simulate |0⟩ → H → X circuit
const result = simulateCircuit(0, ['H', 'X']);
console.log(result.finalProb0); // 0.5 (still in superposition)
console.log(result.inSuperposition); // true
console.log(result.measurements.zeros); // ~50 out of 100
```

---

## State Descriptions

### `describeState(prob0)`

Gets a human-readable description of a quantum state.

**Parameters:**
- `prob0` (number): Probability of measuring |0⟩

**Returns:**
- (string): Human-readable state description

**Example:**
```javascript
describeState(1.0);   // "Definitely |0⟩ (100% probability)"
describeState(0.0);   // "Definitely |1⟩ (100% probability)"
describeState(0.5);   // "Equal superposition (50/50 split)"
describeState(0.75);  // "Mostly |0⟩ (75% probability)"
```

---

### `toKetNotation(prob0)`

Converts state probability to ket notation.

**Parameters:**
- `prob0` (number): Probability of measuring |0⟩

**Returns:**
- (string): Ket notation string

**Example:**
```javascript
toKetNotation(1.0);   // "|0⟩"
toKetNotation(0.0);   // "|1⟩"
toKetNotation(0.5);   // "|+⟩ (equal superposition)"
toKetNotation(0.75);  // "0.866|0⟩ + 0.500|1⟩"
```

---

## Utility Functions

### `formatNumber(num, decimals)`

Formats a number to specified decimal places.

**Parameters:**
- `num` (number): Number to format
- `decimals` (number, optional): Decimal places (default: 2)

**Returns:**
- (string): Formatted number

**Example:**
```javascript
formatNumber(0.123456, 3);  // "0.123"
formatNumber(Math.PI);      // "3.14"
```

---

### `randomInt(min, max)`

Generates a random integer between min and max (inclusive).

**Parameters:**
- `min` (number): Minimum value
- `max` (number): Maximum value

**Returns:**
- (number): Random integer

**Example:**
```javascript
const roll = randomInt(1, 6);  // Dice roll: 1-6
```

---

### `delay(ms)`

Delays execution (useful for async animations).

**Parameters:**
- `ms` (number): Milliseconds to wait

**Returns:**
- (Promise): Promise that resolves after delay

**Example:**
```javascript
async function animateSequence() {
    highlightElement('step1');
    await delay(500);
    highlightElement('step2');
    await delay(500);
    highlightElement('step3');
}
```

---

## Usage Examples

### Complete Interactive Demo

```javascript
// HTML:
// <button onclick="runDemo()">Run Quantum Simulation</button>
// <div id="results"></div>
// <div id="histogram"></div>

function runDemo() {
    // 1. Apply gates to create superposition
    const initialState = 0;
    const prob0 = applyHadamard(initialState);

    // 2. Perform measurements
    const stats = performMeasurements(prob0, 100);

    // 3. Display results
    document.getElementById('results').textContent =
        describeState(prob0) + ' - ' + toKetNotation(prob0);

    // 4. Show histogram
    createHistogram(stats, 'histogram');

    // 5. Highlight the results
    highlightElement('results', 1000);
}
```

### Interactive Circuit Builder

```javascript
function buildCircuit() {
    const initialState = parseInt(document.querySelector('input[name="initial"]:checked').value);
    const gates = [];

    // Collect selected gates
    document.querySelectorAll('.gate-selector:checked').forEach(gate => {
        gates.push(gate.value);
    });

    // Simulate circuit
    const result = simulateCircuit(initialState, gates);

    // Display results
    document.getElementById('state-description').textContent =
        describeState(result.finalProb0);

    createHistogram(result.measurements, 'circuit-output');
}
```

---

## CSS Classes Required

For visualizations to work properly, ensure these CSS classes are defined:

- `.histogram`, `.histogram-bars`, `.histogram-bar`, `.histogram-label`
- `.result-badge`, `.badge-0`, `.badge-1`
- `.feedback`, `.feedback.correct`, `.feedback.incorrect`
- `.highlight-flash` (for animation effects)

These are included in `tutorials/basics/css/styles.css`.

---

## Browser Compatibility

- All functions use ES5 syntax for maximum compatibility
- Tested on Chrome, Firefox, Safari, Edge
- No external dependencies (except optional confetti library for quizzes)

---

## Contributing

Found a bug or want to add a new utility function? See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines!
