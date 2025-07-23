import { Text, type TextProps } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { useAnimatedTheme } from "react-native-unistyles/reanimated";

const COLOR_TRANSITION_DURATION = 200;

// Font weight variants
type FontWeight = "light" | "normal" | "medium" | "bold" | "black";

// Font size variants
type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

export interface ThemedTextProps extends TextProps {
  /**
   * Font weight variant
   * @default 'normal'
   */
  weight?: FontWeight;
  /**
   * Font size variant
   * @default 'base'
   */
  size?: FontSize;
}

export function ThemedText({
  style,
  weight = "normal",
  size = "base",
  ...rest
}: ThemedTextProps) {
  const theme = useAnimatedTheme();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(theme.value.colors.primary_background, {
        duration: COLOR_TRANSITION_DURATION,
      }),
    };
  });
  return (
    <Text
      style={[
        styles.default,
        weightStyles[weight],
        animatedStyle,
        sizeStyles[size],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  default: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.regular,
  },
}));

const weightStyles = StyleSheet.create((theme) => ({
  light: {
    fontFamily: theme.fonts.light,
  },
  normal: {
    fontFamily: theme.fonts.regular,
  },
  medium: {
    fontFamily: theme.fonts.medium,
  },
  bold: {
    fontFamily: theme.fonts.bold,
  },
  black: {
    fontFamily: theme.fonts.black,
  },
}));

const sizeStyles = StyleSheet.create(() => ({
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
  },
  "2xl": {
    fontSize: 24,
    lineHeight: 32,
  },
}));
