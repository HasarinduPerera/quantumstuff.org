/**
 * lesson5.js
 * The Hadamard Gate - Interactive demonstrations
 *
 * This file implements 4 main interactives:
 * 1. H Gate creates superposition (measure 30 times)
 * 2. Double Hadamard (H-H identity)
 * 3. Bloch Sphere visualization
 * 4. Circuit combinations (H + X)
 */

// ============================================================================
// INTERACTIVE 1: H GATE CREATES SUPERPOSITION
// ============================================================================

var hGateState = {
    inputState: 0  // 0 or 1
};

function setHInputState(state) {
    hGateState.inputState = parseInt(state);
    var inputLabel = document.getElementById('h-input-label');

    if (inputLabel) {
        inputLabel.textContent = '|' + state + '⟩';
    }

    // Clear previous results
    var resultsEl = document.getElementById('h-results');
    var histogramEl = document.getElementById('h-histogram');
    if (resultsEl) resultsEl.innerHTML = '';
    if (histogramEl) histogramEl.innerHTML = '';
}

function applyHGateAndMeasure() {
    // H gate creates equal superposition from any basis state
    // Both |0⟩ and |1⟩ become 50/50 superposition when measured
    var stats = performMeasurements(0.5, 30);

    // Display badges
    displayResultBadges(stats.results, 'h-results');

    // Display histogram
    createHistogram(stats, 'h-histogram', 180);
}

// ============================================================================
// INTERACTIVE 2: DOUBLE HADAMARD (H-H IDENTITY)
// ============================================================================

var hhGateState = {
    inputState: 0  // 0 or 1
};

function setHHInputState(state) {
    hhGateState.inputState = parseInt(state);
    var inputLabel = document.getElementById('hh-input-label');

    if (inputLabel) {
        inputLabel.textContent = '|' + state + '⟩';
    }

    // Clear previous results
    var resultsEl = document.getElementById('hh-results');
    var histogramEl = document.getElementById('hh-histogram');
    var explanationEl = document.getElementById('hh-explanation');
    if (resultsEl) resultsEl.innerHTML = '';
    if (histogramEl) histogramEl.innerHTML = '';
    if (explanationEl) explanationEl.textContent = '';
}

function applyDoubleH() {
    // H-H always returns to original state
    // This is deterministic - no randomness!
    var originalState = hhGateState.inputState;

    // H-H on |0⟩ → |0⟩ (100% probability)
    // H-H on |1⟩ → |1⟩ (100% probability)
    var prob0 = originalState === 0 ? 1.0 : 0.0;

    var stats = performMeasurements(prob0, 20);

    // Display badges
    displayResultBadges(stats.results, 'hh-results');

    // Display histogram
    createHistogram(stats, 'hh-histogram', 180);

    // Show explanation
    var explanationEl = document.getElementById('hh-explanation');
    if (explanationEl) {
        var percent = originalState === 0 ? stats.prob0 * 100 : stats.prob1 * 100;
        explanationEl.textContent = 'H-H returned to |' + originalState + '⟩! Measured ' +
                                    Math.round(percent) + '% as |' + originalState + '⟩. ' +
                                    'This demonstrates that H is self-inverse: H · H = I.';
        explanationEl.style.background = '#e8f5e0';
        explanationEl.style.border = '1px solid var(--primary-color)';
        explanationEl.style.padding = '1rem';
        explanationEl.style.marginTop = '1rem';
        explanationEl.style.borderRadius = '6px';
        explanationEl.style.fontWeight = '600';
    }
}

// ============================================================================
// INTERACTIVE 3: BLOCH SPHERE VISUALIZATION
// ============================================================================

var blochSphere = null;

function resetBlochTo0() {
    if (blochSphere) {
        blochSphere.reset();
    }

    var label = document.getElementById('bloch-state-label');
    if (label) {
        label.textContent = 'State: |0⟩ (North Pole)';
        label.style.color = 'var(--primary-color)';
    }
}

function resetBlochTo1() {
    if (blochSphere) {
        blochSphere.resetTo1();
    }

    var label = document.getElementById('bloch-state-label');
    if (label) {
        label.textContent = 'State: |1⟩ (South Pole)';
        label.style.color = 'var(--primary-color)';
    }
}

function applyHToBloch() {
    // Apply H gate with beautiful animation!
    if (blochSphere) {
        blochSphere.applyGate('H');
    }

    var label = document.getElementById('bloch-state-label');
    if (label) {
        label.textContent = 'State: |+⟩ (Equator - Equal Superposition)';
        label.style.color = 'var(--secondary-color)';
    }
}

// ============================================================================
// INTERACTIVE 4: CIRCUIT COMBINATIONS (H + X)
// ============================================================================

var combinedCircuitConfig = {
    type: 'H',
    gates: ['H'],
    expectedProb0: 0.5
};

function setCombinedCircuit(circuitType) {
    combinedCircuitConfig.type = circuitType;

    var circuitDisplay = document.getElementById('combined-circuit-display');
    if (!circuitDisplay) return;

    // Build circuit visualization
    var html = '<div class="qubit-wire"><span class="state-label">|0⟩</span>';

    switch (circuitType) {
        case 'H':
            html += '<div class="gate-box gate-h">H</div>';
            combinedCircuitConfig.gates = ['H'];
            combinedCircuitConfig.expectedProb0 = 0.5;
            break;
        case 'XH':
            html += '<div class="gate-box gate-x">X</div>';
            html += '<div class="gate-box gate-h">H</div>';
            combinedCircuitConfig.gates = ['X', 'H'];
            combinedCircuitConfig.expectedProb0 = 0.5;  // X then H still gives 50/50
            break;
        case 'HX':
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-box gate-x">X</div>';
            combinedCircuitConfig.gates = ['H', 'X'];
            combinedCircuitConfig.expectedProb0 = 0.5;  // H then X still gives 50/50
            break;
        case 'HXH':
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-box gate-x">X</div>';
            html += '<div class="gate-box gate-h">H</div>';
            combinedCircuitConfig.gates = ['H', 'X', 'H'];
            combinedCircuitConfig.expectedProb0 = 0.0;  // Results in |1⟩
            break;
    }

    html += '<div class="measurement-box">📊</div></div>';
    circuitDisplay.innerHTML = html;

    // Clear previous results
    var histogram = document.getElementById('combined-histogram');
    var explanation = document.getElementById('combined-explanation');
    if (histogram) histogram.innerHTML = '';
    if (explanation) explanation.textContent = '';
}

function runCombinedCircuit() {
    // Simulate the circuit
    var result = simulateCircuit(0, combinedCircuitConfig.gates);

    // Display histogram
    createHistogram(result.measurements, 'combined-histogram', 180);

    // Show explanation
    var explanation = document.getElementById('combined-explanation');
    if (explanation) {
        var explanationText = getCombinedCircuitExplanation(
            combinedCircuitConfig.type,
            result
        );
        explanation.textContent = explanationText;
        explanation.style.background = '#e8f5e0';
        explanation.style.border = '1px solid var(--primary-color)';
        explanation.style.padding = '1rem';
        explanation.style.marginTop = '1rem';
        explanation.style.borderRadius = '6px';
    }
}

function getCombinedCircuitExplanation(circuitType, result) {
    var percent0 = Math.round(result.measurements.prob0 * 100);
    var percent1 = Math.round(result.measurements.prob1 * 100);

    switch (circuitType) {
        case 'H':
            return 'H created equal superposition from |0⟩. Result: ' + percent0 + '% |0⟩, ' + percent1 + '% |1⟩. This is the fundamental superposition!';
        case 'XH':
            return 'X flipped to |1⟩, then H created superposition from |1⟩. Result: still 50/50 (' + percent0 + '% |0⟩, ' + percent1 + '% |1⟩), but with different phase!';
        case 'HX':
            return 'H created superposition, then X swapped the amplitudes. Result: still 50/50 (' + percent0 + '% |0⟩, ' + percent1 + '% |1⟩).';
        case 'HXH':
            return 'H → X → H: First H creates |+⟩, X swaps to |−⟩, second H transforms |−⟩ to |1⟩. Result: deterministic |1⟩ (' + percent1 + '% measured)!';
        default:
            return 'Circuit completed.';
    }
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL5(btn) {
    var answers = {
        q1: 'c',  // H creates equal superposition |+⟩
        q2: 'a',  // H-H returns to |0⟩
        q3: 'b',  // Creates superposition, enabling quantum algorithms
        q4: 'b',  // Moves to equator (superposition)
        q5: 'b'   // Different phases: |+⟩ vs |−⟩
    };

    var feedback = {
        q1: {
            correct: 'H creates equal superposition |+⟩ = (1/√2)|0⟩ + (1/√2)|1⟩!',
            incorrect: 'Remember: H is the superposition gate. It creates |+⟩ from |0⟩.'
        },
        q2: {
            correct: 'H is self-inverse! H · H = I, so you return to the original state.',
            incorrect: 'Think about reversibility: applying H twice cancels out.'
        },
        q3: {
            correct: 'Superposition is the key to quantum advantage! H enables this.',
            incorrect: 'H creates superposition, which is fundamental to all quantum algorithms.'
        },
        q4: {
            correct: 'The equator represents superposition states like |+⟩!',
            incorrect: 'Poles are definite states. H moves from poles to equator (superposition).'
        },
        q5: {
            correct: 'The phase difference (+ vs −) enables quantum interference!',
            incorrect: 'Both create equal superposition, but H|0⟩ = |+⟩ and H|1⟩ = |−⟩ (note the minus).'
        }
    };

    // Use the shared quiz utility
    checkQuiz(answers, feedback, 'quiz-score', btn);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize function that can run immediately
function initLesson5() {
    // Initialize Interactive 1: H gate
    setHInputState('0');

    // Initialize Interactive 2: Double H
    setHHInputState('0');

    // Initialize Interactive 4: Combined circuits
    setCombinedCircuit('H');

    // Initialize Interactive 3: Bloch sphere visualization
    var blochContainer = document.getElementById('hadamard-bloch-sphere');
    if (blochContainer && typeof createBlochSphereViz !== 'undefined') {
        blochSphere = createBlochSphereViz('hadamard-bloch-sphere', {
            width: 500,
            height: 500
        });

        if (blochSphere) {
            blochSphere.reset();  // Start at |0⟩
        }
        console.log('Bloch sphere created successfully!');
    } else {
        console.log('Bloch container or function not found');
    }

    // Initialize Interactive 3B: Advanced Interactive Bloch Sphere with Sliders (3D)
    var interactiveBlochContainer = document.getElementById('interactive-bloch-sphere');
    if (interactiveBlochContainer && typeof createBlochSphere3D !== 'undefined') {
        createBlochSphere3D('interactive-bloch-sphere', {
            width: 500,
            height: 500,
            showSliders: true,
            autoRotate: true
        });
        console.log('Advanced Bloch sphere with sliders created!');
    } else {
        console.log('Interactive Bloch container or function not found');
    }

    console.log('Lesson 5: The Hadamard Gate - All interactives loaded!');
}

// Check if DOM is already loaded (since this script loads dynamically)
if (document.readyState === 'loading') {
    // DOM still loading
    document.addEventListener('DOMContentLoaded', initLesson5);
} else {
    // DOM already loaded, run immediately
    initLesson5();
}
