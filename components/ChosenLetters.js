import {
  useRef,
  useEffect
} from 'react';
import {
  Text,
  StyleSheet,
  Animated
} from 'react-native';

import {
  CHOSEN_LETTERS_BOARD_HEIGHT,
  WINDOW_WIDTH
} from '../utils';

export const ChosenLetters = ({ chosenLetters, wordIsValid }) => {
  const lastChosenLetters = useRef('');
  const animatedTranslateY = useRef(new Animated.Value(0)).current
  
  useEffect(() => {
    // move in
    if (!lastChosenLetters.current && chosenLetters) {
      Animated.timing(
        animatedTranslateY,
        {
          toValue: CHOSEN_LETTERS_BOARD_HEIGHT,
          duration: 100,
          useNativeDriver: true
        }
      ).start();
    }

    console.log({lastChosenLetters})
    console.log({chosenLetters})

    // move out
    if (lastChosenLetters.current && !chosenLetters) {
      Animated.timing(
        animatedTranslateY,
        {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }
      ).start();
    }

    lastChosenLetters.current = chosenLetters;
    console.log({lastChosenLetters})

  }, [chosenLetters])
  
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
      <Text
        style={[
          styles.chosenLetters,
          wordIsValid ? styles.wordIsValid : {}
        ]}
      >
        {chosenLetters}
      </Text>
    </Animated.View>
  )
}

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
