/**
 * quantum-utils.js
 * Shared utilities for quantumstuff.org quantum computing lessons
 *
 * This file contains reusable functions for:
 * - Quantum measurements and simulations
 * - Quiz systems
 * - UI updates (histograms, result displays)
 * - Probability calculations
 */

// ============================================================================
// QUANTUM SIMULATION UTILITIES
// ============================================================================

/**
 * Simulates measuring a qubit in superposition
 * @param {number} prob0 - Probability of measuring |0⟩ (between 0 and 1)
 * @returns {number} - 0 or 1
 */
function measureQubit(prob0) {
    return Math.random() < prob0 ? 0 : 1;
}

/**
 * Performs multiple measurements and returns statistics
 * @param {number} prob0 - Probability of measuring |0⟩
 * @param {number} count - Number of measurements
 * @returns {object} - {zeros: number, ones: number, results: array}
 */
function performMeasurements(prob0, count) {
    var zeros = 0;
    var ones = 0;
    var results = [];

    for (var i = 0; i < count; i++) {
        var result = measureQubit(prob0);
        results.push(result);
        if (result === 0) {
            zeros++;
        } else {
            ones++;
        }
    }

    return {
        zeros: zeros,
        ones: ones,
        results: results,
        prob0: zeros / count,
        prob1: ones / count
    };
}

/**
 * Applies Hadamard gate (creates equal superposition)
 * @param {number} inputState - 0 or 1
 * @returns {number} - Probability of measuring |0⟩ after H gate
 */
function applyHadamard(inputState) {
    // H gate creates equal superposition: 50% chance for both outcomes
    return 0.5;
}

/**
 * Applies X gate (bit flip)
 * @param {number} inputState - 0 or 1
 * @returns {number} - Flipped state (deterministic)
 */
function applyXGate(inputState) {
    return inputState === 0 ? 1 : 0;
}

// ============================================================================
// QUIZ SYSTEM UTILITIES
// ============================================================================

/**
 * Generic quiz checker for all lessons
 * @param {object} answers - Correct answers object {q1: 'a', q2: 'b', ...}
 * @param {object} feedback - Feedback messages object {q1: {correct: '', incorrect: ''}, ...}
 * @param {string} scoreElementId - ID of element to display score
 * @returns {number} - Score as percentage
 */
function checkQuiz(answers, feedback, scoreElementId, buttonElement) {
    var totalQuestions = Object.keys(answers).length;
    var correctCount = 0;

    // Check each question
    for (var questionNum in answers) {
        if (answers.hasOwnProperty(questionNum)) {
            var correctAnswer = answers[questionNum];
            var selectedInput = document.querySelector('input[name="' + questionNum + '"]:checked');
            var feedbackElement = document.getElementById('feedback-' + questionNum.replace('q', ''));

            if (!feedbackElement) continue;

            if (selectedInput) {
                var userAnswer = selectedInput.value;
                var isCorrect = userAnswer === correctAnswer;

                if (isCorrect) {
                    correctCount++;
                    feedbackElement.className = 'feedback correct';
                    feedbackElement.textContent = '✓ Correct! ' + (feedback[questionNum] ? feedback[questionNum].correct : '');
                } else {
                    feedbackElement.className = 'feedback incorrect';
                    feedbackElement.textContent = '✗ Incorrect. ' + (feedback[questionNum] ? feedback[questionNum].incorrect : '');
                }
            } else {
                feedbackElement.className = 'feedback';
                feedbackElement.textContent = 'Please select an answer.';
            }
        }
    }

    // Display score
    var percentage = Math.round((correctCount / totalQuestions) * 100);
    var scoreElement = document.getElementById(scoreElementId);

    if (scoreElement) {
        var resultClass = percentage === 100 ? 'perfect' : percentage >= 60 ? 'good' : 'needs-improvement';
        scoreElement.className = 'quiz-result ' + resultClass;
        scoreElement.textContent = 'Score: ' + correctCount + '/' + totalQuestions + ' (' + percentage + '%)';

        if (percentage === 100) {
            scoreElement.textContent += ' 🎉 Perfect!';
            // Drop confetti on perfect score from the submit button!
            if (typeof confetti !== 'undefined' && buttonElement) {
                setTimeout(function() {
                    var rect = buttonElement.getBoundingClientRect();
                    var x = (rect.left + rect.width / 2) / window.innerWidth;
                    var y = (rect.top + rect.height / 2) / window.innerHeight;

                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { x: x, y: y }
                    });
                }, 100);
            }
        } else if (percentage >= 60) {
            scoreElement.textContent += ' Good job!';
        } else {
            scoreElement.textContent += ' Keep learning!';
        }
    }

    return percentage;
}

// ============================================================================
// HISTOGRAM AND VISUALIZATION UTILITIES
// ============================================================================

/**
 * Creates a histogram showing measurement results
 * @param {object} stats - Statistics object {zeros: number, ones: number}
 * @param {string} containerId - ID of container element
 * @param {number} maxHeight - Maximum bar height in pixels (default 200)
 */
function createHistogram(stats, containerId, maxHeight) {
    maxHeight = maxHeight || 200;
    var container = document.getElementById(containerId);

    if (!container) return;

    var total = stats.zeros + stats.ones;
    var maxCount = Math.max(stats.zeros, stats.ones);

    // Calculate bar heights
    var height0 = maxCount > 0 ? Math.round((stats.zeros / maxCount) * maxHeight) : 0;
    var height1 = maxCount > 0 ? Math.round((stats.ones / maxCount) * maxHeight) : 0;

    // Calculate percentages
    var percent0 = total > 0 ? Math.round((stats.zeros / total) * 100) : 0;
    var percent1 = total > 0 ? Math.round((stats.ones / total) * 100) : 0;

    var html = '<div class="histogram">' +
        '<div class="histogram-bars">' +
            '<div class="histogram-bar-container">' +
                '<div class="histogram-bar bar-0" style="height: ' + height0 + 'px;">' +
                    '<span class="bar-label">' + stats.zeros + '</span>' +
                '</div>' +
                '<div class="histogram-label">|0⟩</div>' +
                '<div class="histogram-percent">' + percent0 + '%</div>' +
            '</div>' +
            '<div class="histogram-bar-container">' +
                '<div class="histogram-bar bar-1" style="height: ' + height1 + 'px;">' +
                    '<span class="bar-label">' + stats.ones + '</span>' +
                '</div>' +
                '<div class="histogram-label">|1⟩</div>' +
                '<div class="histogram-percent">' + percent1 + '%</div>' +
            '</div>' +
        '</div>' +
        '<div class="histogram-stats">Total measurements: ' + total + '</div>' +
    '</div>';

    container.innerHTML = html;
}

/**
 * Displays measurement results as badges (for small counts)
 * @param {array} results - Array of measurement results [0, 1, 0, ...]
 * @param {string} containerId - ID of container element
 */
function displayResultBadges(results, containerId) {
    var container = document.getElementById(containerId);

    if (!container) return;

    var html = '';
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        var badgeClass = result === 0 ? 'result-badge badge-0' : 'result-badge badge-1';
        html += '<span class="' + badgeClass + '">|' + result + '⟩</span>';
    }

    container.innerHTML = html;
}

/**
 * Creates a simple statistics display
 * @param {object} stats - Statistics object {zeros: number, ones: number}
 * @param {string} elementId - ID of element to update
 */
function displayStats(stats, elementId) {
    var element = document.getElementById(elementId);

    if (!element) return;

    var total = stats.zeros + stats.ones;
    var percent0 = total > 0 ? Math.round((stats.zeros / total) * 100) : 0;
    var percent1 = total > 0 ? Math.round((stats.ones / total) * 100) : 0;

    element.textContent = '|0⟩: ' + stats.zeros + ' (' + percent0 + '%) | ' +
                          '|1⟩: ' + stats.ones + ' (' + percent1 + '%)';
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Animates a value change with CSS transition
 * @param {string} elementId - ID of element to animate
 * @param {string} property - CSS property to animate
 * @param {string} newValue - New value for the property
 * @param {number} duration - Animation duration in milliseconds (default 300)
 */
function animateProperty(elementId, property, newValue, duration) {
    duration = duration || 300;
    var element = document.getElementById(elementId);

    if (!element) return;

    element.style.transition = property + ' ' + duration + 'ms ease';
    element.style[property] = newValue;
}

/**
 * Adds a temporary highlight effect to an element
 * @param {string} elementId - ID of element to highlight
 * @param {number} duration - Highlight duration in milliseconds (default 1000)
 */
function highlightElement(elementId, duration) {
    duration = duration || 1000;
    var element = document.getElementById(elementId);

    if (!element) return;

    element.classList.add('highlight-flash');
    setTimeout(function() {
        element.classList.remove('highlight-flash');
    }, duration);
}

// ============================================================================
// CIRCUIT SIMULATION UTILITIES
// ============================================================================

/**
 * Simulates a quantum circuit and returns final state
 * @param {number} initialState - Starting state (0 or 1)
 * @param {array} gates - Array of gate names ['H', 'X', 'H']
 * @returns {object} - {finalProb0: number, measurements: object}
 */
function simulateCircuit(initialState, gates) {
    var currentProb0 = initialState === 0 ? 1.0 : 0.0;
    var inSuperposition = false;

    // Apply each gate
    for (var i = 0; i < gates.length; i++) {
        var gate = gates[i];

        if (gate === 'H') {
            // Hadamard creates superposition
            currentProb0 = 0.5;
            inSuperposition = true;
        } else if (gate === 'X') {
            if (inSuperposition) {
                // X on superposition keeps it in superposition (just swaps amplitudes)
                currentProb0 = 1.0 - currentProb0;
            } else {
                // X deterministically flips
                currentProb0 = currentProb0 === 1.0 ? 0.0 : 1.0;
            }
        }
        // Add more gates as needed (Z, Y, etc.)
    }

    // Perform sample measurements
    var measurements = performMeasurements(currentProb0, 20);

    return {
        finalProb0: currentProb0,
        inSuperposition: inSuperposition,
        measurements: measurements
    };
}

// ============================================================================
// STATE DESCRIPTION UTILITIES
// ============================================================================

/**
 * Gets a human-readable description of a quantum state
 * @param {number} prob0 - Probability of measuring |0⟩
 * @returns {string} - Description of the state
 */
function describeState(prob0) {
    if (prob0 === 1.0) {
        return 'Definitely |0⟩ (100% probability)';
    } else if (prob0 === 0.0) {
        return 'Definitely |1⟩ (100% probability)';
    } else if (Math.abs(prob0 - 0.5) < 0.01) {
        return 'Equal superposition (50/50 split)';
    } else if (prob0 > 0.5) {
        var percent = Math.round(prob0 * 100);
        return 'Mostly |0⟩ (' + percent + '% probability)';
    } else {
        var percent = Math.round((1 - prob0) * 100);
        return 'Mostly |1⟩ (' + percent + '% probability)';
    }
}

/**
 * Converts state to ket notation
 * @param {number} prob0 - Probability of measuring |0⟩
 * @returns {string} - Ket notation string
 */
function toKetNotation(prob0) {
    if (prob0 === 1.0) {
        return '|0⟩';
    } else if (prob0 === 0.0) {
        return '|1⟩';
    } else if (Math.abs(prob0 - 0.5) < 0.01) {
        return '|+⟩ (equal superposition)';
    } else {
        // Show general superposition
        var alpha = Math.sqrt(prob0).toFixed(3);
        var beta = Math.sqrt(1 - prob0).toFixed(3);
        return alpha + '|0⟩ + ' + beta + '|1⟩';
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Formats a number to specified decimal places
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places (default 2)
 * @returns {string} - Formatted number string
 */
function formatNumber(num, decimals) {
    decimals = decimals || 2;
    return num.toFixed(decimals);
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Random integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Delays execution (useful for animations)
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after delay
 */
function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}
