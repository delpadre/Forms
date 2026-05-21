import { FormField, FormValues, FormErrors } from '../types/form';

export function validateField(field: FormField, value: FormValues[string]): string {
  if (field.required) {
    if (value === undefined || value === null || value === '') {
      return `${field.label} é obrigatório`;
    }
    if (Array.isArray(value) && value.length === 0) {
      return `Selecione ao menos uma opção em ${field.label}`;
    }
    if (typeof value === 'boolean' && field.type === 'radio' && !value) {
      return `${field.label} é obrigatório`;
    }
  }

  if (!value && !field.required) return '';

  if (field.type === 'email' && typeof value === 'string' && value.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'E-mail inválido';
    }
  }

  if (field.type === 'password' && typeof value === 'string' && value.length > 0) {
    if (value.length < 6) {
      return 'A senha deve ter ao menos 6 caracteres';
    }
  }

  if (field.type === 'number' && typeof value === 'string' && value.trim() !== '') {
    const num = Number(value);
    if (isNaN(num) || num < 0) {
      return 'Informe um número válido';
    }
  }

  if (field.type === 'date' && typeof value === 'string' && value.trim() !== '') {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(value)) {
      return 'Data inválida (use DD/MM/AAAA)';
    }
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return 'Data inválida';
    }
  }

  return '';
}

export function validateForm(fields: FormField[], values: FormValues): FormErrors {
  const errors: FormErrors = {};
  fields.forEach((field) => {
    const error = validateField(field, values[field.id]);
    if (error) {
      errors[field.id] = error;
    }
  });
  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.values(errors).some((e) => e !== '');
}
