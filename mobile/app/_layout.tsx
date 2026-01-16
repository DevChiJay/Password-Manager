import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';

import { queryClient } from '@/utils/queryClient';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(settings)" />
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
