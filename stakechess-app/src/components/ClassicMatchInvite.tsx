import { motion } from 'framer-motion';
import { Users, Clock, Trophy, Star, Swords, X } from 'lucide-react';

interface ClassicMatchInviteProps {
  opponent: {
    name: string;
    rating: number;
    avatar?: string;
    country?: string;
  };
  timeControl?: string;
  isRanked?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ClassicMatchInvite({
  opponent,
  timeControl = '15+10',
  isRanked = true,
  onAccept,
  onDecline,
}: ClassicMatchInviteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      className="glass-card max-w-md w-full overflow-hidden relative"
    >
      {/* Pair Classic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img
          animate={{
            scale: [1, 1.08, 1],
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src="/images/pieces/pair-classic.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />

        {/* Elegant Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-stake-black/95 via-stake-black/90 to-amber-900/20" />

        {/* Ambient Glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Swords className="w-8 h-8 text-amber-400" />
          <h2 className="!text-2xl text-center">Классическое приглашение</h2>
          <Swords className="w-8 h-8 text-amber-400" />
        </motion.div>

        <p className="text-center text-sm text-gray-400">
          Игрок вызывает вас на классическую партию
        </p>
      </div>

      {/* Opponent Info */}
      <div className="relative z-10 p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-6"
        >
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 mb-4 relative"
          >
            {opponent.avatar ? (
              <img
                src={opponent.avatar}
                alt={opponent.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-stake-black-light flex items-center justify-center">
                <span className="text-3xl font-bold">{opponent.name[0]}</span>
              </div>
            )}

            {/* Online Indicator */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-stake-black"
            />
          </motion.div>

          {/* Name */}
          <h3 className="!text-2xl mb-2">{opponent.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <Star className="w-5 h-5 text-amber-400" fill="currentColor" />
            <span className="text-lg font-bold text-amber-400">{opponent.rating}</span>
          </div>

          {/* Country Flag */}
          {opponent.country && (
            <p className="text-sm text-gray-400 mt-2">{opponent.country}</p>
          )}
        </motion.div>

        {/* Match Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {/* Time Control */}
          <div className="glass-card p-4 text-center bg-stake-black-light/50">
            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-gray-400 mb-1">Контроль</p>
            <p className="text-lg font-bold">{timeControl}</p>
          </div>

          {/* Game Type */}
          <div className="glass-card p-4 text-center bg-stake-black-light/50">
            {isRanked ? (
              <>
                <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400 mb-1">Рейтинговая</p>
                <p className="text-lg font-bold text-yellow-400">Да</p>
              </>
            ) : (
              <>
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400 mb-1">Товарищеская</p>
                <p className="text-lg font-bold text-blue-400">Да</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Classic Chess Note */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4 mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="!text-sm font-semibold text-amber-400 mb-1">
                Классические правила
              </h4>
              <p className="text-xs text-gray-400">
                Стандартные шахматные правила ФИДЕ. Увеличенное время на обдумывание ходов.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDecline}
            className="flex-1 py-3 rounded-xl bg-stake-gray hover:bg-stake-gray/80 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <X className="w-5 h-5" />
            <span>Отклонить</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAccept}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 transition-colors flex items-center justify-center gap-2 font-bold text-stake-black shadow-[0_0_20px_rgba(245,158,11,0.4)] relative overflow-hidden"
          >
            {/* Shine Effect */}
            <motion.div
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ width: '100px' }}
            />

            <span className="relative z-10 flex items-center gap-2">
              <Swords className="w-5 h-5" />
              Принять вызов
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              x: Math.random() * 50,
              y: Math.random() * 50,
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
            }}
            className="absolute w-2 h-2 bg-amber-400 rounded-full"
          />
        ))}
      </div>

      {/* Timer Bar (optional animation) */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 30, ease: 'linear' }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-red-500 origin-left"
      />

      {/* Elegant Border Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute inset-0 border border-amber-400/20 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
}
