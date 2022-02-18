import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from 'react-native';

import {
  ChosenLetters,
  ChosenTileConnections,
  Tiles
} from './components';

import {
  updateTilePositions,
  generateTiles,
  isValidTap,
  checkWord,
  removeChosenTiles,
  initializeSounds,
  triggerTapSound,
  shuffleTiles
} from './utils';

import {
  GAME_BACKGROUND_COLOR, TILE_ANIMATION_TYPES, TILE_SIZE
} from './constants'

export default function App() {
  const [tiles, setTiles] = useState([]);
  const [chosenTiles, setChosenTiles] = useState([]);

  const chosenLetters = chosenTiles
    .map(tile => tile.letter)
    .reduce((a, b) => a + b, '');

  const wordIsValid = checkWord(chosenLetters);

  // initialization
  useEffect(() => {
    // tiles
    const tiles = generateTiles()
    updateTilePositions(tiles)
    setTiles(tiles)

    // sounds
    initializeSounds();
  }, [])

  const clearChosen = () => {
    setChosenTiles([]);

    tiles.forEach(column => {
      column.forEach(tile => {
        tile.chosen = false
      })
    })
  }

  const handleTapTile = tile => {
    if (chosenTiles.length > 0) {
      const lastTile = chosenTiles[chosenTiles.length-1];
      if (!isValidTap(tile, lastTile)) {
        return clearChosen()
      }
    }

    tile.chosen = true
    setChosenTiles([...chosenTiles, tile])
    triggerTapSound(chosenTiles.length);
  }

  const confirmWord = () => {
    removeChosenTiles(tiles);
    clearChosen();
    updateTilePositions(tiles, TILE_ANIMATION_TYPES.FALL_DOWN);
    setTiles(tiles);
  }

  const shuffle = () => {
    clearChosen();
    const shuffledTiles = shuffleTiles(tiles);
    setTiles([...shuffledTiles]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.header}>
        <ChosenLetters
          {...{chosenLetters, wordIsValid, confirmWord}}
        />
      </View>
      {
        !chosenLetters && (
          <View>
            <Text
              style={styles.shuffleButton}
              onPress={shuffle}
            >
              shuffle
            </Text>
          </View>
        )
      }
      <Tiles
        {...{tiles, handleTapTile}}
      />

    <ChosenTileConnections chosenTiles={chosenTiles} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    backgroundColor: GAME_BACKGROUND_COLOR,
  },
  header: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shuffleButton: {
    position: 'absolute',
    top: -100,
    left: 0,
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: 'white',
    color: 'black',
  }
});
