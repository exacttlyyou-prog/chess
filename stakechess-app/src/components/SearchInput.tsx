import { Search, X } from 'lucide-react';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  onClear?: () => void;
  isLoading?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
}

/**
 * Search input компонент с кнопкой очистки
 */
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, isLoading, inputSize = 'md', className = '', value, ...props }, ref) => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm pl-9',
      md: 'px-4 py-2.5 text-base pl-10',
      lg: 'px-5 py-3 text-lg pl-12',
    };

    const iconSizes = {
      sm: 'w-4 h-4 left-3',
      md: 'w-5 h-5 left-3',
      lg: 'w-6 h-6 left-4',
    };

    const showClearButton = value && onClear && !isLoading;

    return (
      <div className="relative w-full">
        <Search className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${iconSizes[inputSize]}`} />

        <input
          ref={ref}
          type="search"
          value={value}
          className={`
            w-full
            bg-gray-800/50
            border
            border-gray-700
            rounded-xl
            text-white
            placeholder-gray-500
            transition-colors
            focus:outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            ${sizes[inputSize]}
            ${showClearButton ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {showClearButton && (
          <button
            type="button"
            onClick={onClear}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              p-1
              text-gray-500
              hover:text-gray-300
              transition-colors
              rounded
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/20
            "
            aria-label="Очистить поиск"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
