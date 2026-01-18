# TheoryQ Style Guide

## 🎨 Color Palette

```css
Primary:     #2d5016  (Deep forest green)
Secondary:   #6b8e23  (Olive green)
Accent:      #8b7355  (Warm brown)
Background:  #fdfcfa  (Cream)
Interactive: #e8f5e0  (Light mint green)
Error/State: #c62828  (Red - for state vectors, errors)
```

## 📐 Layout

- **Sidebar**: 280px fixed width, left-aligned navigation
- **Main Content**: Max-width 900px, centered
- **Spacing**: 1rem base unit (16px)
- **Border Radius**: 6-8px for cards and buttons

## 🔤 Typography

- **Font**: Inter (Google Fonts)
- **Headings**: 600-700 weight
- **Body**: 400 weight
- **Line Height**: 1.6 for readability

## 🎯 Interactive Elements

### Buttons
- **Primary**: Green (#2d5016), white text, 0.75rem padding
- **Secondary**: Olive (#6b8e23), white text
- **Hover**: Darker shade, slight transform

### Quantum Gates
- **H Gate**: Primary green background
- **X Gate**: Accent brown background
- **Z Gate**: Accent brown background
- **CNOT Control**: Solid dot (●), green circle
- **CNOT Target**: Open circle with plus (⊕), green border

### Result Badges
```css
.result-badge.result-0  → Red background
.result-badge.result-1  → Blue background
.result-badge.result-multi → Gray background
```

## 📊 Circuit Notation

- **Qubit Wire**: Horizontal line, 2px solid
- **Gate Box**: 60px min-width, rounded corners
- **Measurement**: 📊 emoji
- **State Labels**: 1.1rem, positioned left of wire

### CNOT Gates
- **Control**: Solid green dot (●), 30px circle
- **Target**: Green circle with ⊕ symbol, 30px
- **Connection Line**: 3px vertical green line, connects control to target

## 🌐 Bloch Sphere

- **Size**: 300x300px default
- **Sphere**: Radial gradient (light to green/transparent)
- **Axes**:
  - Z-axis: Solid green, 2px
  - X/Y-axis: Dashed brown, 1.5px
- **State Vector**: Red (#c62828), 3px width
- **Labels**: |0⟩ at north pole, |1⟩ at south pole
- **Equator**: Dashed green line

## 📦 Component Structure

### Interactive Block
```html
<div class="interactive-block">
    <h3>Title</h3>
    <div class="demo-area">
        <!-- Interactive content -->
    </div>
    <p class="note">Explanation...</p>
</div>
```

### Circuit Display
```html
<div class="circuit-display">
    <div class="qubit-wire">
        <span class="state-label">|0⟩</span>
        <div class="gate-box gate-h">H</div>
        <div class="measurement-box">📊</div>
    </div>
</div>
```

### Quiz Question
```html
<div class="quiz-question" data-question="1">
    <p class="question-text"><strong>Question:</strong> ...</p>
    <div class="quiz-options">
        <label class="option">
            <input type="radio" name="q1" value="a">
            <span>Answer text</span>
        </label>
    </div>
    <div class="feedback" id="feedback-1"></div>
</div>
```

## 🎭 Design Principles

1. **Nature-Inspired**: Earth tones, calm colors
2. **Clean & Professional**: Minimal clutter, clear hierarchy
3. **Interactive**: Every concept has hands-on demo
4. **Progressive**: Start simple, build complexity
5. **Accessible**: High contrast, clear labels

## 🚫 Don'ts

- ❌ No emojis in content (except 📊 for measurement)
- ❌ No flashy gradients or animations
- ❌ No bright colors that clash with nature theme
- ❌ No purple, pink, or neon colors
- ❌ Avoid Comic Sans and decorative fonts

## ✅ Do's

- ✅ Use consistent spacing (1rem base)
- ✅ Keep explanations concise
- ✅ Show, don't just tell (interactive > text)
- ✅ Use quantum notation: |0⟩, |1⟩, |+⟩
- ✅ Include "note" boxes for key insights
- ✅ Test on mobile and desktop

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (sidebar + content)
- **Tablet**: 768px - 1024px (collapsible sidebar)
- **Mobile**: < 768px (hamburger menu)

## 🎓 Educational Tone

- Clear and direct
- No condescension ("simple", "just", "obviously")
- Build intuition first, math second
- Use analogies (coins, colors, etc.)
- Celebrate understanding ("Notice how...")

---

**Inspired by**: IQM Academy's pedagogical approach with original TheoryQ nature aesthetic.
