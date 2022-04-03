import React from "react";
import { Text, StyleSheet, StatusBar } from "react-native";
import { observer } from "mobx-react-lite"

import { getScoreSystemStoreInstance } from "../stores";
import { PAGE_MARGIN, SCORE_FONT_SIZE } from "../constants";

export const ScoreBoardView = observer(() => {
  const scoreSystemStore = getScoreSystemStoreInstance();

  return (
    <Text style={[styles.score, {
      top: StatusBar.currentHeight,
    }]}>
      {scoreSystemStore.totalScore}
    </Text>
  )
})

const styles = StyleSheet.create({
  score: {
    position: "absolute",
    top: 0,
    right: PAGE_MARGIN,
    color: "white",
    fontSize: SCORE_FONT_SIZE,
  }
});
