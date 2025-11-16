import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Dropdown компонент с поиском и keyboard navigation
 */
export default function Dropdown({
  items,
  value,
  onChange,
  placeholder = 'Выберите опцию',
  label,
  error,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Закрытие при клике вне dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (itemValue: string) => {
    onChange(itemValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full
          px-4
          py-2.5
          bg-gray-800/50
          border
          ${error ? 'border-red-500' : 'border-gray-700'}
          rounded-xl
          text-left
          flex
          items-center
          justify-between
          transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'}
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500/20
        `}
      >
        <span className="flex items-center gap-2">
          {selectedItem?.icon}
          <span className={selectedItem ? 'text-white' : 'text-gray-500'}>
            {selectedItem?.label || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="
              absolute
              z-50
              w-full
              mt-2
              glass-card
              border
              border-white/10
              rounded-xl
              shadow-2xl
              overflow-hidden
            "
          >
            {/* Search */}
            {items.length > 5 && (
              <div className="p-2 border-b border-white/10">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Поиск..."
                  className="
                    w-full
                    px-3
                    py-2
                    bg-gray-800/50
                    border
                    border-gray-700
                    rounded-lg
                    text-white
                    text-sm
                    placeholder-gray-500
                    focus:outline-none
                    focus:border-blue-500
                  "
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Items */}
            <div className="max-h-60 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-3 text-center text-gray-500 text-sm">
                  Ничего не найдено
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => !item.disabled && handleSelect(item.value)}
                    disabled={item.disabled}
                    className={`
                      w-full
                      px-4
                      py-2.5
                      flex
                      items-center
                      gap-2
                      text-left
                      transition-colors
                      ${item.value === value ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300'}
                      ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5'}
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
