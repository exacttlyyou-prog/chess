import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    iconBg: 'bg-green-500/20',
  },
  error: {
    icon: XCircle,
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    iconBg: 'bg-red-500/20',
  },
  warning: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
    iconBg: 'bg-yellow-500/20',
  },
  info: {
    icon: Info,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
  },
};

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`glass-card p-4 min-w-[320px] max-w-md relative overflow-hidden border ${config.borderColor} shadow-lg`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient}`} />

      {/* Progress Bar */}
      {duration > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 right-0 h-1 ${config.color.replace('text-', 'bg-')} origin-left`}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className={`w-10 h-10 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-6 h-6 ${config.color}`} />
        </motion.div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4 className="!text-base font-semibold mb-1">{title}</h4>
          {message && <p className="text-sm text-gray-400">{message}</p>}
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onClose(id)}
          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center flex-shrink-0"
        >
          <X className="w-4 h-4 text-gray-400" />
        </motion.button>
      </div>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export function ToastContainer({ toasts, onClose, position = 'top-right' }: ToastContainerProps) {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-3 pointer-events-none`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
