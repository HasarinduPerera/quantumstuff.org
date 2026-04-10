/**
 * lesson7.js
 * The CNOT Gate - Interactive demonstrations
 *
 * This file implements 3 main interactives:
 * 1. CNOT Truth Table Explorer
 * 2. H + CNOT Circuit (creates Bell state)
 * 3. CNOT Circuit Builder (various combinations)
 */

// ============================================================================
// CNOT GATE IMPLEMENTATION
// ============================================================================

/**
 * Apply CNOT gate to a two-qubit state
 * CNOT flips target qubit if and only if control qubit is |1⟩
 *
 * @param {string} inputState - Two-bit string like '00', '01', '10', '11'
 * @returns {string} Output state after CNOT
 */
function applyCNOT(inputState) {
    var control = inputState[0];
    var target = inputState[1];

    // If control is '1', flip target
    if (control === '1') {
        target = target === '0' ? '1' : '0';
    }

    return control + target;
}

/**
 * Simulate two-qubit measurement with given probabilities
 *
 * @param {Object} probs - Probabilities {p00, p01, p10, p11}
 * @param {number} count - Number of measurements
 * @returns {Object} Measurement results with counts and results array
 */
function measureTwoQubits(probs, count) {
    var counts = {'00': 0, '01': 0, '10': 0, '11': 0};
    var results = [];

    for (var i = 0; i < count; i++) {
        var rand = Math.random();
        var result;

        if (rand < probs.p00) {
            result = '00';
        } else if (rand < probs.p00 + probs.p01) {
            result = '01';
        } else if (rand < probs.p00 + probs.p01 + probs.p10) {
            result = '10';
        } else {
            result = '11';
        }

        counts[result]++;
        results.push(result);
    }

    return {
        counts: counts,
        results: results,
        total: count
    };
}

/**
 * Create two-qubit histogram visualization
 *
 * @param {Object} counts - Counts for each state {00: n, 01: n, 10: n, 11: n}
 * @param {string} containerId - ID of container element
 * @param {number} maxHeight - Maximum bar height in pixels
 */
function createTwoQubitHistogram(counts, containerId, maxHeight) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var total = counts['00'] + counts['01'] + counts['10'] + counts['11'];
    var maxCount = Math.max(counts['00'], counts['01'], counts['10'], counts['11']);

    var html = '<div style="display: flex; justify-content: center; align-items: flex-end; gap: 1.5rem; min-height: ' + (maxHeight + 50) + 'px; padding: 1.5rem; background: var(--bg-secondary); border-radius: 8px; margin-top: 1rem;">';

    var states = ['00', '01', '10', '11'];
    for (var i = 0; i < states.length; i++) {
        var state = states[i];
        var count = counts[state];
        var height = maxCount > 0 ? Math.round((count / maxCount) * maxHeight) : 0;
        var percent = total > 0 ? Math.round((count / total) * 100) : 0;

        html += '<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">';
        html += '<div style="width: 60px; height: ' + height + 'px; background: linear-gradient(to top, var(--color-green), var(--color-amber)); border-radius: 4px 4px 0 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 0.5rem; color: white; font-weight: 700; transition: height 0.5s ease;\">' + count + '</div>';
        html += '<div style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);\">|' + state + '⟩</div>';
        html += '<div style="font-size: 0.9rem; color: var(--text-secondary);\">' + percent + '%</div>';
        html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
}

// ============================================================================
// INTERACTIVE 1: CNOT TRUTH TABLE EXPLORER
// ============================================================================



// ============================================================================
// INTERACTIVE 2: H + CNOT CIRCUIT (BELL STATE CREATION)
// ============================================================================

function applyHCNOT() {
    // H gate on qubit 0, then CNOT creates Bell state |Φ+⟩ = (1/√2)(|00⟩ + |11⟩)
    // Measurement outcomes: 50% |00⟩, 50% |11⟩, never |01⟩ or |10⟩

    var probs = {
        p00: 0.5,  // 50% |00⟩
        p01: 0.0,  // 0% |01⟩
        p10: 0.0,  // 0% |10⟩
        p11: 0.5   // 50% |11⟩
    };

    var measurements = measureTwoQubits(probs, 40);

    // Display result badges
    var resultsDiv = document.getElementById('h-cnot-results');
    if (resultsDiv) {
        var html = '';
        for (var i = 0; i < measurements.results.length; i++) {
            var state = measurements.results[i];
            html += '<span style="display: inline-block; background: linear-gradient(135deg, var(--color-green), var(--color-amber)); color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-weight: 700; font-size: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; margin: 0.25rem;">|' + state + '⟩</span>';
        }
        resultsDiv.innerHTML = html;
    }

    // Display histogram
    createTwoQubitHistogram(measurements.counts, 'h-cnot-histogram', 150);

    // Explanation
    var explanationDiv = document.getElementById('h-cnot-explanation');
    if (explanationDiv) {
        var percent00 = Math.round((measurements.counts['00'] / 40) * 100);
        var percent11 = Math.round((measurements.counts['11'] / 40) * 100);
        var percent01 = Math.round((measurements.counts['01'] / 40) * 100);
        var percent10 = Math.round((measurements.counts['10'] / 40) * 100);

        var text = 'Bell state created! Measured ' + percent00 + '% |00⟩ and ' + percent11 + '% |11⟩. ';
        text += 'Notice: ' + percent01 + '% |01⟩ and ' + percent10 + '% |10⟩ (should be ~0%). ';
        text += 'The qubits are perfectly correlated—measuring one instantly determines the other!';

        explanationDiv.textContent = text;
        explanationDiv.style.background = '#e8f5e0';
        explanationDiv.style.border = '1px solid var(--color-green)';
        explanationDiv.style.padding = '1rem';
        explanationDiv.style.marginTop = '1rem';
        explanationDiv.style.borderRadius = '6px';
        explanationDiv.style.fontWeight = '600';
    }
}

// ============================================================================
// INTERACTIVE 3: CNOT CIRCUIT BUILDER
// ============================================================================

var cnotCircuitConfig = {
    type: 'CNOT',
    description: 'CNOT only on |00⟩',
    probs: {p00: 1.0, p01: 0.0, p10: 0.0, p11: 0.0}
};

function setCNOTCircuit(circuitType) {
    cnotCircuitConfig.type = circuitType;

    var circuitDisplay = document.getElementById('cnot-circuit-display');
    if (!circuitDisplay) return;

    // Build circuit visualization based on type
    var html = '<div class="cnot-gate-container">';

    // Qubit 0 wire
    html += '<div class="qubit-wire"><span class="state-label">q₀: |0⟩</span>';

    switch (circuitType) {
        case 'CNOT':
            // Just CNOT on |00⟩ → |00⟩
            cnotCircuitConfig.probs = {p00: 1.0, p01: 0.0, p10: 0.0, p11: 0.0};
            cnotCircuitConfig.description = 'CNOT on |00⟩ → |00⟩ (no flip, control is |0⟩)';
            html += '<div class="gate-cnot-control">●</div>';
            break;

        case 'HCNOT':
            // H + CNOT creates Bell state
            cnotCircuitConfig.probs = {p00: 0.5, p01: 0.0, p10: 0.0, p11: 0.5};
            cnotCircuitConfig.description = 'Bell state: (1/√2)(|00⟩ + |11⟩)';
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-cnot-control">●</div>';
            break;

        case 'XCNOT':
            // X on control → |10⟩, then CNOT → |11⟩
            cnotCircuitConfig.probs = {p00: 0.0, p01: 0.0, p10: 0.0, p11: 1.0};
            cnotCircuitConfig.description = 'X flips to |10⟩, CNOT flips target → |11⟩';
            html += '<div class="gate-box gate-x">X</div>';
            html += '<div class="gate-cnot-control">●</div>';
            break;

        case 'HXCNOT':
            // H on both → uniform superposition, then CNOT
            cnotCircuitConfig.probs = {p00: 0.25, p01: 0.25, p10: 0.25, p11: 0.25};
            cnotCircuitConfig.description = 'H on both creates all 4 states equally';
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-cnot-control">●</div>';
            break;

        case 'HCNOTH':
            // Bell state creation then H undoes on control
            cnotCircuitConfig.probs = {p00: 0.5, p01: 0.5, p10: 0.0, p11: 0.0};
            cnotCircuitConfig.description = 'Creates Bell, then H on control changes basis';
            html += '<div class="gate-box gate-h">H</div>';
            html += '<div class="gate-cnot-control">●</div>';
            html += '<div class="gate-box gate-h">H</div>';
            break;
    }

    html += '<div class="measurement-box">📊</div></div>';

    // Qubit 1 wire
    html += '<div class="qubit-wire"><span class="state-label">q₁: |0⟩</span>';

    // Add spacer and target for all circuits
    if (circuitType === 'HXCNOT') {
        html += '<div class="gate-box gate-h">H</div>';
    } else if (circuitType === 'HCNOTH') {
        html += '<div class="gate-spacer"></div>';
    } else {
        html += '<div class="gate-spacer"></div>';
    }

    html += '<div class="gate-cnot-target">⊕</div>';

    if (circuitType === 'HCNOTH') {
        html += '<div class="gate-spacer"></div>';
    }

    html += '<div class="measurement-box">📊</div></div>';
    html += '</div>';

    circuitDisplay.innerHTML = html;

    // Clear previous results
    var histogram = document.getElementById('cnot-circuit-histogram');
    var explanation = document.getElementById('cnot-circuit-explanation');
    if (histogram) histogram.innerHTML = '';
    if (explanation) explanation.textContent = '';
}

function runCNOTCircuit() {
    var measurements = measureTwoQubits(cnotCircuitConfig.probs, 40);

    // Display histogram
    createTwoQubitHistogram(measurements.counts, 'cnot-circuit-histogram', 150);

    // Show explanation
    var explanation = document.getElementById('cnot-circuit-explanation');
    if (explanation) {
        var text = cnotCircuitConfig.description + ' — Measured: ';
        text += measurements.counts['00'] + '× |00⟩, ';
        text += measurements.counts['01'] + '× |01⟩, ';
        text += measurements.counts['10'] + '× |10⟩, ';
        text += measurements.counts['11'] + '× |11⟩.';

        explanation.textContent = text;
        explanation.style.background = '#e8f5e0';
        explanation.style.border = '1px solid var(--color-green)';
        explanation.style.padding = '1rem';
        explanation.style.marginTop = '1rem';
        explanation.style.borderRadius = '6px';
    }
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL7() {
    var answers = {
        q1: 'b',  // CNOT|10⟩ = |11⟩
        q2: 'a',  // Control qubit never changes
        q3: 'b',  // H + CNOT creates correlated state (only |00⟩ or |11⟩)
        q4: 'b'   // Target flips only when control is |1⟩
    };

    var feedback = {
        q1: {
            correct: 'Correct! When control is |1⟩, CNOT flips the target: |10⟩ → |11⟩.',
            incorrect: 'Remember: CNOT flips target when control is |1⟩. So |10⟩ becomes |11⟩.'
        },
        q2: {
            correct: 'Perfect! The control qubit (●) is never modified by CNOT.',
            incorrect: 'The control qubit determines the action but is never changed itself.'
        },
        q3: {
            correct: 'Exactly! H + CNOT creates the Bell state (1/√2)(|00⟩ + |11⟩) — perfect correlation!',
            incorrect: 'H + CNOT creates entanglement: you only see |00⟩ or |11⟩, never |01⟩ or |10⟩.'
        },
        q4: {
            correct: 'Right! Target flips if and only if control is |1⟩. That\'s the "controlled" operation!',
            incorrect: 'CNOT is a controlled operation: flip target only when control is |1⟩.'
        }
    };

    // Use the shared quiz utility
    checkQuiz(answers, feedback, 'quiz-score');
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Interactive 1: Default to |00⟩
    exploreCNOTState('00');

    // Initialize Interactive 3: Default to CNOT only
    setCNOTCircuit('CNOT');

    console.log('Lesson 7: The CNOT Gate - All interactives loaded!');
});
