import BottomNav from '../components/BottomNav';

const InsightsPage = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24 max-w-md mx-auto">
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
                        <span className="text-sm font-medium text-slate-500">Today, Oct 24</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 rounded-xl p-6 bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-slate-500 text-sm font-medium">Flow Points</p>
                            <div className="flex items-baseline gap-2"><p className="text-3xl font-bold">840</p><p className="text-[#0bda5b] text-sm font-bold">+15%</p></div>
                        </div>
                        <div className="flex-1 rounded-xl p-6 bg-white dark:bg-[#1a2632] shadow-sm border border-slate-100 dark:border-slate-800">
                            <p className="text-slate-500 text-sm font-medium">% Completion</p>
                            <div className="flex items-baseline gap-2"><p className="text-3xl font-bold">92%</p><p className="text-[#0bda5b] text-sm font-bold">+2%</p></div>
                        </div>
                    </div>
                </section>
                <section className="rounded-xl bg-white dark:bg-[#1a2632] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold mb-1">Trait Radar</h2>
                    <p className="text-slate-500 text-sm mb-6">Balanced Grit & Focus</p>
                    <div className="relative flex justify-center py-4">
                        <svg className="w-full max-w-[200px]" viewBox="0 0 200 200">
                            <circle className="radar-grid" cx="100" cy="100" r="80" strokeDasharray="4 4" />
                            <circle className="radar-grid" cx="100" cy="100" r="40" strokeDasharray="4 4" />
                            <line className="radar-grid" x1="100" x2="100" y1="20" y2="180" />
                            <line className="radar-grid" x1="20" x2="180" y1="100" y2="100" />
                            <polygon fill="rgba(19, 127, 236, 0.2)" points="100,35 175,100 100,165 45,100" stroke="#137fec" strokeWidth="3" />
                        </svg>
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">FOCUS</span>
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">GRIT</span>
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">SERENITY</span>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">VITALITY</span>
                    </div>
                    <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                            <p className="text-primary text-xs font-bold uppercase">AI Observation</p>
                        </div>
                        <p className="text-sm leading-normal">Your <span className="font-bold text-primary">Grit</span> is peaking, but <span className="font-bold">Serenity</span> is low. Consider a deep rest anchor tonight.</p>
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
};

export default InsightsPage;
