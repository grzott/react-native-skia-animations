import { CustomLink, ThemedText, ThemedView } from "@/components/ui";

const CATEGORY = {
  id: "1",
  title: "Kategoria podcastów",
};

export default function PodcastsCategoriesScreen() {
  return (
    <ThemedView>
      <ThemedText>Kategorie podcastów</ThemedText>
      <CustomLink
        pathname="/category/[id]"
        title="Kategoria"
        params={CATEGORY}
      />
    </ThemedView>
  );
}
