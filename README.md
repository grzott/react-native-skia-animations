# React Native Skia Animations

## Development Environment Setup

This project uses **Development Builds** (not Expo Go) for extended native capabilities and custom configurations.

### Prerequisites

- Node.js (Latest LTS version)
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- Physical devices for testing (recommended) Mobile App

### Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Install Expo CLI globally (if not already installed)

   ```bash
   npm install -g @expo/cli
   ```

## Android Development

### Configuration Requirements

- Android Studio installed and configured
- Android device with USB debugging enabled
- Device connected via USB cable

### Building and Running

1. Build development APK and install on connected device:

   ```bash
   npx expo run:android
   ```

   _Note: First compilation takes 10-15 minutes, subsequent builds are faster (1-3 minutes)_

2. Start development server:

   ```bash
   npx expo start --dev-client
   ```

3. Open the custom development app on your device and connect to the development server

### Development Workflow

- Edit code in your IDE
- Changes automatically refresh on device (hot reload)
- Use React DevTools for debugging
- Rebuild only when adding native dependencies

## iOS Development

### ⚠️ Configuration Required

iOS development environment setup requires:

- Code signing certificates
- Xcode project configuration

**Status**: Not configured - requires configuration on macOS machine

### Future Configuration Steps (on macOS):

1. Configure Xcode and iOS certificates
2. Build development app: `npx expo run:ios`
3. Follow the same workflow as Android

## Technology Stack

| Category               | Technology         | Version | Link                                                                      | Status |
| ---------------------- | ------------------ | ------- | ------------------------------------------------------------------------- | ------ |
| **Framework**          | React Native       | 0.78+   | [Documentation](https://reactnative.dev/)                                 | ✅     |
| **Language**           | TypeScript         | 5+      | [Documentation](https://www.typescriptlang.org/)                          | ✅     |
| **SDK**                | Expo SDK           | 53+     | [Documentation](https://docs.expo.dev/)                                   | ✅     |
| **Navigation**         | Expo Router        | 10+     | [Documentation](https://docs.expo.dev/router/introduction/)               | ✅     |
| **Styling (Option 1)** | RN Unistyles       | 2.0     | [Documentation](https://www.unistyl.es/)                                  | ✅     |
| **Styling (Option 2)** | NativeWind         | -       | [Documentation](https://www.nativewind.dev/)                              | ❌     |
| **Animations**         | Reanimated         | 3       | [Documentation](https://docs.swmansion.com/react-native-reanimated/)      | ✅     |
| **Player (Option 1)**  | RNTP               | 4.1     | [Documentation](https://rntp.dev/)                                        | ⚠️     |
| **Player (Option 2)**  | Expo Audio         | -       | [Documentation](https://docs.expo.dev/versions/latest/sdk/audio/)         | ⚠️     |
| **State Management**   | Zustand            | 5+      | [GitHub](https://github.com/pmndrs/zustand)                               | ✅     |
| **Storage**            | MMKV               | -       | [GitHub](https://github.com/mrousavy/react-native-mmkv)                   | ✅     |
| **Notifications**      | Expo Notifications | -       | [Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/) | ✅     |

### Status Legend

- ✅ **Ready** - Technology configured and ready to use
- ⚠️ **Under consideration** - Requires decision or additional configuration
- ❌ **Rejected** - Rejected in favor of another technology

## Project Structure

This project uses [Expo Router](https://docs.expo.dev/router/introduction) for file-based routing. Edit files in the **app** directory to start development.

## Expo Documentation

- [Expo Documentation](https://docs.expo.dev/): Learn the fundamentals or dive into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/): Learn about custom development builds.

## Build Status

### Android

✅ **Configured** - Development build ready

- Package: `com.polskieradio.mobileapp`
- Build command: `npx expo run:android`

### iOS

⚠️ **Awaiting Configuration** - Requires macOS configuration

- Required: Apple Developer account, certificates, provisioning profiles
- Build command: `npx expo run:ios` (after configuration)

## Troubleshooting

### Android Device Not Detected

1. Enable USB debugging in Developer Options
2. Check if `adb devices` shows your device
3. Accept USB debugging prompt on device

### Build Issues

1. Clear Metro cache: `npx expo start --clear`
2. Clear Android build: `cd android && ./gradlew clean`
3. Restart Metro server: Kill process and run `npx expo start --dev-client`
