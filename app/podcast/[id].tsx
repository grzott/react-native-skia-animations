import { CustomLink, ThemedText, ThemedView } from "@/components/ui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";

const PODCAST_ITEM = {
  id: "11",
  title: "podcast item",
  description: "podcast item descriptoion",
  author: "podcast item author",
};

export default function SinglePodcast() {
  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, image, description, author } = useLocalSearchParams();

  React.useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <ThemedView>
      <ThemedText>podcast id: {id}</ThemedText>
      <ThemedText>podcast title: {title}</ThemedText>
      <ThemedText>podcast description: {description}</ThemedText>
      <ThemedText>podcast author: {author}</ThemedText>
      <CustomLink
        pathname="/podcast-item/[id]"
        title="Podcast item "
        params={PODCAST_ITEM}
      />
    </ThemedView>
  );
}
