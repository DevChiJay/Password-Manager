/**
 * Root Index - App Entry Point
 * Handles initial routing based on authentication state and onboarding
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenStorage } from '@/services/storage/tokenStorage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      // Check if onboarding has been completed
      const onboardingCompleted = await AsyncStorage.getItem('onboarding_completed');
      
      if (!onboardingCompleted) {
        // First time user - show onboarding
        router.replace('/onboarding');
        return;
      }

      // Check authentication
      const hasToken = await tokenStorage.hasToken();
      
      if (hasToken) {
        // Check if biometric is enabled
        const { biometricService } = await import('@/services/biometric');
        const biometricEnabled = await biometricService.isBiometricLoginEnabled();
        const biometricAvailable = await biometricService.isAvailable();
        
        if (biometricEnabled && biometricAvailable) {
          // Require biometric authentication before continuing
          const typeName = await biometricService.getBiometricTypeName();
          const authenticated = await biometricService.authenticate(
            `Use ${typeName} to unlock Svault`
          );
          
          if (authenticated) {
            // Biometric auth successful, go to main app
            router.replace('/(main)/vault');
          } else {
            // Biometric auth failed, go to login
            router.replace('/(auth)/login');
          }
        } else {
          // No biometric required, go directly to main app
          router.replace('/(main)/vault');
        }
      } else {
        // User is not authenticated, go to login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking initial route:', error);
      // Default to login on error
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6366f1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
