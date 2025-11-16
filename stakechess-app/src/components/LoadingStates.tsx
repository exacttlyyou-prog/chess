import { motion } from 'framer-motion';

/**
 * Набор компонентов для отображения состояния загрузки
 */

/**
 * Пульсирующий индикатор загрузки
 */
export function PulseLoader({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizes[size]} bg-blue-500 rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Скелетон с анимацией shimmer
 */
export function ShimmerSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-800/50 rounded-lg ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

/**
 * Спиннер для полноэкранной загрузки
 */
export function FullPageLoader({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 flex flex-col items-center gap-4"
      >
        <motion.div
          className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {message && (
          <p className="text-gray-300 text-center">{message}</p>
        )}
      </motion.div>
    </div>
  );
}

/**
 * Прогресс-бар с анимацией
 */
export function ProgressBar({
  progress,
  showLabel = false,
  label
}: {
  progress: number;
  showLabel?: boolean;
  label?: string;
}) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">{label}</span>
          <span className="text-sm text-gray-300">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/**
 * Skeleton для карточки игры
 */
export function GameLoadingSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <ShimmerSkeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <ShimmerSkeleton className="h-4 w-32" />
          <ShimmerSkeleton className="h-3 w-20" />
        </div>
      </div>
      <ShimmerSkeleton className="h-48 w-full" />
      <div className="flex gap-2">
        <ShimmerSkeleton className="h-10 flex-1" />
        <ShimmerSkeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
