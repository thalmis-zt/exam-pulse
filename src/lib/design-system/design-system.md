# Exam Pulse — Design System

A token-based design system for Tailwind v4. Tokens are split into layers so that primitives never change, and theming only touches semantic tokens.

---

## File Structure

```
src/lib/design-system/
├── design-system.md          ← you are here
├── tokens/
│   ├── primitives.css        — raw values, @theme (Tailwind utilities)
│   ├── semantic.css          — meaningful mappings, :root + .dark
│   ├── states.css            — feedback + quiz domain colours
│   ├── layout.css            — shell dimensions
│   └── motion.css            — durations + easing
└── base/
    └── typography.css        — font stack + type scale, @theme
```

All files are imported in `src/app.css`, which is loaded by `src/routes/layout.css` before Tailwind.

---

## Token Layers

```
primitives  →  semantic  →  components
              ↑
          states, layout, motion, typography sit at this level
```

| Layer | File | Directive | Purpose |
|---|---|---|---|
| Primitives | `tokens/primitives.css` | `@theme` | Raw values only — no meaning |
| Semantic | `tokens/semantic.css` | `:root` / `.dark` | Map primitives to roles |
| States | `tokens/states.css` | `:root` | Feedback + exam domain states |
| Layout | `tokens/layout.css` | `:root` | App shell dimensions |
| Motion | `tokens/motion.css` | `:root` | Animation constants |
| Typography | `base/typography.css` | `@theme` | Font stack + type scale |

**Rule:** Components must only reference **semantic tokens** (or state/layout/motion tokens). Never reference primitive tokens directly in components.

---

## Primitive Tokens

Defined in `@theme` — Tailwind generates utility classes from these automatically.

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-blue-50` | `#EBF4FE` | Light blue tint |
| `--color-blue-500` | `#258CF4` | Brand primary |
| `--color-blue-600` | `#1A78D8` | Primary hover |
| `--color-gray-50` | `#F3F3F3` | Page background |
| `--color-gray-200` | `#DEE1E6` | Borders |
| `--color-gray-500` | `#565D6D` | Muted text |
| `--color-gray-900` | `#171A20` | Primary text |
| `--color-green-100` | `#DCF9E5` | Light green tint |
| `--color-green-500` | `#3CDD71` | Success / correct |
| `--color-red-500` | `#E64C4C` | Danger / incorrect |
| `--color-white` | `#FFFFFF` | White |

### Spacing

| Token | Value | px |
|---|---|---|
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-5` | `1.25rem` | 20px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |
| `--space-20` | `5rem` | 80px |
| `--space-24` | `6rem` | 96px |
| `--space-32` | `8rem` | 128px |

### Border Radius

| Token | Value | px | Use for |
|---|---|---|---|
| `--radius-sm` | `0.25rem` | 4px | Tags, small chips |
| `--radius-md` | `0.5rem` | 8px | Inputs, small buttons |
| `--radius-lg` | `0.75rem` | 12px | Dropdowns, tooltips |
| `--radius-xl` | `1rem` | 16px | Cards, modals |
| `--radius-full` | `9999px` | — | Pills, circular buttons |

### Shadows

| Token | Usage |
|---|---|
| `--shadow-sm` | Subtle lift (cards, inputs) |
| `--shadow-md` | Elevated elements (dropdowns, modals) |

---

## Semantic Tokens

Defined in `:root` and overridden in `.dark`. Always use these in components — they respond to the current theme automatically.

### Backgrounds & Surfaces

| Token | Light | Dark |
|---|---|---|
| `--color-background` | `#F3F3F3` | `#0F1117` |
| `--color-surface` | `#FFFFFF` | `#1A1D27` |

### Primary

| Token | Value (both themes) |
|---|---|
| `--color-primary` | `#258CF4` |
| `--color-primary-hover` | `#1A78D8` |

### Borders

| Token | Light | Dark |
|---|---|---|
| `--color-border` | `#DEE1E6` | `#2C2F3E` |

### Text

| Token | Light | Dark |
|---|---|---|
| `--color-text` | `#171A20` | `#F0F2F7` |
| `--color-text-muted` | `#565D6D` | `#8B91A7` |

### Surface Levels

Use these to establish visual depth/elevation.

| Token | Light | Dark | Use for |
|---|---|---|---|
| `--surface-background` | `#F3F3F3` | `#0F1117` | Page canvas |
| `--surface-card` | `#FFFFFF` | `#1A1D27` | Content cards |
| `--surface-modal` | `#FFFFFF` | `#22263A` | Modals / dialogs |
| `--surface-dropdown` | `#FFFFFF` | `#1E2130` | Menus / popovers |

---

## State Tokens

### Generic Feedback

| Token | Value | Use for |
|---|---|---|
| `--color-success` | `#3CDD71` | Confirmations, completed states |
| `--color-warning` | `#F5A623` | Caution, time warnings |
| `--color-danger` | `#E64C4C` | Errors, destructive actions |
| `--color-info` | `#258CF4` | Informational messages |

### Exam / Quiz Domain

| Token | Value | Use for |
|---|---|---|
| `--color-correct` | `#3CDD71` | Correct answer highlight |
| `--color-incorrect` | `#E64C4C` | Wrong answer highlight |
| `--color-skipped` | `#DEE1E6` | Unanswered question indicator |
| `--color-flagged` | `#F5A623` | Question flagged for review |

---

## Layout Tokens

| Token | Value | Purpose |
|---|---|---|
| `--header-height` | `3.5rem` (56px) | Top navigation bar height |
| `--sidebar-width` | `15rem` (240px) | Side navigation width |
| `--content-max-width` | `64rem` (1024px) | Max width of main content area |

Usage example:

```css
.page-header {
  height: var(--header-height);
}

.main-content {
  max-width: var(--content-max-width);
  margin-inline: auto;
}
```

---

## Motion Tokens

| Token | Value | Use for |
|---|---|---|
| `--motion-fast` | `100ms` | Micro-interactions (hover, focus) |
| `--motion-normal` | `200ms` | UI transitions (open/close) |
| `--motion-slow` | `350ms` | Page-level transitions |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |

Usage example:

```css
.btn {
  transition: background-color var(--motion-fast) var(--ease-standard);
}

.modal {
  transition: opacity var(--motion-normal) var(--ease-standard);
}
```

---

## Typography Tokens

Defined in `@theme` — Tailwind generates `font-sans`, `text-xs`, `text-sm`, etc. utilities automatically.

### Font Stack

| Token | Value |
|---|---|
| `--font-sans` | Inter → system-ui fallback chain |

### Type Scale

| Token | Value | px | Tailwind class |
|---|---|---|---|
| `--text-xs` | `0.75rem` | 12px | `text-xs` |
| `--text-sm` | `0.875rem` | 14px | `text-sm` |
| `--text-base` | `1rem` | 16px | `text-base` |
| `--text-lg` | `1.125rem` | 18px | `text-lg` |
| `--text-xl` | `1.25rem` | 20px | `text-xl` |
| `--text-2xl` | `1.5rem` | 24px | `text-2xl` |

---

## Dark Mode

Toggle dark mode by adding the `.dark` class to `<html>` or `<body>`.

```svelte
<!-- +layout.svelte -->
<script>
  let dark = $state(false);
</script>

<svelte:element this="html" class={dark ? 'dark' : ''}>
  {@render children()}
</svelte:element>
```

Only semantic tokens change in dark mode. Primitive tokens are the same in both themes.

---

## How to Use Tokens in Components

### Option A — Tailwind utilities (preferred for layout/spacing/type)

Primitive tokens registered via `@theme` become standard Tailwind utility classes:

```svelte
<div class="bg-blue-500 text-white rounded-md shadow-sm px-4 py-2 text-sm font-sans">
  Button
</div>
```

### Option B — CSS variables (required for semantic + state tokens)

Semantic tokens are not Tailwind utilities — use them directly as CSS custom properties:

```svelte
<style>
  .card {
    background: var(--surface-card);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--motion-fast) var(--ease-standard);
  }

  .card:hover {
    box-shadow: var(--shadow-md);
  }
</style>
```

### Option C — Inline styles (avoid unless dynamic values are needed)

```svelte
<div style="color: var(--color-primary);">...</div>
```

---

## Naming Conventions

```
--color-{role}        e.g. --color-primary, --color-text-muted
--surface-{level}     e.g. --surface-card, --surface-modal
--space-{scale}       e.g. --space-4
--radius-{size}       e.g. --radius-md
--shadow-{level}      e.g. --shadow-sm
--motion-{speed}      e.g. --motion-fast
--text-{size}         e.g. --text-base
--font-{family}       e.g. --font-sans
--color-{state}       e.g. --color-correct, --color-flagged
```

---

## Rules

1. **Never use primitive tokens in components.** Only reference semantic, state, layout, or motion tokens.
2. **Never hardcode colours or spacing** in component styles. Always use a token.
3. **Do not modify `primitives.css`** unless adding a new raw value. Meaning lives in `semantic.css`.
4. **Dark mode = semantic overrides only.** Do not add `.dark` overrides to state, layout, or motion files.
5. **Do not create a `tailwind.config.js`.** This project is Tailwind v4 — configuration lives in CSS via `@theme`.
6. **Extending the system** — add new primitives to `primitives.css`, then map them in `semantic.css`. Never skip the primitive layer.
