/**
 * Create Entry Screen
 * Quick access to create new password entry
 */

import { useEffect } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { View } from 'react-native';

export default function CreateScreen() {
  const router = useRouter();

  // Navigate to new entry screen whenever this tab is focused
  useFocusEffect(() => {
    router.push('/(main)/entry/new');
  });

  // Return empty view (screen just redirects)
  return <View />;
}
