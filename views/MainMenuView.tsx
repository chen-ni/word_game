import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { menuStyles as styles } from "../stylesheets";

interface MainMenuViewProps {
  onResume: () => void;
}

export const MainMenuView: FC<MainMenuViewProps> = (props) => {
  const { onResume } = props;

  return (
    <>
      <TouchableOpacity
        style={styles.menuOption}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          VIEW WORDLIST
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
      >
        <Text 
          onPress={onResume}
          style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          RESUME
        </Text>
      </TouchableOpacity>
    </>
  )
}