import { Star } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

/**
 * Rating компонент для оценок
 */
export default function Rating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  size = 'md',
  showValue = false,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayValue;

          return (
            <motion.button
              key={i}
              type="button"
              disabled={readOnly}
              onClick={() => !readOnly && onChange?.(starValue)}
              onMouseEnter={() => !readOnly && setHoverValue(starValue)}
              onMouseLeave={() => !readOnly && setHoverValue(null)}
              whileHover={!readOnly ? { scale: 1.1 } : undefined}
              whileTap={!readOnly ? { scale: 0.9 } : undefined}
              className={`
                ${readOnly ? 'cursor-default' : 'cursor-pointer'}
                transition-colors
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                focus:ring-offset-gray-900
                rounded
              `}
            >
              <Star
                className={`
                  ${sizes[size]}
                  ${isFilled ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}
                  transition-colors
                `}
              />
            </motion.button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm text-gray-400">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
}
