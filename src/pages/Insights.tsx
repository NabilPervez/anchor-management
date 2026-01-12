
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import { GamificationService } from '../services/GamificationService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import type { UserStats } from '../types';
import PageTransition from '../components/PageTransition';

const InsightsPage = () => {
    const [stats, setStats] = useState<UserStats | null>(null);

    useEffect(() => {
        setStats(GamificationService.getUserStats());
    }, []);

    if (!stats) return <div className="min-h-screen bg-background-dark"></div>;

    // Helper to find highest trait
    const highestTrait = Object.values(stats.traits).reduce((prev, current) => (prev.level > current.level) ? prev : current);

    const traitData = Object.values(stats.traits).map(t => ({
        subject: t.name,
        A: t.level * 25 + t.xp, // Improved visualization metric
        fullMark: 150,
    }));

    // Mock weekly data for now (since we don't have historical data structure yet for that)
    const weeklyData = [
        { name: 'Mon', xp: 400 },
        { name: 'Tue', xp: 300 },
        { name: 'Wed', xp: 550 },
        { name: 'Thu', xp: 200 },
        { name: 'Fri', xp: stats.totalXP > 0 ? stats.totalXP : 100 },
        { name: 'Sat', xp: 100 },
        { name: 'Sun', xp: 50 },
    ];

    return (
        <PageTransition className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24 max-w-md mx-auto">
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center p-4 justify-between">
                    <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"><span className="material-symbols-outlined text-primary">calendar_today</span></div>
                    <h1 className="text-lg font-bold">Growth Insights</h1>
                    <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"><span className="material-symbols-outlined">share</span></button>
                </div>
            </header>
            <main className="px-4 py-6 space-y-6">
                <section>
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-[22px] font-bold">Daily Metrics</h2>
                        <span className="text-sm font-medium text-slate-500">Today</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 rounded-xl p-6 bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-slate-500 text-sm font-medium">Flow Points</p>
                            <div className="flex items-baseline gap-2"><p className="text-3xl font-bold">{stats.totalXP}</p><p className="text-[#0bda5b] text-sm font-bold">+15%</p></div>
                        </div>
                        <div className="flex-1 rounded-xl p-6 bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-slate-500 text-sm font-medium">Level</p>
                            <div className="flex items-baseline gap-2"><p className="text-3xl font-bold">{stats.level}</p></div>
                        </div>
                    </div>
                </section>

                <section className="rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold mb-1">Trait Radar</h2>
                    <p className="text-slate-500 text-sm mb-6">Current Focus: {highestTrait.name}</p>
                    <div className="w-full h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={traitData}>
                                <PolarGrid stroke="#324d67" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#92adc9', fontSize: 10 }} />
                                <Radar
                                    name="Traits"
                                    dataKey="A"
                                    stroke="#137fec"
                                    fill="#137fec"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold mb-4">Weekly Momentum</h2>
                    <div className="w-full h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <XAxis dataKey="name" tick={{ fill: '#92adc9', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Bar dataKey="xp" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </main>
            <BottomNav />
        </PageTransition>
    );
};

export default InsightsPage;
