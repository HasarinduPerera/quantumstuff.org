# Examples

This folder contains working examples demonstrating how to use the QuantumStuff libraries and utilities.

## Available Examples

### 1. Basic Measurement (`basic-measurement.html`)

Demonstrates fundamental quantum measurement simulation using `quantum-utils.js`.

**What it shows:**
- Using `performMeasurements()` to simulate qubit measurements
- Creating histograms with `createHistogram()`
- Getting state descriptions with `describeState()` and `toKetNotation()`
- Interactive probability adjustment

**Open in browser:**
```bash
python3 -m http.server 8000
# Visit http://localhost:8000/examples/basic-measurement.html
```

### 2. Circuit Simulation (`circuit-simulation.html`)

Interactive quantum circuit builder and simulator.

**What it shows:**
- Using `simulateCircuit()` to simulate multi-gate circuits
- Building circuits with H (Hadamard) and X (NOT) gates
- Visualizing circuit results
- Pre-built example circuits

**Open in browser:**
```bash
python3 -m http.server 8000
# Visit http://localhost:8000/examples/circuit-simulation.html
```

## Using These Examples

### As Learning Tools

Study the source code of these examples to understand:
- How to structure interactive quantum demonstrations
- Best practices for using quantum-utils.js
- HTML/CSS/JS patterns for educational content

### As Templates

Copy and modify these examples to create your own:
```bash
cp examples/basic-measurement.html tutorials/YOUR-TOPIC/demos/my-demo.html
```

### As Testing Tools

Use these examples to:
- Test new features in quantum-utils.js
- Verify library functionality
- Debug visualization issues

## Creating New Examples

To add a new example:

1. **Create the HTML file:**
   ```bash
   touch examples/your-example.html
   ```

2. **Include required libraries:**
   ```html
   <link rel="stylesheet" href="../tutorials/basics/css/styles.css">
   <script src="../tutorials/basics/js/quantum-utils.js"></script>
   ```

3. **Follow the structure:**
   - Title and description
   - Interactive demo section
   - Code example section
   - Clear comments in JavaScript

4. **Test locally:**
   ```bash
   python3 -m http.server 8000
   ```

5. **Update this README** to list your example

## Library Documentation

For complete API documentation, see:
- [Quantum Utils API](../docs/QUANTUM_UTILS.md)
- [Contributing Guide](../CONTRIBUTING.md)

## Questions?

Open an issue on GitHub if you have questions about the examples or want to suggest new ones!
