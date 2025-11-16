import { User } from 'lucide-react';
import { motion } from 'framer-motion';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Avatar компонент для отображения пользователя
 */
export default function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  showStatus = false,
  onClick,
  className = '',
}: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  // Получаем инициалы из имени
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-blue-600
        to-blue-500
        text-white
        font-medium
        overflow-hidden
        flex-shrink-0
        ${sizes[size]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {src ? (
        <img src={src} alt={alt || name || 'Avatar'} className="w-full h-full object-cover" />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <User className="w-1/2 h-1/2" />
      )}

      {showStatus && status && (
        <span
          className={`
            absolute
            bottom-0
            right-0
            ${statusSizes[size]}
            ${statusColors[status]}
            rounded-full
            border-2
            border-gray-900
          `}
        />
      )}
    </Component>
  );
}

/**
 * Avatar group для отображения нескольких пользователей
 */
export function AvatarGroup({
  avatars,
  max = 3,
  size = 'md',
}: {
  avatars: Array<{ src?: string; name?: string; alt?: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) {
  const visible = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((avatar, i) => (
        <Avatar key={i} {...avatar} size={size} className="ring-2 ring-gray-900" />
      ))}
      {remaining > 0 && (
        <Avatar size={size} name={`+${remaining}`} className="ring-2 ring-gray-900" />
      )}
    </div>
  );
}
