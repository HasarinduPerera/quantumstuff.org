// ========================================
// Lesson 2: Classical Computing Foundations
// quantumstuff.org - Interactive Quantum Computing Tutorial
// ========================================

// ========================================
// Section 2.1: Binary Counter
// ========================================
var currentBinaryValue = 0;

function initBinaryCounter() {
    updateBinaryDisplay();
}

function updateBinaryDisplay() {
    var binary = currentBinaryValue.toString(2).padStart(8, '0');
    var display = document.getElementById('binary-display');
    var html = '';

    for (var i = 0; i < 8; i++) {
        var bit = binary[i];
        var isOn = bit === '1';
        html += '<div class="bit-box ' + (isOn ? 'on' : 'off') + '" onclick="flipBit(' + i + ')">' + bit + '</div>';
    }

    display.innerHTML = html;
    document.getElementById('decimal-value').textContent = currentBinaryValue;
}

function flipBit(position) {
    var bitValue = Math.pow(2, 7 - position);
    currentBinaryValue = currentBinaryValue ^ bitValue;
    updateBinaryDisplay();
}

function resetBinary() {
    currentBinaryValue = 0;
    updateBinaryDisplay();
}

function setBinaryValue(value) {
    currentBinaryValue = value;
    updateBinaryDisplay();
}

function checkBinaryChallenge() {
    var resultDiv = document.getElementById('binary-challenge-result');

    if (currentBinaryValue === 100) {
        resultDiv.textContent = 'Correct! 100 in binary is 01100100. Great job!';
        resultDiv.className = 'result-text success';
        resultDiv.style.background = '#d4edda';
        resultDiv.style.border = '1px solid #28a745';
    } else {
        resultDiv.textContent = 'Not quite. Current value is ' + currentBinaryValue + '. Keep trying!';
        resultDiv.className = 'result-text';
        resultDiv.style.background = '#fff3cd';
        resultDiv.style.border = '1px solid #ffc107';
    }
}

// ========================================
// Section 2.2: Gate Playground
// ========================================

// NOT Gate state
var notInput = 0;

function toggleNotInput() {
    notInput = notInput === 0 ? 1 : 0;
    updateNotGate();
}

function updateNotGate() {
    var inputBtn = document.getElementById('not-input');
    var outputDiv = document.getElementById('not-output');
    var output = notInput === 0 ? 1 : 0;

    inputBtn.textContent = notInput;
    inputBtn.className = 'bit-button ' + (notInput === 1 ? 'on' : 'off');
    outputDiv.textContent = output;
    outputDiv.className = 'bit-display-small ' + (output === 1 ? 'on' : 'off');
}

// AND Gate state
var andInputA = 0;
var andInputB = 0;

function toggleAndInputA() {
    andInputA = andInputA === 0 ? 1 : 0;
    updateAndGate();
}

function toggleAndInputB() {
    andInputB = andInputB === 0 ? 1 : 0;
    updateAndGate();
}

function updateAndGate() {
    var inputABtn = document.getElementById('and-input-a');
    var inputBBtn = document.getElementById('and-input-b');
    var outputDiv = document.getElementById('and-output');
    var output = (andInputA === 1 && andInputB === 1) ? 1 : 0;

    inputABtn.textContent = andInputA;
    inputABtn.className = 'bit-button ' + (andInputA === 1 ? 'on' : 'off');
    inputBBtn.textContent = andInputB;
    inputBBtn.className = 'bit-button ' + (andInputB === 1 ? 'on' : 'off');
    outputDiv.textContent = output;
    outputDiv.className = 'bit-display-small ' + (output === 1 ? 'on' : 'off');
}

// OR Gate state
var orInputA = 0;
var orInputB = 0;

function toggleOrInputA() {
    orInputA = orInputA === 0 ? 1 : 0;
    updateOrGate();
}

function toggleOrInputB() {
    orInputB = orInputB === 0 ? 1 : 0;
    updateOrGate();
}

function updateOrGate() {
    var inputABtn = document.getElementById('or-input-a');
    var inputBBtn = document.getElementById('or-input-b');
    var outputDiv = document.getElementById('or-output');
    var output = (orInputA === 1 || orInputB === 1) ? 1 : 0;

    inputABtn.textContent = orInputA;
    inputABtn.className = 'bit-button ' + (orInputA === 1 ? 'on' : 'off');
    inputBBtn.textContent = orInputB;
    inputBBtn.className = 'bit-button ' + (orInputB === 1 ? 'on' : 'off');
    outputDiv.textContent = output;
    outputDiv.className = 'bit-display-small ' + (output === 1 ? 'on' : 'off');
}

// Gate tab switching
function showGate(gateName) {
    // Hide all panels
    var panels = document.querySelectorAll('.gate-panel');
    for (var i = 0; i < panels.length; i++) {
        panels[i].classList.remove('active');
    }

    // Remove active from all tabs
    var tabs = document.querySelectorAll('.gate-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show selected panel and activate tab
    if (gateName === 'not') {
        document.getElementById('not-gate-panel').classList.add('active');
        tabs[0].classList.add('active');
        updateNotGate();
    } else if (gateName === 'and') {
        document.getElementById('and-gate-panel').classList.add('active');
        tabs[1].classList.add('active');
        updateAndGate();
    } else if (gateName === 'or') {
        document.getElementById('or-gate-panel').classList.add('active');
        tabs[2].classList.add('active');
        updateOrGate();
    }
}

// ========================================
// Section 2.3: Circuit Simulator (XOR)
// ========================================
var circuitInputA = 0;
var circuitInputB = 0;

function toggleCircuitInputA() {
    circuitInputA = circuitInputA === 0 ? 1 : 0;
    updateCircuit();
}

function toggleCircuitInputB() {
    circuitInputB = circuitInputB === 0 ? 1 : 0;
    updateCircuit();
}

function updateCircuit() {
    var inputABtn = document.getElementById('circuit-input-a');
    var inputBBtn = document.getElementById('circuit-input-b');

    inputABtn.textContent = circuitInputA;
    inputABtn.className = 'bit-button ' + (circuitInputA === 1 ? 'on' : 'off');
    inputBBtn.textContent = circuitInputB;
    inputBBtn.className = 'bit-button ' + (circuitInputB === 1 ? 'on' : 'off');

    // XOR circuit: (A AND NOT B) OR (NOT A AND B)
    var notA = circuitInputA === 0 ? 1 : 0;
    var notB = circuitInputB === 0 ? 1 : 0;
    var andLeft = (circuitInputA === 1 && notB === 1) ? 1 : 0;
    var andRight = (notA === 1 && circuitInputB === 1) ? 1 : 0;
    var output = (andLeft === 1 || andRight === 1) ? 1 : 0;

    document.getElementById('circuit-output').textContent = output;

    // Update explanation
    var stepByStep = document.getElementById('circuit-step-by-step');
    var explanation = 'A=' + circuitInputA + ', B=' + circuitInputB + ' → ';
    explanation += 'NOT A=' + notA + ', NOT B=' + notB + ' → ';
    explanation += '(A AND NOT B)=' + andLeft + ', (NOT A AND B)=' + andRight + ' → ';
    explanation += 'Final OR=' + output + '. ';

    if (output === 1) {
        explanation += 'Inputs are DIFFERENT, so XOR outputs 1!';
    } else {
        explanation += 'Inputs are the SAME, so XOR outputs 0!';
    }

    stepByStep.textContent = explanation;
}

// ========================================
// Quiz System for Lesson 2
// ========================================
var quizAnswers = {
    q1: 'b',
    q2: 'a',
    q3: 'b',
    q4: 'b'
};

var quizFeedback = {
    q1: {
        correct: 'Correct! Binary is a two-state number system using only 0 and 1, which matches how electricity can be ON or OFF.',
        incorrect: 'Not quite. Binary is a base-2 number system with only two digits: 0 and 1. It\'s perfect for computers because electricity can be ON (1) or OFF (0).'
    },
    q2: {
        correct: 'Exactly! The NOT gate is an inverter—it flips whatever input it receives. 0 becomes 1, and 1 becomes 0.',
        incorrect: 'Not quite. The NOT gate flips the input bit: if the input is 0, output is 1; if input is 1, output is 0.'
    },
    q3: {
        correct: 'Perfect! The AND gate outputs 1 only when BOTH inputs are 1. If either input is 0, the output is 0.',
        incorrect: 'Not quite. The AND gate requires BOTH inputs to be 1 to output 1. Think of it as "this AND that must be true".'
    },
    q4: {
        correct: 'Correct! A circuit is a combination of gates working together to perform a more complex operation.',
        incorrect: 'Not quite. A circuit is a combination of multiple gates connected together to process information step-by-step.'
    }
};

function checkAnswersL2() {
    var score = 0;
    var totalQuestions = Object.keys(quizAnswers).length;

    for (var question in quizAnswers) {
        var selectedAnswer = document.querySelector('input[name="' + question + '"]:checked');
        var feedbackElement = document.getElementById('feedback-' + question.substring(1));
        var questionElement = document.querySelector('[data-question="' + question.substring(1) + '"]');
        var options = questionElement.querySelectorAll('.option');

        // Reset previous styling
        for (var i = 0; i < options.length; i++) {
            options[i].classList.remove('correct', 'incorrect');
        }

        if (!selectedAnswer) {
            feedbackElement.textContent = 'Please select an answer.';
            feedbackElement.className = 'feedback show incorrect';
            continue;
        }

        var userAnswer = selectedAnswer.value;
        var isCorrect = userAnswer === quizAnswers[question];

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
            for (var i = 0; i < options.length; i++) {
                var input = options[i].querySelector('input');
                if (input.value === quizAnswers[question]) {
                    options[i].classList.add('correct');
                }
            }
        }
    }

    // Display score
    var scoreElement = document.getElementById('quiz-score');
    var percentage = (score / totalQuestions) * 100;

    var message, scoreClass;
    if (percentage === 100) {
        message = 'Perfect! ' + score + '/' + totalQuestions + ' correct. You understand classical computing!';
        scoreClass = 'excellent';
    } else if (percentage >= 75) {
        message = 'Good job! ' + score + '/' + totalQuestions + ' correct. Ready for quantum!';
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
    // Initialize binary counter
    initBinaryCounter();

    // Initialize gate playground
    updateNotGate();
    updateAndGate();
    updateOrGate();

    // Initialize circuit simulator
    updateCircuit();

    // Add click handling for quiz options
    var quizOptions = document.querySelectorAll('.option');
    for (var i = 0; i < quizOptions.length; i++) {
        quizOptions[i].addEventListener('click', function() {
            var radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    }
});
