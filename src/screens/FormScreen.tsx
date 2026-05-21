import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { formConfig } from '../config/formConfig';
import { useForm } from '../hooks/useForm';
import { DynamicField } from '../components/DynamicField';
import { FormValues } from '../types/form';

interface FormScreenProps {
  onSubmitSuccess: (values: FormValues) => void;
}

export function FormScreen({ onSubmitSuccess }: FormScreenProps) {
  const { values, errors, isSubmitting, isLoaded, setValue, submitForm, resetForm } =
    useForm(formConfig);

  const handleSubmit = useCallback(async () => {
    const result = await submitForm();
    if (result) {
      onSubmitSuccess(result);
    } else {
      if (Platform.OS === 'web') {
        window.alert('Preencha todos os campos obrigatórios corretamente.');
      } else {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios corretamente.');
      }
    }
  }, [submitForm, onSubmitSuccess]);

  const handleReset = useCallback(async () => {
    const doReset = async () => {
      await resetForm();
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Deseja limpar todos os dados do formulário?')) {
        doReset();
      }
    } else {
      Alert.alert('Limpar dados', 'Deseja limpar todos os dados do formulário?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: doReset },
      ]);
    }
  }, [resetForm]);

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Carregando dados salvos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 Formulário Dinâmico</Text>
        <Text style={styles.headerSubtitle}>Gerado automaticamente a partir de JSON</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>{formConfig.title}</Text>
          <Text style={styles.formSubtitle}>
            {formConfig.fields.length} campos • Campos com{' '}
            <Text style={styles.requiredStar}>*</Text> são obrigatórios
          </Text>

          <View style={styles.divider} />

          {/* Dynamic Fields */}
          {formConfig.fields.map((field) => (
            <DynamicField
              key={field.id}
              field={field}
              value={values[field.id]}
              error={errors[field.id] ?? ''}
              onChange={setValue}
            />
          ))}

          {/* Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonText}>🗑️ Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Enviar →</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Badge */}
        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeText}>
            💾 Os dados são salvos automaticamente com AsyncStorage
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
  },
  header: {
    backgroundColor: '#3B82F6',
    paddingTop: Platform.OS === 'android' ? 48 : Platform.OS === 'web' ? 24 : 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#BFDBFE',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      web: { boxShadow: '0 4px 24px rgba(59,130,246,0.10)' },
      default: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
      },
    }),
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  requiredStar: {
    color: '#EF4444',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  submitButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  infoBadge: {
    marginTop: 16,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  infoBadgeText: {
    fontSize: 12,
    color: '#1E40AF',
    fontWeight: '500',
    textAlign: 'center',
  },
});
