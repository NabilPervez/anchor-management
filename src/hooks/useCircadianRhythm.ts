import { useState, useEffect } from 'react';
import { addMinutes, format, parse, isAfter, isBefore } from 'date-fns';
import { StorageService } from '../services/StorageService';

export interface AnchorTime {
    id: string;
    name: string;
    time: string; // HH:mm format
    windowStart: Date;
    windowEnd: Date;
    status: 'locked' | 'active' | 'past' | 'secured';
}

const anchorDefinitions = [
    { id: 'rise', name: 'The Rise', offsetMinutes: 0, duration: 90 },
    { id: 'deep_work', name: 'Deep Work', offsetMinutes: 180, duration: 120 }, // 3 hours later
    { id: 'reset', name: 'The Reset', offsetMinutes: 360, duration: 90 }, // 6 hours later
    { id: 'recharge', name: 'The Recharge', offsetMinutes: 540, duration: 90 }, // 9 hours later
    { id: 'unwind', name: 'The Unwind', offsetMinutes: 780, duration: 120 }, // 13 hours later
];

export const useCircadianRhythm = () => {
    const [anchors, setAnchors] = useState<AnchorTime[]>([]);
    const [nextAnchor, setNextAnchor] = useState<AnchorTime | null>(null);

    useEffect(() => {
        const calculateSchedule = () => {
            const settings = StorageService.getSettings();
            const dailyState = StorageService.getDailyState();
            const todayStr = new Date().toISOString().split('T')[0];

            // Check if stored daily state matches today, else reset
            const securedAnchors = (dailyState && dailyState.date === todayStr) ? dailyState.anchors : {};

            const wakeTimeStr = settings.wakeTime || '06:30';
            const now = new Date();
            const todayBase = format(now, 'yyyy-MM-dd');
            const wakeDate = parse(`${todayBase} ${wakeTimeStr}`, 'yyyy-MM-dd HH:mm', now);

            const calculatedAnchors: AnchorTime[] = anchorDefinitions.map(def => {
                const startTime = addMinutes(wakeDate, def.offsetMinutes);
                const endTime = addMinutes(startTime, def.duration);

                let status: AnchorTime['status'] = 'locked';

                if (securedAnchors[def.id]) {
                    status = 'secured';
                } else if (isAfter(now, endTime)) {
                    status = 'past'; // Missed or just passed
                } else if (isAfter(now, startTime) && isBefore(now, endTime)) {
                    status = 'active';
                } else {
                    status = 'locked';
                }

                return {
                    id: def.id,
                    name: def.name,
                    time: format(startTime, 'h:mm a'),
                    windowStart: startTime,
                    windowEnd: endTime,
                    status
                };
            });

            setAnchors(calculatedAnchors);

            // Find next or current
            const upcoming = calculatedAnchors.find(a => a.status === 'active' || a.status === 'locked');
            setNextAnchor(upcoming || null);
        };

        calculateSchedule();
        const interval = setInterval(calculateSchedule, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return { anchors, nextAnchor };
};
