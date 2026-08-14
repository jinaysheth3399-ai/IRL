---
name: IRL (In Real Life)
description: Night Flight - a night departure from Kolhapur in black sky, warm paper boarding passes, and one lime plane
colors:
  night: "#0b0d09"
  night-soft: "#151812"
  night-panel: "#1c2018"
  paper: "#f3efe6"
  paper-dim: "#e8e2d2"
  ink: "#14130e"
  ink-soft: "#6f6a58"
  lime: "#a6d420"
  lime-bright: "#b8e832"
  leaf: "#4a7000"
  cloud: "#cfcaba"
  wa-green: "#0e7d43"
  wa-green-deep: "#0a6635"
  alert: "#b02c15"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.7rem, 7vw, 5.4rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.8rem, 3.8vw, 2.9rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Mukta, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Chivo Mono', monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  fare:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  pill: "999px"
spacing:
  chip: "0.28rem 0.75rem"
  button: "0.95rem 1.5rem"
  card: "1.5rem 1.6rem 1.4rem"
  grid-gap: "1.75rem"
  section: "clamp(3.5rem, 8vw, 6.5rem)"
components:
  button-wa:
    backgroundColor: "{colors.wa-green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "{spacing.button}"
  button-wa-hover:
    backgroundColor: "{colors.wa-green-deep}"
    textColor: "{colors.paper}"
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "{spacing.button}"
  button-primary-hover:
    backgroundColor: "{colors.lime-bright}"
    textColor: "{colors.night}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "{spacing.button}"
  card-note:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  stub:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.85rem 1.2rem 0.85rem 1.9rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "{spacing.chip}"
  stamp:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.night}"
    rounded: "{rounded.xs}"
    padding: "0.3rem 0.7rem"
  input:
    backgroundColor: "#fdfbf4"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.7rem 0.8rem"
---

# Design System: IRL Night Flight

## Overview

**Creative North Star: "The Night Departure"**

The site is a night departure from Kolhapur: a near-black starred sky is the permanent ground, and everything the visitor can hold - trip cards, notes, ticket stubs, forms - is warm grained paper laid on top of it. One chartreuse lime plane (pinned by the IRL logo) carries all accent duty: the dashed flight path that draws itself across the hero, the runway rule under section headings, the announcement bar, primary buttons, link color, selection color. The world refuses the travel-portal arrangement entirely: no price tags, no star-rating jargon, no comparison grids. Density is generous and calm; sections breathe with large fluid padding and paper objects sit slightly rotated and taped, as if a person arranged them on a desk.

Two materials, two voices. On night, type is paper-colored and links are lime. On paper, type is ink and green accents switch to deep leaf green so they stay legible - lime never lands on paper as text. Small metadata everywhere speaks in the ticket voice: uppercase Chivo Mono with wide tracking, IATA-style route codes departing from KLH.

**Key Characteristics:**
- Near-black night ground with faint star specks and a lime radial glow; warm grained paper surfaces float on it
- One lime accent doing all brand accent work; deep leaf green as its on-paper counterpart
- Boarding-pass grammar: punched perforations, dashed rules, corner ticks, route codes, "Now boarding" stamps
- Archivo 900 display, Mukta body, Chivo Mono ticket data
- Hand-placed variance: small rotations and shifting tape positions so repeated cards never look stamped out
- WhatsApp deep green reserved exclusively for WhatsApp actions

## Colors

A logo-pinned three-part palette - night, paper, lime - with olive-gray and leaf-green supports and a separate, quarantined WhatsApp green.

### Primary
- **Chartreuse Lime** (#a6d420): the plane's color and the only brand accent. Flight paths, runway rules, links on night, primary buttons, the announcement bar, "Now boarding" stamps, focus outlines, text selection. Appears on night surfaces only.
- **Bright Lime** (#b8e832): hover state of lime surfaces (primary button hover).
- **Deep Leaf** (#4a7000): the lime's on-paper translator. All green text and green marks on paper surfaces (route codes, stub labels, diary day markers, corner ticks, form focus rings and caret) use leaf, never lime.

### Secondary
- **WhatsApp Green** (#0e7d43) and **WhatsApp Green Deep** (#0a6635, hover): appear only on WhatsApp actions (WhatsApp buttons, the floating pill, form submits that compose a WhatsApp message). Never used decoratively.

### Neutral
- **Night** (#0b0d09): page ground, with faint paper-colored star specks and a lime radial glow painted on the body.
- **Night Soft** (#151812) / **Night Panel** (#1c2018): raised night surfaces (footer, photo frame backing).
- **Warm Paper** (#f3efe6): every held object - cards, stubs, notes, forms - always with the `--grain` texture plus a warm diagonal gradient, never flat.
- **Paper Dim** (#e8e2d2): darker paper support in gradients.
- **Ink** (#14130e): text on paper.
- **Ink Soft** (#6f6a58): olive-gray secondary text on paper (captions, durations, hints, placeholders).
- **Cloud** (#cfcaba): secondary text on night (leads, taglines, footer bottom line).

### Alert
- **Alert** (#b02c15): the only red. Validation messages under form fields, the border of an invalid field, and the "not included" minus glyph. Lives on paper only, where it reads 6.3:1 against the field background; the night palette has no error state because nothing on night can be wrong.

### Named Rules
**The Two Greens Rule.** WhatsApp green appears only on WhatsApp actions, and WhatsApp actions never wear brand lime. A submit that composes a WhatsApp message is deep green and says "on WhatsApp" in its label. The two greens never trade places.

**The Leaf Translation Rule.** Lime lives on night; leaf lives on paper. When a lime-accented element moves onto a paper surface, its green becomes Deep Leaf (#4a7000). Lime text never sits on paper.

**The Grained Paper Rule.** No paper surface ships flat. Every paper background is `background-image: var(--grain), linear-gradient(...)` - the fractal-noise grain plus a warm diagonal light gradient.

## Typography

**Display Font:** Archivo (weights 600/800/900, via next/font, `--font-display`)
**Body Font:** Mukta (weights 400-700, latin, `--font-body`), fallback 'Segoe UI', sans-serif
**Label/Mono Font:** Chivo Mono (400/700, `--font-hand`), fallback monospace

**Character:** Blunt airport-signage headlines against a warm, plainspoken body; the mono third voice is the ticket data itself. Headlines are heavy (900), tight (-0.02em), and balanced (`text-wrap: balance`).

### Hierarchy
- **Display** (900, clamp(2.7rem, 7vw, 5.4rem), 1.04): page h1. The homepage hero scales larger: clamp(3rem, 9vw, 7rem), max-width 12ch, with a `.lime` span accenting one line.
- **Headline** (900, clamp(1.8rem, 3.8vw, 2.9rem), 1.04): section h2, followed by the dashed lime runway rule.
- **Title** (900, clamp(1.15rem, 2.2vw, 1.45rem), -0.01em): card and note h3; on paper it is ink.
- **Body** (400, 1.0625rem, 1.65): Mukta; paragraphs capped at 68ch; leads and captions in Cloud or Ink Soft by surface.
- **Label / Ticket data** (Chivo Mono 700, 0.72-0.85rem, 0.06-0.14em tracking, uppercase): route codes, durations, stub labels, stamps, captions, diary day markers, footer bottom line. The `.hand` utility applies the voice.
- **Fare** (Archivo 900, 1.55rem, -0.02em, tabular-nums): the "from" price numeral, and the only place a display numeral appears outside a heading. Sized to sit above the title step and well under the page h1, so a destination page reads name first and price second. Exactly one per priced page, in the fare stub. Boarding-pass cards carry no fare numeral at all: there the price speaks at the label step so the destination name keeps the card.

### Named Rules
**The Ticket Voice Rule.** Every piece of small uppercase metadata is Chivo Mono with wide tracking - never the body face. Conversely, body copy is never uppercase and never mono.

## Layout

Single centered container: `min(1180px, 100% - 2.5rem)`. Sections stack with fluid rhythm `padding-block: clamp(3.5rem, 8vw, 6.5rem)` (applied to top; last section carries the bottom). Section headings use `.section-head`: h2, optional cloud lead, then the 132px dashed lime runway rule.

Grids: `.grid-cards` 4 columns (trip passes), collapsing to 2 at 980px; `.grid-3` 3 columns to 1 at 980px; `.grid-2` 2 columns to 1 at 640px. Card gaps 1.5-1.75rem. Footer is a 1.4fr/1fr/1fr grid collapsing to one column.

Breakpoints in use: 640px (stacking, floating-pill label hides, announcement grows), 760px (hero flight path goes static, plane rests at 55% of the route), 900px (nav scroll gains a right edge-fade mask), 980px (grid collapse).

**The Hand-Placed Rule.** Repeated paper objects vary like a person laid them out: stubs and notes carry small inline rotations (roughly -1deg to 1.2deg, cycled per index), and tape position/width/tint shifts via `nth-child` so no two adjacent cards match. Boarding passes and photo prints sit straight.

## Elevation & Depth

Depth is material, not tonal: paper floats above night on large soft black shadows; night surfaces themselves stay flat (footer and panels separate by tone and a lime hairline border, not shadow). Buttons carry a colored glow matched to their own surface color. Hover lifts things physically: `translateY(-2px)` on buttons, `-8px` with the lift shadow on linked cards.

### Shadow Vocabulary
- **Card rest** (`--shadow-card`: `0 8px 24px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)`): every paper surface at rest.
- **Card lift** (`--shadow-lift`: `0 18px 44px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.45)`): hover/focus of linked cards.
- **Button glow** (`0 6px 18px` of the button's own color at ~0.2-0.5 alpha, deepening on hover): WA green glow under WA buttons, lime glow under primary.
- **Small chip** (`0 3px 10px rgba(0,0,0,0.4)`): the stamp chip; map-cover patch uses `0 4px 12px rgba(0,0,0,0.35)`.

### Named Rules
**The Paper Floats Rule.** Shadows exist only under paper objects and buttons - things a hand could pick up. Night-on-night separation uses tone and lime hairlines (`rgba(166,212,32,0.35)` borders), never shadow.

## Shapes

Softly rounded, never geometric-sharp and never fully round except pills: paper cards 10px with an inner 6px photo frame, buttons/stubs/inputs 8px, small patches 6px, stamps 4px, tags and the floating WhatsApp pill 999px. Borders come in three grammars: dashed separators on paper (`1px dashed rgba(20,19,14,~0.3)`, echoing perforation), lime hairlines on night chrome, and solid 2px ink-tinted strokes on form fields.

Signature geometry, all drawn in the flight-plan grammar: punched perforation on stubs (a repeating radial-gradient of night-colored holes down the left edge behind a dashed rule), 14px leaf corner ticks on photo frames, the dashed lime runway rule under headings, dashed flight-path SVG strokes (2.5 stroke, `10 12` dash), and semi-transparent paper "tape" strips on notes. Icons are inline SVG in one hand: 1.8 stroke, round caps and joins; the lime plane glyph is the only filled icon.

## Components

### Buttons
- **Shape:** rounded rectangle (8px), bold Mukta (700, ~1rem), 0.95rem x 1.5rem padding, min-height 48px, inline icon gap 0.6rem.
- **WhatsApp** (`.btn-wa`): WhatsApp green on paper-colored text with a deep green glow; hover darkens to wa-green-deep and lifts -2px. Always carries the WhatsApp icon and a label naming WhatsApp.
- **Primary** (`.btn-primary`): lime with night text and lime glow; hover brightens to lime-bright and lifts. Used for non-WhatsApp brand actions ("Start Planning Now").
- **Ghost** (`.btn-ghost`): transparent with a 2px inset paper stroke at 55% alpha; hover solidifies the stroke and lifts.
- **Focus:** global `:focus-visible` - 3px lime outline, 2px offset.

### Chips
- **Tag** (`.tag`): pill outline chip in the ticket voice (Chivo Mono 700, 0.78rem, uppercase, 0.1em). Paper text with translucent paper border on night; ink text with ink border inside a note. Static, non-interactive.
- **Stamp** (`.stamp`): "Now boarding" chip - lime on night text, 4px radius, rotated 2deg, pinned overlapping a card's top-right edge.

### Cards / Containers
- **Photo print** (`.print`): paper mat (10px radius, 9px padding) around a 6px-radius photo frame backed by night-soft, four leaf corner ticks, optional mono uppercase caption in ink-soft. Card-rest shadow.
- **Boarding pass** (TripCard): a print whose `.pass-meta` strip sits below the photo behind a dashed ink rule - route line "KLH [leaf plane] CODE" in leaf mono, duration in ink-soft mono, destination name in Archivo 800 ink. Whole card is a link: hover/focus lifts -8px with `--shadow-lift`; caption/route warms to leaf.
- **Note** (`.note`): grained paper card, 10px radius, 1px ink-tinted border, tape strip overlapping the top edge, small hand-placed rotation. All inner text ink.
- **Stub** (`.stub`): one-line paper strip with the punched left edge, mono leaf label above bold ink text; used for the trust strip and proof rows.

### Inputs / Fields
- **Style:** near-white warm field (#fdfbf4), 2px ink-tinted stroke (45% alpha), 8px radius, min-height 48px; bold ink label above, ink-soft hints and placeholders. Selects are unthemed-free: `appearance: none` with a drawn ink chevron data-URI.
- **Focus:** 3px Deep Leaf outline plus leaf border; caret color is leaf. (Form fields are the one place focus is leaf, because they sit on paper.)
- **Submit:** forms compose a WhatsApp message, so submits are `.btn-wa` and say "on WhatsApp".

### Navigation
- Night header with a lime hairline bottom border. Brand: Archivo 900 "IRL" + lime plane glyph + mono uppercase tagline in cloud. Nav row is horizontally scrollable (scrollbar hidden), links Mukta 600 in paper; hover gets a 14%-alpha lime wash; current page turns lime with an inset 2px lime underline. Under 900px the row fades out at its right edge via mask-image.
- Above the header, the lime announcement bar swap-animates two messages on a 16s cycle (static single message under reduced motion).
- Floating WhatsApp pill: fixed bottom-right, WA green, pill radius, label collapses to icon-only under 640px; an IntersectionObserver hides it while the header's own WhatsApp button is on screen.

### Flight Path (signature)
The hero's authored moment: a full-bleed SVG dashed lime route (stroke 2.5, dasharray 10 12) draws itself over 2.4s (`cubic-bezier(0.3, 0, 0.2, 1)`) while the lime plane rides the same path via `offset-path`/`offset-rotate: auto`. Under 760px and under `prefers-reduced-motion` the route renders static with the plane resting mid-route (55%); browsers without `offset-path` hide the plane and keep the route. The same dashed-lime grammar reappears at small scale as the runway rule under every section heading.

## Do's and Don'ts

### Do:
- **Do** keep every paper surface grained and warm: `var(--grain)` plus a warm linear gradient over #f3efe6, with `--shadow-card` beneath.
- **Do** translate green to Deep Leaf (#4a7000) whenever it lands on paper (The Leaf Translation Rule).
- **Do** set all small uppercase metadata in Chivo Mono 700 with 0.06-0.14em tracking (The Ticket Voice Rule), and route codes as "KLH → CODE".
- **Do** keep tap targets at 48px minimum (buttons, fields) and hover-lift interactive paper (-2px buttons, -8px linked cards).
- **Do** draw icons inline as SVG in the house hand: 1.8 stroke, round caps/joins; the lime plane is the only filled glyph.
- **Do** provide the static fallback whenever motion is authored: reduced-motion disables the flight animation, announcement swap, and transitions.

### Don't:
- **Don't** show a price anywhere - no amounts, no "starting from", no currency symbols. Price lives in the WhatsApp conversation (binding product commitment).
- **Don't** put brand lime on a WhatsApp action or WhatsApp green on anything that is not a WhatsApp action (The Two Greens Rule).
- **Don't** set lime text on paper surfaces, or shadow a night-on-night panel (The Paper Floats Rule); night chrome separates with lime hairlines.
- **Don't** use em dashes anywhere in copy or UI text (binding voice commitment).
- **Don't** rotate boarding passes or photo prints; hand-placed rotation belongs only to notes, stubs, and tape.
- **Don't** introduce new album-era token names; the `--marigold`/`--kumkum`/`--velvet` aliases in `:root` are a legacy shim, not vocabulary for new work - write `--lime`/`--leaf`/`--night` directly.
