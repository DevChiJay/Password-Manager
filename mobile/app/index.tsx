/**
 * Root Index - App Entry Point
 * Handles initial routing based on authentication state
 */

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { tokenStorage } from '@/services/storage/tokenStorage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const hasToken = await tokenStorage.hasToken();
      
      if (hasToken) {
        // User is authenticated, go to main app
        router.replace('/(main)/vault');
      } else {
        // User is not authenticated, go to login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
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
