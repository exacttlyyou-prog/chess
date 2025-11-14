import { motion } from 'framer-motion';
import { Heart, Users, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface DuoModeScreenProps {
  onStartDuoGame?: () => void;
  onInvitePartner?: () => void;
}

export default function DuoModeScreen({ onStartDuoGame, onInvitePartner }: DuoModeScreenProps) {
  const [selectedMode, setSelectedMode] = useState<'cooperative' | 'romantic' | null>(null);

  const modes = [
    {
      id: 'cooperative' as const,
      title: 'Совместная игра',
      description: 'Играйте вместе против соперника',
      icon: Users,
      gradient: 'from-blue-500 to-purple-500',
      benefits: ['Общий рейтинг', 'Командная тактика', 'Двойная сила'],
    },
    {
      id: 'romantic' as const,
      title: 'Романтический режим',
      description: 'Особенный режим для двоих',
      icon: Heart,
      gradient: 'from-pink-500 to-red-500',
      benefits: ['Уникальные достижения', 'Парные темы', 'Романтическая атмосфера'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black">
      {/* King & Queen Red Image - Hero Background */}
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <img
            src="/images/pieces/king-queen-red.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Red Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-stake-red/30 via-transparent to-transparent" />
        </motion.div>

        {/* Animated Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{
              y: '-100vh',
              x: `${Math.random() * 100}vw`,
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute"
          >
            <Heart className="w-6 h-6 text-stake-red" fill="currentColor" />
          </motion.div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stake-black via-transparent to-stake-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-10 h-10 text-stake-red" />
            <Heart className="w-12 h-12 text-stake-red animate-pulse" fill="currentColor" />
            <Crown className="w-10 h-10 text-stake-red" />
          </div>

          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-stake-red via-pink-500 to-stake-red bg-clip-text text-transparent">
              Дуо Режим
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Играйте в шахматы вместе со своим партнером и создавайте незабываемые моменты
          </p>
        </motion.div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {modes.map((mode, index) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;

            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => setSelectedMode(mode.id)}
                className={`glass-card p-8 text-left transition-all relative overflow-hidden group ${
                  isSelected ? 'border-2 border-stake-red shadow-red-glow' : 'hover-lift'
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  animate={isSelected ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.gradient} p-4 mb-6 relative`}
                >
                  <Icon className="w-full h-full text-white" />

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-stake-red rounded-full p-1"
                    >
                      <Sparkles className="w-4 h-4 text-white" fill="currentColor" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Content */}
                <h3 className="!text-2xl mb-3 relative z-10">{mode.title}</h3>
                <p className="text-gray-400 mb-6 relative z-10">{mode.description}</p>

                {/* Benefits */}
                <div className="space-y-2 relative z-10">
                  {mode.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${mode.gradient}`} />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="selectedMode"
                    className="absolute inset-0 border-2 border-stake-red rounded-2xl pointer-events-none"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onInvitePartner}
            disabled={!selectedMode}
            className={`btn-secondary flex items-center justify-center gap-2 group ${
              !selectedMode ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Пригласить партнера</span>
          </button>

          <button
            onClick={onStartDuoGame}
            disabled={!selectedMode}
            className={`btn-primary flex items-center justify-center gap-2 group ${
              !selectedMode ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>Начать игру</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Crown,
              title: 'Королевские достижения',
              description: 'Получайте уникальные награды за совместную игру',
            },
            {
              icon: Heart,
              title: 'Эмоциональная связь',
              description: 'Специальные эмоции и стикеры для партнеров',
            },
            {
              icon: Sparkles,
              title: 'Особые темы',
              description: 'Эксклюзивные темы досок для дуо режима',
            },
          ].map((feature, i) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stake-red/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <FeatureIcon className="w-6 h-6 text-stake-red" />
                </div>
                <h4 className="!text-lg mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="fixed top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-stake-red/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="fixed bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none"
      />
    </div>
  );
}
