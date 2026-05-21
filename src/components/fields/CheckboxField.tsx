import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormField, FormValues } from '../../types/form';

interface CheckboxFieldProps {
  field: FormField;
  value: string[];
  error: string;
  onChange: (id: string, value: FormValues[string]) => void;
}

export function CheckboxField({ field, value, error, onChange }: CheckboxFieldProps) {
  const toggleOption = (optionValue: string) => {
    const current = Array.isArray(value) ? value : [];
    const updated = current.includes(optionValue)
      ? current.filter((v) => v !== optionValue)
      : [...current, optionValue];
    onChange(field.id, updated);
  };

  const currentValues = Array.isArray(value) ? value : [];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>

      <View style={styles.optionsContainer}>
        {field.options?.map((option) => {
          const isChecked = currentValues.includes(option.value);
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, isChecked && styles.optionChecked]}
              onPress={() => toggleOption(option.value)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.optionText, isChecked && styles.optionTextChecked]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    gap: 8,
  },
  optionChecked: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: '#3B82F6',
    backgroundColor: '#3B82F6',
  },
  checkmark: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  optionTextChecked: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444',
  },
});
