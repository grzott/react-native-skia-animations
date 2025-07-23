# TypeScript Instructions

## Type Configuration

### Type Structure

```typescript
// types/index.ts - Central type exports
export * from "./audio";
export * from "./user";
export * from "./navigation";
export * from "./api";

// types/audio.ts
export interface AudioStream {
  id: string;
  title: string;
  url: string;
  isLive: boolean;
  station: RadioStation;
}

export interface RadioStation {
  id: string;
  name: string;
  logo: string;
  frequency?: string;
}

export type PlaybackState = "playing" | "paused" | "stopped" | "loading";

export enum AudioQuality {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
```

## Strict TypeScript Rules

### tsconfig.json rules

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Props Types

```typescript
// Always define interface for props
interface AudioPlayerProps {
  audioUrl: string;
  isLive?: boolean;
  onPlaybackChange?: (state: PlaybackState) => void;
  station: RadioStation;
}

// Use React.FC with type
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isLive = false,
  onPlaybackChange,
  station,
}) => {
  // component
};
```

## API Types

### Response Types

```typescript
// types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface StationsResponse {
  stations: RadioStation[];
  total: number;
  page: number;
}

# Usage
const fetchStations = async (): Promise<ApiResponse<StationsResponse>> => {
  const response = await fetch("/api/stations");
  return response.json();
};
```

### Zustand Store Types

```typescript
// stores/audio-store.ts
interface AudioState {
  currentStream: AudioStream | null;
  playbackState: PlaybackState;
  volume: number;
  isMuted: boolean;
}

interface AudioActions {
  playStream: (stream: AudioStream) => void;
  pausePlayback: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export type AudioStore = AudioState & AudioActions;

export const useAudioStore = create<AudioStore>((set, get) => ({
  // implementation
}));
```

## Utility Types

### Helpful types

```typescript
// types/utils.ts

// Pick specific fields
export type StreamSummary = Pick<AudioStream, "id" | "title" | "isLive">;

// Omit fields
export type CreateStream = Omit<AudioStream, "id">;

// Partial for updates
export type UpdateStream = Partial<AudioStream> & { id: string };

// Union types
export type ThemeMode = "light" | "dark" | "system";
export type Language = "pl" | "en";

// Record for mappings
export type StationFrequencies = Record<string, string>;
```

## Error Handling

### Custom Error Types

```typescript
// types/errors.ts
export class AudioError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AudioError";
  }
}

export class NetworkError extends AudioError {
  constructor(message: string, statusCode: number) {
    super(message, "NETWORK_ERROR", statusCode);
  }
}

// Usage with Result type
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export const playAudio = async (
  url: string,
): Promise<Result<void, AudioError>> => {
  try {
    // play audio logic
    return { success: true, data: undefined };
  } catch (error) {
    return {
      success: false,
      error: new AudioError("Playback failed", "PLAYBACK_ERROR"),
    };
  }
};
```

## Generics

### Generic Components

```typescript
// Reusable list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export const List = <T>({ items, renderItem, keyExtractor }: ListProps<T>) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
    />
  );
};

// Usage
<List<RadioStation>
  items={stations}
  renderItem={(station) => <StationItem station={station} />}
  keyExtractor={(station) => station.id}
/>;
```

## Type Guards

```typescript
// Type guards for runtime checking
export const isLiveStream = (
  stream: AudioStream,
): stream is LiveAudioStream => {
  return stream.isLive === true;
};

export const isValidAudioUrl = (url: unknown): url is string => {
  return typeof url === "string" && url.startsWith("http");
};

// Usage
if (isLiveStream(stream)) {
  // TypeScript knows stream is LiveAudioStream here
  console.log(stream.liveMetadata);
}
```

## TypeScript Rules

### ✅ Best Practices

- Always type component props
- Use union types instead of any
- Define interfaces for API responses
- Use generics for reusable components
- Implement type guards for runtime validation

### ❌ Avoid

- `any` type (use `unknown` if you must)
- `as` assertions (use type guards)
- Optional props without defaults
- Too complex union types

### 🔧 Utilities

```typescript
// Utility functions with proper typing
export const isNotNull = <T>(value: T | null): value is T => {
  return value !== null;
};

export const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${value}`);
};
```
