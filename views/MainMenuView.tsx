import React, { FC } from "react";
import { Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { getTileStoreInstance, getMainStoreInstance } from "../stores";
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
        onPress={menuMoveOut()}
      >
        <Text 
          style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          Resume
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={() => {mainStore.enterWordlist();}}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          Wordlist
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={menuMoveOut(tileStore.shuffle)}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          Shuffle
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuOption}
        onPress={menuMoveOut(mainStore.restartGame)}
      >
        <Text 
          style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          Restart
        </Text>
      </TouchableOpacity>
    </>
  )
}