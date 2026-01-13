/**
 * Main Layout
 * Layout for main app screens
 */

import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="vault" />
      <Stack.Screen name="entry/[id]" />
      <Stack.Screen name="entry/new" />
      <Stack.Screen name="entry/edit/[id]" />
    </Stack>
  );
}
