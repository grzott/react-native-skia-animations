# General Instructions - Polish Radio Mobile App

## Targting

- Android
- iOS

## Naming Conventions

| Element       | Convention | Example                               |
| ------------- | ---------- | ------------------------------------- |
| **Folder**    | kebab-case | `audio-player`, `user-settings`       |
| **Method**    | camelCase  | `handlePlayback()`, `getUserData()`   |
| **Component** | PascalCase | `AudioPlayer`, `UserProfile`          |
| **File**      | kebab-case | `audio-player.tsx`, `user-profile.ts` |
| **Const**     | UPPERCASE  | `API_URL`, `MAX_RETRIES`              |
| **Type**      | PascalCase | `UserData`, `PlaylistItem`            |
| **Enum**      | UPPERCASE  | `PLAYBACK_STATE`, `USER_ROLE`         |

## Project Structure

```
app/                    # Expo Router - file-based routing
├── (tabs)/            # Main app tabs
├── components/        # Reusable components
├── services/          # API and external services
├── stores/            # Zustand - state management
├── types/             # TypeScript definitions
├── utils/             # Helper functions
└── constants/         # App constants
```

## General Rules

### 📁 File Organization

- **Component = Folder**: Each major component in its own folder
- **Index Exports**: Use `index.ts` for folder exports
- **Colocation**: Keep related files close together

### 🎯 Best Practices

- **Single Responsibility**: One component = one responsibility
- **Pure Functions**: Prefer pure functions where possible
- **Error Boundaries**: Use for component error handling
- **Performance**: Use `React.memo()`, `useMemo()`, `useCallback()`

### 📝 Comments

```typescript
// Comments in English
// Describe WHY, not WHAT you're doing

/**
 * Audio player component for Polish Radio
 * @param audioUrl - Audio stream URL
 * @param isLive - Whether this is a live stream
 */
```

### 🔄 Git Workflow

```bash
# Branch names: feature/feature-name
git checkout -b feature/audio-player
git checkout -b fix/playback-issue
git checkout -b docs/readme-update
```

### 🧪 Testing

- **Unit**: Jest (every component and function)
- **Integration**: React Native Testing Library
- **E2E**: Detox (for critical paths)

### 📱 Responsive Design

- Test on different screen sizes
- Use React Native Flex Layout
- Test on physical devices

### 🔐 Security

- Never commit API keys
- Use Expo SecureStore for sensitive data
- Validate all input data
