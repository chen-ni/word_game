// scores taken from: https://en.wikipedia.org/wiki/Scrabble_letter_distributions
const letterToScoreArray = [
  {
    value: 1,
    letters: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 's', 't', 'r']
  },
  {
    value: 2,
    letters: ['d', 'g']
  },
  {
    value: 3,
    letters: ['b', 'c', 'm', 'p']
  },
  {
    value: 4,
    letters: ['f', 'h', 'v', 'w', 'y']
  },
  {
    value: 5,
    letters: ['k']
  },
  {
    value: 8,
    letters: ['j', 'x']
  },
  {
    value: 10,
    letters: ['q', 'z']
  }
]

export function getScoreForLetter(letter: string): number {
  letter = letter.toLowerCase();
  for (const { value, letters } of letterToScoreArray) {
    if (letters.includes(letter)) {
      return value;
    }
  }
  
  return 0;
}

// add up the scores for each letter in the word
export function getScoreForWord(word: string): number {
  return word
    .split('')
    .map(letter => getScoreForLetter(letter))
    .reduce((partialScore, curScore) => partialScore + curScore, 0);
}