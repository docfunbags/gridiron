# Gridiron Brewing — Design Document

This document outlines the core brand assets, typography hierarchy, and design system components for Gridiron Brewing. It serves as the single source of truth for the project's visual identity, ensuring consistency across all Astro components and CSS stylesheets.

## 1. Brand Identity & Theme

*   **Vibe:** A warm taproom on a rainy Maritime day. Unpretentious, cozy, and rooted in the Kennebecasis River valley.
*   **Key Mandate:** No football themes. The "Gridiron" name refers to an industrial or geographical feature, not the sport.
*   **Aesthetic Tone:** Heritage, physical texture (paper grain), high contrast, and tactile.

## 2. Color Palette

The color system relies on high-contrast pairings, primarily mixing warm "paper" tones with deep "inks" and "ambers".

### Primary UI Colors
| Name | CSS Variable | Hex | Role |
| :--- | :--- | :--- | :--- |
| **Paper** | `--paper` | `#f1e6d0` | Primary background color (warm off-white). |
| **Cream** | `--cream` | `#faf3e4` | Secondary background, used for cards and high-contrast text on dark bands. |
| **Ink** | `--ink` | `#211711` | Primary text color and dark background band color. |
| **Amber** | `--amber` | `#c17a2b` | Primary accent color, used for buttons, links, and kickers. |

### Extended UI Colors
| Name | CSS Variable | Hex | Role |
| :--- | :--- | :--- | :--- |
| **Paper 2** | `--paper-2` | `#e7d8ba` | Alternate light background for banding. |
| **Ink 2** | `--ink-2` | `#3a2b1e` | Secondary text color on light backgrounds. |
| **Ink 3** | `--ink-3` | `#5a4733` | Tertiary text color, borders, and subtle UI elements. |
| **Ink Deep** | `--ink-deep` | `#1c130c` | Deepest dark shade, used for maximum contrast display text. |
| **Amber Bright** | `--amber-bright` | `#e0962f` | Hover states and high-visibility accents on dark backgrounds. |
| **Amber Deep** | `--amber-deep` | `#5a2c14` | Deep contrast accents within Amber sections. |
| **Rust** | `--rust` | `#8b3a2b` | Alert color, seasonal tags, and specific callouts. |
| **Red** | `--red` | `#d83a29` | High-visibility alert or special accent. |

### Transparent/Muted Variants
*   `--line`: `rgba(33, 23, 17, 0.16)` - Universal border and divider line color.
*   `--cream-dim`: `rgba(250, 243, 228, 0.74)` - Dimmed text on dark backgrounds.
*   `--cream-muted`: `rgba(250, 243, 228, 0.82)`
*   `--cream-faint`: `rgba(250, 243, 228, 0.50)`
*   `--cream-hover`: `rgba(250, 243, 228, 0.10)` - Subtle hover state on dark backgrounds.

### Specialized UI Tokens
*   `--tag-guest-bg`: `#2a5c8a` / `--tag-guest-fg`: `#d4eaf7` - Guest tap indicator.
*   `--tag-ontap-bg`: `#2a6e3f` / `--tag-ontap-fg`: `#d4f0df` - Active tap indicator.

---

## 3. Typography

The typographic hierarchy uses three distinct Google Fonts (self-hosted) to create an industrial, hand-lettered feel.

### Font Families
1.  **Anton:** Used exclusively for large, punchy display headings. (Weight: 400).
2.  **Archivo:** The primary workhorse for body copy and standard UI headings. (Weights: 400, 500, 600, 700, 800).
3.  **DM Mono:** Used for technical "kickers," metadata, tags, and small labels. (Weights: 400, 500).

### Hierarchy & Usage

| Element | CSS Class / Tag | Font Family | Size | Weight | Transformation | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | `.hero h1` | Anton | Fluid (`clamp`) | 400 | Uppercase | Unified with `.page-hero`. Line-height: .92. |
| **Section Heading** | `.section-head h2` | Anton | Fluid (`clamp`) | 400 | Uppercase | Line-height: .92. |
| **Display (Generic)**| `.display` | Anton | Varies | 400 | Uppercase | Line-height: .92. |
| **Card Heading (H3)**| `h3` (Cards) | Anton | 26px | 400 | Uppercase | Used on Beer and Food cards. |
| **Subheading (H4)** | `h4` | Archivo | 22px | 700 | Normal | Used in event lists and standard content blocks. |
| **Kicker / Eyebrow** | `.kicker` | DM Mono | 12px | 400/500 | Uppercase | High letter-spacing (`.24em`). |
| **Small Label** | `.label` | DM Mono | 11px | 400/500 | Uppercase | Replaces semantic H4/H3 on tiny UI elements. |
| **Body Text** | `body`, `p` | Archivo | 16px (Base) | 400 | Normal | Line-height: 1.55. |
| **Lead Paragraph** | `.lead` | Archivo | 17px/18px | 400 | Normal | Used beneath Section Headings. |

---

## 4. Components & Interactive Elements

### Buttons
Buttons are strictly styled using the `.btn` base class combined with modifier classes.

**Base Properties (`.btn`):**
*   Font: DM Mono, 12px, Weight 700, Uppercase, Tracking `.12em`.
*   Padding: 14px 22px (Small variant `.btn-sm`: 10px 16px).
*   Border Radius: `6px`.
*   Hover State: Lifts by `translateY(-3px)` and casts a shadow (`0 8px 24px -8px rgba(33,23,17,.3)`).

**Variants:**
*   `.btn-amber`: Solid Amber background, Deep Ink text.
*   `.btn-ink`: Solid Ink background, Cream text.
*   `.btn-ink-deep`: Solid Deep Ink background, Cream text.
*   `.btn-ghost`: Transparent background, currentColor border. Hovers to Ink background.
*   `.btn-ghost-cream`: Transparent background, faint Cream border, Cream text. Hovers to subtle transparent Cream background.

### Cards & Elevation
*   **Base Card:** Uses `.card` or specific component classes (e.g., `.beer-card`).
*   **Resting State:** Subtle shadow `0 4px 20px -4px rgba(33,23,17,.18)`.
*   **Hover State (Interactive Cards):** Lifts by `translateY(-5px)` and deepens shadow to `0 28px 52px -18px rgba(33,23,17,.45)`.

### Texture
*   **Grain (`.grain`):** A global SVG noise filter applied via a pseudo-element. It uses `mix-blend-mode: multiply` on light backgrounds and `screen` (at lower opacity) on dark hero sections to create a tactile, paper-like feel.

---
*Generated by Gemini CLI — June 2026*