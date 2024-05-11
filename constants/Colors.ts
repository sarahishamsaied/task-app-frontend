const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    error: "#ff6a6a",
    warning: "#ffae42",
    success: "#00b386",
    lowPriority: "#8b4d12",
    mediumPriority: "#ffad16",
    highPriority: "#ff6a6a",
    disbaled: "#414141",
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    error: "#ff6a6a",
    warning: "#ffae42",
    success: "#00b386",
    lowPriority: "#8b4d12",
    mediumPriority: "#ffad16",
    highPriority: "#ff6a6a",
    disabled: "#414141",
  },
};

export const priorityColor: { [key: string]: string } = {
  HIGH: "#ff6a6a",
  MEDIUM: "#ffad16",
  LOW: "#8b4d12",
};
