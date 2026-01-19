# Contributing to QuantumStuff

Thank you for your interest in contributing to **quantumstuff.org**! 🎉

We're building the most accessible quantum computing learning resource on the web, and we welcome contributions from students, researchers, educators, developers, and quantum enthusiasts of all backgrounds.

---

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Adding a New Lesson](#adding-a-new-lesson)
- [Using the Lesson Template](#using-the-lesson-template)
- [Component Libraries](#component-libraries)
- [Style Guidelines](#style-guidelines)
- [Testing Your Lesson](#testing-your-lesson)
- [Submitting Your Contribution](#submitting-your-contribution)

---

## Ways to Contribute

You can contribute by:

- ✍️ **Writing new lessons** on quantum topics
- 🔧 **Improving existing lessons** (clarity, examples, interactivity)
- 🎨 **Adding interactive demos** and visualizations
- 🐛 **Fixing bugs** or typos
- 📖 **Improving documentation**
- 🌍 **Translating content** to other languages
- 💡 **Suggesting new topics** via issues

---

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/quantumstuff.org.git
cd quantumstuff.org
```

### 2. Run Locally

No build step needed! Just serve the files:

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### 3. Create a Branch

```bash
git checkout -b add-lesson-name
```

---

## Adding a New Lesson

### Step 1: Choose Your Topic

Check existing lessons and open issues to avoid duplicates. We're looking for:

- **Foundations**: Basics of quantum mechanics, gates, circuits
- **Algorithms**: Deutsch, Grover, Shor, VQE, QAOA
- **Applications**: Quantum chemistry, optimization, machine learning
- **Advanced Topics**: Error correction, quantum networking, topological qubits

### Step 2: Copy the Template

```bash
cp LESSON_TEMPLATE.html tutorials/YOUR-TOPIC/lessons/lessonX.html
```

### Step 3: Fill in Your Content

Open `lessonX.html` and follow the TODO comments to customize:

1. **Update the title and meta tags**
2. **Write your lesson header** (title, subtitle, learning objectives)
3. **Add content sections** with explanations and examples
4. **Create interactive demos** (optional but encouraged!)
5. **Add a glossary** for key terms
6. **Write quiz questions** to test understanding

---

## Using the Lesson Template

The `LESSON_TEMPLATE.html` file is fully commented to guide you. Here's what to customize:

### Required Changes

```html
<!-- 1. Update the title -->
<title>Your Lesson Title - quantumstuff.org</title>

<!-- 2. Update lesson header -->
<header class="lesson-header">
    <div class="lesson-meta">
        <span class="lesson-number">Lesson X</span>
        <span>XX min read</span>
    </div>
    <h1>Your Lesson Title</h1>
    <p class="subtitle">Engaging description...</p>
</header>

<!-- 3. Update sidebar to mark your lesson as active -->
<a href="lessonX.html" class="sidebar-link active">X. Your Lesson</a>

<!-- 4. Update progress tracker (add active class to correct step) -->
<div class="progress-step active"></div>
```

### Adding Content

Use these pre-styled components:

#### Sections
```html
<section class="section" id="unique-id">
    <h2 class="section-title">Section Title</h2>
    <p>Your content...</p>
</section>
```

#### Callouts (Important Notes)
```html
<div class="callout">
    <div class="callout-title">
        <i data-lucide="info" style="width:16px;height:16px"></i>
        Title
    </div>
    <p>Important information...</p>
</div>
```

#### Interactive Demos
```html
<div class="demo">
    <div class="demo-header">
        <div class="demo-icon"><i data-lucide="zap" style="width:18px;height:18px"></i></div>
        <span class="demo-title">Interactive: Demo Name</span>
    </div>
    <div class="demo-content">
        <!-- Your interactive content -->
    </div>
</div>
```

#### Tooltips for Terms
```html
<span class="term" data-tooltip="Definition appears on hover">quantum gate</span>
```

---

## Component Libraries

QuantumStuff provides custom JavaScript libraries for quantum visualizations:

### Available Libraries

#### 1. **q.js** - Quantum Circuit Library
Location: `/libraries/q.js/`

Create quantum circuits with gates and measurements.

```javascript
// Example usage (see docs/QUANTUM_UTILS.md for full API)
const circuit = new QuantumCircuit(2); // 2 qubits
circuit.h(0);  // Hadamard on qubit 0
circuit.cnot(0, 1);  // CNOT from qubit 0 to 1
circuit.measure();
```

#### 2. **c.js** - Classical Circuit Library
Location: `/libraries/c.js/`

Create classical logic circuits for comparison.

#### 3. **bloch-viz** - Bloch Sphere Visualization
Location: `/libraries/bloch-viz/`

Visualize qubit states on the Bloch sphere.

```javascript
const bloch = new BlochSphere(containerId);
bloch.setState(alpha, beta); // Set qubit state
bloch.animate();
```

### Component Documentation

See `docs/QUANTUM_UTILS.md` for detailed API documentation (created separately).

---

## Style Guidelines

### Content Writing

1. **Accessibility First**: Assume no prior knowledge unless stated in prerequisites
2. **Use Analogies**: Explain complex concepts with everyday examples
3. **Be Encouraging**: Learning quantum computing is challenging - celebrate progress!
4. **Interactive > Passive**: Include demos, not just text
5. **Clear Language**: Avoid jargon; define terms when first used

### Code Style

- Use semantic HTML5 elements
- Add ARIA labels for accessibility
- Comment complex JavaScript
- Test on mobile (responsive design)

### Design Consistency

- Use existing CSS variables for colors:
  - `--color-green` (primary)
  - `--color-amber` (accent)
  - `--text-primary`, `--text-secondary`
- Follow existing component patterns
- Maintain consistent spacing and typography

---

## Testing Your Lesson

Before submitting, test:

1. ✅ **Visual check**: Does it look good on desktop and mobile?
2. ✅ **Links**: Do all navigation links work?
3. ✅ **Interactive elements**: Do demos, quizzes, and tooltips work?
4. ✅ **Accessibility**: Can you navigate with keyboard? Do screen readers work?
5. ✅ **Typos**: Run a spell check!

### Browser Testing

Test in at least two browsers:
- Chrome/Edge
- Firefox
- Safari (if available)

---

## Submitting Your Contribution

### 1. Commit Your Changes

```bash
git add tutorials/YOUR-TOPIC/lessons/lessonX.html
git commit -m "Add lesson: Your Lesson Title"
```

Follow commit message format:
- `Add lesson: Topic Name` (new lessons)
- `Fix: Description of fix` (bug fixes)
- `Improve: What was improved` (enhancements)

### 2. Push to Your Fork

```bash
git push origin add-lesson-name
```

### 3. Create a Pull Request

On GitHub:
1. Go to your fork
2. Click "New Pull Request"
3. Fill out the PR template with:
   - **Description**: What does this lesson teach?
   - **Prerequisites**: What should students know first?
   - **Interactive Elements**: What demos/visualizations are included?
   - **Screenshots**: Show key parts of your lesson

### 4. Wait for Review

We'll review your PR and may:
- Approve and merge ✅
- Request changes 📝
- Provide feedback 💬

We aim to respond within 3-5 days!

---

## Questions?

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs or suggest features
- 📧 **Contact**: Open an issue and we'll help!

---

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to learn and teach.

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make quantum education accessible to everyone! 🚀**
