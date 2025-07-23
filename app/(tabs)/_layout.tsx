import { BOTTOM_NAV_BAR_HEIGHT } from "@/constants/navigation";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

const BOTTOM_TABS_DATA = [
  {
    name: "index",
    title: "Start",
    // iconName: IconSymbolName.HOME,
  },
  {
    name: "radio",
    title: "Radio",
    // iconName: IconSymbolName.PODCASTS,
  },
  {
    name: "podcasts",
    title: "Podcasty",
    // iconName: IconSymbolName.NEWS,
  },
  {
    name: "account",
    title: "Konto",
    // iconName: IconSymbolName.CHANNELS,
  },
];

export default function BottomTabsLayout() {
  const { theme } = useUnistyles();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerTitle: {
      color: theme.colors.primary_text,
    },
    tabBar: {
      backgroundColor: theme.colors.primary_background,
      height: BOTTOM_NAV_BAR_HEIGHT,
    },
  });

  const headerScreenOptions: BottomTabNavigationOptions = {
    headerStyle: { backgroundColor: theme.colors.primary_background },
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: "center",
  };

  const bottomTabsOptions: BottomTabNavigationOptions = {
    tabBarStyle: styles.tabBar,
    tabBarActiveBackgroundColor: theme.colors.primary_background,
    tabBarInactiveBackgroundColor: theme.colors.background,
    tabBarInactiveTintColor: theme.colors.tab_icon,
    tabBarActiveTintColor: theme.colors.tab_icon_active,
  };

  return (
    <View style={styles.container}>
      <Tabs screenOptions={headerScreenOptions}>
        {BOTTOM_TABS_DATA.map((tab) => {
          return (
            <Tabs.Screen
              key={tab.name}
              name={tab.name}
              options={{
                ...bottomTabsOptions,
                title: tab.title,
              }}
            />
          );
        })}
      </Tabs>
      {/* <MiniPlayer /> */}
    </View>
  );
}
