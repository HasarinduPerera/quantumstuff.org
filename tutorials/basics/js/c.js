/**
 * c.js - Classical Gate Library
 * A comprehensive, smooth, and user-friendly classical computing library
 * Mirrors q.js API for quantum gates but operates on classical bits
 *
 * Features:
 * - Single and multi-bit classical gates
 * - Circuit simulation
 * - Truth tables and visualizations
 * - Smooth animations and UI helpers
 * - Perfect feature parity with q.js
 *
 * Usage:
 *   const bit = C.bit(0);              // Create a bit with value 0
 *   bit.NOT();                         // Apply NOT gate (flip bit)
 *   const result = bit.read();         // Read the bit value
 *   bit.visualize('container-id');     // Visualize state
 */

(function(global) {
    'use strict';

    // ============================================================================
    // CLASSICAL BIT CLASS
    // ============================================================================

    /**
     * Represents a single classical bit with gate operations
     * @param {number} initialValue - 0 or 1 (defaults to 0)
     */
    function Bit(initialValue) {
        this.value = initialValue || 0;
        this.history = [];
    }

    // ============================================================================
    // SINGLE-BIT CLASSICAL GATES
    // ============================================================================

    /**
     * NOT Gate - Flips 0 → 1, 1 → 0
     */
    Bit.prototype.NOT = function() {
        this.history.push('NOT');
        this.value = this.value === 0 ? 1 : 0;
        return this;
    };

    /**
     * IDENTITY Gate - Leaves bit unchanged (useful for circuit diagrams)
     */
    Bit.prototype.ID = function() {
        this.history.push('ID');
        // Value stays the same
        return this;
    };

    /**
     * CONSTANT_0 Gate - Always outputs 0
     */
    Bit.prototype.ZERO = function() {
        this.history.push('ZERO');
        this.value = 0;
        return this;
    };

    /**
     * CONSTANT_1 Gate - Always outputs 1
     */
    Bit.prototype.ONE = function() {
        this.history.push('ONE');
        this.value = 1;
        return this;
    };

    // ============================================================================
    // BIT OPERATIONS
    // ============================================================================

    /**
     * Read the bit value (non-destructive)
     * @returns {number} - 0 or 1
     */
    Bit.prototype.read = function() {
        return this.value;
    };

    /**
     * Set the bit value
     * @param {number} value - 0 or 1
     */
    Bit.prototype.set = function(value) {
        this.value = value === 0 ? 0 : 1;
        this.history.push('SET(' + this.value + ')');
        return this;
    };

    /**
     * Toggle the bit (same as NOT)
     */
    Bit.prototype.toggle = function() {
        return this.NOT();
    };

    // ============================================================================
    // STATE INSPECTION
    // ============================================================================

    /**
     * Get human-readable state description
     * @returns {string} - Description of current state
     */
    Bit.prototype.describe = function() {
        return this.value === 0 ? 'Bit is 0 (OFF)' : 'Bit is 1 (ON)';
    };

    /**
     * Get state as string
     * @returns {string} - '0' or '1'
     */
    Bit.prototype.toString = function() {
        return String(this.value);
    };

    /**
     * Get circuit history
     * @returns {array} - Array of gate names applied
     */
    Bit.prototype.getHistory = function() {
        return this.history.slice(); // Return copy
    };

    /**
     * Reset to initial state
     * @param {number} value - 0 or 1
     */
    Bit.prototype.reset = function(value) {
        value = value || 0;
        this.value = value === 0 ? 0 : 1;
        this.history = [];
        return this;
    };

    // ============================================================================
    // VISUALIZATION HELPERS
    // ============================================================================

    /**
     * Create visual display of bit state
     * @param {string} containerId - ID of container element
     */
    Bit.prototype.visualize = function(containerId) {
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var stateClass = this.value === 0 ? 'c-bit-display c-bit-0' : 'c-bit-display c-bit-1';
        var stateText = this.value === 0 ? '0' : '1';
        var stateLabel = this.value === 0 ? 'OFF' : 'ON';

        var html = '<div class="' + stateClass + '">' +
            '<div class="c-bit-value">' + stateText + '</div>' +
            '<div class="c-bit-label">' + stateLabel + '</div>' +
        '</div>';

        container.innerHTML = html;

        // Smooth transition
        setTimeout(function() {
            container.querySelector('.c-bit-display').classList.add('c-fade-in');
        }, 10);
    };

    /**
     * Display history as circuit diagram
     * @param {string} containerId - ID of container element
     */
    Bit.prototype.visualizeHistory = function(containerId) {
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var html = '<div class="c-circuit-display">';
        html += '<div class="c-circuit-wire">';
        html += '<span class="c-circuit-initial">|' + (this.value === 0 ? '0' : '1') + '⟩</span>';

        for (var i = 0; i < this.history.length; i++) {
            var gate = this.history[i];
            html += '<span class="c-gate-box">' + gate + '</span>';
        }

        html += '<span class="c-circuit-arrow">→</span>';
        html += '<span class="c-circuit-final">' + this.value + '</span>';
        html += '</div>';
        html += '</div>';

        container.innerHTML = html;
    };

    // ============================================================================
    // TWO-BIT GATE CLASS
    // ============================================================================

    /**
     * Represents a two-bit gate operation
     * @param {Bit} bitA - First input bit
     * @param {Bit} bitB - Second input bit
     */
    function TwoBitGate(bitA, bitB) {
        this.bitA = bitA;
        this.bitB = bitB;
    }

    /**
     * AND Gate - Output 1 only if both inputs are 1
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.AND = function() {
        var result = (this.bitA.value === 1 && this.bitB.value === 1) ? 1 : 0;
        this.bitA.history.push('AND');
        this.bitB.history.push('AND');
        return result;
    };

    /**
     * OR Gate - Output 1 if at least one input is 1
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.OR = function() {
        var result = (this.bitA.value === 1 || this.bitB.value === 1) ? 1 : 0;
        this.bitA.history.push('OR');
        this.bitB.history.push('OR');
        return result;
    };

    /**
     * XOR Gate - Output 1 if inputs are different
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.XOR = function() {
        var result = this.bitA.value !== this.bitB.value ? 1 : 0;
        this.bitA.history.push('XOR');
        this.bitB.history.push('XOR');
        return result;
    };

    /**
     * NAND Gate - NOT(AND) - Universal gate
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.NAND = function() {
        var result = (this.bitA.value === 1 && this.bitB.value === 1) ? 0 : 1;
        this.bitA.history.push('NAND');
        this.bitB.history.push('NAND');
        return result;
    };

    /**
     * NOR Gate - NOT(OR) - Universal gate
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.NOR = function() {
        var result = (this.bitA.value === 1 || this.bitB.value === 1) ? 0 : 1;
        this.bitA.history.push('NOR');
        this.bitB.history.push('NOR');
        return result;
    };

    /**
     * XNOR Gate - NOT(XOR) - Equality check
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.XNOR = function() {
        var result = this.bitA.value === this.bitB.value ? 1 : 0;
        this.bitA.history.push('XNOR');
        this.bitB.history.push('XNOR');
        return result;
    };

    /**
     * IMPLY Gate - Material implication (NOT A OR B)
     * @returns {number} - Result (0 or 1)
     */
    TwoBitGate.prototype.IMPLY = function() {
        var result = (this.bitA.value === 0 || this.bitB.value === 1) ? 1 : 0;
        this.bitA.history.push('IMPLY');
        this.bitB.history.push('IMPLY');
        return result;
    };

    /**
     * Generate truth table for a gate
     * @param {string} gateName - Gate name (AND, OR, XOR, etc.)
     * @returns {array} - Truth table rows
     */
    TwoBitGate.prototype.truthTable = function(gateName) {
        var results = [];
        var inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];

        for (var i = 0; i < inputs.length; i++) {
            var a = inputs[i][0];
            var b = inputs[i][1];

            var tempBitA = new Bit(a);
            var tempBitB = new Bit(b);
            var tempGate = new TwoBitGate(tempBitA, tempBitB);

            var output;
            if (tempGate[gateName]) {
                output = tempGate[gateName]();
            } else {
                output = 0;
            }

            results.push({
                inputA: a,
                inputB: b,
                output: output
            });
        }

        return results;
    };

    // ============================================================================
    // CLASSICAL CIRCUIT SIMULATOR
    // ============================================================================

    /**
     * Create a classical circuit
     * @param {number} numBits - Number of bits (default 1)
     */
    function ClassicalCircuit(numBits) {
        this.numBits = numBits || 1;
        this.bits = [];
        this.gates = [];

        // Initialize bits to 0
        for (var i = 0; i < this.numBits; i++) {
            this.bits.push(new Bit(0));
        }
    }

    /**
     * Set bit value
     * @param {number} bitIndex - Index of bit (0-based)
     * @param {number} value - 0 or 1
     */
    ClassicalCircuit.prototype.setBit = function(bitIndex, value) {
        if (bitIndex >= this.numBits) {
            console.error('Bit index out of range:', bitIndex);
            return this;
        }
        this.bits[bitIndex].set(value);
        return this;
    };

    /**
     * Apply single-bit gate
     * @param {string} gateName - Gate name (NOT, ID, ZERO, ONE)
     * @param {number} bitIndex - Index of bit (0-based)
     */
    ClassicalCircuit.prototype.addGate = function(gateName, bitIndex) {
        bitIndex = bitIndex || 0;
        if (bitIndex >= this.numBits) {
            console.error('Bit index out of range:', bitIndex);
            return this;
        }

        this.gates.push({gate: gateName, bit: bitIndex});

        var bit = this.bits[bitIndex];
        if (bit[gateName]) {
            bit[gateName]();
        } else {
            console.error('Unknown gate:', gateName);
        }

        return this;
    };

    /**
     * Apply two-bit gate
     * @param {string} gateName - Gate name (AND, OR, XOR, NAND, NOR, XNOR)
     * @param {number} bitIndexA - Index of first bit
     * @param {number} bitIndexB - Index of second bit
     * @param {number} outputIndex - Index of bit to store result
     */
    ClassicalCircuit.prototype.addTwoBitGate = function(gateName, bitIndexA, bitIndexB, outputIndex) {
        if (bitIndexA >= this.numBits || bitIndexB >= this.numBits || outputIndex >= this.numBits) {
            console.error('Bit index out of range');
            return this;
        }

        var gate = new TwoBitGate(this.bits[bitIndexA], this.bits[bitIndexB]);
        if (gate[gateName]) {
            var result = gate[gateName]();
            this.bits[outputIndex].set(result);
            this.gates.push({
                gate: gateName,
                inputs: [bitIndexA, bitIndexB],
                output: outputIndex
            });
        } else {
            console.error('Unknown two-bit gate:', gateName);
        }

        return this;
    };

    /**
     * Read bit value
     * @param {number} bitIndex - Index of bit
     * @returns {number} - Bit value (0 or 1)
     */
    ClassicalCircuit.prototype.read = function(bitIndex) {
        bitIndex = bitIndex || 0;
        if (bitIndex >= this.numBits) {
            console.error('Bit index out of range:', bitIndex);
            return null;
        }
        return this.bits[bitIndex].read();
    };

    /**
     * Get bit at index
     * @param {number} index - Bit index
     * @returns {Bit} - Bit object
     */
    ClassicalCircuit.prototype.getBit = function(index) {
        return this.bits[index];
    };

    /**
     * Read all bits as binary string
     * @returns {string} - Binary string (e.g., '1010')
     */
    ClassicalCircuit.prototype.readAll = function() {
        var result = '';
        for (var i = 0; i < this.numBits; i++) {
            result += this.bits[i].read();
        }
        return result;
    };

    /**
     * Read all bits as decimal number
     * @returns {number} - Decimal value
     */
    ClassicalCircuit.prototype.readDecimal = function() {
        return parseInt(this.readAll(), 2);
    };

    /**
     * Reset circuit to all zeros
     */
    ClassicalCircuit.prototype.reset = function() {
        this.gates = [];
        for (var i = 0; i < this.numBits; i++) {
            this.bits[i].reset(0);
        }
        return this;
    };

    // ============================================================================
    // VISUALIZATION HELPERS
    // ============================================================================

    /**
     * Visualize truth table for a two-bit gate
     * @param {string} containerId - ID of container element
     * @param {string} gateName - Gate name (AND, OR, XOR, etc.)
     */
    function visualizeTruthTable(containerId, gateName) {
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var tempGate = new TwoBitGate(new Bit(0), new Bit(0));
        var table = tempGate.truthTable(gateName);

        var html = '<div class="c-truth-table">';
        html += '<h4 class="c-truth-table-title">' + gateName + ' Gate Truth Table</h4>';
        html += '<table class="c-table">';
        html += '<thead><tr><th>A</th><th>B</th><th>Output</th></tr></thead>';
        html += '<tbody>';

        for (var i = 0; i < table.length; i++) {
            var row = table[i];
            html += '<tr>';
            html += '<td>' + row.inputA + '</td>';
            html += '<td>' + row.inputB + '</td>';
            html += '<td class="c-output-cell">' + row.output + '</td>';
            html += '</tr>';
        }

        html += '</tbody></table></div>';

        container.innerHTML = html;

        // Smooth fade-in
        setTimeout(function() {
            container.querySelector('.c-truth-table').classList.add('c-fade-in');
        }, 10);
    }

    /**
     * Visualize circuit state as binary display
     * @param {string} containerId - ID of container element
     * @param {ClassicalCircuit} circuit - Circuit to visualize
     */
    function visualizeCircuit(containerId, circuit) {
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var binary = circuit.readAll();
        var decimal = circuit.readDecimal();

        var html = '<div class="c-circuit-state">';
        html += '<div class="c-bits-display">';

        for (var i = 0; i < binary.length; i++) {
            var bitValue = binary[i];
            var bitClass = bitValue === '0' ? 'c-bit-box c-bit-box-0' : 'c-bit-box c-bit-box-1';
            html += '<div class="' + bitClass + '">';
            html += '<div class="c-bit-index">Bit ' + i + '</div>';
            html += '<div class="c-bit-value-large">' + bitValue + '</div>';
            html += '</div>';
        }

        html += '</div>';
        html += '<div class="c-circuit-info">';
        html += '<div class="c-info-row"><span class="c-label">Binary:</span> <span class="c-value">' + binary + '</span></div>';
        html += '<div class="c-info-row"><span class="c-label">Decimal:</span> <span class="c-value">' + decimal + '</span></div>';
        html += '</div>';
        html += '</div>';

        container.innerHTML = html;
    }

    /**
     * Create interactive gate playground
     * @param {string} containerId - ID of container element
     * @param {string} gateName - Gate name
     * @param {function} onChange - Callback when inputs change
     */
    function createGatePlayground(containerId, gateName, onChange) {
        var container = document.getElementById(containerId);

        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        var isSingleBit = ['NOT', 'ID', 'ZERO', 'ONE'].indexOf(gateName) >= 0;

        if (isSingleBit) {
            // Single-bit gate playground
            var html = '<div class="c-gate-playground">';
            html += '<h4>' + gateName + ' Gate</h4>';
            html += '<div class="c-controls">';
            html += '<label>Input: <select id="c-input-' + containerId + '">';
            html += '<option value="0">0</option>';
            html += '<option value="1">1</option>';
            html += '</select></label>';
            html += '</div>';
            html += '<div id="c-output-' + containerId + '" class="c-gate-output"></div>';
            html += '</div>';

            container.innerHTML = html;

            var inputSelect = document.getElementById('c-input-' + containerId);
            var outputDiv = document.getElementById('c-output-' + containerId);

            var updateOutput = function() {
                var inputValue = parseInt(inputSelect.value);
                var bit = new Bit(inputValue);
                bit[gateName]();
                var output = bit.read();

                outputDiv.innerHTML = '<div class="c-result">Output: <span class="c-result-value">' + output + '</span></div>';

                if (onChange) {
                    onChange(inputValue, output);
                }
            };

            inputSelect.addEventListener('change', updateOutput);
            updateOutput();

        } else {
            // Two-bit gate playground
            var html = '<div class="c-gate-playground">';
            html += '<h4>' + gateName + ' Gate</h4>';
            html += '<div class="c-controls">';
            html += '<label>Input A: <select id="c-input-a-' + containerId + '">';
            html += '<option value="0">0</option>';
            html += '<option value="1">1</option>';
            html += '</select></label>';
            html += '<label>Input B: <select id="c-input-b-' + containerId + '">';
            html += '<option value="0">0</option>';
            html += '<option value="1">1</option>';
            html += '</select></label>';
            html += '</div>';
            html += '<div id="c-output-' + containerId + '" class="c-gate-output"></div>';
            html += '</div>';

            container.innerHTML = html;

            var inputASelect = document.getElementById('c-input-a-' + containerId);
            var inputBSelect = document.getElementById('c-input-b-' + containerId);
            var outputDiv = document.getElementById('c-output-' + containerId);

            var updateOutput = function() {
                var inputA = parseInt(inputASelect.value);
                var inputB = parseInt(inputBSelect.value);

                var bitA = new Bit(inputA);
                var bitB = new Bit(inputB);
                var gate = new TwoBitGate(bitA, bitB);
                var output = gate[gateName]();

                outputDiv.innerHTML = '<div class="c-result">Output: <span class="c-result-value">' + output + '</span></div>';

                if (onChange) {
                    onChange(inputA, inputB, output);
                }
            };

            inputASelect.addEventListener('change', updateOutput);
            inputBSelect.addEventListener('change', updateOutput);
            updateOutput();
        }
    }

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    /**
     * Run a circuit from gate array
     * @param {number} initialValue - Initial bit value (0 or 1)
     * @param {array} gates - Array of gate names ['NOT', 'ID']
     * @returns {Bit} - Final bit state
     */
    function runCircuit(initialValue, gates) {
        var bit = new Bit(initialValue);
        for (var i = 0; i < gates.length; i++) {
            var gateName = gates[i];
            if (bit[gateName]) {
                bit[gateName]();
            }
        }
        return bit;
    }

    /**
     * Convert decimal to binary string
     * @param {number} decimal - Decimal number
     * @param {number} bits - Number of bits (padding)
     * @returns {string} - Binary string
     */
    function decimalToBinary(decimal, bits) {
        bits = bits || 8;
        var binary = decimal.toString(2);
        while (binary.length < bits) {
            binary = '0' + binary;
        }
        return binary;
    }

    /**
     * Convert binary string to decimal
     * @param {string} binary - Binary string
     * @returns {number} - Decimal number
     */
    function binaryToDecimal(binary) {
        return parseInt(binary, 2);
    }

    // ============================================================================
    // PUBLIC API
    // ============================================================================

    var C = {
        // Factory functions
        bit: function(initialValue) {
            return new Bit(initialValue);
        },

        circuit: function(numBits) {
            return new ClassicalCircuit(numBits);
        },

        gate: function(bitA, bitB) {
            return new TwoBitGate(bitA, bitB);
        },

        // Utility functions
        runCircuit: runCircuit,
        decimalToBinary: decimalToBinary,
        binaryToDecimal: binaryToDecimal,

        // Visualization functions
        visualizeTruthTable: visualizeTruthTable,
        visualizeCircuit: visualizeCircuit,
        createGatePlayground: createGatePlayground,

        // Version
        version: '1.0.0'
    };

    // Export to global scope
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = C;
    } else {
        global.C = C;
    }

})(typeof window !== 'undefined' ? window : this);
