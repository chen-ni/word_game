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
  generateTiles,
  isValidWord,
  getFallDownTime
} from './utils'

export default function App() {
  const [chosenLetters, setChosenLetters] = useState('')
  const [lastColIndex, setLastColIndex] = useState(null)
  const [lastRowIndex, setLastRowIndex] = useState(null)
  const [wordIsValid, setWordIsValid] = useState(false)

  const [isInAnimation, setIsInAnimation] = useState(false);
  const animPositionY = useRef(new Animated.Value(0)).current
  
  const [tiles, setTiles] = useState([])

  useEffect(() => {
    // initialize tiles
    const tmpTiles = generateTiles(
      constants.NUM_OF_COLUMNS,
      constants.NUM_OF_ROWS
    )

    calculateTilePositions(tmpTiles)

    setTiles(tmpTiles)

  }, [])

  const calculateTilePositions = (tiles) => {
    tiles.forEach(col => 
      col.forEach((tile, rowIndex) => {
        const oldPositionY = tile.positionY
        tile.positionY = rowIndex * constants.TILE_SIZE

        // create an animation if position changed
        if (oldPositionY && (oldPositionY !== tile.positionY)) {
          tile.animatedPositionY = new Animated.Value(oldPositionY)
        } else {
          tile.animatedPositionY = undefined
        }
      }
    ))
  }
  
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

  const removeChosenTiles = (tiles) => {
    tiles.forEach(column => {
      for (i=column.length-1; i>=0; i--) {
        const tile = column[i]
        if (tile.chosen) {
          column.splice(i, 1)
        }
      }
    })
  }

  const confirmWord = () => {
    removeChosenTiles(tiles);
    reset()
    calculateTilePositions(tiles)

    tiles.forEach(col => {
      col.forEach(tile => {
        if (tile.animatedPositionY) {
          const destPositionY = tile.positionY;
          const startPositionY = tile.animatedPositionY;
          const fallDownDistance = destPositionY - startPositionY._value;
          const fallDownTime = getFallDownTime(fallDownDistance);
          Animated.timing(
            tile.animatedPositionY,
            {
              toValue: destPositionY,
              duration: fallDownTime,
              useNativeDriver: false
            }
          ).start();
        }
      })
    })
    setIsInAnimation(true)
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
