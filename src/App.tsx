import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CheckInPage from './pages/CheckIn';
import RoutinePage from './pages/Routine';
import InsightsPage from './pages/Insights';
import HeadspacePage from './pages/Headspace';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="/routine" element={<RoutinePage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/headspace" element={<HeadspacePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
