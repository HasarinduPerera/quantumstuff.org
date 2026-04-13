# QuantumStuff — Open-Source Quantum Learning Platform

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fquantumstuff.org&label=quantumstuff.org)](https://quantumstuff.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/HasarinduPerera/quantumstuff.org)](https://github.com/HasarinduPerera/quantumstuff.org/commits/main)
[![GitHub stars](https://img.shields.io/github/stars/HasarinduPerera/quantumstuff.org?style=social)](https://github.com/HasarinduPerera/quantumstuff.org/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Accessibility](https://github.com/HasarinduPerera/quantumstuff.org/actions/workflows/accessibility.yml/badge.svg)](https://github.com/HasarinduPerera/quantumstuff.org/actions/workflows/accessibility.yml)

**QuantumStuff** is an open-source platform dedicated to making quantum computing and quantum physics accessible to everyone. This repository contains beginner-friendly tutorials, interactive activities, and community-driven content ranging from basic qubits to advanced quantum algorithms.

**Live at: [quantumstuff.org](https://quantumstuff.org)**

---

## Contents

### Beginner Tutorials
- Qubits, states, and the Bloch sphere
- Single- and multi-qubit gates
- Measurement basics
- Superposition and entanglement
- Simple quantum circuits
- Introduction to Qiskit, Cirq, and PennyLane

### Interactive Activities
- Bloch sphere explorer
- Quantum circuit simulator
- Qubit state animations

### Advanced Topics
- Quantum tunneling
- Variational algorithms
- Grover's and Shor's algorithms
- Quantum error correction
- Foundations of quantum physics
- Quantum machine learning

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/HasarinduPerera/quantumstuff.org.git
cd quantumstuff.org
```

### 2. Run locally
No build step required. Open any HTML file directly in a browser, or serve with Python:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Deployment

The site is deployed on **GitHub Pages** with a custom domain via Porkbun.

- Pushing to `main` triggers automatic deployment
- No build process — pure HTML, CSS, and JavaScript
- Custom domain configured via `CNAME`; DNS uses A records pointing to GitHub Pages IPs with HTTPS enforced

---

## Project Structure

```
quantumstuff.org/
│
├── index.html              # Main landing page
├── about.html              # About page
├── community.html          # Community page
├── resources.html          # Resources page
├── playground.html         # Quantum playground
├── CNAME                   # Custom domain configuration
├── CONTRIBUTING.md         # Contribution guidelines
│
├── css/                    # Global styles
├── js/                     # Global scripts
├── images/                 # Site images
├── sections/               # Reusable page sections
│
├── tutorials/
│   └── basics/             # Quantum computing fundamentals (8 lessons)
│       ├── lessons/        # HTML lesson files (lesson1–8)
│       ├── js/             # Interactive lesson scripts
│       └── css/            # Lesson styles
│
├── libraries/
│   ├── q.js/               # Quantum circuit library
│   ├── c.js/               # Classical circuit library
│   └── bloch-viz/          # Bloch sphere visualization library
│
├── interactive/            # Interactive playgrounds and tools
│   ├── quantum-circuit-playground.html
│   ├── bloch-sphere-explorer.html
│   └── quantum-visualization-playground.html
│
└── examples/               # Example circuits and demos
```

---

## Contributing

Contributions are welcome from students, researchers, developers, educators, and hobbyists alike. You can help by:

- Adding or improving tutorials
- Contributing interactive demos or diagrams
- Fixing typos or clarifying explanations
- Translating content
- Suggesting new topics

**How to contribute:**
1. Fork the repository
2. Create a new branch for your changes
3. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Community

Open issues, ask questions, and propose ideas on the [GitHub Issues](https://github.com/HasarinduPerera/quantumstuff.org/issues) page.

---

## License

MIT License — free to use, modify, and share.

---

## Vision

Quantum learning shouldn't be intimidating. The goal of QuantumStuff is to build the most accessible, community-driven quantum learning resource on the web.
