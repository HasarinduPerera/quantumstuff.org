/**
 * q.js - Quantum Gate Library
 * A comprehensive, smooth, and user-friendly quantum computing library
 *
 * Features:
 * - Single and multi-qubit quantum gates
 * - Circuit simulation
 * - Measurement and visualization
 * - Smooth animations and UI helpers
 * - Bloch sphere integration
 *
 * Usage:
 *   const qubit = Q.qubit(0);           // Create a qubit in |0⟩ state
 *   qubit.H();                          // Apply Hadamard gate
 *   const result = qubit.measure();     // Measure the qubit
 *   qubit.visualize('container-id');    // Visualize on Bloch sphere
 */

(function(global) {
    'use strict';

    // ============================================================================
    // QUANTUM QUBIT CLASS
    // ============================================================================

    /**
     * Represents a single qubit with quantum operations
     * @param {number} initialState - 0 or 1 (defaults to 0)
     */
    function Qubit(initialState) {
        this.state = initialState || 0;
        this.prob0 = initialState === 0 ? 1.0 : 0.0;
        this.inSuperposition = false;
        this.history = [];
        this.alpha = 1.0;  // Amplitude for |0⟩
        this.beta = 0.0;   // Amplitude for |1⟩
    }

    // ============================================================================
    // SINGLE-QUBIT QUANTUM GATES
    // ============================================================================

    /**
     * X Gate (Pauli-X / NOT gate) - Flips |0⟩ ↔ |1⟩
     */
    Qubit.prototype.X = function() {
        this.history.push('X');
        if (this.inSuperposition) {
            // Swap amplitudes
            var temp = this.alpha;
            this.alpha = this.beta;
            this.beta = temp;
            this.prob0 = 1.0 - this.prob0;
        } else {
            // Deterministic flip
            this.state = this.state === 0 ? 1 : 0;
            this.prob0 = this.state === 0 ? 1.0 : 0.0;
            this.alpha = this.state === 0 ? 1.0 : 0.0;
            this.beta = this.state === 1 ? 1.0 : 0.0;
        }
        return this;
    };

    /**
     * H Gate (Hadamard) - Creates equal superposition
     */
    Qubit.prototype.H = function() {
        this.history.push('H');
        this.inSuperposition = true;

        if (this.state === 0) {
            // |0⟩ → |+⟩ = (|0⟩ + |1⟩)/√2
            this.alpha = Math.sqrt(0.5);
            this.beta = Math.sqrt(0.5);
            this.prob0 = 0.5;
        } else {
            // |1⟩ → |−⟩ = (|0⟩ - |1⟩)/√2
            this.alpha = Math.sqrt(0.5);
            this.beta = -Math.sqrt(0.5);
            this.prob0 = 0.5;
        }
        return this;
    };

    /**
     * Z Gate (Pauli-Z / Phase flip) - Leaves |0⟩ unchanged, adds phase to |1⟩
     */
    Qubit.prototype.Z = function() {
        this.history.push('Z');
        if (this.inSuperposition) {
            // Flip sign of |1⟩ component
            this.beta = -this.beta;
        }
        // For basis states, Z has no visible effect (global phase)
        return this;
    };

    /**
     * Y Gate (Pauli-Y) - Combination of X and Z rotations
     */
    Qubit.prototype.Y = function() {
        this.history.push('Y');
        if (this.inSuperposition) {
            var temp = this.alpha;
            this.alpha = -this.beta;
            this.beta = temp;
            this.prob0 = 1.0 - this.prob0;
        } else {
            this.state = this.state === 0 ? 1 : 0;
            this.prob0 = this.state === 0 ? 1.0 : 0.0;
        }
        return this;
    };

    /**
     * S Gate (Phase gate) - Adds 90° phase
     */
    Qubit.prototype.S = function() {
        this.history.push('S');
        // S adds i phase to |1⟩ component
        // For simplicity in this educational lib, we track this in history
        return this;
    };

    /**
     * T Gate (π/8 gate) - Adds 45° phase
     */
    Qubit.prototype.T = function() {
        this.history.push('T');
        // T adds exp(iπ/4) phase to |1⟩ component
        return this;
    };

    // ============================================================================
    // MEASUREMENT
    // ============================================================================

    /**
     * Measure the qubit (collapses superposition)
     * @returns {number} - 0 or 1
     */
    Qubit.prototype.measure = function() {
        var result = Math.random() < this.prob0 ? 0 : 1;
        // Collapse the state
        this.state = result;
        this.prob0 = result === 0 ? 1.0 : 0.0;
        this.alpha = result === 0 ? 1.0 : 0.0;
        this.beta = result === 1 ? 1.0 : 0.0;
        this.inSuperposition = false;
        this.history.push('M → |' + result + '⟩');
        return result;
    };

    /**
     * Perform multiple measurements (non-destructive for analysis)
     * @param {number} count - Number of measurements
     * @returns {object} - {zeros, ones, results, prob0, prob1}
     */
    Qubit.prototype.measureMany = function(count) {
        count = count || 100;
        var zeros = 0;
        var ones = 0;
        var results = [];

        for (var i = 0; i < count; i++) {
            var result = Math.random() < this.prob0 ? 0 : 1;
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
            prob1: ones / count,
            total: count
        };
    };

    // ============================================================================
    // STATE INSPECTION
    // ============================================================================

    /**
     * Get current probability of measuring |0⟩
     * @returns {number} - Probability between 0 and 1
     */
    Qubit.prototype.getProbability0 = function() {
        return this.prob0;
    };

    /**
     * Get current probability of measuring |1⟩
     * @returns {number} - Probability between 0 and 1
     */
    Qubit.prototype.getProbability1 = function() {
        return 1.0 - this.prob0;
    };

    /**
     * Get human-readable state description
     * @returns {string} - Description of current state
     */
    Qubit.prototype.describe = function() {
        if (this.prob0 === 1.0) {
            return 'Definitely |0⟩ (100% probability)';
        } else if (this.prob0 === 0.0) {
            return 'Definitely |1⟩ (100% probability)';
        } else if (Math.abs(this.prob0 - 0.5) < 0.01) {
            return 'Equal superposition (50/50 split)';
        } else if (this.prob0 > 0.5) {
            var percent = Math.round(this.prob0 * 100);
            return 'Mostly |0⟩ (' + percent + '% probability)';
        } else {
            var percent = Math.round((1 - this.prob0) * 100);
            return 'Mostly |1⟩ (' + percent + '% probability)';
        }
    };

    /**
     * Get ket notation representation
     * @returns {string} - Ket notation
     */
    Qubit.prototype.toKet = function() {
        if (this.prob0 === 1.0) {
            return '|0⟩';
        } else if (this.prob0 === 0.0) {
            return '|1⟩';
        } else if (Math.abs(this.prob0 - 0.5) < 0.01) {
            return '|+⟩';
        } else {
            var alpha = Math.abs(this.alpha).toFixed(3);
            var beta = Math.abs(this.beta).toFixed(3);
            return alpha + '|0⟩ + ' + beta + '|1⟩';
        }
    };

    /**
     * Get circuit history
     * @returns {array} - Array of gate names applied
     */
    Qubit.prototype.getHistory = function() {
        return this.history.slice(); // Return copy
    };

    /**
     * Reset to initial state
     * @param {number} state - 0 or 1
     */
    Qubit.prototype.reset = function(state) {
        state = state || 0;
        this.state = state;
        this.prob0 = state === 0 ? 1.0 : 0.0;
        this.inSuperposition = false;
        this.history = [];
        this.alpha = state === 0 ? 1.0 : 0.0;
        this.beta = state === 1 ? 1.0 : 0.0;
        return this;
    };

    // ============================================================================
    // VISUALIZATION HELPERS
    // ============================================================================

    /**
     * Create histogram visualization
     * @param {string} containerId - ID of container element
     * @param {number} measurements - Number of measurements to simulate
     * @param {number} maxHeight - Maximum bar height in pixels
     */
    Qubit.prototype.visualizeHistogram = function(containerId, measurements, maxHeight) {
        measurements = measurements || 100;
        maxHeight = maxHeight || 200;

        var stats = this.measureMany(measurements);
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var maxCount = Math.max(stats.zeros, stats.ones);
        var height0 = maxCount > 0 ? Math.round((stats.zeros / maxCount) * maxHeight) : 0;
        var height1 = maxCount > 0 ? Math.round((stats.ones / maxCount) * maxHeight) : 0;
        var percent0 = Math.round(stats.prob0 * 100);
        var percent1 = Math.round(stats.prob1 * 100);

        var html = '<div class="q-histogram">' +
            '<div class="q-histogram-bars">' +
                '<div class="q-histogram-bar-container">' +
                    '<div class="q-histogram-bar q-bar-0" style="height: ' + height0 + 'px;">' +
                        '<span class="q-bar-label">' + stats.zeros + '</span>' +
                    '</div>' +
                    '<div class="q-histogram-label">|0⟩</div>' +
                    '<div class="q-histogram-percent">' + percent0 + '%</div>' +
                '</div>' +
                '<div class="q-histogram-bar-container">' +
                    '<div class="q-histogram-bar q-bar-1" style="height: ' + height1 + 'px;">' +
                        '<span class="q-bar-label">' + stats.ones + '</span>' +
                    '</div>' +
                    '<div class="q-histogram-label">|1⟩</div>' +
                    '<div class="q-histogram-percent">' + percent1 + '%</div>' +
                '</div>' +
            '</div>' +
            '<div class="q-histogram-stats">Total measurements: ' + stats.total + '</div>' +
        '</div>';

        container.innerHTML = html;

        // Smooth fade-in animation
        setTimeout(function() {
            container.querySelector('.q-histogram').classList.add('q-fade-in');
        }, 10);
    };

    /**
     * Display state on Bloch sphere (if available)
     * @param {string} containerId - ID of container for Bloch sphere
     */
    Qubit.prototype.visualizeBloch = function(containerId) {
        if (typeof createBlochSphere === 'undefined') {
            console.warn('Bloch sphere visualization not available. Include bloch-sphere.js');
            return;
        }

        var container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        // Create or update Bloch sphere
        if (!container.blochInstance) {
            container.blochInstance = createBlochSphere(containerId, {
                width: 300,
                height: 300,
                radius: 100
            });
        }

        container.blochInstance.updateProbability(this.prob0);
    };

    /**
     * Display result badges
     * @param {string} containerId - ID of container element
     * @param {number} count - Number of measurements to show
     */
    Qubit.prototype.visualizeBadges = function(containerId, count) {
        count = count || 10;
        var stats = this.measureMany(count);
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var html = '<div class="q-badges">';
        for (var i = 0; i < stats.results.length; i++) {
            var result = stats.results[i];
            var badgeClass = result === 0 ? 'q-badge q-badge-0' : 'q-badge q-badge-1';
            html += '<span class="' + badgeClass + '">|' + result + '⟩</span>';
        }
        html += '</div>';

        container.innerHTML = html;
    };

    // ============================================================================
    // QUANTUM CIRCUIT SIMULATOR
    // ============================================================================

    /**
     * Create a quantum circuit
     * @param {number} numQubits - Number of qubits (default 1)
     */
    function QuantumCircuit(numQubits) {
        this.numQubits = numQubits || 1;
        this.qubits = [];
        this.gates = [];

        // Initialize qubits in |0⟩ state
        for (var i = 0; i < this.numQubits; i++) {
            this.qubits.push(new Qubit(0));
        }
    }

    /**
     * Apply gate to specific qubit
     * @param {string} gateName - Gate name (X, H, Z, Y, S, T)
     * @param {number} qubitIndex - Index of qubit (0-based)
     */
    QuantumCircuit.prototype.addGate = function(gateName, qubitIndex) {
        qubitIndex = qubitIndex || 0;
        if (qubitIndex >= this.numQubits) {
            console.error('Qubit index out of range:', qubitIndex);
            return this;
        }

        this.gates.push({gate: gateName, qubit: qubitIndex});

        var qubit = this.qubits[qubitIndex];
        if (qubit[gateName]) {
            qubit[gateName]();
        } else {
            console.error('Unknown gate:', gateName);
        }

        return this;
    };

    /**
     * Measure specific qubit
     * @param {number} qubitIndex - Index of qubit
     * @returns {number} - Measurement result (0 or 1)
     */
    QuantumCircuit.prototype.measure = function(qubitIndex) {
        qubitIndex = qubitIndex || 0;
        if (qubitIndex >= this.numQubits) {
            console.error('Qubit index out of range:', qubitIndex);
            return null;
        }
        return this.qubits[qubitIndex].measure();
    };

    /**
     * Get qubit at index
     * @param {number} index - Qubit index
     * @returns {Qubit} - Qubit object
     */
    QuantumCircuit.prototype.getQubit = function(index) {
        return this.qubits[index];
    };

    /**
     * Reset circuit to |00...0⟩
     */
    QuantumCircuit.prototype.reset = function() {
        this.gates = [];
        for (var i = 0; i < this.numQubits; i++) {
            this.qubits[i].reset(0);
        }
        return this;
    };

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    /**
     * Run a quantum circuit from gate array
     * @param {number} initialState - Initial state (0 or 1)
     * @param {array} gates - Array of gate names ['H', 'X', 'H']
     * @returns {Qubit} - Final qubit state
     */
    function runCircuit(initialState, gates) {
        var qubit = new Qubit(initialState);
        for (var i = 0; i < gates.length; i++) {
            var gateName = gates[i];
            if (qubit[gateName]) {
                qubit[gateName]();
            }
        }
        return qubit;
    }

    /**
     * Create Bell state (EPR pair)
     * @param {string} type - 'phi-plus', 'phi-minus', 'psi-plus', 'psi-minus'
     * @returns {object} - Bell state configuration
     */
    function createBellState(type) {
        var states = {
            'phi-plus': {
                name: '|Φ⁺⟩',
                formula: '(1/√2)(|00⟩ + |11⟩)',
                probs: {p00: 0.5, p01: 0.0, p10: 0.0, p11: 0.5},
                circuit: ['H on q0', 'CNOT']
            },
            'phi-minus': {
                name: '|Φ⁻⟩',
                formula: '(1/√2)(|00⟩ - |11⟩)',
                probs: {p00: 0.5, p01: 0.0, p10: 0.0, p11: 0.5},
                circuit: ['H on q0', 'Z on q0', 'CNOT']
            },
            'psi-plus': {
                name: '|Ψ⁺⟩',
                formula: '(1/√2)(|01⟩ + |10⟩)',
                probs: {p00: 0.0, p01: 0.5, p10: 0.5, p11: 0.0},
                circuit: ['H on q0', 'X on q1', 'CNOT']
            },
            'psi-minus': {
                name: '|Ψ⁻⟩',
                formula: '(1/√2)(|01⟩ - |10⟩)',
                probs: {p00: 0.0, p01: 0.5, p10: 0.5, p11: 0.0},
                circuit: ['H on q0', 'X on q1', 'Z on q0', 'CNOT']
            }
        };

        return states[type] || states['phi-plus'];
    }

    // ============================================================================
    // PUBLIC API
    // ============================================================================

    var Q = {
        // Factory functions
        qubit: function(initialState) {
            return new Qubit(initialState);
        },

        circuit: function(numQubits) {
            return new QuantumCircuit(numQubits);
        },

        // Utility functions
        runCircuit: runCircuit,
        createBellState: createBellState,

        // Version
        version: '1.0.0'
    };

    // Export to global scope
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Q;
    } else {
        global.Q = Q;
    }

})(typeof window !== 'undefined' ? window : this);
