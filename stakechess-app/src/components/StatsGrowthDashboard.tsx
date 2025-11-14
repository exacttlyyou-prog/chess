import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Award, Zap } from 'lucide-react';

interface StatItem {
  label: string;
  current: number;
  previous: number;
  unit?: string;
  icon: typeof TrendingUp;
}

interface StatsGrowthDashboardProps {
  stats: StatItem[];
  timeRange?: string;
  showTrends?: boolean;
}

export default function StatsGrowthDashboard({
  stats,
  timeRange = 'За последние 7 дней',
  showTrends = true,
}: StatsGrowthDashboardProps) {
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-400';
    if (growth < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="glass-card overflow-hidden relative">
      {/* Stats Growth Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.img
          animate={{
            y: [-20, 20, -20],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src="/images/heroes/stats-growth.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stake-black/90 via-stake-black/80 to-stake-black/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="!text-2xl mb-1">Статистика роста</h3>
            <p className="text-sm text-gray-400">{timeRange}</p>
          </div>

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-stake-red/20 to-orange-500/20 flex items-center justify-center"
          >
            <Activity className="w-6 h-6 text-stake-red" />
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const growth = calculateGrowth(stat.current, stat.previous);
          const isPositive = growth > 0;
          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-5 relative overflow-hidden group hover-lift"
            >
              {/* Background Gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${
                  isPositive
                    ? 'from-green-500/10 to-emerald-500/10'
                    : growth < 0
                    ? 'from-red-500/10 to-orange-500/10'
                    : 'from-gray-500/10 to-slate-500/10'
                } transition-opacity`}
              />

              <div className="relative z-10">
                {/* Icon & Label */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isPositive
                          ? 'bg-green-500/20'
                          : growth < 0
                          ? 'bg-red-500/20'
                          : 'bg-gray-500/20'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isPositive ? 'text-green-400' : growth < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>

                  {/* Growth Badge */}
                  {showTrends && growth !== 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                        isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs font-semibold ${getGrowthColor(growth)}`}>
                        {isPositive ? '+' : ''}
                        {growth.toFixed(1)}%
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Current Value */}
                <div className="mb-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    className="text-4xl font-bold text-gradient"
                  >
                    {stat.current.toLocaleString()}
                    {stat.unit && <span className="text-2xl ml-1">{stat.unit}</span>}
                  </motion.div>
                </div>

                {/* Previous Value Comparison */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Было:</span>
                  <span className="text-gray-400 font-mono">{stat.previous.toLocaleString()}</span>
                  <span className="text-gray-600">→</span>
                  <span className={`font-semibold ${getGrowthColor(growth)}`}>
                    {(stat.current - stat.previous > 0 ? '+' : '')}
                    {(stat.current - stat.previous).toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 relative">
                  <div className="h-2 bg-stake-gray rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((stat.current / (stat.previous * 2)) * 100, 100)}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: 'easeOut' }}
                      className={`h-full relative ${
                        isPositive
                          ? 'bg-gradient-to-r from-green-600 to-green-400'
                          : growth < 0
                          ? 'bg-gradient-to-r from-red-600 to-red-400'
                          : 'bg-gradient-to-r from-gray-600 to-gray-400'
                      }`}
                    >
                      {/* Shimmer */}
                      <motion.div
                        animate={{ x: [-50, 200] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        style={{ width: '50px' }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Sparkle Effect on Hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute top-2 right-2 pointer-events-none"
              >
                <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 p-6 border-t border-white/10 bg-gradient-to-r from-stake-red/10 to-orange-500/10"
      >
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-yellow-400" />
          <div>
            <h4 className="!text-lg mb-1">Общий прогресс</h4>
            <p className="text-sm text-gray-400">
              Продолжайте в том же духе! Вы показываете отличные результаты.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Animated Growth Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.3, 0] }}
            transition={{
              duration: 5,
              delay: i * 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 h-full w-1 bg-gradient-to-b from-transparent via-stake-red to-transparent"
            style={{ left: `${i * 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}
