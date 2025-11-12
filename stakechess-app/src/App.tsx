import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import GameMode from './pages/GameMode';
import GamePlay from './pages/GamePlay';
import Profile from './pages/Profile';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game-mode" element={<GameMode />} />
        <Route path="/play" element={<GamePlay />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
