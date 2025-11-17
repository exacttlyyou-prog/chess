import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Card компонент с различными вариантами
 */
export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick,
  className = '',
}: CardProps) {
  const variants = {
    default: 'bg-gray-800/50 border border-gray-700',
    glass: 'glass-card',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const Component = clickable || onClick ? motion.button : motion.div;

  return (
    <Component
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        rounded-2xl
        ${variants[variant]}
        ${paddings[padding]}
        ${clickable ? 'cursor-pointer' : ''}
        ${hover ? 'transition-shadow hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

/**
 * Card с header и footer
 */
export function StructuredCard({
  header,
  footer,
  children,
  variant = 'glass',
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
}) {
  return (
    <Card variant={variant} padding="none">
      {header && (
        <div className="px-6 py-4 border-b border-white/10">{header}</div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-white/10">{footer}</div>
      )}
    </Card>
  );
}

/**
 * Stat card для отображения метрик
 */
export function StatCard({
  label,
  value,
  icon,
  trend,
  trendValue,
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <Card variant="glass" padding="md" hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {trend && trendValue && (
            <p className={`text-sm mt-1 ${trendColors[trend]}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-white/5 rounded-xl">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
