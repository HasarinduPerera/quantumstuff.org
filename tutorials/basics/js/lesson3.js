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
    var resultDiv = document.getElementById('coin-result');

    if (!coin || !label) return;

    if (!coinState.inSuperposition) {
        // Show nice error message instead of alert
        if (resultDiv) {
            resultDiv.innerHTML = '<div style="padding: 1rem; background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; border-radius: 8px; color: var(--text-primary); margin-top: 1rem;">' +
                '<strong style="color: #ef4444;">⚠️ Not in superposition!</strong><br>' +
                '<span style="font-size: 0.9375rem;">Please click "Put in Superposition" first before measuring.</span>' +
                '</div>';

            // Clear message after 3 seconds
            setTimeout(function() {
                if (resultDiv) resultDiv.innerHTML = '';
            }, 3000);
        }
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

    // Show result message
    if (resultDiv) {
        resultDiv.innerHTML = '<div style="padding: 1rem; background: var(--bg-highlight); border-left: 4px solid var(--color-green); border-radius: 8px; color: var(--text-primary); margin-top: 1rem;">' +
            '<strong style="color: var(--color-green);">✓ Measured!</strong> The coin collapsed to <strong>|' + result + '⟩</strong>' +
            '</div>';
    }

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
// INTERACTIVE 2: ADVANCED SCHRÖDINGER'S CAT
// ============================================================================

var catState = {
    inSuperposition: true,
    isAlive: null
};

function openSchrodingerBox() {
    if (!catState.inSuperposition) {
        return;
    }

    var superpositionView = document.getElementById('superposition-view');
    var measurementResult = document.getElementById('measurement-result');
    var resultDiv = document.getElementById('cat-result');
    var openBtn = document.getElementById('open-box-btn');
    var resetBtn = document.getElementById('reset-box-btn');
    var statusBadge = document.querySelector('.status-badge');
    var resultOrb = document.getElementById('result-orb');
    var resultEmoji = document.getElementById('result-emoji');
    var waves = document.getElementById('quantum-waves');
    var probBars = document.getElementById('probability-bars');

    if (!superpositionView || !measurementResult) return;

    // Disable button
    openBtn.disabled = true;

    // Fade out waves and probability bars
    if (waves) {
        waves.style.transition = 'opacity 0.6s ease';
        waves.style.opacity = '0';
    }
    if (probBars) {
        probBars.style.transition = 'all 0.6s ease';
        probBars.style.opacity = '0';
        probBars.style.transform = 'scale(0.9)';
    }

    // Fade out superposition view
    superpositionView.style.transition = 'all 0.6s ease';
    superpositionView.style.opacity = '0';
    superpositionView.style.transform = 'scale(0.8)';

    setTimeout(function() {
        // Measure the cat (50/50 chance)
        var result = Math.random() < 0.5;
        catState.isAlive = result;
        catState.inSuperposition = false;

        // Hide superposition view
        superpositionView.style.display = 'none';

        // Show measurement result
        measurementResult.style.display = 'block';
        resultEmoji.textContent = result ? '😺' : '💀';

        if (!result) {
            resultOrb.classList.add('dead');
        } else {
            resultOrb.classList.remove('dead');
        }

        // Update status badge
        if (statusBadge) {
            statusBadge.className = 'status-badge collapsed' + (result ? '' : ' dead');
            statusBadge.innerHTML = '<i data-lucide="zap" style="width:14px;height:14px"></i>' +
                                   '<span>Wave Function Collapsed!</span>';
            lucide.createIcons();
        }

        // Show result message
        setTimeout(function() {
            resultDiv.innerHTML = result ?
                '<div style="padding: 1.5rem; background: var(--bg-accent); border-left: 4px solid var(--color-green); border-radius: 8px;">' +
                '🎉 <strong style="color: var(--color-green);">The cat is ALIVE!</strong><br>' +
                '<span style="color: var(--text-secondary);">The quantum superposition collapsed to |alive⟩ upon measurement.</span>' +
                '</div>' :
                '<div style="padding: 1.5rem; background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; border-radius: 8px;">' +
                '😢 <strong style="color: #ef4444;">The cat is DEAD.</strong><br>' +
                '<span style="color: var(--text-secondary);">The quantum superposition collapsed to |dead⟩ upon measurement.</span>' +
                '</div>';

            // Show reset button
            if (resetBtn) {
                resetBtn.style.display = 'inline-flex';
            }
            openBtn.style.display = 'none';

            // Celebration confetti for alive cat
            if (result && typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }, 400);
    }, 600);
}

function resetSchrodingerBox() {
    var superpositionView = document.getElementById('superposition-view');
    var measurementResult = document.getElementById('measurement-result');
    var resultDiv = document.getElementById('cat-result');
    var openBtn = document.getElementById('open-box-btn');
    var resetBtn = document.getElementById('reset-box-btn');
    var statusBadge = document.querySelector('.status-badge');
    var resultOrb = document.getElementById('result-orb');
    var waves = document.getElementById('quantum-waves');
    var probBars = document.getElementById('probability-bars');

    if (!superpositionView || !measurementResult) return;

    // Fade out measurement result
    measurementResult.style.transition = 'all 0.5s ease';
    measurementResult.style.opacity = '0';
    measurementResult.style.transform = 'translate(-50%, -50%) scale(0.5)';

    setTimeout(function() {
        // Reset state
        catState.inSuperposition = true;
        catState.isAlive = null;

        // Hide measurement result
        measurementResult.style.display = 'none';
        measurementResult.style.opacity = '1';
        measurementResult.style.transform = 'translate(-50%, -50%) scale(1)';
        resultOrb.classList.remove('dead');

        // Show superposition view
        superpositionView.style.display = 'flex';
        superpositionView.style.opacity = '0';
        superpositionView.style.transform = 'scale(0.8)';

        setTimeout(function() {
            superpositionView.style.transition = 'all 0.6s ease';
            superpositionView.style.opacity = '1';
            superpositionView.style.transform = 'scale(1)';

            // Fade in waves and probability bars
            if (waves) {
                waves.style.opacity = '0.15';
            }
            if (probBars) {
                probBars.style.opacity = '1';
                probBars.style.transform = 'scale(1)';
            }

            // Update status badge
            if (statusBadge) {
                statusBadge.className = 'status-badge superposition';
                statusBadge.innerHTML = '<i data-lucide="radio" style="width:14px;height:14px"></i>' +
                                       '<span>Quantum Superposition</span>';
                lucide.createIcons();
            }

            // Clear result message
            resultDiv.innerHTML = '';

            // Toggle buttons
            openBtn.disabled = false;
            openBtn.style.display = 'inline-flex';
            if (resetBtn) {
                resetBtn.style.display = 'none';
            }
        }, 50);
    }, 500);
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
    animateMeasurement(1);
}

function measure10() {
    animateMeasurement(10);
}

function measure100() {
    animateMeasurement(100);
}

function animateMeasurement(count) {
    var delay = count === 1 ? 0 : count <= 10 ? 150 : 30; // Timing for animations

    for (var i = 0; i < count; i++) {
        (function(index) {
            setTimeout(function() {
                // Measure a qubit
                var result = measureQubit(0.5);

                // Update statistics
                measurementData.totalMeasurements++;
                if (result === 0) {
                    measurementData.zeros++;
                } else {
                    measurementData.ones++;
                }

                // Create flying particle
                createMeasurementParticle(result);

                // Update display with animation
                updateMeasurementDisplay();
            }, index * delay);
        })(i);
    }
}

function updateMeasurementDisplay() {
    var total = measurementData.totalMeasurements;
    var zeros = measurementData.zeros;
    var ones = measurementData.ones;

    // Update total counter
    var totalEl = document.getElementById('total-measurements');
    if (totalEl) totalEl.textContent = total;

    // Update zero stats
    var zeroCountEl = document.getElementById('zero-count');
    var zeroPercentEl = document.getElementById('zero-percent');
    if (zeroCountEl) zeroCountEl.textContent = zeros;
    if (zeroPercentEl) {
        var zeroPercent = total > 0 ? Math.round((zeros / total) * 100) : 0;
        zeroPercentEl.textContent = zeroPercent + '%';
    }

    // Update one stats
    var oneCountEl = document.getElementById('one-count');
    var onePercentEl = document.getElementById('one-percent');
    if (oneCountEl) oneCountEl.textContent = ones;
    if (onePercentEl) {
        var onePercent = total > 0 ? Math.round((ones / total) * 100) : 0;
        onePercentEl.textContent = onePercent + '%';
    }

    // Update histogram bars
    var maxCount = Math.max(zeros, ones, 1);

    var zeroBar = document.getElementById('zero-bar');
    var zeroBarValue = document.getElementById('zero-bar-value');
    if (zeroBar) {
        var zeroWidth = (zeros / maxCount) * 100;
        zeroBar.style.width = zeroWidth + '%';
    }
    if (zeroBarValue) zeroBarValue.textContent = zeros;

    var oneBar = document.getElementById('one-bar');
    var oneBarValue = document.getElementById('one-bar-value');
    if (oneBar) {
        var oneWidth = (ones / maxCount) * 100;
        oneBar.style.width = oneWidth + '%';
    }
    if (oneBarValue) oneBarValue.textContent = ones;
}

function createMeasurementParticle(result) {
    var container = document.getElementById('measurement-particles');
    if (!container) return;

    // Create particle
    var particle = document.createElement('div');
    particle.className = 'measure-particle';
    particle.textContent = result;
    particle.style.background = result === 0 ? 'var(--color-green)' : 'var(--color-amber)';

    // Add to container
    container.appendChild(particle);

    // Animate particle
    setTimeout(function() {
        particle.classList.add('flying');
        particle.style.setProperty('--target-x', result === 0 ? '-45%' : '45%');
    }, 10);

    // Remove particle after animation
    setTimeout(function() {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 600);
}

function resetMeasurements() {
    measurementData.totalMeasurements = 0;
    measurementData.zeros = 0;
    measurementData.ones = 0;

    updateMeasurementDisplay();

    // Clear particles
    var particleContainer = document.getElementById('measurement-particles');
    if (particleContainer) {
        particleContainer.innerHTML = '';
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
// INTERACTIVE 5: BIT VS QUBIT COMPARISON
// ============================================================================

var bitState = 0;
var qubitInSuperpositionL3 = false;
var particleIntervalL3 = null;

function toggleClassicalBit() {
    // Toggle bit value
    bitState = bitState === 0 ? 1 : 0;

    var bitValue = document.getElementById('bit-value');
    var bitLabel = document.getElementById('bit-label');
    var bitTag = document.getElementById('bit-tag');
    var bitCircle = document.getElementById('bit-circle');

    if (bitValue) bitValue.textContent = bitState;
    if (bitLabel) bitLabel.textContent = 'Definite State: |' + bitState + '⟩';

    // Animate the change
    if (bitCircle) {
        bitCircle.style.transform = 'scale(1.1)';
        setTimeout(function() {
            bitCircle.style.transform = 'scale(1)';
        }, 200);
    }

    // Update tag to show current state
    if (bitTag) {
        bitTag.textContent = 'State: ' + bitState;
        bitTag.className = 'card-tag deterministic';

        // Change back to "Deterministic" after 2 seconds
        setTimeout(function() {
            if (bitTag) {
                bitTag.textContent = 'Deterministic';
            }
        }, 2000);
    }
}

function putInSuperpositionL3() {
    if (qubitInSuperpositionL3) return;

    qubitInSuperpositionL3 = true;

    var qubitCircle = document.getElementById('qubit-circle');
    var qubitValue = document.getElementById('qubit-value');
    var qubitLabel = document.getElementById('qubit-label');
    var qubitTag = document.getElementById('qubit-tag');
    var measureBtn = document.getElementById('measure-btn-l3');
    var superpositionBtn = document.getElementById('superposition-btn');

    // Hide atom symbol - DON'T show the static superposition indicator, just show floating particles
    if (qubitValue) qubitValue.style.display = 'none';

    // Update label
    if (qubitLabel) qubitLabel.textContent = 'Superposition: |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩';

    // Update tag to "Superposition"
    if (qubitTag) {
        qubitTag.textContent = 'Superposition';
        qubitTag.className = 'card-tag superposition';
    }

    // Add active class for glow effect
    if (qubitCircle) qubitCircle.classList.add('active');

    // Start particle animation - create multiple floating 0s and 1s
    particleIntervalL3 = setInterval(createParticleL3, 150);

    // Enable measure button, disable superposition button
    if (measureBtn) measureBtn.disabled = false;
    if (superpositionBtn) superpositionBtn.disabled = true;
}

function measureQubitL3() {
    if (!qubitInSuperpositionL3) return;

    var qubitCircle = document.getElementById('qubit-circle');
    var qubitValue = document.getElementById('qubit-value');
    var qubitLabel = document.getElementById('qubit-label');
    var qubitTag = document.getElementById('qubit-tag');
    var measureBtn = document.getElementById('measure-btn-l3');
    var superpositionBtn = document.getElementById('superposition-btn');
    var qubitInfo = document.getElementById('qubit-info');
    var explanation = document.getElementById('qubit-explanation-l3');

    // Disable button
    if (measureBtn) measureBtn.disabled = true;

    // Stop particle animation
    if (particleIntervalL3) {
        clearInterval(particleIntervalL3);
        particleIntervalL3 = null;
    }

    setTimeout(function() {
        // Measure the qubit (50/50 chance)
        var result = Math.random() < 0.5 ? 0 : 1;

        // Stop superposition
        qubitInSuperpositionL3 = false;

        // Clear all floating particles
        var particleContainer = document.getElementById('qubit-particles-l3');
        if (particleContainer) particleContainer.innerHTML = '';

        // Show result value
        if (qubitValue) {
            qubitValue.style.display = 'block';
            qubitValue.textContent = result;
        }

        // Update label
        if (qubitLabel) qubitLabel.textContent = 'Measured: |' + result + '⟩ (collapsed!)';

        // Remove active class
        if (qubitCircle) qubitCircle.classList.remove('active');

        // Update tag immediately to show measurement
        if (qubitTag) {
            qubitTag.textContent = 'Collapsed';
            qubitTag.className = 'card-tag quantum';
        }

        // Update info box
        if (qubitInfo) {
            qubitInfo.innerHTML = '<p><strong>Collapsed to:</strong> |' + result + '⟩</p>' +
                                 '<p><small>Superposition destroyed!</small></p>';
        }

        // Update explanation
        if (explanation) {
            explanation.innerHTML = '<i data-lucide="zap" style="width:18px;height:18px"></i>' +
                                   '<span>Wave function collapsed! The qubit is now in definite state: |' + result + '⟩</span>';
            lucide.createIcons();
        }

        // Animate measurement with scale
        if (qubitCircle) {
            qubitCircle.style.transform = 'scale(1.15)';
            setTimeout(function() {
                qubitCircle.style.transform = 'scale(1)';
            }, 300);
        }

        // Enable superposition button
        if (superpositionBtn) superpositionBtn.disabled = false;

        // Change tag back to "Probabilistic" after 3 seconds
        setTimeout(function() {
            if (qubitTag) {
                qubitTag.textContent = 'Probabilistic';
                qubitTag.className = 'card-tag quantum';
            }

            // Reset info box
            if (qubitInfo) {
                qubitInfo.innerHTML = '<p><strong>Can be both:</strong> 0 <span style="color: var(--color-green);">AND</span> 1</p>' +
                                     '<p><small>Superposition until measured</small></p>';
            }

            // Reset explanation
            if (explanation) {
                explanation.innerHTML = '<i data-lucide="info" style="width:18px;height:18px"></i>' +
                                       '<span>Click "Create Superposition" to put the qubit in both states, then "Measure" to collapse it!</span>';
                lucide.createIcons();
            }

            // Reset qubit value
            if (qubitValue) qubitValue.textContent = '⚛️';
            if (qubitLabel) qubitLabel.textContent = 'Initial State: |0⟩';
        }, 3000);
    }, 400);
}

function createParticleL3() {
    var container = document.getElementById('qubit-particles-l3');
    if (!container) return;

    var particle = document.createElement('div');
    particle.className = 'quantum-particle';

    // Randomly show 0 or 1
    particle.textContent = Math.random() < 0.5 ? '0' : '1';
    particle.style.color = Math.random() < 0.5 ? 'var(--color-green)' : 'var(--color-amber)';
    particle.style.fontSize = '1.2rem';
    particle.style.fontWeight = '700';

    // Random position around the circle
    var angle = Math.random() * Math.PI * 2;
    var distance = 80 + Math.random() * 40;
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;

    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.setProperty('--tx', x + 'px');
    particle.style.setProperty('--ty', y + 'px');

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(function() {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
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

    // Initialize Lucide icons after DOM is ready
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    console.log('Lesson 3: Qubits and Superposition - All interactives loaded!');
});
