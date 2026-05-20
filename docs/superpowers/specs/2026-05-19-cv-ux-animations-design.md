# CV UX Overhaul — Kinetic Narrative Animations

## Overview

Transform the personal CV from a static dark-themed page into an immersive, scroll-driven narrative experience. The page tells a story as you scroll — the hero introduces you with a typewriter effect, the timeline draws itself revealing an interleaved career/education history, and the contact section closes with a radar pulse finale.

## Tech Additions

- **GSAP 3 + ScrollTrigger plugin** — scroll-linked animation timelines, pinning, scrub
- **SplitType** (or manual char-split) — character-level text animation for typewriter

## Architecture

### Page Flow

Three pinned "scenes" followed by a natural-scroll finale:

1. **Hero** — pinned ~3 viewport heights while intro animation plays
2. **Timeline** — brief pin for header reveal, then free-scroll with scroll-triggered entries
3. **Contact** — pinned ~1.5 viewport heights for signal transmission finale

### Data Model

Replace the separate `experiencesData` and `educationData` arrays with a unified timeline:

```typescript
interface TimelineEntry {
  id: string;
  type: 'work' | 'education' | 'extracurricular';
  title: string;
  subtitle: string; // company/institution
  period: string; // display string
  startDate: string; // ISO for sorting (YYYY-MM)
  endDate?: string; // ISO or omit for "present"
  description: string;
  technologies?: string[];
  expandedContent?: {
    description?: string;
    courses?: { name: string; grade: number; ects: number }[];
    technologies?: string[];
  };
  isYearMarker?: false; // regular entry
}

interface YearMarker {
  id: string;
  isYearMarker: true;
  year: number;
}

type TimelineItem = TimelineEntry | YearMarker;
```

### Timeline Data (Chronological, Newest First)

**2026:**
- (work) System Architect & TPO — Mercedes-Benz — Mar 2026–Present
- (education) Master Executive Engineering — DHBW CAS — Oct 2026 (upcoming)

**2025:**
- (work) System Architect — Mercedes-Benz — Oct 2025–Feb 2026
- (extracurricular) Alumni Supervisor — DHBW Engineering e.V. — Sep 2025–Present
- (education) Bachelor's Thesis (1.3) — PCIe driver dev for zonal architecture — Jun–Sep 2025
- (education) Uni Semester 5 — Mar–May 2025

**2024:**
- (work) Nvidia Jetson — automated flashing of Orin modules — Dec 2024–Feb 2025
- (education) Uni Semester 4 — Sep–Nov 2024
- (extracurricular) Lead CFD Engineer — DHBW Engineering e.V. — Sep 2024–Sep 2025
- (work) Grafana dashboard, Scrum efficiency for TargetLink/Ambient Lighting — Jun–Aug 2024
- (education) Uni Semester 3 — Mar–May 2024
- (extracurricular) Vehicle Dynamics Software Engineer — DHBW Engineering e.V. — Feb–Sep 2024
- (work) eDrive test bench — CAN translation unit (ESP32/RasPi), monitoring dashboard (RD/EPT) — Dec 2023–Feb 2024

**2023:**
- (education) Uni Semester 2 — Sep–Nov 2023
- (work) Group project (training, no department) — Aug 2023
- (work) Training — Mar–Jul 2023

**2022:**
- (education) Uni Semester 1 — Dec 2022–Feb 2023
- (work) Onboarding — Oct–Nov 2022

**Education course data** (expandable within semester entries):

Semesters 1–2:
- Mathematics I (2.9, 8 ECTS), Theoretical CS I (2.8, 5), Theoretical CS II (2.9, 5), Programming (2.8, 9), Key Skills (1.3, 5), Computer Engineering I (2.9, 5), Mathematics II (4.0, 6), Theoretical CS III (2.9, 6), Software Engineering I (1.3, 9), Database Systems (1.7, 6), Computer Engineering II (3.6, 8), Communication & Networks (2.9, 5)

Semesters 3–4:
- Software Engineering II (1.6, 5), IT-Security (1.3, 5), Student Research Project (1.1, 10), Electronics (3.9, 5), Graphical Coding (1.0, 5), Engineering Physics (2.6, 5)

Semesters 5–6:
- Driver Assistance & Safety Systems (1.8, 5), Control Engineering (1.6, 5), Measurement Data Logging (2.1, 5), ECU Layout & Coding (3.4, 5), Computer Engineering III (3.1, 5), Elective CS I (2.8, 5), Elective CS II (1.0, 5), Automotive Engineering (1.9, 3)

## Scene Specifications

### Scene 1: Hero (Pinned)

**Pin duration:** ~3 viewport heights of scroll travel

**Animation sequence (scroll-scrubbed):**
1. (0%–15%) Blinking cursor appears center-left
2. (15%–45%) Name types out character by character — "Philipp" then line break, "Gehrig" in dimmer color
3. (45%–55%) Title pill fades in with glitch/flicker (2–3 rapid opacity toggles)
4. (55%–70%) Bio text slides up word-by-word with slight stagger
5. (70%–82%) Social links pop in with spring bounce (stagger: 100ms)
6. (82%–100%) Profile photo scales from 0.8→1 with blur(8px)→blur(0) transition

**On unpin:** Subtle parallax — hero content moves up slightly faster than scroll, creating depth as timeline section enters.

### Scene 2: Timeline (Scroll-Triggered)

**Section header:** Brief pin (~0.5 viewport), eyebrow line draws left-to-right, title fades up.

**Filter bar:**
- Three pill buttons: Work (indigo dot), Education (teal dot), Extracurricular (amber dot)
- All active by default
- Click toggles visibility — hidden entries animate out with height→0 + opacity→0 (stagger: 50ms)
- Remaining entries close gaps with FLIP animation (smooth reflow)
- Active state: colored border + background tint

**Timeline line:**
- SVG `<path>` element, drawn using `stroke-dashoffset` animated by ScrollTrigger
- Color transitions: indigo where work entries are, teal at education, amber at extracurricular
- Nodes (circles) at each entry — glow in category color, pulse briefly when entry reveals

**Entry animations (per card, triggered on viewport enter):**
- Card slides in from left: x:-30px→0, opacity:0→1 (duration: 0.5s)
- Tags stagger in: y:8px→0, opacity:0→1 (stagger: 30ms, delay: 0.2s after card)
- Year markers: number counts up/fades in with slight scale

**Expand/collapse:**
- Click card → accordion open with spring easing (GSAP `back.out`)
- Courses grid: items stagger in from bottom (30ms stagger)
- Close: reverse with faster timing

**Hover:**
- Card: translateX(4px), border brightens, subtle glow shadow
- Timeline node: scale(1.3) with glow pulse

### Scene 3: Contact — Signal Transmission (Pinned)

**Pin duration:** ~1.5 viewport heights

**Animation sequence:**
1. (0%–20%) Section header animates in (same pattern as timeline header)
2. (20%–40%) Central point appears, first radar ring emanates outward (SVG circle scaling + fading)
3. (40%–90%) Contact links appear one by one (stagger: each gets its own radar ring)
   - Email: ring pulses → link fades in from blur
   - LinkedIn: ring pulses → link fades in
   - GitHub: ring pulses → link fades in
4. (90%–100%) All rings settle into a subtle ambient pulse loop

**Hover interaction (post-animation):**
- Hovering a contact link triggers a new sonar ping ripple from that link
- Subtle scale(1.02) on the card

**On unpin:** Footer scrolls up naturally.

## Component Structure

```
components/
  cv/
    HeroScene.vue          — pinned hero with typewriter
    TimelineScene.vue      — filter bar + timeline container
    TimelineEntry.vue      — individual card (handles expand/collapse)
    TimelineYearMarker.vue — year divider
    ContactScene.vue       — signal transmission finale
composables/
  useTimeline.ts           — provides sorted, filterable timeline data
  useScrollAnimations.ts   — GSAP ScrollTrigger setup helpers
  data/
    timelineData.ts        — unified chronological data
    types.ts               — updated with TimelineEntry types
```

## Performance Considerations

- Use `will-change: transform, opacity` on animated elements
- GSAP's `ScrollTrigger.batch()` for entry reveals (avoids per-element trigger overhead)
- Lazy-render expanded content (v-if, not v-show) to reduce DOM size
- SVG timeline path: single element, animated via dashoffset (GPU-composited)
- Pin sections using GSAP's native pinning (handles scroll height adjustment)

## Mobile Adaptations

- Hero: same sequence, but photo goes above name on mobile (stacked layout)
- Timeline: single column, cards full-width, nodes on left edge
- Contact: radar rings scale down, links stack vertically
- Pin durations reduced by ~30% on mobile (less scroll travel needed)
- Disable parallax effects on mobile for performance

## Browser Support

- GSAP ScrollTrigger supports all modern browsers
- Fallback: if user has `prefers-reduced-motion`, skip pins and show static layout with simple fade-in reveals
