/**
 * lesson6.js
 * Multiple Qubits - Interactive demonstrations
 */

// ============================================================================
// SHARED CONSTANTS
// ============================================================================

var STATE_COLORS = {
    '00': '#16a34a',   // green
    '01': '#22c55e',   // light green
    '10': '#f59e0b',   // amber
    '11': '#d97706'    // dark amber
};

// ============================================================================
// INTERACTIVE 1: EXPONENTIAL CALCULATOR
// ============================================================================

function updateQubitCount(count) {
    count = parseInt(count);
    var display = document.getElementById('qubit-count-display');
    var resultDiv = document.getElementById('exponential-result');

    if (display) display.textContent = count;
    if (!resultDiv) return;

    var states = Math.pow(2, count);
    var statesStr = states > 1e15 ? '2^' + count : states.toLocaleString();

    var context = '';
    if (count <= 3) context = 'Small — easy to visualize all states!';
    else if (count <= 10) context = 'Moderate — ' + states + ' states';
    else if (count <= 20) context = 'Large — over ' + (states / 1000).toFixed(0) + ' thousand states!';
    else context = 'Enormous — beyond easy comprehension!';

    var bonusHtml = '';
    if (count >= 80) {
        bonusHtml = '<div style="margin-top:1rem;padding:0.875rem 1rem;background:rgba(22,163,74,0.1);border-radius:8px;font-size:0.875rem;color:var(--color-green);font-weight:600;">🌌 More states than atoms in the observable universe!</div>';
    } else if (count >= 50) {
        bonusHtml = '<div style="margin-top:1rem;padding:0.875rem 1rem;background:rgba(22,163,74,0.1);border-radius:8px;font-size:0.875rem;color:var(--color-green);font-weight:600;">🌟 More states than atoms in the solar system!</div>';
    }

    resultDiv.innerHTML =
        '<div style="font-size:2.5rem;font-weight:700;color:var(--color-green);margin-bottom:0.5rem;">2<sup>' + count + '</sup> = ' + statesStr + ' states</div>' +
        '<div style="font-size:0.9375rem;color:var(--text-secondary);">' + context + '</div>' +
        bonusHtml;
}

// ============================================================================
// INTERACTIVE 2: TWO-QUBIT STATE EXPLORER
// ============================================================================

function showTwoQubitState(state) {
    var color = STATE_COLORS[state];
    var q0 = state[0];
    var q1 = state[1];
    var q0Color = q0 === '0' ? '#16a34a' : '#f59e0b';
    var q1Color = q1 === '0' ? '#16a34a' : '#f59e0b';
    var decimal = parseInt(state, 2);

    // Update button active states
    ['00', '01', '10', '11'].forEach(function(s) {
        var btn = document.getElementById('q-btn-' + s);
        if (!btn) return;
        if (s === state) {
            btn.style.background = STATE_COLORS[s];
            btn.style.color = 'white';
            btn.style.boxShadow = '0 4px 12px ' + STATE_COLORS[s] + '55';
            btn.style.transform = 'translateY(-2px)';
        } else {
            btn.style.background = 'var(--bg-card)';
            btn.style.color = STATE_COLORS[s];
            btn.style.boxShadow = 'none';
            btn.style.transform = 'none';
        }
    });

    var descriptions = {
        '00': { text: 'Both qubits are in state |0⟩ — the quantum "ground state".', note: 'This is the standard starting state for most quantum circuits.' },
        '01': { text: 'Qubit 0 is |0⟩ and Qubit 1 is |1⟩. Binary 01 = decimal 1.', note: 'Each qubit holds its own independent state.' },
        '10': { text: 'Qubit 0 is |1⟩ and Qubit 1 is |0⟩. Binary 10 = decimal 2.', note: 'The order matters: q₀ is the leftmost digit.' },
        '11': { text: 'Both qubits are in state |1⟩. Binary 11 = decimal 3.', note: 'With 2 qubits there are exactly 4 basis states: |00⟩, |01⟩, |10⟩, |11⟩.' }
    };
    var desc = descriptions[state];

    // Build all-4-states summary
    var summaryHtml = '';
    ['00', '01', '10', '11'].forEach(function(s) {
        var isActive = s === state;
        var c = STATE_COLORS[s];
        summaryHtml +=
            '<div style="text-align:center;padding:0.75rem 0.5rem;border-radius:10px;' +
            'background:' + (isActive ? c + '18' : 'var(--bg-secondary)') + ';' +
            'border:2px solid ' + (isActive ? c : 'transparent') + ';transition:all 0.2s;">' +
            '<div style="font-size:1.1rem;font-weight:700;color:' + (isActive ? c : 'var(--text-secondary)') + ';">|' + s + '⟩</div>' +
            '<div style="font-size:0.75rem;color:var(--text-secondary);margin-top:0.25rem;">= ' + parseInt(s, 2) + '</div>' +
            '</div>';
    });

    var viz = document.getElementById('two-qubit-visualization');
    if (!viz) return;

    viz.innerHTML =
        // Main state display
        '<div style="background:var(--bg-secondary);border-radius:14px;padding:2rem;margin-bottom:1rem;">' +
            '<div style="display:flex;justify-content:center;align-items:center;gap:1.25rem;flex-wrap:wrap;">' +

                // Qubit 0
                '<div style="text-align:center;">' +
                    '<div style="font-size:0.7rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.75rem;">Qubit 0</div>' +
                    '<div style="width:90px;height:90px;border-radius:50%;background:' + q0Color + ';display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:white;margin:0 auto;box-shadow:0 0 0 5px ' + q0Color + '28,0 8px 24px ' + q0Color + '44;transition:all 0.3s;">|' + q0 + '⟩</div>' +
                    '<div style="margin-top:0.75rem;font-size:0.8125rem;color:var(--text-secondary);">state |' + q0 + '⟩</div>' +
                '</div>' +

                // Tensor symbol
                '<div style="text-align:center;">' +
                    '<div style="font-size:1.75rem;color:var(--text-secondary);font-weight:300;line-height:1;">⊗</div>' +
                    '<div style="font-size:0.7rem;color:var(--text-secondary);margin-top:0.25rem;">tensor</div>' +
                '</div>' +

                // Qubit 1
                '<div style="text-align:center;">' +
                    '<div style="font-size:0.7rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.75rem;">Qubit 1</div>' +
                    '<div style="width:90px;height:90px;border-radius:50%;background:' + q1Color + ';display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:white;margin:0 auto;box-shadow:0 0 0 5px ' + q1Color + '28,0 8px 24px ' + q1Color + '44;transition:all 0.3s;">|' + q1 + '⟩</div>' +
                    '<div style="margin-top:0.75rem;font-size:0.8125rem;color:var(--text-secondary);">state |' + q1 + '⟩</div>' +
                '</div>' +

                // Equals
                '<div style="font-size:1.75rem;color:var(--text-secondary);font-weight:300;">=</div>' +

                // Combined state
                '<div style="text-align:center;">' +
                    '<div style="font-size:0.7rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.75rem;">Combined</div>' +
                    '<div style="width:110px;height:110px;border-radius:16px;background:' + color + ';display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2.25rem;font-weight:700;color:white;margin:0 auto;box-shadow:0 0 0 5px ' + color + '28,0 8px 28px ' + color + '55;transition:all 0.3s;">|' + state + '⟩</div>' +
                    '<div style="margin-top:0.75rem;font-size:0.8125rem;color:var(--text-secondary);">decimal ' + decimal + '</div>' +
                '</div>' +

            '</div>' +
        '</div>' +

        // Explanation
        '<div style="background:var(--bg-card);border:1px solid ' + color + '44;border-left:4px solid ' + color + ';border-radius:8px;padding:1rem 1.25rem;margin-bottom:1rem;">' +
            '<p style="margin:0;font-weight:600;color:var(--text-primary);">' + desc.text + '</p>' +
            '<p style="margin:0.5rem 0 0;font-size:0.875rem;color:var(--text-secondary);">' + desc.note + '</p>' +
        '</div>' +

        // All 4 states grid
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;">' +
            summaryHtml +
        '</div>';
}

// ============================================================================
// INTERACTIVE 3: H ⊗ H CIRCUIT (DOUBLE HADAMARD)
// ============================================================================

function applyDoubleHadamard() {
    var counts = { '00': 0, '01': 0, '10': 0, '11': 0 };
    var measurements = [];

    for (var i = 0; i < 40; i++) {
        var rand = Math.random();
        var result = rand < 0.25 ? '00' : rand < 0.5 ? '01' : rand < 0.75 ? '10' : '11';
        measurements.push(result);
        counts[result]++;
    }

    var states = ['00', '01', '10', '11'];
    var maxCount = Math.max(counts['00'], counts['01'], counts['10'], counts['11']);

    // ---- Stats cards ----
    var statsHtml = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-bottom:1.25rem;">';
    states.forEach(function(s) {
        var c = STATE_COLORS[s];
        var pct = Math.round((counts[s] / 40) * 100);
        statsHtml +=
            '<div style="background:var(--bg-card);border-radius:12px;padding:1rem;border:2px solid ' + c + '44;text-align:center;">' +
                '<div style="font-size:1.5rem;font-weight:700;color:var(--text-primary);">' + counts[s] + '</div>' +
                '<div style="font-size:0.75rem;color:var(--text-secondary);margin:0.25rem 0;">= ' + pct + '%</div>' +
                '<div style="font-size:1rem;font-weight:700;color:' + c + ';">|' + s + '⟩</div>' +
            '</div>';
    });
    statsHtml += '</div>';

    var statsDiv = document.getElementById('hh-stats');
    if (statsDiv) statsDiv.innerHTML = statsHtml;

    // ---- Horizontal bar chart (lesson3 style) ----
    var barsHtml =
        '<div style="background:var(--bg-card);border-radius:12px;padding:1.5rem;border:2px solid var(--border-subtle);margin-bottom:1.25rem;">' +
        '<div style="font-size:0.875rem;font-weight:600;color:var(--text-secondary);margin-bottom:1rem;text-transform:uppercase;letter-spacing:0.05em;">Measurement Distribution (40 shots)</div>';

    states.forEach(function(s) {
        var c = STATE_COLORS[s];
        var pct = maxCount > 0 ? Math.round((counts[s] / maxCount) * 100) : 0;
        barsHtml +=
            '<div style="margin-bottom:1rem;">' +
                '<div style="display:flex;align-items:center;gap:1rem;">' +
                    '<div style="font-size:1rem;font-weight:700;min-width:46px;color:' + c + ';">|' + s + '⟩</div>' +
                    '<div style="flex:1;height:36px;background:var(--bg-secondary);border-radius:100px;overflow:hidden;position:relative;">' +
                        '<div class="hh-bar" data-target="' + pct + '" style="height:100%;width:0%;border-radius:100px;background:linear-gradient(90deg,' + c + ',' + c + 'aa);box-shadow:0 0 16px ' + c + '44;transition:width 0.7s cubic-bezier(0.4,0,0.2,1);"></div>' +
                    '</div>' +
                    '<div style="font-size:1rem;font-weight:700;color:var(--text-primary);min-width:28px;text-align:right;">' + counts[s] + '</div>' +
                '</div>' +
            '</div>';
    });

    barsHtml += '</div>';

    var barsDiv = document.getElementById('hh-bars');
    if (barsDiv) {
        barsDiv.innerHTML = barsHtml;
        // Animate bars in after a frame
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                barsDiv.querySelectorAll('.hh-bar').forEach(function(bar) {
                    bar.style.width = bar.getAttribute('data-target') + '%';
                });
            });
        });
    }

    // ---- Result badges ----
    var badgesHtml = '<div style="margin-bottom:0.5rem;font-size:0.875rem;font-weight:600;color:var(--text-secondary);">All 40 measurements:</div>';
    badgesHtml += '<div style="display:flex;flex-wrap:wrap;gap:0.375rem;">';
    measurements.forEach(function(s) {
        var c = STATE_COLORS[s];
        badgesHtml += '<span style="display:inline-block;background:' + c + ';color:white;padding:0.375rem 0.625rem;border-radius:6px;font-weight:700;font-size:0.9rem;box-shadow:0 2px 6px ' + c + '44;">|' + s + '⟩</span>';
    });
    badgesHtml += '</div>';

    var resultsDiv = document.getElementById('hh-results');
    if (resultsDiv) resultsDiv.innerHTML = badgesHtml;
}

// ============================================================================
// INTERACTIVE 4: CLASSICAL VS QUANTUM SCALING
// ============================================================================

function updateScaleComparison(count) {
    count = parseInt(count);
    var countDisplay = document.getElementById('scale-count');
    if (countDisplay) countDisplay.textContent = count;

    var states = Math.pow(2, count);

    // ---- Classical card ----
    var classicalDiv = document.getElementById('classical-scale');
    if (classicalDiv) {
        var example = '';
        for (var i = 0; i < count; i++) example += Math.random() < 0.5 ? '0' : '1';

        classicalDiv.innerHTML =
            '<div style="font-size:2.5rem;font-weight:700;color:var(--text-primary);line-height:1;margin-bottom:0.25rem;">1</div>' +
            '<div style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1rem;">state stored at a time<br>out of ' + states.toLocaleString() + ' possible</div>' +
            '<div style="padding:0.875rem;background:var(--bg-secondary);border-radius:8px;border:2px dashed var(--border-subtle);text-align:center;">' +
                '<div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.375rem;">Currently storing:</div>' +
                '<code style="font-size:1.1rem;font-weight:700;color:var(--text-primary);letter-spacing:0.1em;">' + example + '</code>' +
            '</div>';
    }

    // ---- Quantum card ----
    var quantumDiv = document.getElementById('quantum-scale');
    if (quantumDiv) {
        var parts = [];
        var show = Math.min(4, states);
        for (var j = 0; j < show; j++) {
            parts.push('|' + j.toString(2).padStart(count, '0') + '⟩');
        }
        var rest = states > 4 ? ' + … (' + (states - 4).toLocaleString() + ' more)' : '';

        quantumDiv.innerHTML =
            '<div style="font-size:2.5rem;font-weight:700;color:var(--color-green);line-height:1;margin-bottom:0.25rem;">' + states.toLocaleString() + '</div>' +
            '<div style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:1rem;">states simultaneously!<br>full superposition</div>' +
            '<div style="padding:0.875rem;background:rgba(22,163,74,0.08);border-radius:8px;border:2px solid rgba(22,163,74,0.3);text-align:center;">' +
                '<div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.375rem;">Superposition of:</div>' +
                '<div style="font-size:0.9rem;font-weight:600;color:var(--color-green);">' + parts.join(' + ') + '<span style="color:var(--text-secondary);">' + rest + '</span></div>' +
            '</div>';
    }

    // ---- Dot grid visual ----
    var visualDiv = document.getElementById('scale-visual');
    if (!visualDiv) return;

    var totalDots = Math.min(states, 64); // cap at 64 for display
    var classicalActive = 1; // classical only activates 1 dot (random one)
    var activeIdx = Math.floor(Math.random() * totalDots);

    var dotsHtml =
        '<div style="background:var(--bg-secondary);border-radius:12px;padding:1.25rem;margin-top:0.25rem;">' +
            '<div style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:0.875rem;font-weight:600;">' +
                'State space visualization' + (states > 64 ? ' (showing 64 of ' + states.toLocaleString() + ')' : '') + ':' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">';

    // Classical dots
    dotsHtml += '<div><div style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Classical — 1 active</div><div style="display:flex;flex-wrap:wrap;gap:4px;">';
    for (var d = 0; d < totalDots; d++) {
        var isActive = d === activeIdx;
        dotsHtml += '<div style="width:12px;height:12px;border-radius:3px;background:' + (isActive ? '#6b7280' : 'var(--bg-card)') + ';border:1px solid ' + (isActive ? '#6b7280' : 'var(--border-subtle)') + ';transition:all 0.3s;"></div>';
    }
    dotsHtml += '</div></div>';

    // Quantum dots
    dotsHtml += '<div><div style="font-size:0.75rem;font-weight:700;color:var(--color-green);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Quantum — ALL active</div><div style="display:flex;flex-wrap:wrap;gap:4px;">';
    for (var d = 0; d < totalDots; d++) {
        dotsHtml += '<div style="width:12px;height:12px;border-radius:3px;background:var(--color-green);border:1px solid var(--color-green-dark);opacity:0.85;"></div>';
    }
    dotsHtml += '</div></div>';

    dotsHtml += '</div></div>';

    // Speedup callout
    var speedup = states.toLocaleString() + '×';
    dotsHtml +=
        '<div style="margin-top:0.875rem;padding:0.875rem 1.25rem;background:rgba(22,163,74,0.08);border-radius:8px;border-left:4px solid var(--color-green);display:flex;align-items:center;gap:1rem;">' +
            '<div style="font-size:1.75rem;font-weight:700;color:var(--color-green);">' + speedup + '</div>' +
            '<div style="font-size:0.875rem;color:var(--text-secondary);">more state-space than classical with the same number of bits</div>' +
        '</div>';

    visualDiv.innerHTML = dotsHtml;
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL6(btn) {
    var answers = { q1: 'c', q2: 'b', q3: 'c' };
    var feedback = {
        q1: { correct: 'Correct! 2³ = 8 states. Each qubit doubles the state space.', incorrect: 'Remember: n qubits create 2^n states. 2³ = 8.' },
        q2: { correct: 'Perfect! H ⊗ H creates (1/2)(|00⟩ + |01⟩ + |10⟩ + |11⟩).', incorrect: 'H ⊗ H creates a uniform superposition of all four basis states.' },
        q3: { correct: 'Exponential scaling is the foundation of quantum advantage!', incorrect: 'The key is exponential state space: 2^n states for n qubits.' }
    };
    checkQuiz(answers, feedback, 'quiz-score', btn);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    updateQubitCount(1);
    showTwoQubitState('00');
    updateScaleComparison(5);
    console.log('Lesson 6: Multiple Qubits - All interactives loaded!');
});
