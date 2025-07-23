import { ScrollView, type ScrollViewProps, type ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { useAnimatedTheme } from "react-native-unistyles/reanimated";

const BACKGROUND_COLOR_TRANSITION_DURATION = 200;

export type ThemedScrollViewProps = {
  contentStyles?: ScrollViewProps["contentContainerStyle"];
} & ViewProps;

export function ThemedScrollView({
  style,
  contentStyles,
  ...otherProps
}: ThemedScrollViewProps) {
  const theme = useAnimatedTheme();

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(theme.value.colors.primary_background, {
        duration: BACKGROUND_COLOR_TRANSITION_DURATION,
      }),
    };
  });

  return (
    <Animated.View
      style={[defaultStyles.container, animatedContainerStyle, style]}
    >
      <ScrollView
        contentContainerStyle={[defaultStyles.contentContainer, contentStyles]}
        style={{ flex: 1 }}
        {...otherProps}
      />
    </Animated.View>
  );
}

const defaultStyles = StyleSheet.create((theme) => ({
  contentContainer: {
    alignItems: "center",
  },
  container: {
    height: "100%",
  },
}));
