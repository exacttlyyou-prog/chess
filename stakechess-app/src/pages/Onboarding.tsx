import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const slides = [
  {
    title: 'Стань мастером шахмат',
    description: 'Играй с игроками со всего мира. Более 1 млн партий каждый день.',
    image: '/images/heroes/growth-path.png',
    stat: '1M+ игроков',
  },
  {
    title: 'Играй с реальными людьми',
    description: 'Предприниматели, звёзды спорта и культуры, эксперты. Найди достойного соперника!',
    image: '/images/heroes/real-people.png',
    stat: 'Живое сообщество',
  },
  {
    title: 'Играй как легенды',
    description: 'Уникальные AI модели стилей Магнуса Карлсена, Каспарова, Фишера и других',
    image: '/images/heroes/ai-legends.png',
    stat: '12 легендарных стилей',
  },
  {
    title: 'Выигрывай призы',
    description: 'Участвуй в турнирах с реальными наградами. До 100K монет за победу!',
    image: '/images/achievements/trophy-crown.png',
    stat: '12 турниров',
  },
  {
    title: 'Отслеживай прогресс',
    description: '52 достижения, рейтинговая система и детальная статистика каждой партии',
    image: '/images/heroes/stats-growth.png',
    stat: '52 достижения',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
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
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleAuth = (provider: 'telegram' | 'alfa') => {
    setIsAuthenticating(true);
    // Simulate auth delay
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

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
                className="text-body-lg md:text-2xl text-gray-300 mb-6"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-3 glass-card !px-6 !py-3 border border-stake-red/30"
              >
                <div className="w-2 h-2 rounded-full bg-stake-red animate-pulse" />
                <span className="text-stake-red font-bold text-lg">{slides[currentSlide].stat}</span>
              </motion.div>
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
                    ? 'w-12 bg-stake-red shadow-md'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          {currentSlide < slides.length - 1 ? (
            <div className="flex gap-4">
              {currentSlide > 0 && (
                <button onClick={prevSlide} className="btn-secondary flex-1 !py-5 transition-all duration-300">
                  Назад
                </button>
              )}
              <button
                onClick={nextSlide}
                className="btn-primary flex-1 !py-5 text-lg font-bold shadow-lg transition-all duration-300"
              >
                Далее
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="!text-xl mb-2 text-gradient">Начни прямо сейчас</h3>
                <p className="text-sm text-gray-400">Регистрация за 30 секунд. Первая партия — бесплатно!</p>
              </div>
              <button
                onClick={() => handleAuth('telegram')}
                disabled={isAuthenticating}
                className="btn-primary w-full !py-5 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Подключение...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Telegram</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleAuth('alfa')}
                disabled={isAuthenticating}
                className="btn-white w-full !py-5 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-stake-red/30 border-t-stake-red rounded-full animate-spin" />
                    <span>Подключение...</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-stake-red text-xl">А</span>
                    <span>Alfa ID</span>
                  </>
                )}
              </button>
              {currentSlide > 0 && (
                <button onClick={prevSlide} className="btn-secondary w-full !py-4 transition-all duration-300">
                  Назад
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
