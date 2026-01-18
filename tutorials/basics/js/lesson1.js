// ========================================
// Lesson 1: Welcome to Quantum Computing
// quantumstuff.org - Interactive Quantum Computing Tutorial
// ========================================

// ========================================
// Section 1.1: Classical vs Quantum Speed Comparison
// ========================================
function initSpeedComparison() {
    const slider = document.getElementById('problem-size');
    const sizeDisplay = document.getElementById('size-value');
    const classicalBar = document.getElementById('classical-bar');
    const quantumBar = document.getElementById('quantum-bar');
    const classicalTime = document.getElementById('classical-time');
    const quantumTime = document.getElementById('quantum-time');
    const speedupDisplay = document.getElementById('speedup-display');

    slider.addEventListener('input', function() {
        const size = parseInt(this.value);
        updateSpeedComparison(size);
    });

    function updateSpeedComparison(size) {
        sizeDisplay.textContent = size;

        // Grover's algorithm: Classical is O(N), Quantum is O(sqrt(N))
        const classicalSteps = size;
        const quantumSteps = Math.ceil(Math.sqrt(size));
        const speedup = (classicalSteps / quantumSteps).toFixed(1);

        // Update labels
        classicalTime.textContent = classicalSteps + ' steps';
        quantumTime.textContent = quantumSteps + ' steps';
        speedupDisplay.textContent = 'Quantum is ' + speedup + 'x faster!';

        // Update bar widths (normalize to fit display)
        const maxWidth = 100; // percentage
        const classicalWidth = Math.min(100, (classicalSteps / 100) * 10);
        const quantumWidth = Math.min(100, (quantumSteps / 100) * 10);

        classicalBar.style.width = classicalWidth + '%';
        quantumBar.style.width = quantumWidth + '%';

        // Color based on speedup
        if (speedup > 50) {
            speedupDisplay.style.color = '#2d5016';
            speedupDisplay.style.fontWeight = 'bold';
        } else {
            speedupDisplay.style.color = '#6b8e23';
            speedupDisplay.style.fontWeight = 'normal';
        }
    }

    // Initialize
    updateSpeedComparison(100);
}

// ========================================
// Section 1.3: Classical Bit Toggle
// ========================================
let classicalBitState = 0;

function toggleClassicalBit() {
    classicalBitState = classicalBitState === 0 ? 1 : 0;
    const bitElement = document.getElementById('classical-bit-value');
    if (bitElement) {
        bitElement.textContent = classicalBitState;

        // Visual feedback
        bitElement.style.transform = 'scale(1.2)';
        setTimeout(function() {
            bitElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// ========================================
// Section 1.3: Qubit Reveal
// ========================================
let qubitRevealed = false;

function revealQubit() {
    const mysteryState = document.getElementById('qubit-state');
    const notation = document.getElementById('qubit-notation');
    const explanation = document.getElementById('qubit-explanation');
    const note = document.getElementById('qubit-note');

    if (!qubitRevealed) {
        // Reveal the quantum state
        mysteryState.classList.add('hidden');
        notation.classList.remove('hidden');
        explanation.classList.remove('hidden');

        note.textContent = 'This is superposition—the qubit is in both states at once!';
        note.style.fontWeight = 'bold';
        note.style.color = '#2d5016';

        qubitRevealed = true;
    } else {
        // Hide again
        mysteryState.classList.remove('hidden');
        notation.classList.add('hidden');
        explanation.classList.add('hidden');

        note.textContent = 'Click to see what makes qubits special!';
        note.style.fontWeight = 'normal';
        note.style.color = '';

        qubitRevealed = false;
    }
}

// ========================================
// Quiz System for Lesson 1
// ========================================
const quizAnswers = {
    q1: 'b',
    q2: 'b',
    q3: 'b'
};

const quizFeedback = {
    q1: {
        correct: 'Correct! Quantum computers use quantum physics principles like superposition and entanglement to achieve exponential speedup on certain problems.',
        incorrect: 'Not quite. Quantum computers gain their power from quantum physics phenomena, not just faster hardware. They achieve exponential speedup on specific types of problems.'
    },
    q2: {
        correct: 'Exactly! A qubit is the quantum version of a classical bit. It can exist in superposition, which gives quantum computers their power.',
        incorrect: 'Not quite. A qubit (quantum bit) is the quantum analog of a classical bit. It can exist in superposition of both 0 and 1.'
    },
    q3: {
        correct: 'Perfect! Classical bits can only be in one definite state at a time—either 0 OR 1. Only qubits can be in superposition (both 0 AND 1).',
        incorrect: 'Not quite. Classical bits are always in a definite state—either 0 or 1, never both. Only quantum qubits can exist in superposition of multiple states.'
    }
};

function checkAnswersL1() {
    let score = 0;
    const totalQuestions = Object.keys(quizAnswers).length;

    for (let question in quizAnswers) {
        const selectedAnswer = document.querySelector('input[name="' + question + '"]:checked');
        const feedbackElement = document.getElementById('feedback-' + question.substring(1));
        const questionElement = document.querySelector('[data-question="' + question.substring(1) + '"]');
        const options = questionElement.querySelectorAll('.option');

        // Reset previous styling
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove('correct', 'incorrect');
        }

        if (!selectedAnswer) {
            feedbackElement.textContent = 'Please select an answer.';
            feedbackElement.className = 'feedback show incorrect';
            continue;
        }

        const userAnswer = selectedAnswer.value;
        const isCorrect = userAnswer === quizAnswers[question];

        if (isCorrect) {
            score++;
            feedbackElement.textContent = '✓ ' + quizFeedback[question].correct;
            feedbackElement.className = 'feedback show correct';
            selectedAnswer.parentElement.classList.add('correct');
        } else {
            feedbackElement.textContent = '✗ ' + quizFeedback[question].incorrect;
            feedbackElement.className = 'feedback show incorrect';
            selectedAnswer.parentElement.classList.add('incorrect');

            // Highlight the correct answer
            for (let i = 0; i < options.length; i++) {
                const input = options[i].querySelector('input');
                if (input.value === quizAnswers[question]) {
                    options[i].classList.add('correct');
                }
            }
        }
    }

    // Display score
    const scoreElement = document.getElementById('quiz-score');
    const percentage = (score / totalQuestions) * 100;

    let message, scoreClass;
    if (percentage === 100) {
        message = 'Perfect! ' + score + '/' + totalQuestions + ' correct. Ready for Lesson 2!';
        scoreClass = 'excellent';
    } else if (percentage >= 66) {
        message = 'Good job! ' + score + '/' + totalQuestions + ' correct. You can move on!';
        scoreClass = 'good';
    } else {
        message = score + '/' + totalQuestions + ' correct. Review the material and try again.';
        scoreClass = 'needsWork';
    }

    scoreElement.textContent = message;
    scoreElement.className = 'quiz-result show ' + scoreClass;

    // Scroll to score
    scoreElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========================================
// Initialize on Page Load
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize speed comparison if element exists
    const speedSlider = document.getElementById('problem-size');
    if (speedSlider) {
        initSpeedComparison();
    }

    // Add click handling for quiz options
    const quizOptions = document.querySelectorAll('.option');
    for (let i = 0; i < quizOptions.length; i++) {
        quizOptions[i].addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    }
});
