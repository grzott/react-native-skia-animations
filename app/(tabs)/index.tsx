import { CustomLink, ThemedScrollView, ThemedText } from "@/components/ui";

export default function StartScreen() {
  return (
    <ThemedScrollView>
      <ThemedText>Start screen</ThemedText>
      <CustomLink pathname="/player" title="Player" />
    </ThemedScrollView>
  );
}
