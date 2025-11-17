import { useState, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

/**
 * Tooltip компонент
 */
export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`
              absolute
              z-50
              px-3
              py-2
              bg-gray-900
              text-white
              text-sm
              rounded-lg
              shadow-xl
              border
              border-white/10
              whitespace-nowrap
              pointer-events-none
              ${positionStyles[position]}
              ${className}
            `}
            role="tooltip"
          >
            {content}

            {/* Arrow */}
            <div
              className={`
                absolute
                w-2
                h-2
                bg-gray-900
                border-white/10
                rotate-45
                ${
                  position === 'top'
                    ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b'
                    : position === 'bottom'
                    ? 'top-[-4px] left-1/2 -translate-x-1/2 border-l border-t'
                    : position === 'left'
                    ? 'right-[-4px] top-1/2 -translate-y-1/2 border-r border-t'
                    : 'left-[-4px] top-1/2 -translate-y-1/2 border-l border-b'
                }
              `}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
