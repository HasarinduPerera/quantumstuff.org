# C.js - Classical Circuit Simulator

A classical (digital) circuit simulator inspired by the quantum circuit simulator Q.js. Build and test logic circuits using classical logic gates directly in your browser.

## Features

- **Classical Logic Gates**: AND, OR, NOT, NAND, NOR, XOR, XNOR, and more
- **Interactive Editor**: Drag-and-drop interface with real-time feedback
- **Multiple Input Formats**: Create circuits programmatically or via text notation
- **Real-time Evaluation**: Instant circuit evaluation with detailed results
- **History Support**: Undo/redo capabilities
- **Export**: Export circuits to text and diagrams

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="C.css">
	<link rel="stylesheet" href="C-Circuit-Editor.css">
</head>
<body>
	<div id="circuit"></div>

	<script src="C.js"></script>
	<script src="C-Bit.js"></script>
	<script src="C-Gate.js"></script>
	<script src="C-History.js"></script>
	<script src="C-Circuit.js"></script>
	<script src="C-Circuit-Editor.js"></script>

	<script>
		// Create a simple circuit
		const circuit = new C.Circuit(3, 5)
		circuit.bits[0] = C.Bit.ONE
		circuit.bits[1] = C.Bit.ZERO
		circuit.bits[2] = C.Bit.ONE

		// Add gates
		circuit.set$('NOT', 1, 1)
		circuit.set$('AND', 2, 2)
		circuit.set$('OR', 3, 3)

		// Create interactive editor
		circuit.toDom(document.getElementById('circuit'))
	</script>
</body>
</html>
```

## Installation

### Option 1: Use Bundled Files (Recommended)

Download the bundled files from the `dist/` folder:

```html
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="path/to/c.css">
</head>
<body>
	<div id="circuit"></div>
	
<script src="path/to/c.js"></script>
	<script>
		const circuit = new C.Circuit(3, 5)
		circuit.toDom(document.getElementById('circuit'))
	</script>
</body>
</html>
```

### Option 2: Use Individual Files (For Development)

Include all source files individually (as shown in Quick Start above).

### Option 3: NPM Package (Coming Soon)

```bash
npm install c.js
```

## Building from Source

To create the bundled distribution files:

```bash
cd C
./build.sh
```

This generates `dist/c.js` and `dist/c.css`.

## Available Gates

- **NOT** - Inverts input
- **AND** - Output 1 if all inputs are 1
- **OR** - Output 1 if any input is 1
- **NAND** - Inverted AND
- **NOR** - Inverted OR
- **XOR** - Output 1 if inputs differ
- **XNOR** - Output 1 if inputs match
- **BUFFER** - No-op
- **PROBE** - Monitoring point

## Interactive Features

The circuit editor provides a fully interactive experience:

### Bit Input Toggle
- **Click on any bit value** (0 or 1) in the left column to toggle between high (1) and low (0)
- Changes take effect immediately
- Click **RUN** to evaluate the circuit with new input values
- Trace data is automatically invalidated when inputs change

### Gate Placement
- **Drag & Drop** gates from the palette onto the circuit board
- Move existing gates by dragging them to new positions
- Gates automatically snap to the grid

### Palette
Create a gate palette with all available logic gates:
```javascript
const palette = C.Circuit.Editor.createPalette()
document.body.appendChild(palette)
```

## API Reference

### C.Bit

Represents a classical bit with value 0 or 1.

```javascript
const bit0 = new C.Bit(0)  // Creates a bit with value 0
const bit1 = new C.Bit(1)  // Creates a bit with value 1

// Constants (use for comparison, not assignment)
C.Bit.ZERO   // Bit with value 0
C.Bit.ONE    // Bit with value 1
C.Bit.LOW    // Same as ZERO
C.Bit.HIGH   // Same as ONE
C.Bit.FALSE  // Same as ZERO
C.Bit.TRUE   // Same as ONE
```

**Important:** When setting circuit bit values, always create new `C.Bit` instances:
```javascript
// ✅ Correct - creates unique instances
circuit.bits[0] = new C.Bit(1)
circuit.bits[1] = new C.Bit(0)

// ❌ Incorrect - reuses shared constant objects
circuit.bits[0] = C.Bit.ONE  // Don't do this!
circuit.bits[1] = C.Bit.ZERO // Multiple bits will share the same object
```

### C.Gate
Represents a logic gate operation.

```javascript
const notGate = C.Gate.findBySymbol('NOT')
const output = notGate.applyToInputs(new C.Bit(1))
```

### C.Circuit

Represents a complete circuit with bits and gates.

```javascript
// Create a circuit with 3 bits and 5 time steps
const circuit = new C.Circuit(3, 5)

// Set input bit values
circuit.bits[0] = C.Bit.ONE
circuit.bits[1] = C.Bit.ZERO
circuit.bits[2] = C.Bit.ONE

// Add gates
circuit.set$('NOT', momentIndex, registerIndex)
circuit.set$('AND', 2, 1)

// Remove gates
circuit.clear$(momentIndex, registerIndex)

// Evaluate circuit
circuit.evaluate$()

// Get results
console.log(circuit.report$())
console.log(circuit.toDiagram())
```

### C.Circuit.Editor

Interactive DOM-based circuit editor.

```javascript
// Create editor
const editor = new C.Circuit.Editor(circuit, targetElement)

// Or use convenience method
const editor = circuit.toDom(targetElement)

// Create gate palette
const palette = C.Circuit.Editor.createPalette()
document.body.appendChild(palette)
```

## Text-Based Circuit Creation

Create circuits using simple text notation:

```javascript
const circuit = C.Circuit.fromText(`
	NOT-AND-I
	I---OR--I
	I---I---XOR
`)
```

Where:
- Each row represents a bit (wire)
- Gates are separated by `-` or spaces
- `I` represents an identity/no-op operation

## Examples

### Half Adder

```javascript
const halfAdder = new C.Circuit(2, 3)
halfAdder.bits[0] = C.Bit.ONE
halfAdder.bits[1] = C.Bit.ONE
halfAdder.set$('XOR', 1, 1)  // Sum output
halfAdder.set$('AND', 1, 2)  // Carry output
halfAdder.evaluate$()
console.log(halfAdder.report$())
```

### NOT Gate

```javascript
const notCircuit = new C.Circuit(1, 2)
notCircuit.bits[0] = C.Bit.ONE
notCircuit.set$('NOT', 1, 1)
notCircuit.evaluate$()
// Result: Bit 1 will be 0
```

### AND Gate

```javascript
const andCircuit = new C.Circuit(2, 2)
andCircuit.bits[0] = C.Bit.ONE
andCircuit.bits[1] = C.Bit.ONE
andCircuit.set$('AND', 1, 1)
andCircuit.evaluate$()
// Result: Bit 1 will be 1 (1 AND 1 = 1)
```

## Architecture

C.js follows a modular architecture:

- **C.js** - Main entry point and utilities
- **C-Bit.js** - Classical bit representation
- **C-Gate.js** - Logic gate definitions
- **C-Circuit.js** - Circuit structure and evaluation
- **C-History.js** - Undo/redo functionality
- **C-Circuit-Editor.js** - Interactive editor
- **C.css** - Core styles
- **C-Circuit-Editor.css** - Editor-specific styles

## Comparison with Q.js

| Feature | Q.js (Quantum) | C.js (Classical) |
|---------|---------------|------------------|
| Basic Unit | Qubit (superposition) | Bit (0 or 1) |
| Gates | Quantum gates (H, X, Y, Z, CNOT) | Logic gates (AND, OR, NOT, etc.) |
| State | Complex probability amplitudes | Deterministic 0 or 1 |
| Evaluation | Matrix multiplication | Boolean logic |
| Output | Probability distribution | Exact bit values |

## Browser Support

C.js works in all modern browsers that support ES6:

- Chrome/Edge 51+
- Firefox 54+
- Safari 10+

## Known Issues & Troubleshooting

  ### Wires Not Visible / Hidden Behind Background

  **Symptom:** Circuit wires are invisible or not rendering, even though gates and labels appear correctly.

  **Root Cause:** The C.js library uses `z-index: -20` on `.C-circuit-board-background` to layer wires behind circuit elements. If your page has:
  - A solid background color on the circuit container
  - Global CSS resets that override `box-sizing`
  - Custom z-index stacking contexts

  ...the wires may be rendered behind your background and become invisible.

  **Solution:**

  Add the following CSS overrides to your page:

  ```css
  /* Fix z-index stacking - bring wires above custom backgrounds */
  .C-circuit-board-background {
      z-index: 0 !important;
  }

  .C-circuit-board-foreground {
      z-index: 1 !important;
  }

  /* Preserve border-box for wire rendering */
  .C-circuit-register-wire,
  .C-circuit-register-wire::before,
  .C-circuit-register-wire::after,
  .C-circuit-wire-animated,
  .C-circuit-wire-animated::after,
  .C-circuit-intermediate-wire {
      box-sizing: border-box !important;
  }

  /* Optional: Make wires more visible on light backgrounds */
  .C-circuit-register-wire {
      background-color: hsl(210, 15%, 70%) !important;
      height: 2px !important;
  }

  Important: If you're using global CSS resets like * { box-sizing: border-box; }, apply them selectively rather than using !important on all C.js elements. The wire rendering calculations depend on border-box for proper width/height.

  Beam Animations Not Working

  If beam animations don't appear after fixing the wire visibility issue, ensure the ::after pseudo-elements also have the correct box-sizing:

  .C-circuit-wire-animated::after {
      box-sizing: border-box !important;
  }

  Integration Best Practices

  1. Avoid global * { } selectors that force box-sizing on all elements
  2. Test with both light and dark backgrounds to ensure wire visibility
  3. Don't override z-index values without understanding the layering system
  4. Use CSS custom properties (CSS variables) for theming instead of direct style overrides

## License

MIT License. See [LICENSE.md](LICENSE.md) for details.

## Credits

C.js is inspired by and based on [Q.js](https://quantumjavascript.app/) - a quantum circuit simulator by Stewart Smith.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests at [https://github.com/hasarinduperera/c.js](https://github.com/hasarinduperera/c.js).

## Learn More

For more information about classical digital circuits and logic gates:
- [Digital Logic](https://en.wikipedia.org/wiki/Logic_gate)
- [Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra)
- [Digital Electronics](https://en.wikipedia.org/wiki/Digital_electronics)
