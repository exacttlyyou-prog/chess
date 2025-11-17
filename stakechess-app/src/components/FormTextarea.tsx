import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

/**
 * Стилизованный textarea с поддержкой валидации
 */
const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount,
      maxLength,
      className = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const currentLength = value ? String(value).length : 0;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            maxLength={maxLength}
            value={value}
            className={`
              w-full
              px-4
              py-2.5
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
              resize-y
              min-h-[100px]
              ${className}
            `}
            {...props}
          />

          {hasError && (
            <div className="absolute right-3 top-3 text-red-500">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <div className="flex-1">
            {error && (
              <p id={`${textareaId}-error`} className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {!error && helperText && (
              <p id={`${textareaId}-helper`} className="text-sm text-gray-500">
                {helperText}
              </p>
            )}
          </div>

          {showCharCount && maxLength && (
            <p className="text-sm text-gray-500 ml-2">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
