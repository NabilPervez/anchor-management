import BottomNav from '../components/BottomNav';

const HeadspacePage = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen pb-24 max-w-md mx-auto">
            <header className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark/90 backdrop-blur-md p-4 justify-between border-b border-slate-200 dark:border-slate-800">
                <span className="material-symbols-outlined">menu</span>
                <h2 className="text-lg font-bold">Headspace</h2>
                <span className="material-symbols-outlined">account_circle</span>
            </header>
            <main className="p-4">
                <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#192633] border border-slate-100 dark:border-slate-800 mb-6">
                    <div className="aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQam-QTvOpLRvPYQ1gcmKM0xIbcqZUjcpIieeZFDb4tTMiQPuKIWDczsfQZGC-NXqkhBFw0RjCoVRc8tH_EXZ6KySkPN_bAqlAiYqSuZgd_cOjx5kupi_8nmg2r-M_l9SP5Jgvb4Qbwv6trW4wyg8d0NMORqj3wsyOtRndWmNCb7fv4vJhL4XtGdFZVqzkdStHrsik5pHcn1hbvLejgUOydbR40p0HcCo4gSXHhfyUg1_bE2M_rPJaNU4E8_7KhPjBcHa7Lil3huo")' }}></div>
                    <div className="p-5">
                        <p className="text-primary text-[10px] font-bold tracking-widest uppercase">Monthly Theme</p>
                        <p className="text-2xl font-bold mt-1">Locus of Control</p>
                        <p className="text-slate-500 text-sm mt-2 mb-4">Mastering the Internal vs. External. A focus on building cognitive resilience.</p>
                        <button className="w-full bg-primary py-2 rounded-lg font-semibold text-white">Explore Theme</button>
                    </div>
                </div>

                <div className="aspect-[4/3] bg-cover bg-center flex flex-col justify-end p-6 rounded-xl relative overflow-hidden mb-6" style={{ backgroundImage: 'linear-gradient(0deg, rgba(16, 25, 34, 0.9) 0%, rgba(16, 25, 34, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDmknMKbOGRtlY2ppQROmTFY357yod0UUJ8oKOvj26Bz4HlGHggDraRDNmzytmkFR-9TbTwtlCS8QV_sCwtXk1KHhpmRkknAaSL3GTYtUxUd_BQtkVIXv0uBD9UloZkOFXfztsnbQR6yl4-a9XvxaNoYeykQ9mVGmuzubidEaDs8VLuZyO6NKvKku80OuDIYU9TyQ1dc1DveFOzyFAsAM-OsUVWVjPydJo5xpvfUF9Qe1E7gw6hsVXU0DoBWzG8HFXhhij-KrcvEJU")' }}>
                    <div className="flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-white/60 text-sm">auto_awesome</span><p className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Daily Wisdom</p></div>
                    <p className="text-xl font-medium italic mb-2">"You have power over your mind—not outside events."</p>
                    <p className="text-white/80 text-sm font-semibold">— Marcus Aurelius</p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-lg font-bold">Deep Dives</h3>
                    <div className="flex gap-4 p-3 bg-white dark:bg-[#192633] rounded-xl border border-slate-100 dark:border-slate-800">
                        <div className="size-16 shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfQMhzwx_c-aVgG0y3qtRvepLsqrdsuhn2pTWjPi8lyijUhKwAhs6DHrVvV21slgkiubnW6aY9EsFuFVlcHb434lxP0e5OB4PB65Kqj6TjeaZ1o90b15PD7OD9vPMlaIb6UCn3dGsgw6X21ElBwPDSaFMb_qTFyPX1_vM7Lg00z2h3O28PsEOoOnoA8M5cBXeRwRhDsWN8KIciH-7G5izgfHOtpiaRkORV3jh0YOPzfS91FJYjJGlLot3S4ABiAbZ1XZtTe1WTG9k")' }}></div>
                        <div className="flex-1 flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-primary uppercase">Neuroscience</span>
                            <h4 className="text-sm font-bold truncate">Habit Stacking Neurochemistry</h4>
                        </div>
                        <span className="material-symbols-outlined self-center text-slate-400">chevron_right</span>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default HeadspacePage;
