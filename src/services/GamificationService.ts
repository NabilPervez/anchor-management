import { StorageService } from './StorageService';
import type { TraitType, LogEntry } from '../types';

export const GamificationService = {
    calculateLevel: (xp: number) => {
        // Simple logic: Level = sqrt(XP / 100). Adjust curve as needed.
        // e.g., 100xp = lvl 1, 400xp = lvl 2, 900xp = lvl 3
        return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1);
    },

    awardXP: (amount: number, traits: TraitType[]) => {
        const stats = StorageService.getStats();

        // Global XP
        stats.totalXP += amount;
        const oldLevel = stats.level;
        stats.level = GamificationService.calculateLevel(stats.totalXP);

        if (stats.level > oldLevel) {
            // Trigger Level Up Event (could be a callback or just state change)
            console.log("Level Up!", stats.level);
        }

        // Trait XP
        const traitXpShare = Math.floor(amount / traits.length);
        traits.forEach(t => {
            if (stats.traits[t]) {
                stats.traits[t].xp += traitXpShare;
                stats.traits[t].level = GamificationService.calculateLevel(stats.traits[t].xp);
            }
        });

        StorageService.saveStats(stats);
        return stats;
    },

    logAnchorCompletion: (anchorId: string, habitsCompleted: string[], totalXP: number, traitsTargeted: TraitType[]) => {
        const today = new Date().toISOString().split('T')[0];

        // Save Log
        const entry: LogEntry = {
            id: crypto.randomUUID(),
            date: today,
            anchorId,
            habitsCompleted,
            xpEarned: totalXP
        };
        StorageService.addLog(entry);

        // Update Daily State
        let dailyState = StorageService.getDailyState();
        if (!dailyState || dailyState.date !== today) {
            dailyState = { date: today, anchors: {} };
        }
        dailyState.anchors[anchorId] = true;
        StorageService.saveDailyState(today, dailyState.anchors);

        // Award XP
        return GamificationService.awardXP(totalXP, traitsTargeted);
    },

    checkStreak: () => {
        const stats = StorageService.getStats();
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = stats.lastLoginDate;

        if (lastLogin !== today) {
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            if (lastLogin === yesterday) {
                stats.streak += 1;
            } else {
                // Missed a day (unless it's the very first login, but lastLogin init to today handles that)
                if (new Date(today).getTime() - new Date(lastLogin).getTime() > 86400000 * 1.5) {
                    stats.streak = 1; // Reset
                } else {
                    // Logic to keep streak if within reasonable time or just increment?
                    // Simple version: if not yesterday, reset.
                    stats.streak = 1;
                }
            }
            stats.lastLoginDate = today;
            StorageService.saveStats(stats);
        }
        return stats.streak;
    },

    getHistory: () => {
        return StorageService.getLogs();
    },

    getUserStats: () => {
        return StorageService.getStats();
    }
};
