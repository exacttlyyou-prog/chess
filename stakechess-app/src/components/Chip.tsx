import { X } from 'lucide-react';
import { type ReactNode } from 'react';

interface ChipProps {
  label: string;
  icon?: ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

/**
 * Chip компонент для выбранных тегов, фильтров
 */
export default function Chip({
  label,
  icon,
  onRemove,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
}: ChipProps) {
  const variants = {
    default: 'bg-gray-700 text-gray-300 hover:bg-gray-600',
    primary: 'bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30',
    success: 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-600/30',
    danger: 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        font-medium
        transition-colors
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="
            flex-shrink-0
            -mr-1
            p-0.5
            rounded-full
            hover:bg-white/10
            transition-colors
            focus:outline-none
            focus:ring-1
            focus:ring-white/30
          "
          aria-label={`Удалить ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

/**
 * ChipGroup для отображения списка chips
 */
export function ChipGroup({
  items,
  onRemove,
  variant = 'default',
  maxVisible,
}: {
  items: Array<{ id: string; label: string; icon?: ReactNode }>;
  onRemove?: (id: string) => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  maxVisible?: number;
}) {
  const visibleItems = maxVisible ? items.slice(0, maxVisible) : items;
  const hiddenCount = maxVisible && items.length > maxVisible ? items.length - maxVisible : 0;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleItems.map((item) => (
        <Chip
          key={item.id}
          label={item.label}
          icon={item.icon}
          onRemove={onRemove ? () => onRemove(item.id) : undefined}
          variant={variant}
        />
      ))}
      {hiddenCount > 0 && (
        <Chip label={`+${hiddenCount}`} variant="default" />
      )}
    </div>
  );
}
