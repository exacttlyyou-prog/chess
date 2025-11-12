import { useState } from 'react';
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
    image: '/images/pieces/pair-classic.png',
  },
  {
    title: 'Тренируйся с AI',
    description: 'Улучшай навыки с искусственным интеллектом любого уровня',
    image: '/images/heroes/ai-network.png',
  },
  {
    title: 'Готов начать?',
    description: 'Присоединяйся к тысячам игроков и начни свой путь к мастерству',
    image: '/images/heroes/progress-stairs.png',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

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
        className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gradient">StakeChess</span>
            </h1>
            <p className="text-gray-400">Начни свой путь в шахматах</p>
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
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black chess-pattern flex flex-col">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-gradient">StakeChess</span>
        </h1>
        <button
          onClick={() => navigate('/home')}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          Пропустить
        </button>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Visual / Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-stake-red/20 rounded-full blur-3xl" />

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 shadow-depth-lg">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <h2 className="text-4xl font-bold mb-4 px-4">{slides[currentSlide].title}</h2>
              <p className="text-xl text-gray-400 px-6">{slides[currentSlide].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-stake-red'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {currentSlide > 0 && (
            <button onClick={prevSlide} className="btn-secondary flex-1">
              Назад
            </button>
          )}
          <button onClick={nextSlide} className="btn-primary flex-1">
            {currentSlide === slides.length - 1 ? 'Начать' : 'Далее'}
          </button>
        </div>
      </div>
    </div>
  );
}
