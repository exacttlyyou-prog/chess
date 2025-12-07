import { useState, useCallback } from 'react';
import { type ValidationRule, validate } from '../utils/validation';

interface FieldConfig {
  value: unknown;
  rules?: ValidationRule[];
}

interface FormConfig {
  [key: string]: FieldConfig;
}

interface FormState {
  [key: string]: unknown;
}

interface FormErrors {
  [key: string]: string[];
}

interface FormTouched {
  [key: string]: boolean;
}

/**
 * Хук для управления формами с валидацией
 */
export function useForm<T extends FormConfig>(config: T) {
  // Начальные значения из config
  const initialValues = Object.entries(config).reduce((acc, [key, field]) => {
    acc[key] = field.value;
    return acc;
  }, {} as FormState);

  const [values, setValues] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Валидация одного поля
   */
  const validateField = useCallback(
    (fieldName: string, value: unknown): string[] => {
      const fieldConfig = config[fieldName];
      if (!fieldConfig?.rules) return [];

      const result = validate(value, fieldConfig.rules);
      return result.errors;
    },
    [config]
  );

  /**
   * Валидация всей формы
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(config).forEach((fieldName) => {
      const fieldErrors = validateField(fieldName, values[fieldName]);
      if (fieldErrors.length > 0) {
        newErrors[fieldName] = fieldErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [config, values, validateField]);

  /**
   * Изменение значения поля
   */
  const setFieldValue = useCallback((fieldName: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));

    // Валидация поля при изменении (если поле уже было touched)
    setErrors((prev) => {
      if (!prev[fieldName]) return prev;

      const fieldErrors = validateField(fieldName, value);
      if (fieldErrors.length === 0) {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [fieldName]: fieldErrors };
    });
  }, [validateField]);

  /**
   * Пометить поле как touched
   */
  const setFieldTouched = useCallback((fieldName: string, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [fieldName]: isTouched }));

    // Валидация поля при blur
    if (isTouched) {
      const fieldErrors = validateField(fieldName, values[fieldName]);
      if (fieldErrors.length > 0) {
        setErrors((prev) => ({ ...prev, [fieldName]: fieldErrors }));
      }
    }
  }, [validateField, values]);

  /**
   * Обработчик изменения input
   */
  const handleChange = useCallback(
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  /**
   * Обработчик blur input
   */
  const handleBlur = useCallback(
    (fieldName: string) => () => {
      setFieldTouched(fieldName, true);
    },
    [setFieldTouched]
  );

  /**
   * Сброс формы
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Обработчик submit формы
   */
  const handleSubmit = useCallback(
    (onSubmit: (values: FormState) => void | Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();

        // Пометить все поля как touched
        const allTouched = Object.keys(config).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as FormTouched);
        setTouched(allTouched);

        // Валидация
        const isValid = validateForm();
        if (!isValid) return;

        // Submit
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      },
    [config, values, validateForm]
  );

  /**
   * Получить props для поля
   */
  const getFieldProps = useCallback(
    (fieldName: string) => ({
      value: values[fieldName],
      onChange: handleChange(fieldName),
      onBlur: handleBlur(fieldName),
      error: touched[fieldName] ? errors[fieldName]?.[0] : undefined,
    }),
    [values, errors, touched, handleChange, handleBlur]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm,
    getFieldProps,
  };
}
