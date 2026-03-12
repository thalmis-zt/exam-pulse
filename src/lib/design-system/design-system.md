# Exam Pulse — Design System

A token-based design system for Tailwind v4. Tokens are split into layers so that primitives never change, and theming only touches semantic tokens.

---

## File Structure

```
src/lib/design-system/
├── design-system.md          ← you are here
├── tokens/
│   ├── primitives.css        — raw values, @theme (Tailwind utilities)
│   ├── semantic.css          — meaningful mappings, @theme + media query + [data-theme]
│   ├── states.css            — feedback + quiz domain colours, @theme + media query + [data-theme]
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
| Semantic | `tokens/semantic.css` | `@theme` + media query + `[data-theme]` | Map primitives to roles; generates Tailwind utilities |
| States | `tokens/states.css` | `@theme` + media query + `[data-theme]` | Feedback + exam domain states; generates Tailwind utilities |
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

Defined in `@theme` — Tailwind generates utility classes from all of these. They respond to the active theme automatically (OS preference or user override via `[data-theme]`).

### Canvas

| Token | Tailwind class | Light | Dark | Use for |
|---|---|---|---|---|
| `--color-canvas` | `bg-canvas` | `#F3F3F3` | `#0F1117` | Page background |

### Primary

| Token | Tailwind class | Value (both themes) |
|---|---|---|
| `--color-primary` | `bg-primary` / `text-primary` / `border-primary` | `#258CF4` |
| `--color-primary-hover` | `bg-primary-hover` | `#1A78D8` |

### Secondary

| Token | Tailwind class | Value (both themes) |
|---|---|---|
| `--color-secondary` | `bg-secondary` / `text-secondary` | `#3CDD71` |
| `--color-secondary-hover` | `bg-secondary-hover` | (green-600) |

### Stroke

| Token | Tailwind class | Light | Dark |
|---|---|---|---|
| `--color-stroke` | `border-stroke` / `divide-stroke` | `#DEE1E6` | `#2C2F3E` |

### Foreground (Text)

| Token | Tailwind class | Light | Dark |
|---|---|---|---|
| `--color-fg` | `text-fg` | `#171A20` | `#F0F2F7` |
| `--color-fg-muted` | `text-fg-muted` | `#565D6D` | `#8B91A7` |

### Surface Levels

Use these to establish visual depth/elevation.

| Token | Tailwind class | Light | Dark | Use for |
|---|---|---|---|---|
| `--color-surface-card` | `bg-surface-card` | `#FFFFFF` | `#1A1D27` | Content cards |
| `--color-surface-modal` | `bg-surface-modal` | `#FFFFFF` | `#22263A` | Modals / dialogs |
| `--color-surface-popover` | `bg-surface-popover` | `#FFFFFF` | `#1E2130` | Menus / popovers |

---

## State Tokens

Defined in `@theme` — Tailwind generates utilities (`bg-success`, `text-danger`, `bg-danger-surface`, etc.) from all state tokens. Dark mode values are applied via `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`.

### Generic Feedback

| Token | Tailwind class | Light | Dark | Use for |
|---|---|---|---|---|
| `--color-success` | `bg-success` / `text-success` | `#3CDD71` | `#4ADE80` | Confirmations, completed states |
| `--color-success-surface` | `bg-success-surface` | `#DCF9E5` | `#14532D33` | Success tint backgrounds |
| `--color-warning` | `bg-warning` / `text-warning` | `#F5A623` | `#FBBF24` | Caution, time warnings |
| `--color-warning-surface` | `bg-warning-surface` | `#FEF3DC` | `#78350F33` | Warning tint backgrounds |
| `--color-danger` | `bg-danger` / `text-danger` | `#E64C4C` | `#F87171` | Errors, destructive actions |
| `--color-danger-surface` | `bg-danger-surface` | `#FDEAEA` | `#7F1D1D33` | Danger tint backgrounds |
| `--color-info` | `bg-info` / `text-info` | `#258CF4` | `#60A5FA` | Informational messages |
| `--color-info-surface` | `bg-info-surface` | `#EBF4FE` | `#1E3A5F33` | Info tint backgrounds |

### Exam / Quiz Domain

| Token | Tailwind class | Light | Dark | Use for |
|---|---|---|---|---|
| `--color-correct` | `bg-correct` / `text-correct` | `#3CDD71` | `#4ADE80` | Correct answer highlight |
| `--color-correct-surface` | `bg-correct-surface` | `#DCF9E5` | `#14532D33` | Correct answer tint |
| `--color-incorrect` | `bg-incorrect` / `text-incorrect` | `#E64C4C` | `#F87171` | Wrong answer highlight |
| `--color-incorrect-surface` | `bg-incorrect-surface` | `#FDEAEA` | `#7F1D1D33` | Wrong answer tint |
| `--color-skipped` | `bg-skipped` / `text-skipped` | `#DEE1E6` | `#374151` | Unanswered question indicator |
| `--color-skipped-surface` | `bg-skipped-surface` | `#F3F3F3` | `#1F293733` | Skipped question tint |
| `--color-flagged` | `bg-flagged` / `text-flagged` | `#F5A623` | `#FBBF24` | Question flagged for review |
| `--color-flagged-surface` | `bg-flagged-surface` | `#FEF3DC` | `#78350F33` | Flagged question tint |

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

Dark mode is applied in two ways — the system follows OS preference by default, and users can override it explicitly.

### How it works

| Scenario | Mechanism |
|---|---|
| OS is dark, no user preference | `@media (prefers-color-scheme: dark)` targets `:root:not([data-theme="light"])` |
| User forces dark | `[data-theme="dark"]` set on `<html>` |
| User forces light (overrides OS dark) | `[data-theme="light"]` set on `<html>`, blocks the media query via `:not` |
| User follows system (default) | `data-theme` attribute removed from `<html>` |

Use the `theme` store from `$lib/stores/theme.svelte.js` to manage this:

```svelte
import { theme } from '$lib/stores/theme.svelte.js';

// Read current value ('light' | 'dark' | 'system')
theme.current

// Set a preference
theme.set('dark');
theme.set('light');
theme.set('system'); // removes data-theme, follows OS
```

Or use the drop-in toggle component:

```svelte
import ThemeToggle from '$lib/components/ThemeToggle.svelte';
<ThemeToggle />
```

Only semantic and state tokens change in dark mode. Primitive tokens are the same in both themes.

---

## How to Use Tokens in Components

All semantic and state tokens are registered in `@theme`, so Tailwind generates utility classes from them — use those directly. No arbitrary CSS variable syntax needed for any token in the design system.

### Semantic tokens

```svelte
<div class="bg-canvas text-fg border border-stroke">
  <div class="bg-surface-card rounded-xl shadow-sm">
    <p class="text-fg-muted text-sm">Muted caption</p>
    <h2 class="text-fg font-bold">Heading</h2>
    <button class="bg-primary hover:bg-primary-hover text-white">Action</button>
  </div>
</div>
```

### State tokens

```svelte
<span class="bg-success-surface text-success">Correct</span>
<span class="bg-danger-surface text-danger">Wrong</span>
<span class="bg-warning-surface text-warning">Flagged</span>
```

### Arbitrary syntax — when to use it

Only needed for tokens **not** in `@theme`: layout and motion tokens (defined in `:root`, not `@theme`).

```svelte
<!-- Layout token — no utility class generated -->
<header class="h-(--header-height)">

<!-- Motion token — no utility class generated -->
<div class="transition duration-(--motion-fast) ease-(--ease-standard)">

---

## Naming Conventions

```
--color-canvas            page background
--color-fg                primary text
--color-fg-muted          secondary/muted text
--color-stroke            borders and dividers
--color-surface-{level}   e.g. --color-surface-card, --color-surface-modal
--color-primary           brand accent
--color-secondary         secondary accent
--color-{state}           e.g. --color-success, --color-danger
--color-{state}-surface   e.g. --color-success-surface (tint background)
--space-{scale}           e.g. --space-4
--radius-{size}           e.g. --radius-md
--shadow-{level}          e.g. --shadow-sm
--motion-{speed}          e.g. --motion-fast
--text-{size}             e.g. --text-base
--font-{family}           e.g. --font-sans
```

**Key principle:** token names describe their *role*, not their value. `--color-fg` means "foreground text" regardless of whether it resolves to near-black or near-white.

---

## Rules

1. **Never use primitive tokens in components.** Only reference semantic, state, layout, or motion tokens.
2. **Never hardcode colours or spacing** in component styles. Always use a token.
3. **Do not modify `primitives.css`** unless adding a new raw value. Meaning lives in `semantic.css`.
4. **Dark mode = semantic overrides only.** Do not add dark mode overrides to layout or motion files.
5. **Do not create a `tailwind.config.js`.** This project is Tailwind v4 — configuration lives in CSS via `@theme`.
6. **Extending the system** — add new primitives to `primitives.css`, then map them in `semantic.css`. Never skip the primitive layer.
