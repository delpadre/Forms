import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { formConfig } from '../config/formConfig';
import { FormValues } from '../types/form';

interface ResultScreenProps {
  values: FormValues;
  onBack: () => void;
}

function formatValue(value: FormValues[string], fieldId: string): string {
  if (typeof value === 'boolean') {
    return value ? 'Sim' : 'Não';
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '—';
    const field = formConfig.fields.find((f) => f.id === fieldId);
    return value
      .map((v) => field?.options?.find((o) => o.value === v)?.label ?? v)
      .join(', ');
  }
  if (typeof value === 'string') {
    if (value.trim() === '') return '—';
    // Look up label for select/radio
    const field = formConfig.fields.find((f) => f.id === fieldId);
    if (field?.options) {
      const option = field.options.find((o) => o.value === value);
      if (option) return option.label;
    }
    if (field?.type === 'password') return '••••••';
    return value;
  }
  return String(value);
}

function getFieldIcon(type: string): string {
  const icons: Record<string, string> = {
    text: '📝',
    email: '✉️',
    password: '🔒',
    number: '🔢',
    multiline: '📄',
    select: '📋',
    radio: '🔘',
    checkbox: '☑️',
    switch: '🔀',
    date: '📅',
  };
  return icons[type] ?? '📌';
}

export function ResultScreen({ values, onBack }: ResultScreenProps) {
  const fieldResults = useMemo(() => {
    return formConfig.fields.map((field) => ({
      field,
      displayValue: formatValue(values[field.id], field.id),
    }));
  }, [values]);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>✅ Dados Enviados</Text>
        <Text style={styles.headerSubtitle}>Formulário enviado com sucesso!</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Card */}
        <View style={styles.successBanner}>
          <Text style={styles.successIcon}>🎉</Text>
          <Text style={styles.successTitle}>Cadastro realizado!</Text>
          <Text style={styles.successText}>
            Seus dados foram salvos localmente com AsyncStorage.
          </Text>
        </View>

        {/* Results Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo dos Dados</Text>
          <View style={styles.divider} />

          {fieldResults.map(({ field, displayValue }, index) => (
            <View
              key={field.id}
              style={[
                styles.resultRow,
                index === fieldResults.length - 1 && styles.resultRowLast,
              ]}
            >
              <View style={styles.resultLeft}>
                <Text style={styles.fieldIcon}>{getFieldIcon(field.type)}</Text>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.fieldType}>{field.type}</Text>
                </View>
              </View>
              <Text style={styles.fieldValue} numberOfLines={3}>
                {displayValue}
              </Text>
            </View>
          ))}
        </View>

        {/* JSON Preview */}
        <View style={styles.jsonCard}>
          <Text style={styles.jsonTitle}>📦 JSON Salvo</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.jsonText}>
              {JSON.stringify(values, null, 2)}
            </Text>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.newFormBtn} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.newFormBtnText}>📝 Novo Formulário</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  header: {
    backgroundColor: '#10B981',
    paddingTop: Platform.OS === 'android' ? 48 : Platform.OS === 'web' ? 24 : 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  backBtn: {
    marginBottom: 12,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#A7F3D0',
    fontWeight: '500',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  successBanner: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  successIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#065F46',
    marginBottom: 4,
  },
  successText: {
    fontSize: 13,
    color: '#047857',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      web: { boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 12,
  },
  resultRowLast: {
    borderBottomWidth: 0,
  },
  resultLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 10,
  },
  fieldIcon: {
    fontSize: 18,
    marginTop: 1,
  },
  resultTextContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  fieldType: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  fieldValue: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
    maxWidth: '45%',
    textAlign: 'right',
  },
  jsonCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  jsonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 8,
  },
  jsonText: {
    fontSize: 11,
    color: '#7DD3FC',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 18,
  },
  newFormBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    ...Platform.select({
      web: { boxShadow: '0 4px 12px rgba(59,130,246,0.40)' },
      default: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  newFormBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
