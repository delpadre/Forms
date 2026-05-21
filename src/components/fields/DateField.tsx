import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import { FormField, FormValues } from '../../types/form';

interface DateFieldProps {
  field: FormField;
  value: string;
  error: string;
  onChange: (id: string, value: FormValues[string]) => void;
}

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').substring(0, 8);
  let formatted = digits;
  if (digits.length > 2) {
    formatted = digits.substring(0, 2) + '/' + digits.substring(2);
  }
  if (digits.length > 4) {
    formatted =
      digits.substring(0, 2) + '/' + digits.substring(2, 4) + '/' + digits.substring(4);
  }
  return formatted;
}

// Simple date picker for web and native
function DatePickerModal({
  visible,
  value,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  value: string;
  onConfirm: (date: string) => void;
  onCancel: () => void;
}) {
  const today = new Date();
  const [inputVal, setInputVal] = useState(value || '');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onCancel}>
        <View style={styles.pickerModal}>
          <Text style={styles.pickerTitle}>Selecionar Data</Text>
          <Text style={styles.pickerHint}>Digite no formato DD/MM/AAAA</Text>
          <TextInput
            style={styles.pickerInput}
            value={inputVal}
            onChangeText={(t) => setInputVal(formatDateInput(t))}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            maxLength={10}
          />
          <View style={styles.pickerButtons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => onConfirm(inputVal)}
            >
              <Text style={styles.confirmBtnText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export function DateField({ field, value, error, onChange }: DateFieldProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleChangeText = (text: string) => {
    onChange(field.id, formatDateInput(text));
  };

  const handleConfirm = (date: string) => {
    onChange(field.id, date);
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {field.label}
        {field.required && <Text style={styles.required}> *</Text>}
      </Text>

      <View style={[styles.inputRow, error ? styles.inputRowError : null]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          maxLength={10}
        />
        <TouchableOpacity
          style={styles.calendarBtn}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <DatePickerModal
        visible={pickerVisible}
        value={value}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
  },
  inputRowError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  calendarBtn: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
  },
  calendarIcon: {
    fontSize: 18,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#EF4444',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  pickerModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 360,
    padding: 24,
    ...Platform.select({
      web: { boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
      },
    }),
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  pickerHint: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginBottom: 16,
  },
  pickerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
