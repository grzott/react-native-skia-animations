import { CustomLink, ThemedText, ThemedView } from "@/components/ui";

const PODCAST = {
  id: "1",
  title: "podcast",
  description: "podcast descriptoion",
  author: "podcast author",
};

export default function PodcastsByStationScreen() {
  return (
    <ThemedView>
      <ThemedText>Podcasty po stacji</ThemedText>
      <CustomLink pathname="/podcast/[id]" title="Podcast" params={PODCAST} />
    </ThemedView>
  );
}
