// Combined JavaScript for Lessons 5, 6, 7

// ===========================================
// LESSON 5: Multiple Qubits
// ===========================================

function demonstrateTwoQubits() {
    let results = { '00': 0, '01': 0, '10': 0, '11': 0 };
    let html = '';

    for (let i = 0; i < 20; i++) {
        const q0 = Math.random() < 0.5 ? '0' : '1';
        const q1 = Math.random() < 0.5 ? '0' : '1';
        const state = q0 + q1;
        results[state]++;
        html += '<span style="display: inline-block; width: auto; height: auto; line-height: normal; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; padding: 0.5rem 0.75rem; border-radius: 6px; font-weight: 700; font-size: 0.875rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2); white-space: nowrap; margin: 0.25rem;">' + state + '</span>';
    }

    document.getElementById('two-qubit-results').innerHTML = html;
    document.getElementById('two-qubit-stats').textContent =
        '|00⟩: ' + results['00'] + ', |01⟩: ' + results['01'] + ', |10⟩: ' + results['10'] + ', |11⟩: ' + results['11'];
}

function setCNOTInputs(control, target) {
    document.getElementById('cnot-control-val').textContent = control;
    document.getElementById('cnot-target-val').textContent = target;
    window.cnotControl = control;
    window.cnotTarget = target;
}

function applyCNOT() {
    const control = window.cnotControl || '0';
    const target = window.cnotTarget || '0';

    let newTarget = target;
    if (control === '1') {
        newTarget = target === '0' ? '1' : '0';
    }

    document.getElementById('cnot-output').textContent = control + newTarget;
    const resultEl = document.getElementById('cnot-result');
    resultEl.textContent =
        'Input: |' + control + target + '⟩ → Output: |' + control + newTarget + '⟩ - ' +
        (control === '1' ? 'Target flipped!' : 'Target unchanged');
    resultEl.style.background = '#e8f5e0';
    resultEl.style.border = '1px solid #4a7c2c';
}

// ===========================================
// LESSON 6: Entanglement
// ===========================================

function createBellState() {
    const result = Math.random() < 0.5 ? '00' : '11';
    document.getElementById('bell-result').textContent = result;
    const explainEl = document.getElementById('bell-explanation');
    explainEl.textContent =
        'Bell state measured as |' + result + '⟩! Notice: we only get |00⟩ or |11⟩, never |01⟩ or |10⟩. The qubits are correlated!';
    explainEl.style.background = '#e8f5e0';
    explainEl.style.border = '1px solid #4a7c2c';
}

function testBellMultiple() {
    let results = { '00': 0, '11': 0 };
    let html = '';

    for (let i = 0; i < 20; i++) {
        const result = Math.random() < 0.5 ? '00' : '11';
        results[result]++;
        html += '<span class="result-badge result-multi">' + result + '</span>';
    }

    document.getElementById('bell-multiple-results').innerHTML = html;
    document.getElementById('bell-stats').textContent =
        '|00⟩: ' + results['00'] + ', |11⟩: ' + results['11'] + ' - Notice: no |01⟩ or |10⟩! This is entanglement.';
}

function measureEntangled() {
    const q1Result = Math.random() < 0.5 ? '0' : '1';
    const q2Result = q1Result; // Perfect correlation!

    document.getElementById('entangled-q1').textContent = q1Result;
    document.getElementById('entangled-q2').textContent = q2Result;
    const explainEl = document.getElementById('entangled-explanation');
    explainEl.textContent =
        'Both qubits measured as ' + q1Result + '! Measuring one instantly determines the other.';
    explainEl.style.background = '#e8f5e0';
    explainEl.style.border = '1px solid #4a7c2c';
}

// ===========================================
// Quiz Answers and Feedback
// ===========================================

const quizAnswersL5 = { q1: 'c', q2: 'b' };
const quizFeedbackL5 = {
    q1: {
        correct: 'Correct! 2 qubits can represent 2² = 4 states simultaneously.',
        incorrect: 'Not quite. n qubits can represent 2^n states.'
    },
    q2: {
        correct: 'Perfect! CNOT flips the target only if control is |1⟩.',
        incorrect: 'Not quite. CNOT is controlled by the first qubit.'
    }
};

const quizAnswersL6 = { q1: 'b', q2: 'a' };
const quizFeedbackL6 = {
    q1: {
        correct: 'Exactly! Entangled qubits have correlated measurement outcomes.',
        incorrect: 'Not quite. Entanglement creates correlations between qubits.'
    },
    q2: {
        correct: 'Right! Bell states show perfect correlation - only |00⟩ or |11⟩.',
        incorrect: 'Not quite. Bell states only give |00⟩ or |11⟩, never mixed.'
    }
};

const quizAnswersL7 = { q1: 'b', q2: 'c' };
const quizFeedbackL7 = {
    q1: {
        correct: 'Correct! Superposition allows exploring many solutions simultaneously.',
        incorrect: 'Not quite. Quantum computers use superposition for quantum parallelism.'
    },
    q2: {
        correct: 'Perfect! Grover algorithm provides quadratic speedup for search.',
        incorrect: 'Not quite. Grover searches unsorted databases with quadratic speedup.'
    }
};

function checkAnswersL5(btn) { checkQuizGeneric(quizAnswersL5, quizFeedbackL5, btn); }
function checkAnswersL6(btn) { checkQuizGeneric(quizAnswersL6, quizFeedbackL6, btn); }
function checkAnswersL7(btn) { checkQuizGeneric(quizAnswersL7, quizFeedbackL7, btn); }

function checkQuizGeneric(answers, feedback, buttonElement) {
    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    for (let question in answers) {
        const selectedAnswer = document.querySelector('input[name="' + question + '"]:checked');
        const qNum = question.substring(1);
        const feedbackElement = document.getElementById('feedback-' + qNum);
        const questionElement = document.querySelector('[data-question="' + qNum + '"]');
        const options = questionElement.querySelectorAll('.option');

        options.forEach(function(opt) {
            opt.classList.remove('correct', 'incorrect');
        });

        if (!selectedAnswer) {
            feedbackElement.textContent = 'Please select an answer.';
            feedbackElement.className = 'feedback show incorrect';
            continue;
        }

        const userAnswer = selectedAnswer.value;
        const isCorrect = userAnswer === answers[question];

        if (isCorrect) {
            score++;
            feedbackElement.textContent = '✓ ' + feedback[question].correct;
            feedbackElement.className = 'feedback show correct';
            selectedAnswer.parentElement.classList.add('correct');
        } else {
            feedbackElement.textContent = '✗ ' + feedback[question].incorrect;
            feedbackElement.className = 'feedback show incorrect';
            selectedAnswer.parentElement.classList.add('incorrect');

            options.forEach(function(opt) {
                const input = opt.querySelector('input');
                if (input.value === answers[question]) {
                    opt.classList.add('correct');
                }
            });
        }
    }

    const scoreElement = document.getElementById('quiz-score');
    const percentage = (score / totalQuestions) * 100;

    let message, scoreClass;
    if (percentage === 100) {
        message = 'Perfect! ' + score + '/' + totalQuestions + ' correct. 🎉';
        scoreClass = 'excellent';
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
    } else if (percentage >= 50) {
        message = 'Good! ' + score + '/' + totalQuestions + ' correct.';
        scoreClass = 'good';
    } else {
        message = score + '/' + totalQuestions + ' correct. Review and try again.';
        scoreClass = 'needsWork';
    }

    scoreElement.textContent = message;
    scoreElement.className = 'quiz-result show ' + scoreClass;
    scoreElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set default CNOT values
    window.cnotControl = '0';
    window.cnotTarget = '0';

    const quizOptions = document.querySelectorAll('.option');
    quizOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
});
