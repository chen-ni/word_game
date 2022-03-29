import { StyleSheet } from "react-native";
import { MENU_BACKGROUND_COLOR, MENU_BACKGROUND_OPACITY, 
  MENU_OPTION_COLOR, WINDOW_WIDTH,
  WINDOW_HEIGHT, MENU_MARGIN_BETWEEN_OPTIONS, MENU_OPTION_FONT_SIZE
} from "../constants";

export const menuStyles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: MENU_BACKGROUND_COLOR,
    opacity: MENU_BACKGROUND_OPACITY,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  menuOption: {
    width: '100%',
  },
  menuText: {
    textAlign: "center",
    textAlignVertical: "center"
  },
  menuOptionText: {
    color: MENU_OPTION_COLOR,
    fontSize: MENU_OPTION_FONT_SIZE
  },
  withMarginBottom: {
    marginBottom: MENU_MARGIN_BETWEEN_OPTIONS
  }
})
