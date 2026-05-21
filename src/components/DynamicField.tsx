import React, { useCallback } from 'react';
import { FormField, FormValues } from '../types/form';
import { TextField } from './fields/TextField';
import { SelectField } from './fields/SelectField';
import { RadioField } from './fields/RadioField';
import { CheckboxField } from './fields/CheckboxField';
import { SwitchField } from './fields/SwitchField';
import { DateField } from './fields/DateField';

interface DynamicFieldProps {
  field: FormField;
  value: FormValues[string];
  error: string;
  onChange: (id: string, value: FormValues[string]) => void;
}

export function DynamicField({ field, value, error, onChange }: DynamicFieldProps) {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'multiline':
      return (
        <TextField
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={onChange}
        />
      );

    case 'select':
      return (
        <SelectField
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={onChange}
        />
      );

    case 'radio':
      return (
        <RadioField
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={onChange}
        />
      );

    case 'checkbox':
      return (
        <CheckboxField
          field={field}
          value={Array.isArray(value) ? value : []}
          error={error}
          onChange={onChange}
        />
      );

    case 'switch':
      return (
        <SwitchField
          field={field}
          value={typeof value === 'boolean' ? value : false}
          error={error}
          onChange={onChange}
        />
      );

    case 'date':
      return (
        <DateField
          field={field}
          value={typeof value === 'string' ? value : ''}
          error={error}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
