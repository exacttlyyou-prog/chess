import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastProvider } from './contexts/ToastContext';

// Lazy load routes for code splitting
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Home = lazy(() => import('./pages/Home'));
const GameMode = lazy(() => import('./pages/GameMode'));
const MatchSearch = lazy(() => import('./pages/MatchSearch'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Profile = lazy(() => import('./pages/Profile'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const Premium = lazy(() => import('./pages/Premium'));
const SelectAI = lazy(() => import('./pages/SelectAI'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game-mode" element={<GameMode />} />
        <Route path="/match-search" element={<MatchSearch />} />
        <Route path="/play" element={<GamePlay />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/select-ai" element={<SelectAI />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider position="top-right" defaultDuration={5000}>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black flex items-center justify-center">
            <div className="text-2xl font-bold text-gradient">StakeChess</div>
          </div>
        }>
          <AnimatedRoutes />
        </Suspense>
      </ToastProvider>
    </Router>
  );
}

export default App;
