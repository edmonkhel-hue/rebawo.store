# Timer Application Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Forest and Be Focused apps, emphasizing calm, distraction-free interfaces that promote focus and mindfulness.

**Key Design Principles:**
- Minimal visual noise to reduce distractions
- Calming color palette promoting focus
- Large, readable timer display as the central element
- Intuitive controls with clear visual feedback

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Forest Green: 142 69% 58% (primary brand color)
- Sage Green: 142 30% 85% (light mode background)
- Deep Forest: 142 100% 25% (dark mode accents)

**Neutral Colors:**
- Warm White: 45 15% 97% (light backgrounds)
- Charcoal: 142 15% 15% (dark backgrounds)
- Soft Gray: 142 10% 60% (secondary text)

### B. Typography
- **Primary Font**: Inter (Google Fonts) - clean, highly readable
- **Timer Display**: Roboto Mono (Google Fonts) - monospace for consistent number width
- **Font Scale**: Large timer display (4xl-8xl), medium headings (lg-xl), standard body text (base)

### C. Layout System
**Spacing Strategy**: Tailwind units of 2, 4, 8, 12, and 16
- Micro spacing: p-2, m-2
- Component spacing: p-4, gap-4
- Section spacing: p-8, my-8
- Large spacing: p-12, my-16

### D. Component Library

**Timer Display:**
- Large, centered circular or rectangular display
- Monospace font for consistent digit alignment
- High contrast for easy reading
- Progress ring or bar showing completion percentage

**Control Buttons:**
- Primary: Solid forest green for Start action
- Secondary: Outline style for Pause/Reset
- Large touch targets (minimum 44px)
- Clear iconography with text labels

**Time Input:**
- Clean, minimal input fields for hours:minutes:seconds
- Grouped visually with subtle borders
- Clear labels and placeholder text

**Progress Indicator:**
- Circular progress ring around timer display, OR
- Linear progress bar beneath timer
- Smooth animation with forest green fill

### E. Visual Elements
**Background Treatment:**
- Light mode: Soft sage green gradient from center
- Dark mode: Deep forest to charcoal gradient
- Subtle texture or pattern to add warmth without distraction

**Card/Container Design:**
- Gentle rounded corners (rounded-lg to rounded-xl)
- Subtle shadows for depth
- Semi-transparent backgrounds for layering

### F. Animations
**Minimal and Purposeful:**
- Smooth progress ring/bar updates
- Gentle button press feedback
- Subtle timer completion celebration (pulse or glow)
- Smooth transitions between states (0.2-0.3s duration)

## Layout Structure
**Single-page Application:**
1. **Header**: App title and basic settings/theme toggle
2. **Main Timer Section**: Large timer display with progress indicator
3. **Controls Section**: Time input fields and action buttons
4. **Footer**: Minimal branding or additional options

**Responsive Behavior:**
- Mobile-first approach
- Timer display scales appropriately
- Button sizes optimized for touch
- Maintains readability across all screen sizes

## Audio Integration
- Use Web Audio API for notification sounds
- Gentle, non-jarring completion sound
- Optional sound selection or mute toggle

This design creates a focused, calming environment that supports productivity while maintaining the essential functionality users need for effective time management.