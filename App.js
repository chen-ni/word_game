import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated
} from 'react-native';

import * as constants from './utils/constants'
import {
  calculateTilePositions,
  generateTiles,
  isValidTap,
  isValidWord,
  removeChosenTiles
} from './utils'

export default function App() {
  const [chosenLetters, setChosenLetters] = useState('')
  const [lastColIndex, setLastColIndex] = useState(null)
  const [lastRowIndex, setLastRowIndex] = useState(null)
  const [wordIsValid, setWordIsValid] = useState(false)
  
  const [tiles, setTiles] = useState([])

  useEffect(() => {
    // initialize tiles
    const tiles = generateTiles()
    calculateTilePositions(tiles)
    setTiles(tiles)
  }, [])

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
    if (!isValidTap(colIndex, rowIndex, lastColIndex, lastRowIndex, tile)) {
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
    removeChosenTiles(tiles);
    reset()
    calculateTilePositions(tiles)
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
            tile.animatedPositionY
            ? <Animated.Text
                key={tile.key}
                style={[
                  styles.tile,
                  {
                    left: colIndex * constants.TILE_SIZE,
                    bottom: tile.animatedPositionY,
                  }
                ]}
              >
                {tile.letter}
              </Animated.Text>
            : <Text
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
