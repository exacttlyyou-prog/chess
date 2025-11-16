import { motion } from 'framer-motion';
import { type LucideIcon, Trophy, Award } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center mb-6"
      >
        <Icon className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="!text-2xl mb-3 text-white"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 max-w-md mb-8"
      >
        {description}
      </motion.p>

      {action && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}

// Предустановленные пустые состояния

export function NoGamesEmptyState({ onStartGame }: { onStartGame: () => void }) {
  return (
    <EmptyState
      icon={Trophy}
      title="Нет завершённых партий"
      description="Начните свою первую партию, чтобы увидеть здесь историю игр и статистику"
      action={{
        label: 'Начать игру',
        onClick: onStartGame
      }}
    />
  );
}

export function NoAchievementsEmptyState() {
  return (
    <EmptyState
      icon={Award}
      title="Пока нет достижений"
      description="Продолжайте играть и выигрывать партии, чтобы получить первые достижения"
    />
  );
}

export function NoTournamentsEmptyState({ onViewPremium }: { onViewPremium: () => void }) {
  return (
    <EmptyState
      icon={Trophy}
      title="Турниры доступны в Premium"
      description="Получите King Premium, чтобы участвовать в эксклюзивных турнирах с призами"
      action={{
        label: 'Перейти к Premium',
        onClick: onViewPremium
      }}
    />
  );
}
