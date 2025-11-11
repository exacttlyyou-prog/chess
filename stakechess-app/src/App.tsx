import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import GameMode from './pages/GameMode';
import GamePlay from './pages/GamePlay';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game-mode" element={<GameMode />} />
          <Route path="/play" element={<GamePlay />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
