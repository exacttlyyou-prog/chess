import { type ReactNode } from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string | ReactNode;
  className?: string;
}

/**
 * Divider компонент для разделения контента
 */
export default function Divider({
  orientation = 'horizontal',
  label,
  className = '',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px bg-gray-700 ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={`flex items-center gap-4 ${className}`}
        role="separator"
        aria-orientation="horizontal"
      >
        <div className="flex-1 h-px bg-gray-700" />
        <span className="text-sm text-gray-500 whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-gray-700" />
      </div>
    );
  }

  return (
    <div
      className={`h-px bg-gray-700 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}
