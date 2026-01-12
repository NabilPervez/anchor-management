import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageService } from '../services/StorageService';
import PageTransition from '../components/PageTransition';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [wakeTime, setWakeTime] = useState("06:30");
    const [name, setName] = useState("Alex");

    useEffect(() => {
        const settings = StorageService.getSettings();
        if (settings.wakeTime) setWakeTime(settings.wakeTime);
        if (settings.name) setName(settings.name);
    }, []);

    const handleSave = () => {
        const settings = StorageService.getSettings();
        settings.wakeTime = wakeTime;
        settings.name = name;
        StorageService.saveSettings(settings);
        // Force reload or just navigate to trigger hooks update
        navigate('/');
    };

    return (
        <PageTransition className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen max-w-md mx-auto relative pb-24">
            <header className="flex items-center p-4 gap-4 sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <button onClick={() => navigate('/')} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold">Settings</h1>
            </header>

            <main className="p-6 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Profile</h2>
                    <label className="block">
                        <span className="block text-sm font-medium mb-1">Display Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </label>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Rhythm Configuration</h2>
                    <label className="block">
                        <span className="block text-sm font-medium mb-1">Target Wake Up Time</span>
                        <p className="text-xs text-slate-500 mb-3">This sets your "Rise" anchor. All other anchors are calculated relative to this.</p>
                        <input
                            type="time"
                            value={wakeTime}
                            onChange={(e) => setWakeTime(e.target.value)}
                            className="w-full bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-xl font-bold"
                        />
                    </label>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-40 max-w-md mx-auto">
                <button onClick={handleSave} className="w-full bg-primary text-white h-12 rounded-xl font-bold font-display shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                    Save Changes
                </button>
            </footer>
        </PageTransition>
    );
};

export default SettingsPage;
