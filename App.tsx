import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FormScreen } from './src/screens/FormScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { FormValues } from './src/types/form';

type AppScreen = 'form' | 'result';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('form');
  const [submittedValues, setSubmittedValues] = useState<FormValues>({});

  const handleSubmitSuccess = useCallback((values: FormValues) => {
    setSubmittedValues(values);
    setScreen('result');
  }, []);

  const handleBack = useCallback(() => {
    setScreen('form');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {screen === 'form' ? (
        <FormScreen onSubmitSuccess={handleSubmitSuccess} />
      ) : (
        <ResultScreen values={submittedValues} onBack={handleBack} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
  },
});
