/**
 * lesson8.js
 * Entanglement and Quantum Power - Interactive demonstrations
 *
 * This file implements 2 main interactives:
 * 1. Bell State Creator and Measurement
 * 2. Entanglement Correlations Explorer
 */

// ============================================================================
// BELL STATE DEFINITIONS
// ============================================================================

var bellStates = {
    'phi-plus': {
        name: '|Φ⁺⟩',
        formula: '(1/√2)(|00⟩ + |11⟩)',
        description: 'Both qubits always match: 50% |00⟩, 50% |11⟩',
        probs: {p00: 0.5, p01: 0.0, p10: 0.0, p11: 0.5},
        circuit: ['H on q0', 'CNOT']
    },
    'phi-minus': {
        name: '|Φ⁻⟩',
        formula: '(1/√2)(|00⟩ − |11⟩)',
        description: 'Both match with phase difference: 50% |00⟩, 50% |11⟩',
        probs: {p00: 0.5, p01: 0.0, p10: 0.0, p11: 0.5},
        circuit: ['X on q0', 'H on q0', 'CNOT']
    },
    'psi-plus': {
        name: '|Ψ⁺⟩',
        formula: '(1/√2)(|01⟩ + |10⟩)',
        description: 'Qubits always opposite: 50% |01⟩, 50% |10⟩',
        probs: {p00: 0.0, p01: 0.5, p10: 0.5, p11: 0.0},
        circuit: ['H on q0', 'CNOT', 'X on q1']
    },
    'psi-minus': {
        name: '|Ψ⁻⟩',
        formula: '(1/√2)(|01⟩ − |10⟩)',
        description: 'Always opposite with phase: 50% |01⟩, 50% |10⟩',
        probs: {p00: 0.0, p01: 0.5, p10: 0.5, p11: 0.0},
        circuit: ['X on q0', 'H on q0', 'CNOT', 'X on q1']
    }
};

var currentBellState = null;

// ============================================================================
// INTERACTIVE 1: BELL STATE CREATOR
// ============================================================================

function createBellState(stateType) {
    currentBellState = bellStates[stateType];

    var circuitDisplay = document.getElementById('bell-circuit-display');
    if (!circuitDisplay) return;

    // Build circuit visualization
    var html = '<div style="text-align: center; margin-bottom: 1rem;">';
    html += '<div style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">';
    html += currentBellState.name + ' = ' + currentBellState.formula;
    html += '</div>';
    html += '</div>';

    html += '<div class="cnot-gate-container">';

    // Qubit 0 wire
    html += '<div class="qubit-wire"><span class="state-label">q₀: |0⟩</span>';

    // Add gates based on circuit configuration
    var circuit = currentBellState.circuit;
    var hasX0 = circuit.indexOf('X on q0') !== -1;
    var hasH0 = circuit.indexOf('H on q0') !== -1;

    if (hasX0) {
        html += '<div class="gate-box gate-x">X</div>';
    }
    if (hasH0) {
        html += '<div class="gate-box gate-h">H</div>';
    }

    html += '<div class="gate-cnot-control">●</div>';
    html += '<div class="measurement-box">📊</div></div>';

    // Qubit 1 wire
    html += '<div class="qubit-wire"><span class="state-label">q₁: |0⟩</span>';

    // Spacers to align with q0 gates
    if (hasX0) {
        html += '<div class="gate-spacer"></div>';
    }
    if (hasH0) {
        html += '<div class="gate-spacer"></div>';
    }

    html += '<div class="gate-cnot-target">⊕</div>';

    // Check if X on q1 is needed
    var hasX1 = circuit.indexOf('X on q1') !== -1;
    if (hasX1) {
        html += '<div class="gate-box gate-x">X</div>';
    }

    html += '<div class="measurement-box">📊</div></div>';
    html += '</div>';

    circuitDisplay.innerHTML = html;

    // Clear previous results
    var resultsDiv = document.getElementById('bell-results');
    var histogramDiv = document.getElementById('bell-histogram');
    var explanationDiv = document.getElementById('bell-explanation');
    if (resultsDiv) resultsDiv.innerHTML = '';
    if (histogramDiv) histogramDiv.innerHTML = '';
    if (explanationDiv) explanationDiv.textContent = '';
}

function measureBellState() {
    if (!currentBellState) {
        alert('Please select a Bell state first!');
        return;
    }

    // Perform measurements
    var measurements = measureTwoQubits(currentBellState.probs, 40);

    // Display result badges
    var resultsDiv = document.getElementById('bell-results');
    if (resultsDiv) {
        var html = '';
        for (var i = 0; i < measurements.results.length; i++) {
            var state = measurements.results[i];
            html += '<span style="display: inline-block; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-weight: 700; font-size: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; margin: 0.25rem;">|' + state + '⟩</span>';
        }
        resultsDiv.innerHTML = html;
    }

    // Display histogram
    createTwoQubitHistogram(measurements.counts, 'bell-histogram', 150);

    // Explanation
    var explanationDiv = document.getElementById('bell-explanation');
    if (explanationDiv) {
        var text = currentBellState.name + ': ' + currentBellState.description + ' — Measured: ';
        text += measurements.counts['00'] + '× |00⟩, ';
        text += measurements.counts['01'] + '× |01⟩, ';
        text += measurements.counts['10'] + '× |10⟩, ';
        text += measurements.counts['11'] + '× |11⟩. ';
        text += 'Perfect correlation: the qubits are entangled!';

        explanationDiv.textContent = text;
        explanationDiv.style.background = '#e8f5e0';
        explanationDiv.style.border = '1px solid var(--primary-color)';
        explanationDiv.style.padding = '1rem';
        explanationDiv.style.marginTop = '1rem';
        explanationDiv.style.borderRadius = '6px';
        explanationDiv.style.fontWeight = '600';
    }
}

/**
 * Simulate two-qubit measurement with given probabilities
 * (Duplicate from lesson7.js for standalone lesson use)
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
 * (Duplicate from lesson7.js for standalone lesson use)
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
        html += '<div style="width: 60px; height: ' + height + 'px; background: linear-gradient(to top, var(--primary-color), var(--secondary-color)); border-radius: 4px 4px 0 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 0.5rem; color: white; font-weight: 700; transition: height 0.5s ease;\">' + count + '</div>';
        html += '<div style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);\">|' + state + '⟩</div>';
        html += '<div style="font-size: 0.9rem; color: var(--text-secondary);\">' + percent + '%</div>';
        html += '</div>';
    }

    html += '</div>';
    container.innerHTML = html;
}

// ============================================================================
// INTERACTIVE 2: ENTANGLEMENT CORRELATIONS EXPLORER
// ============================================================================

var correlationState = {
    qubit0: null,  // null, 0, or 1
    qubit1: null,  // null, 0, or 1
    bellState: 'phi-plus'  // Default to |Φ⁺⟩
};

function measureQubit0() {
    if (correlationState.qubit0 !== null) {
        alert('Qubit 0 already measured! Click Reset to start over.');
        return;
    }

    // Random 50/50 measurement
    correlationState.qubit0 = Math.random() < 0.5 ? 0 : 1;

    // Display result
    var result0Div = document.getElementById('qubit0-result');
    if (result0Div) {
        result0Div.textContent = '|' + correlationState.qubit0 + '⟩';
        result0Div.style.color = 'var(--primary-color)';
    }

    // Show explanation
    var explanationDiv = document.getElementById('correlation-explanation');
    if (explanationDiv) {
        explanationDiv.textContent = 'Qubit 0 measured as |' + correlationState.qubit0 + '⟩ (random 50/50). Now measure Qubit 1 to see the correlation!';
        explanationDiv.style.color = 'var(--text-primary)';
    }
}

function measureQubit1() {
    if (correlationState.qubit1 !== null) {
        alert('Qubit 1 already measured! Click Reset to start over.');
        return;
    }

    if (correlationState.qubit0 === null) {
        alert('Please measure Qubit 0 first!');
        return;
    }

    // For |Φ⁺⟩: qubit1 must match qubit0
    correlationState.qubit1 = correlationState.qubit0;

    // Display result
    var result1Div = document.getElementById('qubit1-result');
    if (result1Div) {
        result1Div.textContent = '|' + correlationState.qubit1 + '⟩';
        result1Div.style.color = 'var(--secondary-color)';
    }

    // Show explanation
    var explanationDiv = document.getElementById('correlation-explanation');
    if (explanationDiv) {
        explanationDiv.innerHTML = '<strong>Perfect Correlation!</strong> Because the qubits are entangled in state |Φ⁺⟩, measuring Qubit 0 as |' + correlationState.qubit0 + '⟩ instantly determines Qubit 1 must also be |' + correlationState.qubit1 + '⟩. This happens <em>instantaneously</em>, no matter how far apart the qubits are!';
        explanationDiv.style.background = '#e8f5e0';
        explanationDiv.style.border = '1px solid var(--primary-color)';
        explanationDiv.style.padding = '1rem';
        explanationDiv.style.borderRadius = '6px';
    }
}

function resetCorrelation() {
    correlationState.qubit0 = null;
    correlationState.qubit1 = null;

    var result0Div = document.getElementById('qubit0-result');
    var result1Div = document.getElementById('qubit1-result');
    var explanationDiv = document.getElementById('correlation-explanation');

    if (result0Div) {
        result0Div.textContent = '?';
        result0Div.style.color = 'var(--primary-color)';
    }
    if (result1Div) {
        result1Div.textContent = '?';
        result1Div.style.color = 'var(--secondary-color)';
    }
    if (explanationDiv) {
        explanationDiv.textContent = 'Click "Measure First" on Qubit 0 to begin.';
        explanationDiv.style.background = 'white';
        explanationDiv.style.border = 'none';
    }
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL8(btn) {
    var answers = {
        q1: 'b',  // Entangled = cannot describe as independent qubits
        q2: 'b',  // H + CNOT creates |Φ⁺⟩
        q3: 'c',  // Superposition + entanglement + interference
        q4: 'a',  // In |Φ⁺⟩, if first is |0⟩, second is always |0⟩
        q5: 'b'   // ~270 qubits for 10^80 states
    };

    var feedback = {
        q1: {
            correct: 'Exactly! Entangled states are non-separable—you cannot write them as independent qubit states.',
            incorrect: 'Entanglement means the qubits are correlated in a way that cannot be described independently.'
        },
        q2: {
            correct: 'Perfect! H on qubit 0 creates superposition, then CNOT entangles them into |Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩).',
            incorrect: 'The Bell state |Φ⁺⟩ is created by: H gate on qubit 0, then CNOT.'
        },
        q3: {
            correct: 'That\'s the quantum advantage formula! All three phenomena work together to solve problems exponentially faster.',
            incorrect: 'Quantum advantage comes from superposition (parallelism) + entanglement (correlations) + interference (amplifying correct answers).'
        },
        q4: {
            correct: 'Right! In |Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩), the qubits always match. Measuring |0⟩ on first → second is |0⟩!',
            incorrect: 'In Bell state |Φ⁺⟩, the qubits are perfectly correlated—they always measure the same.'
        },
        q5: {
            correct: 'Amazing! 2^270 ≈ 10^81 states. That\'s exponential scaling—the foundation of quantum power!',
            incorrect: 'Remember: n qubits → 2^n states. For 10^80, you need 2^n ≈ 10^80, so n ≈ 270 qubits.'
        }
    };

    // Use the shared quiz utility
    checkQuiz(answers, feedback, 'quiz-score', btn);
}

// ============================================================================
// INTERACTIVE: QUANTUM BOXES ANALOGY
// ============================================================================

var boxesState = {
    openedA: false,
    openedB: false,
    contentA: null,
    contentB: null
};

function openBox(boxId) {
    if (boxesState.openedA && boxesState.openedB) return; // both open
    
    var elA = document.getElementById('boxA');
    var elB = document.getElementById('boxB');
    var explanation = document.getElementById('box-explanation');
    var line = document.getElementById('entanglement-line');
    
    if (boxId === 'A' && !boxesState.openedA) {
        boxesState.openedA = true;
        // Determine state now
        if (boxesState.contentA === null) {
            boxesState.contentA = Math.random() > 0.5 ? 'Left' : 'Right';
            boxesState.contentB = boxesState.contentA === 'Left' ? 'Right' : 'Left';
        }
        elA.textContent = boxesState.contentA;
        elA.style.background = 'var(--bg-secondary)';
        elA.style.color = 'var(--text-primary)';
        elA.style.border = '2px solid var(--color-green)';
        elA.style.fontSize = '1.5rem';
        
        if (!boxesState.openedB) {
            explanation.innerHTML = 'Earth Box randomly collapsed to <strong>' + boxesState.contentA + '</strong>.<br>The entanglement ensures the Mars Box is instantly set to the opposite!';
            if (line) line.style.opacity = '1';
        } else {
            explanation.innerHTML = 'Both boxes are now open. The correlation is perfect!';
            if (line) line.style.opacity = '0.1';
        }
    }
    
    if (boxId === 'B' && !boxesState.openedB) {
        boxesState.openedB = true;
        // Determine state now
        if (boxesState.contentB === null) {
            boxesState.contentB = Math.random() > 0.5 ? 'Left' : 'Right';
            boxesState.contentA = boxesState.contentB === 'Left' ? 'Right' : 'Left';
        }
        elB.textContent = boxesState.contentB;
        elB.style.background = 'var(--bg-secondary)';
        elB.style.color = 'var(--text-primary)';
        elB.style.border = '2px solid var(--color-amber)';
        elB.style.fontSize = '1.5rem';
        
        if (!boxesState.openedA) {
            explanation.innerHTML = 'Mars Box randomly collapsed to <strong>' + boxesState.contentB + '</strong>.<br>The entanglement ensures the Earth Box is instantly set to the opposite!';
            if (line) line.style.opacity = '1';
        } else {
            explanation.innerHTML = 'Both boxes are now open. The correlation is perfect!';
            if (line) line.style.opacity = '0.1';
        }
    }
}

function resetBoxes() {
    boxesState = {
        openedA: false,
        openedB: false,
        contentA: null,
        contentB: null
    };
    
    var elA = document.getElementById('boxA');
    var elB = document.getElementById('boxB');
    var explanation = document.getElementById('box-explanation');
    var line = document.getElementById('entanglement-line');
    
    if (elA) {
        elA.textContent = '📦';
        elA.style.background = 'var(--color-green)';
        elA.style.color = 'white';
        elA.style.border = 'none';
        elA.style.fontSize = '3rem';
    }
    
    if (elB) {
        elB.textContent = '📦';
        elB.style.background = 'var(--color-amber)';
        elB.style.color = 'white';
        elB.style.border = 'none';
        elB.style.fontSize = '3rem';
    }
    
    if (explanation) explanation.textContent = 'The gloves are in superposition. Neither is Left or Right yet.';
    if (line) line.style.opacity = '0.5';
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Interactive 1: Default to |Φ⁺⟩
    createBellState('phi-plus');

    // Initialize Interactive 2: Reset state
    resetCorrelation();

    // Initialize boxes analogy
    resetBoxes();

    console.log('Lesson 8: Entanglement and Quantum Power - All interactives loaded!');
});
