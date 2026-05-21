export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'multiline'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: FieldOption[];
}

export interface FormConfig {
  title: string;
  fields: FormField[];
}

export type FormValues = Record<string, string | boolean | string[]>;

export type FormErrors = Record<string, string>;
