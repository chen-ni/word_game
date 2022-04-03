import React, { FC } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { menuStyles } from "../stylesheets";
import { MainStore, getMainStoreInstance, ScoreSystemStore, getScoreSystemStoreInstance } from "../stores";

export const WordListView: FC = () => {
  const mainStore: MainStore = getMainStoreInstance();
  const scoreSystemStore: ScoreSystemStore = getScoreSystemStoreInstance();

  return (
    <>
      {
        scoreSystemStore.confirmedWords.map(confirmedWord => (
          <Text 
            style={styles.word}
            key={confirmedWord.id}
          >
            {confirmedWord.toString()}
          </Text>
        ))
      }
      <TouchableOpacity
        style={menuStyles.menuOption}
        onPress={() => {mainStore.enterMainMenu();}}
      >
        <Text style={[menuStyles.menuOptionText, menuStyles.menuText, menuStyles.withMarginBottom]}>
          RETURN
        </Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  word: {
    color: 'white'
  }
})