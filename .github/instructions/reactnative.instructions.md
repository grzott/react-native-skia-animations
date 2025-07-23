# React Native Instructions

## Component Structure

```typescript
// components/audio-player/audio-player.tsx
import React, { useState, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { useAudioStore } from "@/stores/audio-store";
import { AudioPlayerProps } from "./types";
import { styles } from "./styles";

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isLive = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { playAudio, stopAudio } = useAudioStore();

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio(audioUrl);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, audioUrl, playAudio, stopAudio]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLive ? "Live" : "Player"}</Text>
      <Pressable style={styles.button} onPress={handlePlayPause}>
        <Text>{isPlaying ? "Pause" : "Play"}</Text>
      </Pressable>
    </View>
  );
};
```

## Hooks Pattern

### Custom Hooks

```typescript
// hooks/use-audio-player.ts
import { useState, useEffect } from "react";
import { Audio } from "expo-av";

export const useAudioPlayer = (url: string) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const playAudio = async () => {
    setIsLoading(true);
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSound(sound);
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playAudio, isPlaying, isLoading };
};
```

## Performance Optimization

### React.memo

```typescript
export const AudioPlayer = React.memo<AudioPlayerProps>(
  ({ audioUrl }) => {
    // komponent
  },
  (prevProps, nextProps) => {
    return prevProps.audioUrl === nextProps.audioUrl;
  },
);
```

### useMemo & useCallback

```typescript
const PlaylistComponent = ({ items }: PlaylistProps) => {
  // Memoize calculations
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.title.localeCompare(b.title)),
    [items],
  );

  // Memoize functions passed to children
  const handleItemPress = useCallback(
    (id: string) => {
      navigation.navigate("Player", { id });
    },
    [navigation],
  );

  return (
    <FlatList
      data={sortedItems}
      renderItem={({ item }) => (
        <PlaylistItem item={item} onPress={handleItemPress} />
      )}
    />
  );
};
```

## Error Boundaries

```typescript
// components/error-boundary.tsx
import React from "react";
import { View, Text } from "react-native";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong. Please try again.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}
```

## Navigation (Expo Router)

```typescript
// app/(tabs)/index.tsx
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const navigateToPlayer = () => {
    router.push("/player/123");
  };

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
```

## React Native Rules

### ✅ Best Practices

- Use `Pressable` instead of `TouchableOpacity`
- Always define `keyExtractor` in `FlatList`
- Use `StyleSheet.create()` for styles
- Implement `getItemLayout` for long lists

### ❌ Avoid

- Inline styles in JSX
- Nested `ScrollView`
- Too deep component structures
- Rendering large lists without virtualization

### 📱 Platform Specific Code

```typescript
import { Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 44 : 0,
    ...Platform.select({
      ios: { shadowOpacity: 0.1 },
      android: { elevation: 2 },
    }),
  },
});
```

## Server-Side Like Components (Expo Router)

### Async Route Components

```typescript
// app/podcasts/[id].tsx
export default async function PodcastDetailsScreen({
  params,
}: {
  params: { id: string };
}) {
  // Data is loaded before component renders
  const podcast = await fetchPodcastDetails(params.id);

  return (
    <View style={styles.container}>
      <PodcastPlayer podcast={podcast} />
      <PodcastDetails details={podcast} />
    </View>
  );
}

// Alternative with error handling
export default async function StationScreen({
  params,
}: {
  params: { id: string };
}) {
  try {
    const [station, playlist] = await Promise.all([
      fetchStation(params.id),
      fetchPlaylist(params.id),
    ]);

    return <StationView station={station} playlist={playlist} />;
  } catch (error) {
    return <ErrorView error={error} />;
  }
}
```

### Loading States

```typescript
// app/podcasts/loading.tsx
export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
      <Text>Loading podcast...</Text>
    </View>
  );
}
```

### Error Boundaries

```typescript
// app/podcasts/error.tsx
export default function Error({
  error,
  retry,
}: {
  error: Error;
  retry: () => void;
}) {
  return (
    <View style={styles.errorContainer}>
      <Text>Something went wrong!</Text>
      <Text>{error.message}</Text>
      <Pressable onPress={retry}>
        <Text>Try again</Text>
      </Pressable>
    </View>
  );
}
```

### Benefits vs Traditional Approach

```typescript
// ❌ Traditional approach with loading states
const TraditionalComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return <DataView data={data} />;
};

// ✅ Server-side like approach
export default async function ServerLikeComponent({ params }: { params: any }) {
  const data = await fetchData(params.id);
  return <DataView data={data} />;
}
```

### Best Practices for Async Components

- Use for data-dependent routes only
- Implement proper error handling with try/catch
- Create separate loading.tsx files for loading states
- Keep heavy computations out of render
- Use Promise.all for parallel data fetching
