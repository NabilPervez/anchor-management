# Anchor Management: Codebase & Functional Documentation

## 1. Introduction to Anchor Management

**Anchor Management** is a holistic productivity Progressive Web App (PWA) designed to help users reclaim their day through "Circadian Habit Stacking." It transforms the daily grind into a gamified "Wellness Journey."

### How it Works

The app centers around the concept of **"Temporal Anchoring"**—attaching habits to 5 natural energy shifts during the day.

1. **Circadian Anchors**: The 5 fixed points of the day act as the user's pillars: **The Rise** (Wake), **The Deep Work** (Mid-morning), **The Reset** (Lunch), **The Recharge** (Afternoon slump), and **The Unwind** (Evening).
2. **Habit Check-ins**: When an Anchor time arrives, users are prompted to check off positive micro-habits (e.g., "Drink Water", "Stretch", "Read 5 Pages").
3. **The Gratitude Pause**: Every check-in concludes with a mandatory 30-second guided gratitude timer to center the mind before returning to work/life.
4. **Gamification**: Every action earns "Flow Points" (FP). Users level up and build "RPG Traits" (Vitality, Focus, Serenity, Grit) based on the habits they complete.

### User Journey

1. **Onboarding**: The user sets their typical wake/sleep times to generate their custom Schedule Anchors.
2. **Daily Routine**:
* The user opens the app to see their daily timeline.
* When an Anchor arrives (e.g., "The Reset" at 1:00 PM), they click the Anchor card.
* A "Check-In" flow appears: "Did you hit this anchor?" and "Did you do [Active Habit]?"
* **The Pause**: The UI transitions to a soothing 30-second timer prompting the user to reflect on one thing they are grateful for.
* Upon completion, the user earns points and visual feedback.


3. **Growth**: The user visits the "Insights" tab to view charts of their consistency and trait balance.
4. **Headspace**: The user visits the "Headspace" tab for weekly stoic wisdom, breathing exercises, and mindfulness resources.

---

## 2. Overall Codebase Explanation

The project is built using a modern **React** stack with **Vite** as the build tool. It is designed as a **Progressive Web App (PWA)**, allowing for native-like installation and offline capability.

### Core Technologies

* **React (TypeScript)**: UI Library for building components.
* **Vite**: Fast build tool and development server.
* **Tailwind CSS**: Utility-first CSS framework (configured with a Neumorphic/Soft UI theme).
* **Framer Motion**: Library for smooth UI animations, specifically for the breathing/gratitude timer.
* **Recharts**: Library for rendering data visualization charts.
* **Lucide React**: Icon library.
* **LocalStorage**: Used for data persistence (offline-first approach).

### Application Structure

* **`src/App.tsx`**: The main entry point handling Routing (via `react-router-dom`) and core layout.
* **`src/pages/`**: Contains the main view components (Home, Routine, Insights, etc.).
* **`src/components/`**: Reusable UI elements (Cards, Modals, Timer).
* **`src/hooks/`**: Custom logic hooks (e.g., `useCircadianRhythm` for calculating anchor times, `useLocalStorage`).
* **`src/services/`**: Logic classes (e.g., `GamificationService`) that handle point calculations and leveling.
* **`src/data/`**: Static configuration files (e.g., default habit loadouts, RPG trait definitions).

---

## 3. Page-by-Page Analysis

### A. Home Page (`src/pages/Home.tsx`)

**Summary**
The central dashboard. It displays the current "Phase" of the day, user's Level, and the timeline of the 5 Daily Anchors. This is the primary interface for execution.

**Section-by-Section Description**

1. **Header**: Shows the current Date and a motivational greeting based on the time of day.
2. **Stats Card**: A summary element showing Total Flow Points, Current Streak, and Anchors secured today.
3. **Next Anchor Banner**: Highlights the immediate next checkpoint (e.g., "The Recharge is in 45 mins").
4. **Rhythm Timeline**: A vertical list of `AnchorCard` components.
* *Logic*: Past anchors are dimmed. Future anchors are locked. The current anchor is active/highlighted.


5. **Check-In Flow (Modal)**: The interactive overlay for logging habits and performing the gratitude meditation.

**Pseudocode Logic**

```javascript
Initialize:
  Calculate Anchor times (based on user Wake Time settings)
  Load user stats (Flow Points, Streaks)
  Load saved habits and anchor status

On Mount:
  Check daily login streak
  Sort Anchors by time

Render:
  Show Greeting/Date
  Show Stats Card
  Show Next Anchor Banner
  
  Loop through Sorted Anchors:
    Show AnchorCard:
       If time window is open AND not completed: Show "Secure Anchor" button
       If completed: Show "Secured" state
  
  Event: User clicks "Secure Anchor"
    Open CheckInFlow Modal
    Step 1: Habit Checklist ("Did you drink water?", "Did you stretch?")
    Step 2: User clicks "Next"
    
    Step 3: Gratitude Meditation (The Pause)
       Render <GratitudeTimer duration={30} />
       Display text: "Take a deep breath. Identify one win from today."
       Show progress ring animation
       
       On Timer Complete:
          Show "Finish" button
          
    On "Finish" click:
       Call GamificationService.logAnchor(Anchor X)
       Call GamificationService.logHabit(Selected Habits)
       Update Local State
       Check for new Badges -> Show BadgeModal
       Close Modal

```

---

### B. Routine Page (`src/pages/Routine.tsx`)

**Summary**
A management screen where users define their "System." They can select from archetype presets or create custom habits.

**Section-by-Section Description**

1. **Archetype Scroller**: A selector for "Loadouts" (e.g., "The Executive," "The Athlete," "The Creative"). Selecting one auto-populates habits.
2. **Active Routine**: A list showing habits currently assigned to specific Anchors.
3. **Filters**: Dropdowns to filter by Anchor (e.g., habits only for "The Rise") or Trait (Vitality, Focus).
4. **Habit Library**: The main list of toggleable habit cards.
5. **Custom Habit Builder**: A UI to create new habits and assign them XP values.

**Pseudocode Logic**

```javascript
Initialize:
  Load 'userHabits' from LocalStorage
  Load 'archetypes' (static data)

Render:
  Show "Archetype" selector
  
  Event: Archetype Selected
    Overwrite current habits with Archetype defaults
    Save to LocalStorage

  Show Filter Controls (Anchor Time, Trait)
  
  Filter 'activities':
    Match Habit with selected Filter
  
  Loop through Filtered Habits:
    Render HabitCard (Name, Associated Anchor, XP Value)
    
  Event: Toggle Switch Clicked
    Update Habit.isActive
    Save to LocalStorage

```

---

### C. Insights Page (`src/pages/Insights.tsx`)

**Summary**
The analytics hub. It visualizes the user's bio-rhythm consistency and personal growth metrics.

**Section-by-Section Description**

1. **Daily Metrics**: Cards showing Today's Flow Points and Daily Completion %.
2. **Weekly Report**: Cards showing Week-over-Week growth and "Best Time of Day" (which Anchor is most consistent).
3. **Lifetime Stats**: Total "Perfect Days" (all 5 anchors hit).
4. **Momentum Chart**: A line graph comparing This Week's performance vs Last Week.
5. **Anchor Consistency**: A heatmap showing reliability for each specific time (e.g., "You always hit 'The Rise' but miss 'The Recharge'").
6. **Trait Radar**: A Radar/Spider Chart showing the balance of RPG traits (Vitality vs. Serenity vs. Focus).

**Pseudocode Logic**

```javascript
Initialize:
  Fetch All Logs from GamificationService

Calculation Phase:
  Map logs -> Chart Data Array
  Calculate Consistency % per Anchor (The Rise, Deep Work, Reset, Recharge, Unwind)
  Calculate Trait distribution

Render:
  Render Metric Cards
  
  Render Recharts.LineChart (Momentum):
    Data: Weekly comparison
    
  Render Anchor Consistency Row:
    Loop ['Rise'...'Unwind']:
      Calc color intensity based on completion %
      Render Bar/Heatmap block
  
  Render Trait RadarChart:
    Data: Trait Totals (Focus, Vitality, Grit, Serenity)

```

---

### D. Headspace Page (`src/pages/Headspace.tsx`)

**Summary**
A curated feed of mental models, philosophy, and mindfulness tools. This replaces the religious community aspect with secular self-improvement content.

**Section-by-Section Description**

1. **Monthly Theme**: A text card with a psychological concept (e.g., "Locus of Control," "Amor Fati").
2. **Daily Wisdom**: A card highlighting a quote (Stoicism, Zen, Modern Psychology).
3. **Breathwork Tool**: A simple widget that guides a 4-7-8 breathing exercise when clicked.
4. **Deep Dives**: Links to curated articles or videos on productivity and mental health.
5. **Community Challenge**: A shared goal (e.g., "The No-Phone Morning Challenge").

**Pseudocode Logic**

```javascript
Initialize:
  Calculate indexes based on Date

Content Selection:
  Theme = static_themes[MonthIndex]
  Quote = static_quotes[DayOfYear % total]
  Challenge = static_challenges[WeekNumber % total]

Render:
  Render Header
  
  Render Theme Card
  
  Render Daily Wisdom Card:
    Show Quote
    Show Author/Philosopher
  
  Render Breathwork Widget:
    On Click: Expand and start 4-7-8 visualizer
  
  Render Challenge Card:
    Show challenge description
    Show "Accept Challenge" button

```
