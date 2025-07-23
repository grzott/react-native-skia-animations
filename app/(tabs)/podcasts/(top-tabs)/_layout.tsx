import { MaterialTopTabs } from "@/components/navigation";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { useUnistyles } from "react-native-unistyles";

const TOP_TABS_DATA = [
  {
    title: "Radia",
    name: "index",
  },
  {
    title: "kategorie",
    name: "categories",
  },
  {
    title: "Ulubione",
    name: "favourite",
  },
  {
    title: "Wyszukaj",
    name: "search",
  },
];

export default function PodcastsTopTabLayout() {
  const { theme } = useUnistyles();

  const topTabScreenOptions: MaterialTopTabNavigationOptions = {
    tabBarAllowFontScaling: true,
    tabBarActiveTintColor: theme.colors.primary_text,
    tabBarLabelStyle: {
      textTransform: "uppercase",
      fontSize: 12,
    },
    tabBarStyle: {
      backgroundColor: theme.colors.secondary_background,
    },
    tabBarItemStyle: { width: "auto", paddingHorizontal: 12 },
    tabBarIndicatorStyle: { backgroundColor: theme.colors.secondary },
    tabBarScrollEnabled: true,
    lazy: true,
  };

  return (
    <MaterialTopTabs screenOptions={topTabScreenOptions}>
      {TOP_TABS_DATA.map((tab) => (
        <MaterialTopTabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ title: tab.title }}
        />
      ))}
    </MaterialTopTabs>
  );
}
