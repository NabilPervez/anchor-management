export type TraitType = 'Vitality' | 'Focus' | 'Serenity' | 'Grit';

export interface Trait {
    name: TraitType;
    xp: number;
    level: number;
}

export interface UserStats {
    level: number;
    totalXP: number;
    streak: number;
    lastLoginDate: string;
    traits: Record<TraitType, Trait>;
    anchorsTemplated: number; // For "Anchors secured today" logic, we might calculate this dynamically
}

export interface Habit {
    id: string;
    name: string;
    trait: TraitType;
    xpValue: number;
    completed: boolean;
}

export interface Anchor {
    id: string; // 'rise', 'deep_work', etc.
    name: string;
    time: string; // "06:30"
    isSecured: boolean;
    status: 'locked' | 'active' | 'secured' | 'missed';
    habits: Habit[];
}

export interface LogEntry {
    id: string;
    date: string; // ISO String
    anchorId: string;
    habitsCompleted: string[];
    xpEarned: number;
}
