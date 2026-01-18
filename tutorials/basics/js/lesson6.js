/**
 * lesson6.js
 * Multiple Qubits - Interactive demonstrations
 *
 * This file implements 4 main interactives:
 * 1. Exponential Calculator
 * 2. Two-Qubit State Explorer
 * 3. H ⊗ H Circuit (double Hadamard)
 * 4. Classical vs Quantum Scaling Comparison
 */

// ============================================================================
// INTERACTIVE 1: EXPONENTIAL CALCULATOR
// ============================================================================

function updateQubitCount(count) {
    count = parseInt(count);
    var display = document.getElementById('qubit-count-display');
    var resultDiv = document.getElementById('exponential-result');

    if (display) {
        display.textContent = count;
    }

    if (resultDiv) {
        var states = Math.pow(2, count);
        var html = '<div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 1rem;">';
        html += '2<sup>' + count + '</sup> = ' + states.toLocaleString() + ' states';
        html += '</div>';

        // Add context
        var context = '';
        if (count <= 3) {
            context = 'Small system - easy to visualize!';
        } else if (count <= 10) {
            context = 'Moderate system - ' + states + ' states is manageable';
        } else if (count <= 20) {
            context = 'Large system - over ' + (states / 1000).toFixed(0) + ' thousand states!';
        } else if (count <= 30) {
            context = 'Enormous! Over ' + (states / 1000000).toFixed(0) + ' million states!';
        } else {
            context = 'Beyond comprehension! More states than can be written!';
        }

        html += '<div style="font-size: 1rem; color: var(--text-secondary);">' + context + '</div>';

        // Add fun comparisons
        if (count >= 50) {
            html += '<div style="margin-top: 1rem; padding: 1rem; background: #fff3cd; border-radius: 6px; font-size: 0.9rem;">';
            html += '🌟 This is more states than atoms in the solar system!';
            html += '</div>';
        } else if (count >= 80) {
            html += '<div style="margin-top: 1rem; padding: 1rem; background: #fff3cd; border-radius: 6px; font-size: 0.9rem;">';
            html += '🌌 More states than atoms in the observable universe!';
            html += '</div>';
        }

        resultDiv.innerHTML = html;
    }
}

// ============================================================================
// INTERACTIVE 2: TWO-QUBIT STATE EXPLORER
// ============================================================================

function showTwoQubitState(state) {
    var visualization = document.getElementById('two-qubit-visualization');
    var explanation = document.getElementById('two-qubit-explanation');

    if (!visualization || !explanation) return;

    // Parse state
    var q0 = state[0];  // First qubit
    var q1 = state[1];  // Second qubit

    // Build visualization
    var html = '<div style="display: flex; justify-content: center; align-items: center; gap: 3rem; padding: 2rem; background: var(--bg-secondary); border-radius: 8px;">';

    // Qubit 0
    html += '<div style="text-align: center;">';
    html += '<div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Qubit 0</div>';
    html += '<div style="width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: white; ';
    html += 'background: ' + (q0 === '0' ? 'var(--primary-color)' : 'var(--secondary-color)') + '; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">';
    html += '|' + q0 + '⟩';
    html += '</div>';
    html += '</div>';

    // Tensor product symbol
    html += '<div style="font-size: 2rem; font-weight: 700; color: var(--text-secondary);">⊗</div>';

    // Qubit 1
    html += '<div style="text-align: center;">';
    html += '<div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Qubit 1</div>';
    html += '<div style="width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: white; ';
    html += 'background: ' + (q1 === '0' ? 'var(--primary-color)' : 'var(--secondary-color)') + '; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">';
    html += '|' + q1 + '⟩';
    html += '</div>';
    html += '</div>';

    // Equals and result
    html += '<div style="font-size: 2rem; font-weight: 700; color: var(--text-secondary);">=</div>';
    html += '<div style="text-align: center;">';
    html += '<div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem;">Combined State</div>';
    html += '<div style="width: 100px; height: 100px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; color: white; ';
    html += 'background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); box-shadow: 0 6px 12px rgba(0,0,0,0.3);">';
    html += '|' + state + '⟩';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    visualization.innerHTML = html;

    // Explanation
    var explanationText = '';
    var decimal = parseInt(state, 2);

    if (state === '00') {
        explanationText = '|00⟩ means both qubits are in state |0⟩. In binary, this represents the number 0.';
    } else if (state === '01') {
        explanationText = '|01⟩ means qubit 0 is |0⟩ and qubit 1 is |1⟩. In binary, this represents the number 1.';
    } else if (state === '10') {
        explanationText = '|10⟩ means qubit 0 is |1⟩ and qubit 1 is |0⟩. In binary, this represents the number 2.';
    } else if (state === '11') {
        explanationText = '|11⟩ means both qubits are in state |1⟩. In binary, this represents the number 3.';
    }

    explanationText += ' (Decimal: ' + decimal + ')';

    explanation.textContent = explanationText;
    explanation.style.background = '#e8f5e0';
    explanation.style.border = '1px solid var(--primary-color)';
    explanation.style.padding = '1rem';
    explanation.style.marginTop = '1rem';
    explanation.style.borderRadius = '6px';
}

// ============================================================================
// INTERACTIVE 3: H ⊗ H CIRCUIT (DOUBLE HADAMARD)
// ============================================================================

function applyDoubleHadamard() {
    // H ⊗ H on |00⟩ creates uniform superposition: (1/2)(|00⟩ + |01⟩ + |10⟩ + |11⟩)
    // Each outcome has 25% probability

    var measurements = [];
    var counts = {
        '00': 0,
        '01': 0,
        '10': 0,
        '11': 0
    };

    // Perform 40 measurements
    for (var i = 0; i < 40; i++) {
        // Each outcome has equal 25% chance
        var rand = Math.random();
        var result;
        if (rand < 0.25) {
            result = '00';
        } else if (rand < 0.5) {
            result = '01';
        } else if (rand < 0.75) {
            result = '10';
        } else {
            result = '11';
        }

        measurements.push(result);
        counts[result]++;
    }

    // Display badges
    var resultsDiv = document.getElementById('double-h-results');
    if (resultsDiv) {
        var html = '';
        for (var i = 0; i < measurements.length; i++) {
            var state = measurements[i];
            html += '<span style="display: inline-block; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-weight: 700; font-size: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; margin: 0.25rem;">|' + state + '⟩</span>';
        }
        resultsDiv.innerHTML = html;
    }

    // Display histogram
    var histogramDiv = document.getElementById('double-h-histogram');
    if (histogramDiv) {
        var maxCount = Math.max(counts['00'], counts['01'], counts['10'], counts['11']);
        var maxHeight = 150;

        var html = '<div style="display: flex; justify-content: center; align-items: flex-end; gap: 1.5rem; min-height: 200px; padding: 1.5rem; background: var(--bg-secondary); border-radius: 8px; margin-top: 1rem;">';

        for (var state in counts) {
            var count = counts[state];
            var height = maxCount > 0 ? Math.round((count / maxCount) * maxHeight) : 0;
            var percent = Math.round((count / 40) * 100);

            html += '<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">';
            html += '<div style="width: 60px; height: ' + height + 'px; background: linear-gradient(to top, var(--primary-color), var(--secondary-color)); border-radius: 4px 4px 0 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 0.5rem; color: white; font-weight: 700; transition: height 0.5s ease;">' + count + '</div>';
            html += '<div style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">|' + state + '⟩</div>';
            html += '<div style="font-size: 0.9rem; color: var(--text-secondary);">' + percent + '%</div>';
            html += '</div>';
        }

        html += '</div>';
        histogramDiv.innerHTML = html;
    }
}

// ============================================================================
// INTERACTIVE 4: CLASSICAL VS QUANTUM SCALING
// ============================================================================

function updateScaleComparison(count) {
    count = parseInt(count);
    var countDisplay = document.getElementById('scale-count');
    var classicalDiv = document.getElementById('classical-scale');
    var quantumDiv = document.getElementById('quantum-scale');

    if (countDisplay) {
        countDisplay.textContent = count;
    }

    var states = Math.pow(2, count);

    // Classical system
    if (classicalDiv) {
        var html = '<div style="margin-bottom: 1rem;">';
        html += '<strong>' + count + ' bits</strong> can store:<br>';
        html += '<span style="font-size: 1.3rem; color: #555;">ONE value</span><br>';
        html += 'from ' + states + ' possibilities';
        html += '</div>';

        html += '<div style="padding: 1rem; background: #fff; border-radius: 6px; border: 2px dashed #ccc;">';
        html += 'Example: ';
        // Show a random example
        var example = '';
        for (var i = 0; i < count; i++) {
            example += Math.random() < 0.5 ? '0' : '1';
        }
        html += '<code style="font-size: 1.1rem; font-weight: 700;">' + example + '</code>';
        html += '<br><small>Currently storing just this one value</small>';
        html += '</div>';

        classicalDiv.innerHTML = html;
    }

    // Quantum system
    if (quantumDiv) {
        var html = '<div style="margin-bottom: 1rem;">';
        html += '<strong>' + count + ' qubits</strong> can be in:<br>';
        html += '<span style="font-size: 1.3rem; color: var(--primary-color); font-weight: 700;">ALL ' + states + ' states</span><br>';
        html += '<em>simultaneously!</em>';
        html += '</div>';

        html += '<div style="padding: 1rem; background: #fff; border-radius: 6px; border: 2px solid var(--primary-color);">';
        html += 'Superposition of:<br>';

        // Show a few examples
        var examples = Math.min(4, states);
        for (var i = 0; i < examples; i++) {
            var binary = i.toString(2).padStart(count, '0');
            html += '<code style="font-size: 0.95rem;">|' + binary + '⟩</code>';
            if (i < examples - 1) html += ' + ';
        }
        if (states > 4) {
            html += ' + ... (' + (states - 4) + ' more!)';
        }
        html += '</div>';

        quantumDiv.innerHTML = html;
    }
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL6() {
    var answers = {
        q1: 'c',  // 3 qubits = 8 states
        q2: 'b',  // H ⊗ H creates equal superposition
        q3: 'c',  // Exponentially larger state spaces
        q4: 'b'   // Second qubit (rightmost) is |1⟩
    };

    var feedback = {
        q1: {
            correct: 'Correct! 2³ = 8 states. Each qubit doubles the state space.',
            incorrect: 'Remember: n qubits create 2^n states. 2³ = 8.'
        },
        q2: {
            correct: 'Perfect! H ⊗ H creates (1/2)(|00⟩ + |01⟩ + |10⟩ + |11⟩).',
            incorrect: 'H ⊗ H creates a uniform superposition of all four basis states.'
        },
        q3: {
            correct: 'Exponential scaling is the foundation of quantum advantage!',
            incorrect: 'The key is exponential state space: 2^n states for n qubits.'
        },
        q4: {
            correct: 'Right! In |01⟩, the second (rightmost) qubit is |1⟩.',
            incorrect: 'Read right-to-left: |01⟩ means first qubit is |0⟩, second is |1⟩.'
        }
    };

    // Use the shared quiz utility
    checkQuiz(answers, feedback, 'quiz-score');
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Interactive 1: Exponential calculator
    updateQubitCount(1);

    // Initialize Interactive 2: Default to |00⟩
    showTwoQubitState('00');

    // Initialize Interactive 4: Scale comparison
    updateScaleComparison(5);

    console.log('Lesson 6: Multiple Qubits - All interactives loaded!');
});
