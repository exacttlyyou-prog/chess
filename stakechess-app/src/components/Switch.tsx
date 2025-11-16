import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Switch/Toggle компонент
 */
export default function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}: SwitchProps) {
  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6' },
  };

  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />

        <div
          className={`
            ${sizes[size].track}
            rounded-full
            transition-colors
            ${checked ? 'bg-blue-600' : 'bg-gray-700'}
            ${!disabled && 'hover:bg-opacity-80'}
          `}
        >
          <motion.div
            className={`
              ${sizes[size].thumb}
              bg-white
              rounded-full
              shadow-md
            `}
            initial={false}
            animate={{
              x: checked
                ? size === 'sm'
                  ? 16
                  : size === 'md'
                  ? 20
                  : 28
                : 4,
              y: size === 'sm' ? 2 : size === 'md' ? 4 : 4,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </div>
      </div>

      {label && <span className="text-sm text-gray-300">{label}</span>}
    </label>
  );
}
