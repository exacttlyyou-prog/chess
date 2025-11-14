import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User } from 'lucide-react';

const slides = [
  {
    title: 'Играй без границ',
    description: 'Классические шахматы и быстрые партии с игроками со всего мира',
    image: '/images/heroes/growth-path.png',
  },
  {
    title: 'Следи за прогрессом',
    description: 'Отслеживай свой рост, зарабатывай достижения и повышай рейтинг',
    image: '/images/heroes/stats-growth.png',
  },
  {
    title: 'Участвуй в турнирах',
    description: 'Соревнуйся с лучшими игроками и побеждай в престижных турнирах',
    image: '/images/achievements/tournament-cup.png',
  },
  {
    title: 'Найди друзей',
    description: 'Играй с друзьями, общайся и создавай команду для турниров',
    image: '/images/pieces/pair-duo.png',
  },
  {
    title: 'Тренируйся с AI',
    description: 'Улучшай навыки с искусственным интеллектом любого уровня',
    image: '/images/pieces/knight-speed.png',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  // Preload all images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowAuth(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAuth = () => {
    navigate('/home');
  };

  if (showAuth) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="mb-2">
              <span className="text-gradient">StakeChess</span>
            </h1>
            <p className="text-body text-gray-400">Начни свой путь в шахматах</p>
          </div>

          <div className="glass-card p-8 space-y-4 shadow-depth-lg">
            <input
              type="tel"
              placeholder="Номер телефона"
              className="glass-input w-full text-white placeholder-gray-500"
            />

            <button onClick={handleAuth} className="btn-primary w-full">
              Продолжить
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-stake-black-light text-gray-500">или</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="btn-white w-full flex items-center justify-center gap-3">
                <span className="font-bold text-stake-red">А</span>
                <span>Alfa ID</span>
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-3">
                <Send size={18} />
                <span>Telegram</span>
              </button>
              <button className="btn-secondary w-full flex items-center justify-center gap-3">
                <User size={18} />
                <span>VK ID</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              Продолжая, вы соглашаетесь с условиями использования и политикой конфиденциальности
            </p>
          </div>

          <button
            onClick={() => setShowAuth(false)}
            className="mt-6 text-gray-500 hover:text-white transition-colors w-full text-center"
          >
            Назад
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 z-0"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Fullscreen Background Image */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          {/* Red accent gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-stake-red/20 via-transparent to-transparent" />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <div className="px-8 pt-2 pb-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold"
          >
            <span className="text-gradient">StakeChess</span>
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/home')}
            className="glass-button !px-6 !py-3 text-white/80 hover:text-white font-medium"
          >
            Пропустить
          </motion.button>
        </div>

        {/* Main Content - Text Overlay */}
        <div className="flex-1 flex flex-col justify-end p-8 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <span className="inline-block glass-button !px-4 !py-2 text-sm font-semibold text-stake-red">
                  {currentSlide + 1} / {slides.length}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="!text-display md:!text-6xl mb-6 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-body-lg md:text-2xl text-gray-300"
              >
                {slides[currentSlide].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8 space-y-6"
        >
          {/* Progress Dots */}
          <div className="flex justify-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-12 bg-stake-red shadow-[0_0_16px_rgba(255,23,68,0.6),0_4px_12px_rgba(255,23,68,0.4)]'
                    : 'w-2 bg-white/30 hover:bg-white/50 hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentSlide > 0 && (
              <button onClick={prevSlide} className="btn-secondary flex-1 !py-5 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)] transition-all duration-300">
                Назад
              </button>
            )}
            <button
              onClick={nextSlide}
              className="btn-primary flex-1 !py-5 text-lg font-bold shadow-[0_8px_24px_rgba(255,23,68,0.4)] hover:shadow-[0_8px_32px_rgba(255,23,68,0.6)] transition-all duration-300"
            >
              {currentSlide === slides.length - 1 ? 'Начать' : 'Далее'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
