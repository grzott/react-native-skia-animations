import { View, type ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { useAnimatedTheme } from "react-native-unistyles/reanimated";

const BACKGROUND_COLOR_TRANSITION_DURATION = 200;

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const theme = useAnimatedTheme();

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(theme.value.colors.primary_background, {
        duration: BACKGROUND_COLOR_TRANSITION_DURATION,
      }),
    };
  });

  return (
    <Animated.View style={[animatedContainerStyle, style]}>
      <View style={[defaultStyles.container]} {...otherProps} />
    </Animated.View>
  );
}

const defaultStyles = StyleSheet.create((theme) => ({
  container: {
    height: "100%",
    alignItems: "center",
  },
}));
