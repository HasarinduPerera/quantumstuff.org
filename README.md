# 🌌 QuantumStuff — Open-Source Quantum Learning Platform

Welcome to **QuantumStuff**, an open-source project dedicated to making **quantum computing and quantum physics accessible to everyone**.
This repo contains beginner-friendly tutorials, interactive activities, and community-driven content on everything from basic qubits to advanced quantum algorithms.

**Live at: [quantumstuff.org](https://quantumstuff.org)** 🚀

---

## ✨ What You'll Find Here

### 📘 Beginner Tutorials
- Qubits, states, Bloch sphere
- Single- and multi-qubit gates
- Measurement basics
- Superposition & entanglement
- Simple quantum circuits
- Intro to Qiskit / Cirq / PennyLane

### ⚙️ Interactive Activities
- Bloch sphere explorer
- Mini quantum circuit simulator
- Qubit state animations

### 🧪 Advanced "Quantum Stuff"
- Quantum tunneling
- Variational algorithms
- Grover's & Shor's
- Quantum error correction
- Foundations of quantum physics
- Quantum machine learning

All contributions are welcome — big or small.

---

# 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/quantumstuff.git
cd quantumstuff
```

### 2. Run locally
Just open any HTML file in your browser - no build step required!

```bash
# Quick start - Python server
cd quantumstuff.org
python3 -m http.server 8000

# Then visit http://localhost:8000
```

---

# 🌐 Deployment

This site is deployed on **GitHub Pages** with a custom domain from Porkbun.

### Automatic Deployment
- Push to `master` branch triggers automatic deployment
- Site goes live at [quantumstuff.org](https://quantumstuff.org)
- No build process required - pure HTML/CSS/JS

### Custom Domain Setup
The `CNAME` file configures the custom domain. DNS is configured with:
- A records pointing to GitHub Pages IPs
- HTTPS enforced via GitHub Pages

---

# 🧩 Contributing

We welcome contributions from:

- students
- researchers
- developers
- educators
- hobbyists

### You can contribute by:
- Adding tutorials
- Improving explanations
- Adding images/diagrams
- Contributing interactive demos
- Writing advanced sections
- Fixing typos
- Translating content
- Suggesting new topics

### How to contribute:
1. Fork the repo
2. Make changes in a new branch
3. Submit a pull request

We'll review and collaborate!

---

# 📁 Project Structure

```
quantumstuff.org/
│
├── index.html              # Main landing page
├── CNAME                   # Custom domain configuration
│
├── css/                    # Global styles
├── js/                     # Global scripts
├── images/                 # Site images
├── sections/               # Page sections
│
├── tutorials/
│   └── basics/             # Quantum computing fundamentals (8 lessons)
│       ├── lessons/        # HTML lesson files
│       ├── js/             # Interactive lesson scripts
│       ├── css/            # Styling
│       └── visualizations/ # Bloch sphere and other visualizations
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
└── docs/                   # Documentation
```

---

# 🌍 Community

Open issues, ask questions, propose ideas — or add your own quantum "stuff."

---

# 🛸 License
MIT License — free to use, modify, and share.

---

# 💡 Vision

Quantum learning shouldn't be intimidating.
Our goal is to create **the most accessible, community-driven quantum learning resource** on the web — one piece of "quantum stuff" at a time.

---

**🚀 Explore. Learn. Contribute. Build quantum stuff.**
