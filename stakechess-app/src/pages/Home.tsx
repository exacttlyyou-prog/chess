import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';

const recentGames = [
  {
    id: 1,
    opponent: 'Магнус Карлсен',
    rating: '2831',
    result: 'win',
    mode: 'Блиц 3+2',
    image: '/images/pieces/king-solo.png',
    moves: 32,
    date: '2 часа назад',
  },
  {
    id: 2,
    opponent: 'Стратег_99',
    rating: '1850',
    result: 'loss',
    mode: 'Рапид 10+0',
    image: '/images/pieces/king-shatter.png',
    moves: 45,
    date: '5 часов назад',
  },
  {
    id: 3,
    opponent: 'Тактик_2000',
    rating: '2000',
    result: 'draw',
    mode: 'Классика',
    image: '/images/pieces/queen-bishop.png',
    moves: 68,
    date: 'Вчера',
  },
];


export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 20%, #1A1A1A 0%, #0A0A0A 100%)'
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-8 pt-2 pb-6"
      >
        {/* Hero Profile Card */}
        <motion.button
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate('/profile')}
          aria-label="Открыть профиль игрока"
          className="relative mb-6 hover-lift overflow-hidden rounded-3xl shadow-depth-lg group h-[180px]"
        >
          {/* Full Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/pieces/king-solo.png"
              alt=""
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-stake-black/95 via-stake-black/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-stake-red/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full p-6 flex flex-col justify-between">
            {/* Top Section - Avatar & Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Large Avatar */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                  <img
                    src="/images/pieces/king-crown.png"
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stake-red/30" />
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h1 className="!text-2xl font-bold">Игрок</h1>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg" />
                      <span className="text-xs text-green-400 font-semibold">Онлайн</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                      <span className="text-yellow-400 font-bold text-lg">⭐ 1450</span>
                      <span className="text-xs text-yellow-300/80 font-medium">ELO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Actions */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/settings');
                  }}
                  className="glass-button !px-3 !py-3 hover:bg-white/10"
                  aria-label="Открыть настройки"
                >
                  <img src="/images/icons/шестеренка 1.png" alt="" className="w-5 h-5 object-contain" />
                </button>
              </div>
            </div>

            {/* Bottom Section - Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-green-400">12</span>
                <span className="text-xs text-gray-400">Побед</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-red-400">3</span>
                <span className="text-xs text-gray-400">Поражений</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-2xl font-bold text-gray-400">5</span>
                <span className="text-xs text-gray-400">Ничья</span>
              </div>
              <div className="ml-auto">
                <span className="text-xs text-gray-400 font-medium">Смотреть профиль →</span>
              </div>
            </div>
          </div>
        </motion.button>

        {/* ДВУХКОЛОНОЧНЫЙ GRID LAYOUT - McKinsey: "Разрушить вертикальную тиранию" */}
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 mb-8">
          {/* ЛЕВАЯ КОЛОНКА - Главные действия */}
          <div className="space-y-6">
            <motion.button
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              whileHover={{ scale: 1.01, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/game-mode')}
              className="glass-card p-6 text-left border border-stake-red/30 relative overflow-hidden group w-full"
              aria-label="Начать быструю партию"
            >
              {/* Айв: Иконка и текст вертикально отцентрированы */}
              <div className="flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <h2 className="!text-2xl mb-1 leading-tight">Начать игру</h2>
                  <p className="text-sm text-gray-400">
                    Блиц 3+2 • Последний режим
                  </p>
                </div>
                {/* Иконка КРУПНЕЕ +15% - доминирует в карточке */}
                <div className="w-36 h-36 flex-shrink-0">
                  <img
                    src="/images/icons/пешка.png"
                    alt=""
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </motion.button>

            {/* 2. HERO: Играй как легенды - Айв: "Самый красивый блок на экране" */}
            <motion.button
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/select-ai')}
                className="glass-card p-8 text-left border-2 border-stake-red/40 relative overflow-hidden group w-full min-h-[280px]"
                aria-label="Играть с AI моделями легендарных шахматистов"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-stake-red/10 via-transparent to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content - Текст слева, ОДИН большой бюст Карлсена справа */}
                <div className="relative z-10 flex items-center gap-8">
                  {/* Левая часть: Текст */}
                  <div className="flex-1 min-w-0">
                    <h3 className="!text-3xl mb-3 leading-tight">Играй против<br/>8 AI-легенд</h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-md">
                      Карлсен, Фишер, Таль, Капабланка, Карпов
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-stake-red/10 border border-stake-red/30 group-hover:bg-stake-red/20 transition-all">
                      <span className="text-sm font-semibold text-stake-red">Выбрать соперника</span>
                      <span className="text-lg text-stake-red group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* Правая часть: ГЕРОЙ Карлсен +40% - Айв: "Он должен быть ГЕРОЕМ карточки" */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="w-90 h-90 rounded-3xl overflow-hidden border-4 border-stake-red/50 shadow-2xl flex-shrink-0 group-hover:border-stake-red/70 transition-all group-hover:scale-105"
                    style={{ width: '22.5rem', height: '22.5rem' }}
                  >
                    <img
                      src="/images/grandmasters/карлсон.png"
                      alt="Магнус Карлсен"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

            {/* Subtle glow effect behind portraits */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-stake-red/20 blur-3xl rounded-full opacity-30 pointer-events-none" />
          </motion.button>

        {/* Tournament CTA - Premium White Squircle */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.01, y: -4 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/tournaments', { state: { openTournamentId: 'novice_cup' } })}
          className="w-full mb-12 p-6 rounded-3xl bg-white text-black shadow-2xl relative overflow-hidden group"
          aria-label="Перейти к главному турниру недели"
        >
          {/* Паттерн A: Баланс - Текст 60% + Иконка 40% */}
          <div className="flex items-center gap-6">
            {/* Левая колонка: Текст */}
            <div className="flex-1 min-w-0 text-left">
              {/* Jony Ive: "Пульсирующая точка вместо плашки - элегантнее" */}
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-stake-red animate-pulse shadow-lg shadow-stake-red/50" />
                <span className="text-xs font-semibold text-stake-red">Идет сейчас</span>
              </div>
              <h3 className="!text-2xl !font-bold mb-2 leading-tight text-black">Главный турнир недели</h3>
              <p className="text-sm text-black/70 mb-4 leading-relaxed">
                Призовой фонд: <span className="font-bold text-black">50 000 ₽</span>
              </p>
              {/* Ghost Button - Jony Ive: "Плавная заливка белым при hover" */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-black/10 bg-black/5 hover:bg-white hover:border-black/30 transition-all group-hover:gap-3 duration-300">
                <span className="text-sm font-semibold text-black">Участвовать</span>
                <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Правая колонка: ГЕРОЙ кубок +33% - Айв: "Кубок должен доминировать" */}
            <div className="w-64 h-64 flex-shrink-0 relative">
              <img
                src="/images/icons/кубок.png"
                alt=""
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-stake-red/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.button>

        {/* Training - Паттерн C: Интеграция (иконка + текст как единое целое) */}
        <h3 className="!text-xl mb-4 !font-semibold !text-white">Тренировки</h3>
        <div className="grid grid-cols-3 gap-3 mb-12">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/puzzles')}
            className="glass-card p-6 text-center shadow-depth hover-lift flex flex-col items-center justify-center gap-3 min-h-[140px]"
            aria-label="Решать шахматные задачи"
          >
            {/* Иконка КРУПНЕЕ +15% - доминирует */}
            <img
              src="/images/icons/мозг.png"
              alt=""
              className="w-28 h-28 object-contain drop-shadow-2xl"
            />
            <p className="font-bold text-sm">Задачи</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/openings')}
            className="glass-card p-6 text-center shadow-depth hover-lift flex flex-col items-center justify-center gap-3 min-h-[140px]"
            aria-label="Изучать шахматные дебюты"
          >
            {/* Иконка КРУПНЕЕ +15% - доминирует */}
            <img
              src="/images/icons/pawn.png"
              alt=""
              className="w-28 h-28 object-contain drop-shadow-2xl"
            />
            <p className="font-bold text-sm">Дебюты</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/leaderboard')}
            className="glass-card p-6 text-center shadow-depth hover-lift flex flex-col items-center justify-center gap-3 min-h-[140px]"
            aria-label="Посмотреть таблицу лидеров"
          >
            {/* Иконка КРУПНЕЕ +15% - доминирует */}
            <img
              src="/images/icons/статист.png"
              alt=""
              className="w-28 h-28 object-contain drop-shadow-2xl"
            />
            <p className="font-bold text-sm">Рейтинг</p>
          </motion.button>
        </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Games - Compact horizontal scroll */}
      <div className="px-8 pb-28">
        <h3 className="!text-xl mb-4 !font-semibold">Недавние партии</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="list" aria-label="Недавние шахматные партии">
          {recentGames.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/play')}
              className={`glass-card p-4 min-w-[200px] text-left shadow-depth ${
                game.result === 'win'
                  ? 'border-l-4 !border-l-green-500'
                  : game.result === 'loss'
                  ? 'border-l-4 !border-l-red-500'
                  : 'border-l-4 !border-l-gray-500'
              }`}
              aria-label={`Партия против ${game.opponent}, результат: ${game.result === 'win' ? 'Победа' : game.result === 'loss' ? 'Поражение' : 'Ничья'}`}
              role="listitem"
            >
              {/* Result badge */}
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg mb-3 text-xs font-bold ${
                game.result === 'win'
                  ? 'bg-green-500/20 text-green-400'
                  : game.result === 'loss'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {game.result === 'win' ? '✓ Победа' : game.result === 'loss' ? '✗ Поражение' : '= Ничья'}
              </div>

              {/* Opponent */}
              <h6 className="!text-base !font-bold mb-1 truncate">{game.opponent}</h6>
              {game.rating && (
                <p className="text-xs text-yellow-400 font-semibold mb-2">⭐ {game.rating} ELO</p>
              )}

              {/* Game info */}
              <div className="space-y-1">
                <p className="text-xs text-gray-400">{game.mode} • {game.moves} ходов</p>
                <p className="text-xs text-gray-500">{game.date}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
}
