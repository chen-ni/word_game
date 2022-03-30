import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { menuStyles as styles } from "../stylesheets";

interface MainMenuViewProps {
  onResume: () => void;
  onEnterWordList: () => void;
}

export const MainMenuView: FC<MainMenuViewProps> = (props) => {
  const { onResume, onEnterWordList } = props;

  return (
    <>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={onEnterWordList}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          VIEW WORDLIST
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={onResume}
      >
        <Text 
          style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          RESUME
        </Text>
      </TouchableOpacity>
    </>
  )
}