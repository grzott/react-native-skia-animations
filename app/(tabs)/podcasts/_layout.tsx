import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="(top-tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
