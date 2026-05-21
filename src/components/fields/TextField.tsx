import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormField, FormValues } from '../../types/form';

interface TextFieldProps {
  field: FormField;
  value: string;
  error: string;
  onChange: (id: string, value: FormValues[string]) => void;
}

export function TextField({ field, value, error, onChange }: TextFieldProps) {
  const isSecure = field.type === 'password';
  const isEmail = field.type === 'email';
  const isNumber = field.type === 'number';
  const isMultiline = field.type === 'multiline';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          isMultiline && styles.multiline,
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={(text) => onChange(field.id, text)}
        placeholder={field.placeholder ?? ''}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={isSecure}
        keyboardType={isEmail ? 'email-address' : isNumber ? 'numeric' : 'default'}
        autoCapitalize={isEmail ? 'none' : 'sentences'}
        multiline={isMultiline}
        numberOfLines={isMultiline ? 4 : 1}
        textAlignVertical={isMultiline ? 'top' : 'center'}
        autoCorrect={!isEmail && !isSecure}
      />
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
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  multiline: {
    height: 100,
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
  },
});
