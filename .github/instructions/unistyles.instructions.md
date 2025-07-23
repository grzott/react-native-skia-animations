# Styling Instructions - Unistyles 2.0

## Installation and Configuration

### Installation

```bash
npx expo install react-native-unistyles
```

### Theme Configuration

```typescript
// styles/theme.ts
export const theme = {
  colors: {
    primary: "#C8102E", // Polish Radio Red
    secondary: "#1E1E1E",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#000000",
    textSecondary: "#666666",
    error: "#FF0000",
    success: "#00AA00",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    weights: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    round: 50,
  },
} as const;

export type AppTheme = typeof theme;
```

### Unistyles Setup

```typescript
// styles/unistyles.ts
import { UnistylesRegistry } from 'react-native-unistyles';
import { theme } from './theme';

// Definiuj breakpoints
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// Register theme and breakpoints
UnistylesRegistry
  .addBreakpoints(breakpoints)
  .addThemes({
    light: theme,
    dark: {
      ...theme,
      colors: {
        ...theme.colors,
        background: '#000000',
        surface: '#1E1E1E',
        text: '#FFFFFF',
        textSecondary: '#CCCCCC',
      },
    },
  })
  .addConfig({
    adaptiveThemes: true,
  });

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends typeof breakpoints {}
  export interface UnistylesThemes {
    light: typeof theme;
    dark: typeof theme;
  }
}
```

## Style Structure

### Component Styles

```typescript
// components/audio-player/styles.ts
import { createStyleSheet } from "react-native-unistyles";

export const styles = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    flex: 1,
  },
  playButton: {
    backgroundColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.round,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
  // Responsive styles
  containerTablet: {
    variants: {
      size: {
        tablet: {
          padding: theme.spacing.lg,
          maxWidth: 600,
          alignSelf: "center",
        },
      },
    },
  },
}));
```

### Usage in Component

```typescript
// components/audio-player/audio-player.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useStyles } from "react-native-unistyles";
import { styles } from "./styles";

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  isPlaying,
}) => {
  const { styles: s, theme } = useStyles(styles);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>{title}</Text>
      </View>
      <Pressable style={s.playButton} onPress={() => {}}>
        <Text style={s.playButtonText}>{isPlaying ? "Pause" : "Play"}</Text>
      </Pressable>
    </View>
  );
};
```

## Responsiveness

### Breakpoint Styles

```typescript
export const styles = createStyleSheet((theme, rt) => ({
  container: {
    padding: theme.spacing.md,
    // Responsive padding
    paddingHorizontal: {
      xs: theme.spacing.sm,
      sm: theme.spacing.md,
      lg: theme.spacing.xl,
    },
  },
  grid: {
    flexDirection: {
      xs: "column",
      md: "row",
    },
    gap: theme.spacing.md,
  },
  card: {
    flex: {
      xs: 1,
      md: 0.5,
      lg: 0.33,
    },
  },
}));
```

### Runtime Info

```typescript
const MyComponent = () => {
  const { styles: s, theme, rt } = useStyles(styles);

  // Access to screen information
  const isTablet = rt.screen.width > 768;
  const isLandscape = rt.orientation === "landscape";

  return (
    <View style={[s.container, isTablet && s.containerTablet]}>
      {/* content */}
    </View>
  );
};
```

## Theme Switching

### Dark Mode Toggle

```typescript
// hooks/use-theme.ts
import { useStyles } from "react-native-unistyles";

export const useTheme = () => {
  const { theme, setTheme } = useStyles();

  const toggleTheme = () => {
    setTheme(theme.name === "light" ? "dark" : "light");
  };

  return {
    theme,
    toggleTheme,
    isDark: theme.name === "dark",
  };
};
```

## Global Styles

### Typography System

```typescript
// styles/typography.ts
import { createStyleSheet } from "react-native-unistyles";

export const typography = createStyleSheet((theme) => ({
  h1: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    lineHeight: theme.typography.sizes.xxl * 1.2,
  },
  h2: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    lineHeight: theme.typography.sizes.xl * 1.2,
  },
  body: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.text,
    lineHeight: theme.typography.sizes.md * 1.5,
  },
  caption: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.sizes.sm * 1.4,
  },
}));
```

### Button Variants

```typescript
// styles/buttons.ts
export const buttonStyles = createStyleSheet((theme) => ({
  base: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  text: {
    backgroundColor: "transparent",
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
}));
```

## Styling Rules

### ✅ Best Practices

- Use theme values instead of hardcoded values
- Create reusable style components
- Implement responsiveness with breakpoints
- Group similar styles in variants
- Use meaningful naming conventions

### ❌ Avoid

- Inline styles in JSX
- Hardcoded colors and spacing
- Platform-specific styles without necessity
- Too deeply nested selectors
- Magic numbers in styles

### 📱 Performance Tips

```typescript
// Optimize styles with useMemo if needed
const optimizedStyles = useMemo(
  () =>
    StyleSheet.create({
      heavyComputation: {
        // complex styles
      },
    }),
  [dependency],
);

// Use variants instead of conditional styling
const dynamicStyle = createStyleSheet((theme) => ({
  button: {
    variants: {
      size: {
        small: { padding: theme.spacing.sm },
        large: { padding: theme.spacing.lg },
      },
      variant: {
        primary: { backgroundColor: theme.colors.primary },
        secondary: { backgroundColor: theme.colors.secondary },
      },
    },
  },
}));
```

### 🎨 Animation Integration

```typescript
// Integration with Reanimated
import Animated from "react-native-reanimated";

const AnimatedComponent = () => {
  const { styles: s, theme } = useStyles(styles);

  return (
    <Animated.View style={[s.container, animatedStyle]}>
      {/* content */}
    </Animated.View>
  );
};
```
