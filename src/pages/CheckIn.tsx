import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckInPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(24);

    useEffect(() => {
        if (step === 2 && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col max-w-md mx-auto">
            <header className="flex items-center justify-between p-4 bg-background-light dark:bg-background-dark/80 sticky top-0 z-10">
                <button onClick={() => navigate('/')} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
                </button>
                <div className="flex-1 text-center">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">Check-In</h2>
                </div>
                <div className="size-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">emoji_events</span>
                </div>
            </header>

            <div className="flex w-full flex-row items-center justify-center gap-3 py-4">
                <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            </div>

            <main className="flex-1 px-6 pb-12 flex flex-col w-full">
                {step === 1 ? (
                    <div className="flex flex-col flex-1">
                        <div className="pt-6 pb-8 text-center">
                            <h3 className="text-3xl font-bold leading-tight mb-2">Check-in</h3>
                            <p className="text-slate-500 dark:text-slate-400">Stack your habits to fuel your day</p>
                        </div>
                        <div className="space-y-3">
                            {['Drink 500ml Water', '5-Min Sunlight Exposure', 'Take Vitamin D', 'Stretch for 2 Minutes'].map((habit, i) => (
                                <label key={i} className="flex items-center justify-between glass-card p-5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-2 rounded-lg">
                                            <span className="material-symbols-outlined text-primary">task_alt</span>
                                        </div>
                                        <p className="text-base font-medium">{habit}</p>
                                    </div>
                                    <input className="h-6 w-6 rounded-full border-slate-300 dark:border-slate-700 bg-transparent text-primary focus:ring-primary" type="checkbox" />
                                </label>
                            ))}
                        </div>
                        <div className="mt-auto pt-10">
                            <button onClick={() => setStep(2)} className="w-full bg-primary text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                Continue to Pause <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-light tracking-wide text-slate-500 dark:text-slate-300">Gratitude Pause</h3>
                            <p className="text-4xl font-bold mt-2">00:{timeLeft.toString().padStart(2, '0')}</p>
                        </div>
                        <div className="relative flex items-center justify-center w-64 h-64 mb-16">
                            <div className="absolute inset-0 border-2 border-slate-200 dark:border-slate-800 rounded-full"></div>
                            <div className="absolute inset-4 border-4 border-primary/30 rounded-full breathing-ring"></div>
                            <div className="absolute inset-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-primary/40">
                                <span className="material-symbols-outlined text-white text-5xl">self_improvement</span>
                            </div>
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="128" cy="128" fill="transparent" r="126" stroke="#137fec" strokeDasharray="792" strokeDashoffset={(792 * timeLeft) / 30} strokeLinecap="round" strokeWidth="4"></circle>
                            </svg>
                        </div>
                        <div className="text-center px-4">
                            <h4 className="text-xl font-medium text-slate-800 dark:text-white leading-relaxed">
                                Take a deep breath. <br />
                                <span className="text-primary font-bold">Identify one win from today.</span>
                            </h4>
                        </div>
                        <div className={`w-full mt-12 ${timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
                            <button onClick={() => navigate('/')} disabled={timeLeft > 0} className="w-full bg-primary text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                                Finish Practice
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <div className="h-6 w-full bg-background-light dark:bg-background-dark">
                <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2"></div>
            </div>
        </div>
    );
};

export default CheckInPage;
