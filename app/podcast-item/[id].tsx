import { ThemedText, ThemedView } from "@/components/ui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";

export default function SinglePodcast() {
  const navigation = useNavigation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, title, image, description, author } = useLocalSearchParams();

  React.useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <ThemedView>
      <ThemedText>podcast item id: {id}</ThemedText>
      <ThemedText>podcast item title: {title}</ThemedText>
      <ThemedText>podcast item description: {description}</ThemedText>
      <ThemedText>podcast item author: {author}</ThemedText>
    </ThemedView>
  );
}
