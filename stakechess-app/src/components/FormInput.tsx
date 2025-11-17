import { forwardRef, type InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Стилизованный input с поддержкой валидации и accessibility
 */
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              w-full
              px-4
              py-2.5
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon || hasError ? 'pr-10' : ''}
              bg-gray-800/50
              border
              ${hasError ? 'border-red-500 focus:border-red-400' : 'border-gray-700 focus:border-blue-500'}
              rounded-xl
              text-white
              placeholder-gray-500
              transition-colors
              focus:outline-none
              focus:ring-2
              ${hasError ? 'focus:ring-red-500/20' : 'focus:ring-blue-500/20'}
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}

          {!hasError && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
