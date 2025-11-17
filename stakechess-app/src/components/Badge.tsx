import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  className?: string;
}

/**
 * Badge компонент для тегов, статусов, меток
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  pill = false,
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-700 text-gray-300',
    primary: 'bg-blue-600/20 text-blue-400 border border-blue-500/30',
    success: 'bg-green-600/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30',
    danger: 'bg-red-600/20 text-red-400 border border-red-500/30',
    info: 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        font-medium
        ${pill ? 'rounded-full' : 'rounded-lg'}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

/**
 * Status badge с цветным индикатором
 */
export function StatusBadge({
  status,
  pulse = false,
}: {
  status: 'online' | 'offline' | 'away' | 'busy';
  pulse?: boolean;
}) {
  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Онлайн' },
    offline: { color: 'bg-gray-500', label: 'Офлайн' },
    away: { color: 'bg-yellow-500', label: 'Отошёл' },
    busy: { color: 'bg-red-500', label: 'Занят' },
  };

  const config = statusConfig[status];

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/50 rounded-full text-sm">
      <span className="relative flex h-2 w-2">
        {pulse && status === 'online' && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`} />
      </span>
      <span className="text-gray-300">{config.label}</span>
    </span>
  );
}

/**
 * Numbered badge для счетчиков
 */
export function CountBadge({ count, max = 99 }: { count: number; max?: number }) {
  const displayCount = count > max ? `${max}+` : count;

  if (count === 0) return null;

  return (
    <Badge variant="danger" size="sm" pill>
      {displayCount}
    </Badge>
  );
}
