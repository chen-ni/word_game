import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect
} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';

import { observer } from "mobx-react-lite"

import {
  getScoreForWord
} from '../utils';

import {
  CHOSEN_LETTERS_BOARD_HEIGHT,
  CHOSEN_LETTERS_MOVE_IN_TIME,
  CHOSEN_LETTERS_MOVE_OUT_TIME,
  WINDOW_WIDTH
} from '../constants';

import { getTileStoreInstance } from '../stores';

export const ChosenLettersView = observer(() => {
  const tileStore = getTileStoreInstance();

  const lastChosenLetters = useRef('');
  const animatedTranslateY = useRef(new Animated.Value(0)).current

  const [score, setScore] = useState('');
  
  // calculate score
  useLayoutEffect(() => {
    if (tileStore.wordIsValid) {
      const score = getScoreForWord(tileStore.chosenLetters);
      setScore(`(${score})`);
    } else {
      setScore('');
    }
  }, [tileStore.chosenLetters])
  
  // add animation
  useEffect(() => {
    // move in
    if (!lastChosenLetters.current && tileStore.chosenLetters) {
      Animated.timing(
        animatedTranslateY,
        {
          toValue: CHOSEN_LETTERS_BOARD_HEIGHT,
          duration: CHOSEN_LETTERS_MOVE_IN_TIME,
          useNativeDriver: true
        }
      ).start();
    }

    // move out
    if (lastChosenLetters.current && !tileStore.chosenLetters) {
      Animated.timing(
        animatedTranslateY,
        {
          toValue: 0,
          duration: CHOSEN_LETTERS_MOVE_OUT_TIME,
          useNativeDriver: true
        }
      ).start();
    }

    lastChosenLetters.current = tileStore.chosenLetters;
  }, [tileStore.chosenLetters])
  
  return (
    <Animated.View
      style={[
        styles.wordBoard,
        {
          transform: [
            {
              translateY: animatedTranslateY
            },
          ]
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => {if (tileStore.wordIsValid) {tileStore.confirmWord()}}}
        style={styles.textContainer}
      >
        <Text
          style={[
            styles.text,
            tileStore.wordIsValid ? styles.wordIsValid : {}
          ]}
        >
          {tileStore.chosenLetters + score}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
});

const styles = StyleSheet.create({
  wordBoard: {
    position: 'absolute',
    backgroundColor: 'white',
    width: WINDOW_WIDTH,
    height: CHOSEN_LETTERS_BOARD_HEIGHT,
    top: -1 * CHOSEN_LETTERS_BOARD_HEIGHT,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: CHOSEN_LETTERS_BOARD_HEIGHT * 0.3,
    color: 'black',
    textAlign: "center",
    textAlignVertical: "center"
  },
  wordIsValid: {
    color: 'red'
  }
})
