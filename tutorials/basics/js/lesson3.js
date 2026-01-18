/**
 * lesson3.js
 * Qubits and Superposition - Interactive demonstrations
 *
 * This file implements 4 main interactives:
 * 1. Spinning Coin (superposition visualization)
 * 2. Measurement Statistics (repeated measurements with histogram)
 * 3. State Explorer (explore different quantum states)
 * 4. Probability Quiz (interactive quiz on quantum probabilities)
 */

// ============================================================================
// INTERACTIVE 1: SPINNING COIN
// ============================================================================

var coinState = {
    inSuperposition: false,
    lastMeasurement: null
};

function spinCoin() {
    var coin = document.getElementById('coin');
    var label = document.getElementById('coin-state-label');

    if (!coin || !label) return;

    // Put coin in superposition
    coinState.inSuperposition = true;
    coinState.lastMeasurement = null;

    coin.classList.add('spinning');
    coin.querySelector('.coin-face').textContent = '?';

    label.textContent = 'State: |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩ (superposition!)';
    label.classList.add('superposition');
}

function measureCoin() {
    var coin = document.getElementById('coin');
    var label = document.getElementById('coin-state-label');

    if (!coin || !label) return;

    if (!coinState.inSuperposition) {
        alert('Please put the coin in superposition first!');
        return;
    }

    // Perform measurement using quantum-utils
    var result = measureQubit(0.5); // Equal superposition

    // Stop spinning and show result
    coin.classList.remove('spinning');
    coin.querySelector('.coin-face').textContent = result;

    // Update state
    coinState.inSuperposition = false;
    coinState.lastMeasurement = result;

    label.textContent = 'Measured: |' + result + '⟩ (collapsed to definite state)';
    label.classList.remove('superposition');

    // Add highlight effect
    highlightElement('coin', 800);
}

function resetCoin() {
    var coin = document.getElementById('coin');
    var label = document.getElementById('coin-state-label');

    if (!coin || !label) return;

    coin.classList.remove('spinning');
    coin.querySelector('.coin-face').textContent = '0';

    coinState.inSuperposition = false;
    coinState.lastMeasurement = null;

    label.textContent = 'State: |0⟩ (definite)';
    label.classList.remove('superposition');
}

// ============================================================================
// INTERACTIVE 2: SCHRÖDINGER'S CAT
// ============================================================================

var catState = {
    inSuperposition: true,
    isAlive: null
};

function openSchrodingerBox() {
    if (!catState.inSuperposition) {
        alert('The cat has already been measured! Reset to try again.');
        return;
    }

    var boxVisual = document.getElementById('box-visual');
    var resultDiv = document.getElementById('cat-result');
    var openBtn = document.getElementById('open-box-btn');

    if (!boxVisual || !resultDiv) return;

    // Measure the cat (50/50 chance)
    var result = Math.random() < 0.5;
    catState.isAlive = result;
    catState.inSuperposition = false;

    // Animate the box opening
    boxVisual.style.transform = 'scale(0.9)';
    boxVisual.style.opacity = '0.5';

    setTimeout(function() {
        // Change box appearance
        boxVisual.className = result ? 'box-open' : 'box-open dead-result';
        boxVisual.innerHTML = '<div class="box-label">📭 Box Opened!</div>' +
                              '<div class="cat-result-large">' + (result ? '😺' : '💀') + '</div>';

        boxVisual.style.transform = 'scale(1)';
        boxVisual.style.opacity = '1';

        // Show result message
        resultDiv.innerHTML = result ?
            '🎉 <strong>The cat is ALIVE!</strong> The superposition collapsed to the alive state.' :
            '😢 <strong>The cat is DEAD.</strong> The superposition collapsed to the dead state.';
        resultDiv.style.borderLeftColor = result ? 'var(--color-green)' : '#ef4444';
        resultDiv.style.background = result ? '#d4edda' : '#f8d7da';
    }, 300);

    openBtn.disabled = true;
}

function resetSchrodingerBox() {
    var boxVisual = document.getElementById('box-visual');
    var resultDiv = document.getElementById('cat-result');
    var openBtn = document.getElementById('open-box-btn');

    if (!boxVisual || !resultDiv) return;

    catState.inSuperposition = true;
    catState.isAlive = null;

    // Animate reset
    boxVisual.style.transform = 'scale(0.9)';
    boxVisual.style.opacity = '0';

    setTimeout(function() {
        boxVisual.className = 'box-closed';
        boxVisual.innerHTML = '<div class="box-label">📦 Box Closed</div>' +
                              '<div class="superposition-states">' +
                                  '<span class="cat-state alive">😺 Alive</span>' +
                                  '<span class="superposition-symbol">+</span>' +
                                  '<span class="cat-state dead">💀 Dead</span>' +
                              '</div>' +
                              '<div class="quantum-label">Superposition!</div>';

        boxVisual.style.transform = 'scale(1)';
        boxVisual.style.opacity = '1';

        resultDiv.innerHTML = '';
        openBtn.disabled = false;
    }, 300);
}

// ============================================================================
// INTERACTIVE 3: MEASUREMENT STATISTICS
// ============================================================================

var measurementData = {
    totalMeasurements: 0,
    zeros: 0,
    ones: 0
};

function measureOnce() {
    // Measure a qubit in equal superposition
    var result = measureQubit(0.5);

    // Update statistics
    measurementData.totalMeasurements++;
    if (result === 0) {
        measurementData.zeros++;
    } else {
        measurementData.ones++;
    }

    // Update display
    updateMeasurementDisplay();
}

function measure10() {
    // Perform 10 measurements
    var stats = performMeasurements(0.5, 10);

    measurementData.totalMeasurements += 10;
    measurementData.zeros += stats.zeros;
    measurementData.ones += stats.ones;

    updateMeasurementDisplay();
}

function measure100() {
    // Perform 100 measurements
    var stats = performMeasurements(0.5, 100);

    measurementData.totalMeasurements += 100;
    measurementData.zeros += stats.zeros;
    measurementData.ones += stats.ones;

    updateMeasurementDisplay();
}

function updateMeasurementDisplay() {
    // Use quantum-utils histogram function
    createHistogram(
        {zeros: measurementData.zeros, ones: measurementData.ones},
        'measurement-histogram',
        200
    );

    // Add explanatory text if we have enough measurements
    var container = document.getElementById('measurement-histogram');
    if (container && measurementData.totalMeasurements >= 50) {
        var percent0 = Math.round((measurementData.zeros / measurementData.totalMeasurements) * 100);
        var percent1 = Math.round((measurementData.ones / measurementData.totalMeasurements) * 100);

        var explanation = document.createElement('div');
        explanation.className = 'measurement-explanation';
        explanation.style.cssText = 'margin-top: 1rem; text-align: center; font-style: italic; color: var(--text-secondary);';
        explanation.textContent = 'Notice: With ' + measurementData.totalMeasurements + ' measurements, we get approximately 50/50 distribution (' + percent0 + '% vs ' + percent1 + '%). This is quantum superposition!';

        // Remove old explanation if exists
        var oldExplanation = container.querySelector('.measurement-explanation');
        if (oldExplanation) {
            oldExplanation.remove();
        }

        container.appendChild(explanation);
    }
}

function resetMeasurements() {
    measurementData.totalMeasurements = 0;
    measurementData.zeros = 0;
    measurementData.ones = 0;

    var container = document.getElementById('measurement-histogram');
    if (container) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No measurements yet. Click a button above to start!</p>';
    }
}

// ============================================================================
// INTERACTIVE 3: STATE EXPLORER
// ============================================================================

var stateExplorerStates = {
    '0': {
        notation: '|0⟩',
        description: 'The qubit is definitely in state |0⟩. When measured, you will always get 0.',
        prob0: 1.0,
        prob1: 0.0
    },
    '1': {
        notation: '|1⟩',
        description: 'The qubit is definitely in state |1⟩. When measured, you will always get 1.',
        prob0: 0.0,
        prob1: 1.0
    },
    'plus': {
        notation: '|+⟩ = (1/√2)|0⟩ + (1/√2)|1⟩',
        description: 'An equal superposition state with positive phase. Measuring gives 50% chance of 0 or 1.',
        prob0: 0.5,
        prob1: 0.5
    },
    'minus': {
        notation: '|−⟩ = (1/√2)|0⟩ − (1/√2)|1⟩',
        description: 'An equal superposition state with negative phase. Measuring still gives 50% chance of 0 or 1, but the negative phase matters for interference!',
        prob0: 0.5,
        prob1: 0.5
    }
};

function updateStateInfo() {
    var dropdown = document.getElementById('state-dropdown');
    if (!dropdown) return;

    var selectedState = dropdown.value;
    var stateInfo = stateExplorerStates[selectedState];

    if (!stateInfo) return;

    // Update notation
    var notationElement = document.getElementById('state-notation');
    if (notationElement) {
        notationElement.textContent = 'Notation: ' + stateInfo.notation;
    }

    // Update formula (same as notation for now)
    var formulaElement = document.getElementById('state-formula');
    if (formulaElement) {
        formulaElement.textContent = 'Formula: ' + stateInfo.notation;
    }

    // Update probability text
    var prob0TextElement = document.getElementById('prob-0-text');
    var prob1TextElement = document.getElementById('prob-1-text');

    if (prob0TextElement) {
        prob0TextElement.textContent = Math.round(stateInfo.prob0 * 100) + '%';
    }

    if (prob1TextElement) {
        prob1TextElement.textContent = Math.round(stateInfo.prob1 * 100) + '%';
    }

    // Update probability bars
    var prob0BarElement = document.getElementById('prob-0-bar');
    var prob1BarElement = document.getElementById('prob-1-bar');

    if (prob0BarElement) {
        prob0BarElement.style.width = (stateInfo.prob0 * 100) + '%';
    }

    if (prob1BarElement) {
        prob1BarElement.style.width = (stateInfo.prob1 * 100) + '%';
    }
}

function testStateWithMeasurements() {
    var dropdown = document.getElementById('state-dropdown');
    if (!dropdown) return;

    var selectedState = dropdown.value;
    var stateInfo = stateExplorerStates[selectedState];

    if (!stateInfo) return;

    // Perform 50 measurements
    var stats = performMeasurements(stateInfo.prob0, 50);

    // Display results
    var resultsContainer = document.getElementById('state-test-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';

        // Show badges
        displayResultBadges(stats.results, 'state-test-results');

        // Show statistics
        var statsDiv = document.createElement('div');
        statsDiv.style.cssText = 'margin-top: 1.5rem; padding: 1rem; text-align: center; font-weight: 600; font-size: 1.1rem; background: var(--interactive-bg); border-radius: 8px; border: 2px solid var(--border-color);';
        statsDiv.textContent = 'Results: ' + stats.zeros + ' × |0⟩  and  ' + stats.ones + ' × |1⟩';
        resultsContainer.appendChild(statsDiv);
    }
}

// ============================================================================
// INTERACTIVE 4: PROBABILITY QUIZ
// ============================================================================

var probabilityQuiz = {
    questions: [
        {
            question: 'If a qubit is in state |0⟩, what is the probability of measuring 0?',
            options: ['0%', '25%', '50%', '100%'],
            correct: 3
        },
        {
            question: 'If a qubit is in equal superposition |+⟩, what is the probability of measuring 1?',
            options: ['0%', '50%', '75%', '100%'],
            correct: 1
        },
        {
            question: 'After measuring a qubit in superposition and getting |0⟩, what happens to the state?',
            options: [
                'Stays in superposition',
                'Collapses to |0⟩',
                'Becomes |1⟩',
                'Becomes random'
            ],
            correct: 1
        },
        {
            question: 'Can you predict the exact outcome of measuring a qubit in superposition?',
            options: [
                'Yes, always',
                'Yes, sometimes',
                'No, only probabilities',
                'No, completely random'
            ],
            correct: 2
        },
        {
            question: 'If you measure |+⟩ many times, what pattern emerges?',
            options: [
                'All 0s',
                'All 1s',
                'Approximately 50/50',
                'No pattern'
            ],
            correct: 2
        }
    ],
    currentQuestion: 0,
    score: 0,
    answered: false
};

function startProbabilityQuiz() {
    probabilityQuiz.currentQuestion = 0;
    probabilityQuiz.score = 0;
    probabilityQuiz.answered = false;

    displayProbQuestion();
}

function displayProbQuestion() {
    var quizContainer = document.getElementById('prob-quiz-container');
    if (!quizContainer) {
        console.error('Quiz container not found!');
        return;
    }

    console.log('Current question:', probabilityQuiz.currentQuestion, 'Total:', probabilityQuiz.questions.length);

    if (probabilityQuiz.currentQuestion >= probabilityQuiz.questions.length) {
        // Quiz complete
        console.log('Quiz complete! Showing results...');
        showProbQuizResults();
        return;
    }

    var q = probabilityQuiz.questions[probabilityQuiz.currentQuestion];

    var html = '<div class="quiz-progress">Question ' + (probabilityQuiz.currentQuestion + 1) + ' of ' + probabilityQuiz.questions.length + '</div>';

    html += '<div class="quiz-question-text">' + q.question + '</div>';

    html += '<div class="quiz-prob-options">';
    for (var i = 0; i < q.options.length; i++) {
        html += '<button class="prob-option-btn" onclick="checkProbAnswer(' + i + ')">' + q.options[i] + '</button>';
    }
    html += '</div>';

    html += '<div id="prob-feedback" class="quiz-feedback" style="display: none;"></div>';

    quizContainer.innerHTML = html;
    probabilityQuiz.answered = false;
}

function checkProbAnswer(selectedIndex) {
    console.log('Answer selected:', selectedIndex, 'for question', probabilityQuiz.currentQuestion);

    if (probabilityQuiz.answered) {
        console.log('Already answered, ignoring');
        return; // Prevent multiple answers
    }

    probabilityQuiz.answered = true;

    var q = probabilityQuiz.questions[probabilityQuiz.currentQuestion];
    var isCorrect = selectedIndex === q.correct;

    console.log('Correct answer:', q.correct, 'Is correct?', isCorrect);

    // Update score
    if (isCorrect) {
        probabilityQuiz.score++;
    }

    // Show feedback
    var feedbackElement = document.getElementById('prob-feedback');
    if (feedbackElement) {
        feedbackElement.style.display = 'block';

        if (isCorrect) {
            feedbackElement.className = 'quiz-feedback correct';
            feedbackElement.textContent = '✓ Correct! Great understanding of quantum probabilities.';
        } else {
            feedbackElement.className = 'quiz-feedback incorrect';
            feedbackElement.textContent = '✗ Not quite. The correct answer is: ' + q.options[q.correct];
        }
    } else {
        console.error('Feedback element not found!');
    }

    // Update button styles
    var buttons = document.querySelectorAll('.prob-option-btn');
    buttons.forEach(function(button, index) {
        button.disabled = true;
        if (index === q.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            button.classList.add('incorrect');
        }
    });

    // Show next button after delay
    setTimeout(function() {
        var feedbackElement = document.getElementById('prob-feedback');
        if (feedbackElement) {
            var nextBtn = document.createElement('button');
            nextBtn.className = 'btn-primary';
            var isLastQuestion = probabilityQuiz.currentQuestion >= probabilityQuiz.questions.length - 1;
            nextBtn.textContent = isLastQuestion ? 'See Results' : 'Next Question';
            nextBtn.onclick = nextProbQuestion;
            nextBtn.style.marginTop = '1rem';
            feedbackElement.appendChild(nextBtn);
            console.log('Added button:', nextBtn.textContent);
        } else {
            console.error('Feedback element not found when adding button!');
        }
    }, 1000);
}

function nextProbQuestion() {
    console.log('Next question clicked. Moving from question', probabilityQuiz.currentQuestion);
    probabilityQuiz.currentQuestion++;
    console.log('Now on question', probabilityQuiz.currentQuestion);
    displayProbQuestion();
}

function showProbQuizResults() {
    console.log('Showing quiz results. Score:', probabilityQuiz.score, '/', probabilityQuiz.questions.length);

    var quizContainer = document.getElementById('prob-quiz-container');
    if (!quizContainer) {
        console.error('Quiz container not found for results!');
        return;
    }

    var percentage = Math.round((probabilityQuiz.score / probabilityQuiz.questions.length) * 100);

    var resultClass = percentage === 100 ? 'perfect' : percentage >= 60 ? 'good' : 'needs-improvement';

    // Set background color based on score
    var bgColor = percentage === 100 ? '#d4edda' : percentage >= 60 ? '#d1ecf1' : '#fff3cd';
    var textColor = percentage === 100 ? '#155724' : percentage >= 60 ? '#0c5460' : '#856404';

    var html = '<div class="quiz-result show ' + resultClass + '" style="text-align: center; padding: 2rem; background: ' + bgColor + '; border-radius: 8px; border: 2px solid ' + textColor + '; color: ' + textColor + '; display: block !important;">';
    html += '<h3 style="margin-bottom: 1rem; color: ' + textColor + ';">Quiz Complete!</h3>';
    html += '<p style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; color: ' + textColor + ';">Score: ' + probabilityQuiz.score + ' / ' + probabilityQuiz.questions.length + ' (' + percentage + '%)</p>';

    if (percentage === 100) {
        html += '<p style="font-size: 1.2rem; color: ' + textColor + ';">🎉 Perfect! You have an excellent grasp of quantum probabilities!</p>';
    } else if (percentage >= 60) {
        html += '<p style="font-size: 1.2rem; color: ' + textColor + ';">Good job! You understand the basics of quantum measurement.</p>';
    } else {
        html += '<p style="font-size: 1.2rem; color: ' + textColor + ';">Keep learning! Review the concepts and try again.</p>';
    }

    html += '<button class="btn-primary" onclick="startProbabilityQuiz()" style="margin-top: 1.5rem;">Retry Quiz</button>';
    html += '</div>';

    quizContainer.innerHTML = html;
    console.log('Results displayed successfully. HTML length:', html.length);
    console.log('Container innerHTML length:', quizContainer.innerHTML.length);

    // Debug: Check if element is visible
    setTimeout(function() {
        var resultDiv = quizContainer.querySelector('.quiz-result');
        if (resultDiv) {
            var styles = window.getComputedStyle(resultDiv);
            console.log('Result div found!');
            console.log('Display:', styles.display);
            console.log('Visibility:', styles.visibility);
            console.log('Opacity:', styles.opacity);
            console.log('Height:', styles.height);
            console.log('Width:', styles.width);
            console.log('Background:', styles.backgroundColor);
            console.log('Color:', styles.color);
            console.log('Position:', resultDiv.getBoundingClientRect());
        } else {
            console.error('Result div not found in DOM!');
        }

        // Check container
        var containerStyles = window.getComputedStyle(quizContainer);
        console.log('Container display:', containerStyles.display);
        console.log('Container height:', containerStyles.height);
        console.log('Container overflow:', containerStyles.overflow);
    }, 100);
}

// ============================================================================
// MAIN LESSON QUIZ
// ============================================================================

function checkAnswersL3(btn) {
    var answers = {
        q1: 'b',
        q2: 'b',
        q3: 'c'
    };

    var feedback = {
        q1: {
            correct: 'Correct! A qubit can be in a superposition of both 0 and 1!',
            incorrect: 'Remember: qubits can exist in superposition, unlike classical bits.'
        },
        q2: {
            correct: 'Correct! Measurement collapses the superposition to one definite state.',
            incorrect: 'When you measure, the superposition collapses to either |0⟩ or |1⟩.'
        },
        q3: {
            correct: 'Correct! In equal superposition, both outcomes are equally likely (50/50).',
            incorrect: 'The |+⟩ state gives 50% probability for each outcome, so about 50 times out of 100.'
        }
    };

    // Use the shared quiz utility
    checkQuiz(answers, feedback, 'quiz-score', btn);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Interactive 1: Coin starts in |0⟩
    resetCoin();

    // Initialize Interactive 2: Clear measurement display
    resetMeasurements();

    // Initialize Interactive 3: Set default state
    var dropdown = document.getElementById('state-dropdown');
    if (dropdown) {
        dropdown.value = '0';
        updateStateInfo();
    }

    // Initialize Interactive 4: Probability quiz ready
    var quizContainer = document.getElementById('prob-quiz-container');
    if (quizContainer) {
        var startBtn = document.createElement('button');
        startBtn.className = 'btn-primary';
        startBtn.textContent = 'Start Probability Quiz';
        startBtn.onclick = startProbabilityQuiz;
        startBtn.style.cssText = 'width: 100%; padding: 1rem; font-size: 1.1rem;';
        quizContainer.appendChild(startBtn);
    }

    console.log('Lesson 3: Qubits and Superposition - All interactives loaded!');
});
