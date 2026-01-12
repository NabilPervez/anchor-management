import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import { StorageService } from '../services/StorageService';

const RoutinePage = () => {
    const [selectedArchetype, setSelectedArchetype] = useState(0);

    useEffect(() => {
        const settings = StorageService.getSettings();
        if (settings.archetypeIndex !== undefined) {
            setSelectedArchetype(settings.archetypeIndex);
        }
    }, []);

    const handleSave = () => {
        const settings = StorageService.getSettings();
        settings.archetypeIndex = selectedArchetype;
        StorageService.saveSettings(settings);
        alert("Routine Saved!");
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen max-w-md mx-auto relative pb-24">
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <span className="material-symbols-outlined text-primary text-[24px]">account_circle</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold">Daily Routine</h2>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">System</span>
                    </div>
                </div>
                <button className="p-2"><span className="material-symbols-outlined">notifications</span></button>
            </header>
            <main className="p-4 pb-24">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Select Archetype</h3>
                <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
                    {[
                        { name: 'The Executive', sub: 'Focus & Grit', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Q0xH7WZMYE--jCZP79zyUOv4Qn5HbnRP7B9tZNXnY0LgW-EM9E2fpIpZOfNSAIxtCCU7QCG3gZxmNbN3ivyQN7GOkB85BG-Z5Ui6CNa_Xn6iT3KVg4w5tqTUjBuSIJmFnvFLC7ptFa05te1CQn74vVIrBmj9s6Kb3TssdDSSuZWg7xm-APm2bSgs2u1E2xhUGKoEhP4rtWgPOjw-i22Qp3NvXMmfWOA-z8qWcB9Cuxr84n_hNC2oj7GZ3rUVZ-uFbLPplnppvq0' },
                        { name: 'The Athlete', sub: 'Vitality & Grit', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1a8yyKmKPD6m-Z3LbXnmkybUs8SClZLXlKqJfq9CHQvYLnkgORYOEmu-DqqWluMSwwHePubYgEPYYC-A5vhGxjct8pR7OAGB2vGUWF7N3VVynYXzL6Fz9bf5RycLT114MibFjH87SuZeVfUuN-90o9ImjN1zouIDatCNAeM4eR07urKEIyUBK7-It0vF6Pwc7c1-srKMyz0h2xWqgyvhfPuu3rULpdpeGBx0uxobaJ9vgwoUFPUsNvr5y42p27qpFyNUhS1-gvGw' },
                        { name: 'The Monk', sub: 'Serenity & Focus', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2gF_0UIB-rIkTwapojKUj5Npu0vpjTV-uDS1EVb9uc6g7TFbIj57fhW0UoXGKVv2JOGtvSQTvlaur9mIyZYkaKpyuuf0vWUNAGgMiam155gSiPNfXcuW4KFG-SbpK7RbOUIB26bJ6WZPdMLZhgOTn0dZotYGPxF8b5pLQiZ3pTG13c9wJimESvTtIT1r_a2FZuIT7ghE3bkdgELbQF9PB7bLl3ls5B_MMYAbv5xi-NOTmzbQoMhk8ehWkwebV92zgpGBsbG_diy0' }
                    ].map((arch, i) => (
                        <div key={i} onClick={() => setSelectedArchetype(i)} className={`flex flex-col gap-3 min-w-[140px] cursor-pointer transition-opacity ${selectedArchetype === i ? 'opacity-100' : 'opacity-60'}`}>
                            <div className={`w-full aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-xl relative overflow-hidden ${selectedArchetype === i ? 'border-2 border-primary shadow-lg shadow-primary/20' : ''}`} style={{ backgroundImage: `url("${arch.img}")` }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                {selectedArchetype === i && <div className="absolute bottom-3 left-3"><span className="material-symbols-outlined text-primary">verified</span></div>}
                            </div>
                            <div><p className="text-sm font-bold">{arch.name}</p><p className="text-xs text-slate-500">{arch.sub}</p></div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-4 mt-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-400">light_mode</span>
                        <h2 className="text-xl font-bold">Rise (Wake)</h2>
                    </div>
                    <span className="text-xs font-medium text-slate-500">06:00 AM</span>
                </div>
                <div className="space-y-3">
                    <div className="bg-white dark:bg-card-dark p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <span className="material-symbols-outlined text-green-500">wb_sunny</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Sunlight Exposure</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded uppercase font-bold">Vitality</span>
                                    <span className="text-[10px] text-primary font-bold">+50 XP</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-11 h-6 bg-primary rounded-full relative"><div className="absolute top-[2px] right-[2px] bg-white rounded-full h-5 w-5"></div></div>
                    </div>
                    <button className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">add_circle</span>
                        <span className="text-sm font-bold">Add Habit to Stack</span>
                    </button>
                </div>
            </main>
            <footer className="fixed bottom-[72px] left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-40 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-background-dark flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">bolt</span></div>
                            <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-background-dark flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-white">psychology</span></div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-slate-500">Daily Projection</p>
                            <p className="text-sm font-bold text-white"><span className="text-primary">+450</span> XP Total</p>
                        </div>
                    </div>
                    <button onClick={handleSave} className="bg-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20">Save Routine</button>
                </div>
            </footer>
            <BottomNav />
        </div>
    );
};

export default RoutinePage;
