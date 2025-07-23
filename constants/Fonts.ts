export const Fonts = {
  RobotoBlack: "Roboto-Black",
  RobotoBold: "Roboto-Bold",
  RobotoLight: "Roboto-Light",
  RobotoMedium: "Roboto-Medium",
  RobotoRegular: "Roboto-Regular",
} as const;

export type FontFamily = (typeof Fonts)[keyof typeof Fonts];
