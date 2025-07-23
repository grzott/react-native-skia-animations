import { ThemedText, ThemedView } from "@/components/ui";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";

export default function AccountScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Motyw aplikacji</ThemedText>

        <TouchableOpacity
          style={styles.themeButton}
          onPress={() =>
            UnistylesRuntime.setTheme(
              UnistylesRuntime.themeName === "light" ? "dark" : "light",
            )
          }
        >
          <ThemedText>
            Przełącz na{" "}
            {UnistylesRuntime.themeName === "light" ? "ciemny" : "jasny"} motyw
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  themeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
}));
