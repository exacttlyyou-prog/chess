import { motion } from 'framer-motion';
import { Crown, Lock, Star, Sparkles, Check } from 'lucide-react';

interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: typeof Star;
  included: boolean;
}

interface PremiumKingFeatureCardProps {
  isPremium?: boolean;
  onUpgrade?: () => void;
  features?: PremiumFeature[];
}

const defaultFeatures: PremiumFeature[] = [
  {
    id: '1',
    title: 'Безлимитный AI анализ',
    description: 'Анализируйте все свои партии',
    icon: Star,
    included: true,
  },
  {
    id: '2',
    title: 'Премиум темы досок',
    description: 'Эксклюзивные визуальные стили',
    icon: Sparkles,
    included: true,
  },
  {
    id: '3',
    title: 'Без рекламы',
    description: 'Чистый игровой опыт',
    icon: Check,
    included: true,
  },
  {
    id: '4',
    title: 'Приоритетная поддержка',
    description: '24/7 помощь от команды',
    icon: Crown,
    included: true,
  },
];

export default function PremiumKingFeatureCard({
  isPremium = false,
  onUpgrade,
  features = defaultFeatures,
}: PremiumKingFeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card overflow-hidden relative"
    >
      {/* King Crown Background - Simplified */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/images/pieces/king-crown.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stake-black/95 via-stake-black/90 to-yellow-900/10" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-yellow-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md">
              <Crown className="w-10 h-10 text-white" fill="currentColor" />
            </div>

            <div>
              <h2 className="!text-2xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                King Premium
              </h2>
              <p className="text-sm text-gray-400">Королевский статус</p>
            </div>
          </div>

          {isPremium && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring' }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30"
            >
              <span className="text-sm font-semibold text-yellow-400">Активен</span>
            </motion.div>
          )}
        </div>

        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-1">Специальная цена</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-yellow-400">499₽</span>
                  <span className="text-sm text-gray-500 line-through">999₽</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    -50%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">в месяц</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Features List */}
      <div className="relative z-10 p-6 space-y-3">
        <h3 className="!text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span>Что включено</span>
        </h3>

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                {feature.included ? (
                  <Check className="w-5 h-5 text-green-400" strokeWidth={3} />
                ) : (
                  <Lock className="w-5 h-5 text-gray-600" />
                )}
              </div>

              <div className="flex-1">
                <h4 className="!text-base mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>

              <Icon className="w-5 h-5 text-yellow-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade Button */}
      {!isPremium && (
        <div className="relative z-10 p-6 border-t border-yellow-500/20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onUpgrade}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-stake-black font-bold text-lg relative overflow-hidden group shadow-lg"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Crown className="w-6 h-6" fill="currentColor" />
              Получить King Premium
              <Crown className="w-6 h-6" fill="currentColor" />
            </span>
          </motion.button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Отменить подписку можно в любой момент
          </p>
        </div>
      )}

      {/* Premium Badge */}
      {isPremium && (
        <div className="relative z-10 p-6 border-t border-yellow-500/20 text-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/50"
          >
            <Crown className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <span className="font-bold text-yellow-400">Вы - Король!</span>
            <Crown className="w-5 h-5 text-yellow-400" fill="currentColor" />
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
