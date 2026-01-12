import type { UserStats, LogEntry } from '../types';

const STORAGE_KEYS = {
    STATS: 'anchor_user_stats',
    LOGS: 'anchor_user_logs',
    SETTINGS: 'anchor_user_settings',
    DAILY_STATE: 'anchor_daily_state', // For saving today's anchor progress
};

const DEFAULT_STATS: UserStats = {
    level: 1,
    totalXP: 0,
    streak: 0,
    lastLoginDate: new Date().toISOString().split('T')[0],
    traits: {
        Vitality: { name: 'Vitality', xp: 0, level: 1 },
        Focus: { name: 'Focus', xp: 0, level: 1 },
        Serenity: { name: 'Serenity', xp: 0, level: 1 },
        Grit: { name: 'Grit', xp: 0, level: 1 },
    },
    anchorsTemplated: 0,
};

export const StorageService = {
    getStats: (): UserStats => {
        const stored = localStorage.getItem(STORAGE_KEYS.STATS);
        return stored ? JSON.parse(stored) : DEFAULT_STATS;
    },

    saveStats: (stats: UserStats) => {
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    },

    getLogs: (): LogEntry[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
        return stored ? JSON.parse(stored) : [];
    },

    addLog: (entry: LogEntry) => {
        const logs = StorageService.getLogs();
        logs.push(entry);
        localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    },

    getDailyState: (): { date: string; anchors: Record<string, boolean> } | null => {
        const stored = localStorage.getItem(STORAGE_KEYS.DAILY_STATE);
        return stored ? JSON.parse(stored) : null;
    },

    saveDailyState: (date: string, anchors: Record<string, boolean>) => {
        localStorage.setItem(STORAGE_KEYS.DAILY_STATE, JSON.stringify({ date, anchors }));
    },

    getSettings: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return stored ? JSON.parse(stored) : { wakeTime: "06:30" };
    },

    saveSettings: (settings: any) => {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
};
