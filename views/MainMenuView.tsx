import React, { FC } from "react";
import { Text, TouchableOpacity, Animated, GestureResponderEvent } from "react-native";
import { getTileStoreInstance } from "../stores";
import { getMainStoreInstance } from "../stores/main-store";
import { menuStyles as styles } from "../stylesheets";

interface MainMenuViewProps {
  menuMoveOut: (callback?: Function) => ((event: GestureResponderEvent) => void);
}

export const MainMenuView: FC<MainMenuViewProps> = (props) => {
  const { menuMoveOut } = props;
  
  const mainStore = getMainStoreInstance();
  const tileStore = getTileStoreInstance();

  return (
    <>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={() => {mainStore.enterWordlist();}}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          VIEW WORDLIST
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={menuMoveOut(tileStore.shuffle)}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          SHUFFLE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={menuMoveOut()}
      >
        <Text 
          style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          RESUME
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={menuMoveOut(mainStore.restartGame)}
      >
        <Text 
          style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          RESTART
        </Text>
      </TouchableOpacity>
    </>
  )
}