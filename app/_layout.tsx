import { Stack } from "expo-router";
import { useUnistyles } from "react-native-unistyles";

export default function RootLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="+not-found"
        options={{
          presentation: "modal",
          title: "Not Found",
        }}
      />
      <Stack.Screen
        name="podcast/[id]"
        options={{
          presentation: "modal",
          animation: "fade",
          headerStyle: {
            backgroundColor: theme.colors.primary_background,
          },
          headerTintColor: theme.colors.primary_text,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        name="podcast-item/[id]"
        options={{
          presentation: "modal",
          animation: "fade",
          headerStyle: {
            backgroundColor: theme.colors.primary_background,
          },
          headerTintColor: theme.colors.primary_text,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        name="category/[id]"
        options={{
          presentation: "modal",
          animation: "fade",
          headerStyle: {
            backgroundColor: theme.colors.primary_background,
          },
          headerTintColor: theme.colors.primary_text,
          navigationBarHidden: false,
        }}
      />
      <Stack.Screen
        name="player"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          headerStyle: {
            backgroundColor: theme.colors.primary_background,
          },
          headerTintColor: theme.colors.primary_text,
          navigationBarHidden: false,
        }}
      />
    </Stack>
  );
}
