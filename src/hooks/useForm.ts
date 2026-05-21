import { useState, useEffect, useCallback, useMemo } from 'react';
import { FormConfig, FormValues, FormErrors } from '../types/form';
import { validateForm, hasErrors } from '../utils/validation';
import { saveFormData, loadFormData, clearFormData } from '../services/storageService';

interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  isSubmitting: boolean;
  isLoaded: boolean;
  setValue: (id: string, value: FormValues[string]) => void;
  submitForm: () => Promise<FormValues | null>;
  resetForm: () => Promise<void>;
  isFormValid: boolean;
}

export function useForm(config: FormConfig): UseFormReturn {
  const initialValues = useMemo<FormValues>(() => {
    const init: FormValues = {};
    config.fields.forEach((field) => {
      if (field.type === 'checkbox') {
        init[field.id] = [];
      } else if (field.type === 'switch') {
        init[field.id] = false;
      } else {
        init[field.id] = '';
      }
    });
    return init;
  }, [config.fields]);

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await loadFormData();
      if (saved) {
        setValues((prev) => ({ ...prev, ...saved }));
      }
      setIsLoaded(true);
    })();
  }, []);

  const setValue = useCallback((id: string, value: FormValues[string]) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  }, []);

  const isFormValid = useMemo(() => {
    const errs = validateForm(config.fields, values);
    return !hasErrors(errs);
  }, [config.fields, values]);

  const submitForm = useCallback(async (): Promise<FormValues | null> => {
    const newErrors = validateForm(config.fields, values);
    setErrors(newErrors);
    if (hasErrors(newErrors)) return null;

    setIsSubmitting(true);
    try {
      await saveFormData(values);
      return values;
    } finally {
      setIsSubmitting(false);
    }
  }, [config.fields, values]);

  const resetForm = useCallback(async () => {
    await clearFormData();
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isLoaded,
    setValue,
    submitForm,
    resetForm,
    isFormValid,
  };
}
