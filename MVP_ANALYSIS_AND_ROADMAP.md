# Anchor Management: MVP Analysis & Roadmap

## 1. Executive Summary
The current iteration of Anchor Management successfully establishes the **core loop** (Time -> Anchor -> Check-in -> XP). However, it lacks the "connective tissue" that makes it a personalized tool. The primary gap is between **Configuration** (Routine/Settings) and **Execution** (Check-in). Users cannot currently customize their experience or habits, which is critical for an MVP.

---

## 2. Page-by-Page Analysis

### A. Home Page (`/`)
*   **Status**: 🟢 **Functional**
*   **Value Adds**:
    *   **Circadian Timeline**: The dynamic calculation of anchor times based on `useCircadianRhythm` is the strongest feature. It works well and provides immediate structure.
    *   **Stats Overview**: Provides necessary feedback on progress.
*   **Issues / Gaps**:
    *   **Rigid Schedule**: The `wakeTime` is hardcoded or requires manual `localStorage` editing. There is no UI to change when the user wakes up, which breaks the app for anyone who doesn't wake up at 6:30 AM.
    *   **Static Greeting**: "The Reset is in 45 mins" logic is hardcoded in the UI component rather than calculated dynamically from the hook.

### B. Check-In Page (`/checkin`)
*   **Status**: 🟡 **Partial**
*   **Value Adds**:
    *   **Gratitude Timer**: The 30s timer adds a unique mindfulness element that separates this from generic habit trackers.
    *   **Gamification**: Successfully awards XP and logs completion.
*   **Issues / Gaps**:
    *   **Fake Habits**: The habits listed (`Drink Water`, etc.) are hardcoded in the component (`availableHabits`). It ignores the user's selected "Archetype" or any custom habits they might want to track.
    *   **Context Unaware**: It doesn't know *which* anchor triggered it (other than for ID logging). It shows "Morning Sunlight" even if checking in for "The Unwind" at 8 PM.

### C. Routine Page (`/routine`)
*   **Status**: 🔴 **Mockup Only**
*   **Value Adds**:
    *   **Archetype UI**: The visual selection of "The Executive" vs "The Monk" is compelling.
*   **Issues / Gaps**:
    *   **Disconnected Logic**: Saving an archetype saves an index to storage, but this data is never read by the rest of the app to change the active habits.
    *   **No Customization**: The "Add Habit" button and individual habit toggles are purely visual. Users cannot actually build their own routine.

### D. Insights Page (`/insights`)
*   **Status**: 🟡 **Partial**
*   **Value Adds**:
    *   **Real Stats**: Tracks actual Level and XP.
*   **Issues / Gaps**:
    *   **Missing Charts**: The "Trait Radar" is a static SVG image. It does not reflect the actual balance of traits (Vitality vs Focus).
    *   **No History**: There is no visualization of the past week's performance (Calendar heatmap or Bar chart).

### E. Headspace Page (`/headspace`)
*   **Status**: 🟢 **Static Content**
*   **Value Adds**:
    *   Provides specialized content.
*   **Issues / Gaps**:
    *   Content is static. For an MVP, this is acceptable, but eventually needs rotation logic based on date.

---

## 3. Top 5 Steps for Usable MVP

To transform this from a "Functional Prototype" to a "Usable Product", we must close the loop on user customization.

### Step 1: Implement "Settings" & Onboarding
**Why:** Users cannot use the app if the schedule doesn't match their life.
*   **Action**: Create a Settings modal or view.
*   **Features**: Allow users to set **Wake Time** (which recalculates all anchors) and **Name**.
*   **Tech**: Update `StorageService` to handle `settings.userProfile`.

### Step 2: Connect Routine-to-CheckIn Pipeline
**Why:** The core promise is "Habit Stacking", but habits are currently fake.
*   **Action**: Refactor `storage` to save a list of `ActiveHabits`.
*   **Features**: When a user selects an Archetype in `/routine`, it should populate `ActiveHabits` with a preset list.
*   **Integration**: Update `/checkin` to read from `ActiveHabits` instead of a hardcoded array. Ensure habits are filtered by relevant Anchor (e.g., don't show "Morning Sun" for "Evening Unwind").

### Step 3: Enable Custom Habits
**Why:** Archetypes are a good start, but users need flexibility.
*   **Action**: Make the "Add Habit" button in `/routine` functional.
*   **Features**: Simple form: Name, Associated Anchor, and Trait (e.g., "Read Book" -> "The Unwind" -> "Wisdom").

### Step 4: Visualize Data (Charts)
**Why:** Users need to see *patterns* to stay motivated, not just raw numbers.
*   **Action**: Implement `recharts`.
*   **Features**: 
    1.  **Radar Chart**: Dynamic visualization of the user's 4 RPG traits.
    2.  **Weekly Bar Chart**: Show XP earned over the last 7 days.

### Step 5: Polish & Persistence
**Why:** It needs to feel like a reliable app.
*   **Action**: Fix UI "jank" and ensuring offline reliability.
*   **Features**:
    *   Add "Toast" notifications for saving/errors.
    *   Ensure `manifest.json` is configured so "Add to Home Screen" works with a proper icon and name.
    *   Add a "Reset Data" button for testing.
