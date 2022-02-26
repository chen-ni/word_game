import {
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
  WINDOW_WIDTH
} from '../constants';

import { getTilesStoreInstance } from '../stores';

export const ChosenLetters = observer(() => {
  const tilesStore = getTilesStoreInstance();

  const lastChosenLetters = useRef('');
  const animatedTranslateY = useRef(new Animated.Value(0)).current

  const [score, setScore] = useState('');
  
  // calculate score
  useLayoutEffect(() => {
    if (tilesStore.wordIsValid) {
      const score = getScoreForWord(tilesStore.chosenLetters);
      setScore(`(${score})poiu`);
    } else {
      setScore('');
    }
  }, [tilesStore.chosenLetters])
  
  // add animation
  useEffect(() => {
    // move in
    if (!lastChosenLetters.current && tilesStore.chosenLetters) {
      Animated.timing(
        animatedTranslateY,
        {
          toValue: CHOSEN_LETTERS_BOARD_HEIGHT,
          duration: 100,
          useNativeDriver: true
        }
      ).start();
    }

    // move out
    if (lastChosenLetters.current && !tilesStore.chosenLetters) {
      Animated.timing(
        animatedTranslateY,
        {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }
      ).start();
    }

    lastChosenLetters.current = tilesStore.chosenLetters;
  }, [tilesStore.chosenLetters])
  
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
        onPress={() => {if (tilesStore.wordIsValid) {tilesStore.confirmWord()}}}
      >
        <Text
          style={[
            styles.chosenLetters,
            tilesStore.wordIsValid ? styles.wordIsValid : {}
          ]}
        >
          {tilesStore.chosenLetters + score}
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  chosenLetters: {
    fontSize: CHOSEN_LETTERS_BOARD_HEIGHT * 0.3,
    color: '#bf2d3a'
  },
  wordIsValid: {
    color: 'red'
  },
})
