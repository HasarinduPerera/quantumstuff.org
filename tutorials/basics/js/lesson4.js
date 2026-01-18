/**
 * lesson4.js
 * The X Gate - Interactive demonstrations
 *
 * This file implements 3 main interactives:
 * 1. X Gate on Basis States (deterministic flip)
 * 2. X Gate on Superposition (H-X circuit)
 * 3. Multiple X Gates (reversibility)
 */

// ============================================================================
// INTERACTIVE 1: X GATE ON BASIS STATES
// ============================================================================

var xGateState = {
    inputState: 0  // 0 or 1
};

function setXInputState(state) {
    xGateState.inputState = parseInt(state);
    var inputLabel = document.getElementById('x-input-label');
    var outputLabel = document.getElementById('x-output-label');
    var resultText = document.getElementById('x-result-text');

    if (inputLabel) {
        inputLabel.textContent = '|' + state + '⟩';
    }

    if (outputLabel) {
        outputLabel.textContent = '?';
    }

    if (resultText) {
        resultText.textContent = '';
        resultText.className = 'result-text';
    }
}

function applyXGateBasic() {
    // Apply X gate using quantum-utils
    var output = applyXGate(xGateState.inputState);

    var outputLabel = document.getElementById('x-output-label');
    var resultText = document.getElementById('x-result-text');

    if (outputLabel) {
        outputLabel.textContent = '|' + output + '⟩';
        highlightElement('x-output-label', 800);
    }

    if (resultText) {
        resultText.textContent = 'X gate flipped |' + xGateState.inputState + '⟩ → |' + output + '⟩. This is deterministic!';
        resultText.className = 'result-text success';
        resultText.style.background = '#e8f5e0';
        resultText.style.border = '1px solid var(--primary-color)';
        resultText.style.padding = '1rem';
        resultText.style.marginTop = '1rem';
        resultText.style.borderRadius = '6px';
    }
}

// ============================================================================
// INTERACTIVE 2: X GATE ON SUPERPOSITION (H-X CIRCUIT)
// ============================================================================

function applyHXCircuit() {
    // Circuit: |0⟩ → H → X → Measure (20 times)
    // H creates equal superposition: prob0 = 0.5
    // X swaps amplitudes: prob0 becomes prob1 and vice versa
    // But for equal superposition, still 50/50!

    var stats = performMeasurements(0.5, 20);

    // Display badges
    displayResultBadges(stats.results, 'hx-results');

    // Display histogram
    createHistogram(stats, 'hx-histogram', 180);
}

// ============================================================================
// INTERACTIVE 3: TEST DIFFERENT CIRCUITS
// ============================================================================

var testCircuitConfig = {
    type: 'X',  // 'X', 'HX', 'XX', 'XHX'
    gates: ['X'],
    expectedProb0: 0.0  // After applying circuit to |0⟩
};

function setTestCircuit(circuitType) {
    testCircuitConfig.type = circuitType;

    var circuitDisplay = document.getElementById('test-circuit-display');
    if (!circuitDisplay) return;

    // Build circuit visualization
    var html = '<div class="qubit-wire"><span class="state-label">|0⟩</span>';

    switch (circuitType) {
        case 'X':
            html += '<div class="gate-box gate-x">X</div>';
            testCircuitConfig.gates = ['X'];
            testCircuitConfig.expectedProb0 = 0.0;  // |1⟩
            break;
        case 'HX':
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-box gate-x">X</div>';
            testCircuitConfig.gates = ['H', 'X'];
            testCircuitConfig.expectedProb0 = 0.5;  // Still superposition
            break;
        case 'XX':
            html += '<div class="gate-box gate-x">X</div>';
            html += '<div class="gate-box gate-x">X</div>';
            testCircuitConfig.gates = ['X', 'X'];
            testCircuitConfig.expectedProb0 = 1.0;  // Back to |0⟩
            break;
        case 'XHX':
            html += '<div class="gate-box gate-x">X</div>';
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-box gate-x">X</div>';
            testCircuitConfig.gates = ['X', 'H', 'X'];
            testCircuitConfig.expectedProb0 = 0.5;  // Superposition
            break;
    }

    html += '<div class="measurement-box">📊</div></div>';
    circuitDisplay.innerHTML = html;

    // Clear previous results
    var histogram = document.getElementById('test-histogram');
    var explanation = document.getElementById('test-explanation');
    if (histogram) histogram.innerHTML = '';
    if (explanation) explanation.textContent = '';
}

function runTestCircuit() {
    // Simulate the circuit using quantum-utils
    var result = simulateCircuit(0, testCircuitConfig.gates);

    // Display histogram
    createHistogram(result.measurements, 'test-histogram', 180);

    // Show explanation
    var explanation = document.getElementById('test-explanation');
    if (explanation) {
        var explanationText = getCircuitExplanation(testCircuitConfig.type, result);
        explanation.textContent = explanationText;
        explanation.style.background = '#e8f5e0';
        explanation.style.border = '1px solid var(--primary-color)';
        explanation.style.padding = '1rem';
        explanation.style.marginTop = '1rem';
        explanation.style.borderRadius = '6px';
    }
}

function getCircuitExplanation(circuitType, result) {
    var percent0 = Math.round(result.measurements.prob0 * 100);
    var percent1 = Math.round(result.measurements.prob1 * 100);

    switch (circuitType) {
        case 'X':
            return 'X gate flipped |0⟩ to |1⟩. Deterministic: always get |1⟩ (' + percent1 + '% measured).';
        case 'HX':
            return 'H created superposition, then X swapped the amplitudes. Result: still 50/50 (' + percent0 + '% |0⟩, ' + percent1 + '% |1⟩).';
        case 'XX':
            return 'Two X gates cancel out! Returned to |0⟩. X is self-inverse (' + percent0 + '% measured as |0⟩).';
        case 'XHX':
            return 'X flipped to |1⟩, then H created superposition, then X swapped again. Result: 50/50 (' + percent0 + '% |0⟩, ' + percent1 + '% |1⟩).';
        default:
            return 'Circuit completed.';
    }
}

// ============================================================================
// INTERACTIVE 4: MULTIPLE X GATES
// ============================================================================

var multiXConfig = {
    count: 1
};

function setXCount(count) {
    multiXConfig.count = count;

    var circuitDisplay = document.getElementById('multi-x-circuit');
    if (!circuitDisplay) return;

    // Build circuit with multiple X gates
    var html = '<div class="qubit-wire"><span class="state-label">|0⟩</span>';

    for (var i = 0; i < count; i++) {
        html += '<div class="gate-box gate-x">X</div>';
    }

    html += '<div class="measurement-box">📊</div></div>';
    circuitDisplay.innerHTML = html;

    // Clear previous result
    var resultElement = document.getElementById('multi-x-result');
    if (resultElement) {
        resultElement.textContent = '';
    }
}

function applyMultipleX() {
    // Apply X gate multiple times
    // Even number of X → back to original
    // Odd number of X → flipped

    var finalState = 0;  // Start with |0⟩

    for (var i = 0; i < multiXConfig.count; i++) {
        finalState = applyXGate(finalState);
    }

    var resultElement = document.getElementById('multi-x-result');
    if (resultElement) {
        var pattern = multiXConfig.count % 2 === 0 ? 'even' : 'odd';
        var resultText = '';

        if (pattern === 'even') {
            resultText = 'Applied ' + multiXConfig.count + ' X gates (even number). Result: |0⟩ - returned to original! X is self-inverse.';
        } else {
            resultText = 'Applied ' + multiXConfig.count + ' X gates (odd number). Result: |1⟩ - flipped! Pattern: odd = flip, even = original.';
        }

        resultElement.textContent = resultText;
        resultElement.style.background = '#e8f5e0';
        resultElement.style.border = '1px solid var(--primary-color)';
        resultElement.style.padding = '1rem';
        resultElement.style.marginTop = '1rem';
        resultElement.style.borderRadius = '6px';
        resultElement.style.fontWeight = '600';

        highlightElement('multi-x-result', 1000);
    }
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL4(btn) {
    var answers = {
        q1: 'b',  // X flips |0⟩ to |1⟩
        q2: 'a',  // X-X returns to |0⟩
        q3: 'a',  // Deterministic
        q4: 'b'   // Stays in superposition (amplitudes swapped)
    };

    var feedback = {
        q1: {
            correct: 'The X gate flips |0⟩ to |1⟩ deterministically!',
            incorrect: 'Remember: X is the quantum NOT gate. It flips the state.'
        },
        q2: {
            correct: 'X is self-inverse! Two X gates cancel out.',
            incorrect: 'Think about reversibility: X · X = I (identity).'
        },
        q3: {
            correct: 'X gate is deterministic! Given an input, output is always the same.',
            incorrect: 'Unlike measurement, X gate always produces the same output for a given input.'
        },
        q4: {
            correct: 'X swaps amplitudes but keeps the superposition!',
            incorrect: 'X doesn\'t collapse superposition. It swaps the amplitudes of |0⟩ and |1⟩.'
        }
    };

    // Use the shared quiz utility
    checkQuiz(answers, feedback, 'quiz-score', btn);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Interactive 1: X gate on basis states
    setXInputState('0');

    // Initialize Interactive 3: Default circuit
    setTestCircuit('X');

    // Initialize Interactive 4: Default 1 X gate
    setXCount(1);

    console.log('Lesson 4: The X Gate - All interactives loaded!');
});
