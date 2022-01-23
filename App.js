import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as constants from './utils/constants'

import generateTiles from './utils/generateTiles'
import isValidWord from './utils/checkWord'

const tiles = generateTiles(
  constants.NUM_OF_COLUMNS,
  constants.NUM_OF_ROWS
)

export default function App() {
  const [chosenLetters, setChosenLetters] = useState('')
  const [lastColIndex, setLastColIndex] = useState(null)
  const [lastRowIndex, setLastRowIndex] = useState(null)
  const [wordIsValid, setWordIsValid] = useState(false)

  const isValidTapPosition = (colIndex, rowIndex, tile) => {
    console.log({colIndex})
    console.log({rowIndex})
    console.log(tile.chosen)

    if (tile.chosen) {
      return false
    }

    if (!lastColIndex && !lastRowIndex) {
      return true
    }

    if ((Math.abs(colIndex - lastColIndex) > 1)
      || (Math.abs(rowIndex - lastRowIndex) > 1)){
      return false
    }

    return true
  }

  const reset = () => {
    setChosenLetters('')
    setLastColIndex(null)
    setLastRowIndex(null)

    tiles.forEach(column => {
      column.forEach(tile => {
        tile.chosen = false
      })
    })
  }

  const handleTapTile = (colIndex, rowIndex, tile) => {
    if (!isValidTapPosition(colIndex, rowIndex, tile)) {
      return reset()
    }

    console.log({chosenLetters})
    console.log(tile.letter)
    setChosenLetters(chosenLetters + tile.letter)
    console.log({chosenLetters})
    tile.chosen = true
    setLastColIndex(colIndex)
    setLastRowIndex(rowIndex)
  }

  useEffect(() => {
    if (isValidWord(chosenLetters)) {
      setWordIsValid(true)
    } else {
      setWordIsValid(false)
    }
  }, [chosenLetters])

  const confirmWord = () => {
    console.log({tiles})
    tiles.forEach(column => {
      for (i=column.length-1; i>=0; i--) {
        const tile = column[i]
        if (tile.chosen) {
          column.splice(i, 1)
        }
      }
    })
    console.log({tiles})
    reset()
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.header}>
        <Text 
          style={[
            styles.wordBoard,
            wordIsValid ? styles.wordIsValid : {}
          ]}
        >
          {chosenLetters}
        </Text>
        {
          wordIsValid && (
            <TouchableOpacity
              style={{
                backgroundColor: 'red'
              }}
              onPress={confirmWord}
            >
              <Text>
                It's a word! Tap here to confirm Tap here to confirm
              </Text>
            </TouchableOpacity>
              
          )
        }
      </View>
      {
        tiles.map((col, colIndex) => 
          col.map((tile, rowIndex) => (
            <Text
              key={tile.key}
              style={[
                styles.tile,
                tile.chosen ? styles.chosen : {},
                {
                  left: colIndex * constants.TILE_SIZE,
                  bottom: rowIndex * constants.TILE_SIZE,
                }
              ]}
              onPress={() => handleTapTile(colIndex, rowIndex, tile)}
            >
              {tile.letter}
            </Text>
          ))
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wordBoard: {
    fontSize: 20,
    color: 'black'
  },
  wordIsValid: {
    color: 'red'
  },
  tile: {
    fontSize: constants.TILE_SIZE * 0.7, 
    width: constants.TILE_SIZE,
    height: constants.TILE_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    position: 'absolute',
    fontWeight: '200'
  },
  chosen: {
    backgroundColor: 'gray'
  }
});
