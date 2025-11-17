import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

/**
 * Accordion компонент для FAQ, collapse content
 */
export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="glass-card overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="
                w-full
                px-4
                py-3
                flex
                items-center
                justify-between
                text-left
                hover:bg-white/5
                transition-colors
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/20
              "
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium text-white">{item.title}</span>
              </span>

              <ChevronDown
                className={`
                  w-5
                  h-5
                  text-gray-400
                  transition-transform
                  ${isOpen ? 'rotate-180' : ''}
                `}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4 text-gray-300 border-t border-white/5">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
