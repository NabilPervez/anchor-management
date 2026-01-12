import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNav from '../components/BottomNav';
import { useCircadianRhythm } from '../hooks/useCircadianRhythm';
import { GamificationService } from '../services/GamificationService';
import type { UserStats } from '../types';

const HomePage = () => {
    const navigate = useNavigate();
    const { anchors, nextAnchor } = useCircadianRhythm();
    const [stats, setStats] = useState<UserStats | null>(null);

    useEffect(() => {
        // Init stats on mount
        GamificationService.checkStreak();
        setStats(GamificationService.getUserStats());
    }, []);

    if (!stats) return <div className="min-h-screen bg-background-dark"></div>;

    // Calculate progress
    const securedCount = anchors.filter(a => a.status === 'secured').length;

    return (
        <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden pb-24">
            <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50">
                <div className="flex size-12 shrink-0 items-center">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/30 neumorphic-flat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5pf5xjl4vxg8jDA1PLstkV3rGZAqcBdq6A4TfyzBGrIpiKjxe2MKaokYxh_SwCa1Pz28KNwvCB6yUhLp8w9l_DyiXxU4OU3nKb2hZAe9XPW7gZZMfNoqHk5XQoQdybuil79tUsojvrdPzP2_4JvMaIybn6Mdfyf7otjY44tcLPCHp12QdS6aZVQyYrGll36RPGumsNmuSpIQl7QFghD_RavIydQ1eFMOAefvQw70ImPYRol8mr13YZTYpD-ujZjZ4Xnmrx345MZE")' }}></div>
                </div>
                <div className="flex-1 px-3">
                    <p className="text-[#92adc9] text-xs font-medium uppercase tracking-wider">Welcome back</p>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Alex Rivera</h2>
                </div>
                <div className="flex w-12 items-center justify-end">
                    <button onClick={() => navigate('/settings')} className="flex items-center justify-center rounded-xl size-10 bg-card-dark neumorphic-flat text-white">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-wrap gap-3 p-4">
                <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-card-dark neumorphic-flat border border-[#324d67]/30">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                        <p className="text-[#92adc9] text-xs font-medium uppercase">Flow</p>
                    </div>
                    <p className="text-white tracking-tight text-xl font-bold leading-tight">{stats.totalXP}</p>
                </div>
                <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-card-dark neumorphic-flat border border-[#324d67]/30">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-400 text-sm">local_fire_department</span>
                        <p className="text-[#92adc9] text-xs font-medium uppercase">Streak</p>
                    </div>
                    <p className="text-white tracking-tight text-xl font-bold leading-tight">{stats.streak} Days</p>
                </div>
                <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-card-dark neumorphic-flat border border-[#324d67]/30">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent-teal text-sm">verified</span>
                        <p className="text-[#92adc9] text-xs font-medium uppercase">Anchors</p>
                    </div>
                    <p className="text-white tracking-tight text-xl font-bold leading-tight">{securedCount}/5</p>
                </div>
            </div>

            <div className="px-4 py-2">
                {nextAnchor ? (
                    <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/10 p-5 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 size-24 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="flex flex-col gap-1 relative z-10">
                            <div className="flex items-center gap-2">
                                <span className={`flex size-2 rounded-full ${nextAnchor.status === 'active' ? 'bg-primary animate-pulse' : 'bg-slate-500'}`}></span>
                                <p className="text-primary text-sm font-bold uppercase tracking-widest">
                                    {nextAnchor.status === 'active' ? 'Current Anchor' : 'Next Anchor'}
                                </p>
                            </div>
                            <p className="text-white text-xl font-bold leading-tight">{nextAnchor.name} at {nextAnchor.time}</p>
                            <p className="text-[#92adc9] text-sm font-normal leading-normal">
                                {nextAnchor.status === 'active' ? 'Secure this anchor now to maintain your flow.' : 'Prepare for your next rhythm checkpoint.'}
                            </p>
                        </div>
                        {nextAnchor.status === 'active' && (
                            <button onClick={() => navigate(`/checkin?anchorId=${nextAnchor.id}`)} className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-xl h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all">
                                <span>Start Check-in</span>
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="px-4 py-6 text-center text-slate-500">
                        <p>All anchors secured for today!</p>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between px-4 pt-6 pb-2">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">Your Anchor Path</h3>
                <Link to="/routine" className="text-primary text-sm font-medium">Daily Log</Link>
            </div>

            <div className="flex flex-col px-4 space-y-0">
                {anchors.map((anchor) => (
                    <div key={anchor.id} className={`grid grid-cols-[48px_1fr] gap-x-2 ${anchor.status === 'past' || anchor.status === 'secured' ? 'opacity-50' : ''}`}>
                        <div className="flex flex-col items-center">
                            {anchor.status === 'secured' ? (
                                <div className="flex size-10 items-center justify-center rounded-full bg-card-dark neumorphic-inset text-accent-teal">
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                </div>
                            ) : anchor.status === 'active' ? (
                                <div className="flex size-10 items-center justify-center rounded-full bg-primary shadow-[0_0_15px_rgba(19,127,236,0.5)] text-white">
                                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                                </div>
                            ) : (
                                <div className="flex size-10 items-center justify-center rounded-full bg-card-dark border border-[#324d67]/30 text-[#4a637a]">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                            )}
                            {/* Dotted line unless last item */}
                            {anchor.id !== 'unwind' && (
                                <div className={`w-[2px] h-12 ${anchor.status === 'secured' ? 'bg-gradient-to-b from-accent-teal to-primary/30' : 'border-l-2 border-dashed border-[#324d67]'}`}></div>
                            )}
                        </div>
                        <div className="flex flex-col pt-1 pb-6">
                            <p className={`${anchor.status === 'active' ? 'text-white font-bold' : 'text-[#92adc9] font-medium'} text-base`}>
                                {anchor.name} ({anchor.time})
                            </p>
                            <p className="text-[#92adc9] text-sm">
                                {anchor.status === 'secured' ? 'Secured' : anchor.status === 'active' ? 'Ready to Secure' : 'Locked'}
                            </p>

                            {anchor.status === 'active' && (
                                <div className="rounded-xl border border-primary/40 bg-card-dark p-4 neumorphic-flat mt-2">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-white text-base font-bold">{anchor.name}</p>
                                            <p className="text-primary text-sm font-medium">In Progress</p>
                                        </div>
                                    </div>
                                    <button onClick={() => navigate(`/checkin?anchorId=${anchor.id}`)} className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-primary text-white text-sm font-bold">
                                        <span className="material-symbols-outlined text-[18px]">verified_user</span> Secure Anchor
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <BottomNav />
        </div>
    );
};

export default HomePage;
