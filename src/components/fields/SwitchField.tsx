import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { FormField, FormValues } from '../../types/form';

interface SwitchFieldProps {
  field: FormField;
  value: boolean;
  error: string;
  onChange: (id: string, value: FormValues[string]) => void;
}

export function SwitchField({ field, value, error, onChange }: SwitchFieldProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>
            {field.label}
            {field.required && <Text style={styles.required}> *</Text>}
          </Text>
          <Text style={styles.status}>{value ? 'Ativado' : 'Desativado'}</Text>
        </View>
        <Switch
          value={Boolean(value)}
          onValueChange={(v) => onChange(field.id, v)}
          trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
          thumbColor={value ? '#3B82F6' : '#9CA3AF'}
          ios_backgroundColor="#E5E7EB"
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  required: {
    color: '#EF4444',
  },
  status: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#EF4444',
  },
});
