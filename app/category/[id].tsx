import { CustomLink, ThemedScrollView, ThemedText } from "@/components/ui";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";

const PODCAST = {
  id: "1",
  title: "podcast",
  description: "podcast descriptoion",
  author: "podcast author",
};

export default function CategoryScreen() {
  const { id, title } = useLocalSearchParams();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <ThemedScrollView>
      <ThemedText>category: {id}</ThemedText>
      <ThemedText>category title: {title}</ThemedText>
      <CustomLink pathname="/podcast/[id]" title="Podcast" params={PODCAST} />
    </ThemedScrollView>
  );
}
