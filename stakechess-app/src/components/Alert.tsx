import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { type ReactNode } from 'react';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

/**
 * Alert/Banner компонент для важных сообщений
 */
export default function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}: AlertProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const styles = {
    success: 'bg-green-600/10 border-green-500/30 text-green-400',
    error: 'bg-red-600/10 border-red-500/30 text-red-400',
    warning: 'bg-yellow-600/10 border-yellow-500/30 text-yellow-400',
    info: 'bg-blue-600/10 border-blue-500/30 text-blue-400',
  };

  const Icon = icons[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        flex
        gap-3
        p-4
        border
        rounded-xl
        ${styles[variant]}
        ${className}
      `}
      role="alert"
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold mb-1">{title}</h4>
        )}
        <div className="text-sm opacity-90">{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Закрыть alert"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
}
