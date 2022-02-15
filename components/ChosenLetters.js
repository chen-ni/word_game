import {
  Text,
  StyleSheet
} from 'react-native';

export const ChosenLetters = ({ chosenLetters, wordIsValid }) => (
  <Text 
    style={[
      styles.wordBoard,
      wordIsValid ? styles.wordIsValid : {}
    ]}
  >
    {chosenLetters}
  </Text>
)

const styles = StyleSheet.create({
  wordBoard: {
    fontSize: 40,
    color: '#bf2d3a'
  },
  wordIsValid: {
    color: 'red'
  },
})
