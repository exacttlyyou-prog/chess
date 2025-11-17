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
    image: '/images/heroes/world-map.png',
    stat: 'Живое сообщество',
  },
  {
    title: 'Играй как легенды',
    description: 'Уникальные AI модели стилей Магнуса Карлсена, Каспарова, Фишера и других',
    image: '/images/grandmasters/карлсон.png',
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
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);
  const [showSkillSelect, setShowSkillSelect] = useState(false);
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

  const handleAuth = () => {
    // Show skill selection before auth
    if (!skillLevel) {
      setShowSkillSelect(true);
      return;
    }

    setIsAuthenticating(true);
    // Save skill level to localStorage
    localStorage.setItem('user_skill_level', skillLevel);
    // Simulate auth delay
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  const handleSkillSelect = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setSkillLevel(level);
    setShowSkillSelect(false);
    // Auto-proceed to auth
    setTimeout(() => {
      setIsAuthenticating(true);
      localStorage.setItem('user_skill_level', level);
      setTimeout(() => navigate('/home'), 1500);
    }, 300);
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
        <div className="px-4 md:px-8 pt-2 pb-4 flex justify-between items-center gap-2">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-3xl font-bold flex-shrink-0"
          >
            <span className="text-gradient">StakeChess</span>
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/home')}
            className="glass-button !px-3 !py-2 md:!px-6 md:!py-3 text-white/80 hover:text-white font-medium text-sm md:text-base flex-shrink-0"
            aria-label="Пропустить онбординг и перейти на главную"
          >
            Пропустить
          </motion.button>
        </div>

        {/* AI Legends Squircles - Custom Layout for Slide 3 */}
        {currentSlide === 2 && (
          <div className="flex items-center justify-center px-4 py-2 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              className="flex gap-2 md:grid md:grid-cols-3 md:gap-4 max-w-xs md:max-w-md"
            >
              {/* Карлсен */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="w-32 h-32 md:aspect-square rounded-lg md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 md:border-2 overflow-hidden shadow-2xl flex-shrink-0"
              >
                <img src="/images/grandmasters/карлсон.png" alt="Карлсен" className="w-full h-full object-cover" />
              </motion.div>

              {/* Фишер */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="w-32 h-32 md:aspect-square rounded-lg md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 md:border-2 overflow-hidden shadow-2xl flex-shrink-0"
              >
                <img src="/images/grandmasters/фишер.png" alt="Фишер" className="w-full h-full object-cover" />
              </motion.div>

              {/* Таль - HIDDEN ON MOBILE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="hidden md:block aspect-square rounded-lg md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 md:border-2 overflow-hidden shadow-2xl"
              >
                <img src="/images/grandmasters/михаил таль.png" alt="Таль" className="w-full h-full object-cover" />
              </motion.div>

              {/* Карпов - HIDDEN ON MOBILE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="hidden md:block aspect-square rounded-lg md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 md:border-2 overflow-hidden shadow-2xl"
              >
                <img src="/images/grandmasters/карпов.png" alt="Карпов" className="w-full h-full object-cover" />
              </motion.div>

              {/* Капабланка - HIDDEN ON MOBILE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="hidden md:block aspect-square rounded-lg md:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 md:border-2 overflow-hidden shadow-2xl"
              >
                <img src="/images/grandmasters/касабланка.png" alt="Капабланка" className="w-full h-full object-cover" />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Main Content - Text Overlay */}
        <div className="flex-1 flex flex-col justify-end p-3 md:p-8 pb-4 md:pb-8">
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
                className="mb-2"
              >
                <span className="inline-block glass-button !px-4 !py-2 text-xs md:text-sm font-semibold text-stake-red min-w-[80px] text-center">
                  {currentSlide + 1} / {slides.length}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="!text-3xl md:!text-display mb-3 md:mb-6 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-body-lg text-gray-300 mb-3 md:mb-6"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 glass-card !px-4 !py-2 md:!px-6 md:!py-3 border border-stake-red/30"
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-stake-red animate-pulse" />
                <span className="text-stake-red font-bold text-sm md:text-lg">{slides[currentSlide].stat}</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-3 md:p-8 space-y-3 md:space-y-6 pb-4 md:pb-8"
        >
          {/* Progress Dots */}
          <div className="flex justify-center gap-3" role="tablist" aria-label="Слайды онбординга">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-12 bg-stake-red shadow-md'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Слайд ${index + 1} из ${slides.length}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          {currentSlide < slides.length - 1 ? (
            <div className="flex gap-4">
              {currentSlide > 0 && (
                <button onClick={prevSlide} className="btn-secondary flex-1 !py-2 md:!py-3 transition-all duration-300">
                  Назад
                </button>
              )}
              <button
                onClick={nextSlide}
                className="btn-primary flex-1 !py-2 md:!py-3 text-base md:text-lg font-bold shadow-lg transition-all duration-300"
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
                onClick={handleAuth}
                disabled={isAuthenticating}
                className="btn-primary w-full !py-5 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Войти через Telegram"
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
                onClick={handleAuth}
                disabled={isAuthenticating}
                className="btn-white w-full !py-5 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Войти через Alfa ID"
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

      {/* Skill Level Selection Modal */}
      {showSkillSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-level-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-card p-8 w-full max-w-md"
          >
            <h3 id="skill-level-title" className="!text-2xl mb-3 text-center">Ваш уровень игры?</h3>
            <p className="text-sm text-gray-400 text-center mb-8">
              Это поможет подобрать подходящих соперников
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSkillSelect('beginner')}
                className="glass-card p-6 w-full text-left hover-lift border-2 border-transparent hover:border-stake-red/50 transition-all"
                aria-label="Выбрать уровень: Новичок"
              >
                <h4 className="!text-lg mb-2">🌱 Новичок</h4>
                <p className="text-sm text-gray-400">
                  Только начинаю изучать шахматы
                </p>
              </button>

              <button
                onClick={() => handleSkillSelect('intermediate')}
                className="glass-card p-6 w-full text-left hover-lift border-2 border-transparent hover:border-stake-red/50 transition-all"
                aria-label="Выбрать уровень: Средний"
              >
                <h4 className="!text-lg mb-2">⚡ Средний</h4>
                <p className="text-sm text-gray-400">
                  Знаю основы, играю регулярно
                </p>
              </button>

              <button
                onClick={() => handleSkillSelect('advanced')}
                className="glass-card p-6 w-full text-left hover-lift border-2 border-transparent hover:border-stake-red/50 transition-all"
                aria-label="Выбрать уровень: Продвинутый"
              >
                <h4 className="!text-lg mb-2">👑 Продвинутый</h4>
                <p className="text-sm text-gray-400">
                  Опытный игрок с высоким рейтингом
                </p>
              </button>
            </div>

            <button
              onClick={() => setShowSkillSelect(false)}
              className="btn-secondary w-full mt-4"
              aria-label="Вернуться назад без выбора уровня"
            >
              Назад
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
