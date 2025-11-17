import { motion, AnimatePresence } from 'framer-motion';

interface NotificationBadgeProps {
  count: number;
  max?: number;
  show?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Бейдж уведомлений с анимацией
 * Отображает количество непрочитанных уведомлений
 */
export default function NotificationBadge({
  count,
  max = 99,
  show = true,
  size = 'md',
  className = '',
}: NotificationBadgeProps) {
  const sizes = {
    sm: 'w-4 h-4 text-[10px]',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm',
  };

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <AnimatePresence>
      {show && count > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          className={`
            absolute -top-1 -right-1
            ${sizes[size]}
            bg-red-500
            text-white
            rounded-full
            flex items-center justify-center
            font-bold
            shadow-lg
            ${className}
          `}
        >
          <motion.span
            key={displayCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {displayCount}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Точка уведомления (без числа)
 */
export function NotificationDot({
  show = true,
  className = '',
}: {
  show?: boolean;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className={`
            absolute -top-0.5 -right-0.5
            w-2 h-2
            bg-red-500
            rounded-full
            ${className}
          `}
        >
          {/* Пульсирующий эффект */}
          <motion.div
            className="absolute inset-0 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
