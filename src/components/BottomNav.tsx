import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();
    const getIconClass = (path: string) => location.pathname === path ? "text-primary" : "text-[#92adc9]";
    const getFillClass = (path: string) => location.pathname === path ? "font-variation-fill" : "";

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background-dark/80 backdrop-blur-lg border-t border-[#324d67]/30 px-6 py-4 flex justify-between items-center z-50">
            <Link to="/" className={`flex flex-col items-center gap-1 ${getIconClass('/')}`}>
                <span className={`material-symbols-outlined ${getFillClass('/')}`}>grid_view</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
            </Link>
            <Link to="/routine" className={`flex flex-col items-center gap-1 ${getIconClass('/routine')}`}>
                <span className={`material-symbols-outlined ${getFillClass('/routine')}`}>layers</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Routine</span>
            </Link>
            <Link to="/insights" className={`flex flex-col items-center gap-1 ${getIconClass('/insights')}`}>
                <span className={`material-symbols-outlined ${getFillClass('/insights')}`}>insights</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
            </Link>
            <Link to="/headspace" className={`flex flex-col items-center gap-1 ${getIconClass('/headspace')}`}>
                <span className={`material-symbols-outlined ${getFillClass('/headspace')}`}>psychology</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Mind</span>
            </Link>
        </nav>
    );
};

export default BottomNav;
