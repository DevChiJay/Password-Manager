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
        // User is authenticated, go to main app
        router.replace('/(main)/vault');
      } else {
        // User is not authenticated, go to login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking initial route:', error);
      // Default to onboarding on error
      router.replace('/onboarding');
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
