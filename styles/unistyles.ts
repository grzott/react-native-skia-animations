/* eslint-disable @typescript-eslint/no-empty-object-type */
import { StyleSheet } from "react-native-unistyles";
import { Fonts } from "../constants/Fonts";

const lightTheme = {
  colors: {
    primary: "#000",
    secondary: "#fff",
    background: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    surface: "#f5f5f5",
    // Navigation specific colors
    primary_background: "#ffffff",
    secondary_background: "#f5f5f5",
    primary_text: "#000000",
    tab_icon: "#666666",
    tab_icon_active: "#007AFF",
  },
  fonts: {
    black: Fonts.RobotoBlack,
    bold: Fonts.RobotoBold,
    light: Fonts.RobotoLight,
    medium: Fonts.RobotoMedium,
    regular: Fonts.RobotoRegular,
  },
  // functions, external imports, etc.
  gap: (v: number) => v * 2,
};

const darkTheme = {
  colors: {
    primary: "#fff",
    secondary: "#000",
    background: "#000000",
    text: "#ffffff",
    textSecondary: "#cccccc",
    surface: "#1a1a1a",
    // Navigation specific colors
    primary_background: "#000000",
    secondary_background: "#1a1a1a",
    primary_text: "#ffffff",
    tab_icon: "#cccccc",
    tab_icon_active: "#007AFF",
  },
  fonts: {
    black: Fonts.RobotoBlack,
    bold: Fonts.RobotoBold,
    light: Fonts.RobotoLight,
    medium: Fonts.RobotoMedium,
    regular: Fonts.RobotoRegular,
  },
  gap: (v: number) => v * 2,
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

const settings = {
  initialTheme: "light" as keyof typeof appThemes,
};

const breakpoints = {
  xs: 0, // <-- make sure to register one breakpoint with value 0
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
  // use as many breakpoints as you need
};

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings,
});
