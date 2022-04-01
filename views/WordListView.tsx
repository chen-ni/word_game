import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

import { menuStyles as styles } from "../stylesheets";
import { ScoreSystemStore, getScoreSystemStoreInstance } from "../stores";
import { MainStore, getMainStoreInstance } from "../stores/main-store";

export const WordListView: FC = () => {
  const mainStore: MainStore = getMainStoreInstance();
  const scoreSystemStore: ScoreSystemStore = getScoreSystemStoreInstance();

  return (
    <>
      {
        scoreSystemStore.confirmedWords.map(confirmedWord => (
          <Text 
            style={{backgroundColor: 'white'}}
            key={confirmedWord.id}
          >
            {confirmedWord.toString()}
          </Text>
        ))
      }
      <TouchableOpacity
        style={styles.menuOption}
        onPress={() => {mainStore.enterMainMenu();}}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          RETURN
        </Text>
      </TouchableOpacity>
    </>
  )
}