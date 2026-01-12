import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/Home';
import CheckInPage from './pages/CheckIn';
import RoutinePage from './pages/Routine';
import InsightsPage from './pages/Insights';
import HeadspacePage from './pages/Headspace';
import SettingsPage from './pages/Settings';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/headspace" element={<HeadspacePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
