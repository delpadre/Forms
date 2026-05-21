import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormValues } from '../types/form';

const STORAGE_KEY = '@dynamic_form_data';

export async function saveFormData(data: FormValues): Promise<void> {
  try {
    const json = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    throw error;
  }
}

export async function loadFormData(): Promise<FormValues | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json === null) return null;
    return JSON.parse(json) as FormValues;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return null;
  }
}

export async function clearFormData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw error;
  }
}
