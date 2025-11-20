import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Играй со всем миром',
    description: 'Более 1 млн игроков онлайн. Предприниматели, звёзды спорта и эксперты — найди достойного соперника!',
    image: '/images/heroes/world-map.png',
    stat: '1M+ игроков онлайн',
  },
  {
    title: 'Играй как легенды',
    description: 'Уникальные AI-модели стилей Магнуса Карлсена, Каспарова, Фишера и других гроссмейстеров',
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

  // Swipe handler
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && currentSlide > 0) {
      // Swipe right - previous slide
      prevSlide();
    } else if (info.offset.x < -swipeThreshold && currentSlide < slides.length - 1) {
      // Swipe left - next slide
      nextSlide();
    }
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
          {/* Red accent gradient - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-tr from-stake-red/10 via-transparent to-transparent" />

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
      <motion.div
        className="relative z-10 h-screen flex flex-col"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
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

        {/* Main Content - Text Overlay */}
        <div className="flex-1 flex flex-col justify-end p-4 md:p-8 pb-4 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              {/* Swipe indicator - показываем на первом слайде */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-center gap-2 mb-4 text-white/50"
                >
                  <motion.div
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.div>
                  <span className="text-xs">свайп</span>
                  <motion.div
                    animate={{ x: [5, -5, 5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-3"
              >
                <span className="inline-block glass-button !px-4 !py-2 text-sm font-semibold text-stake-red">
                  {currentSlide + 1} / {slides.length}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="!text-3xl md:!text-display mb-4 md:mb-6 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed"
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
          className="p-4 md:p-8 space-y-4 md:space-y-6 pb-6 md:pb-8"
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
            <div className="flex gap-3">
              {currentSlide > 0 && (
                <button onClick={prevSlide} className="flex-1 !py-3 md:!py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-medium transition-all">
                  Назад
                </button>
              )}
              <button
                onClick={nextSlide}
                className="btn-primary flex-1 !py-3 md:!py-4 text-base md:text-lg font-bold shadow-lg transition-all duration-300"
              >
                Далее
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center mb-4">
                <h3 className="!text-xl mb-2 text-gradient">Начни прямо сейчас</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Регистрация за 30 секунд. Первая партия — бесплатно!</p>
              </div>
              <button
                onClick={handleAuth}
                disabled={isAuthenticating}
                className="btn-primary w-full !py-4 text-base font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full !py-4 text-base font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed bg-white/10 hover:bg-white/20 rounded-2xl text-white border border-white/20 transition-all"
                aria-label="Войти через Alfa ID"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                <button onClick={prevSlide} className="w-full !py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-medium transition-all">
                  Назад
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Skill Level Selection Modal */}
      {showSkillSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-level-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-card p-6 w-full max-w-md"
          >
            <h3 id="skill-level-title" className="!text-2xl mb-2 text-center">Ваш уровень игры?</h3>
            <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed">
              Это поможет подобрать подходящих соперников
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSkillSelect('beginner')}
                className="glass-card p-5 w-full text-left hover-lift border-2 border-transparent hover:border-stake-red/50 transition-all"
                aria-label="Выбрать уровень: Новичок"
              >
                <h4 className="!text-lg mb-2">🌱 Новичок</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Только начинаю изучать шахматы
                </p>
              </button>

              <button
                onClick={() => handleSkillSelect('intermediate')}
                className="glass-card p-5 w-full text-left hover-lift border-2 border-transparent hover:border-stake-red/50 transition-all"
                aria-label="Выбрать уровень: Средний"
              >
                <h4 className="!text-lg mb-2">⚡ Средний</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Знаю основы, играю регулярно
                </p>
              </button>

              <button
                onClick={() => handleSkillSelect('advanced')}
                className="glass-card p-5 w-full text-left hover-lift border-2 border-transparent hover:border-stake-red/50 transition-all"
                aria-label="Выбрать уровень: Продвинутый"
              >
                <h4 className="!text-lg mb-2">👑 Продвинутый</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Опытный игрок с высоким рейтингом
                </p>
              </button>
            </div>

            <button
              onClick={() => setShowSkillSelect(false)}
              className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-medium transition-all"
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
