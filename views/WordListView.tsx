import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

import { menuStyles as styles } from "../stylesheets";
import { ScoreSystemStore, getScoreSystemStoreInstance } from "../stores";

interface WordListViewProps {
  onReturn: () => void;
}

export const WordListView: FC<WordListViewProps> = (props) => {
  const { onReturn } = props;

  const scoreSystemStore: ScoreSystemStore = getScoreSystemStoreInstance();

  return (
    <>
      {
        scoreSystemStore.confirmedWords.map(confirmedWord => (
          <Text style={{backgroundColor: 'white'}}>
            {confirmedWord.toString()}
          </Text>
        ))
      }
      <TouchableOpacity
        style={styles.menuOption}
        onPress={onReturn}
      >
        <Text style={[styles.menuOptionText, styles.menuText, styles.withMarginBottom]}>
          RETURN
        </Text>
      </TouchableOpacity>
    </>
  )
}