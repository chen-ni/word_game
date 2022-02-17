import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  SafeAreaView,
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
  initializeSounds
} from './utils';

import {
  GAME_BACKGROUND_COLOR
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

  const reset = () => {
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
        return reset()
      }
    }

    tile.chosen = true
    setChosenTiles([...chosenTiles, tile])
  }

  const confirmWord = () => {
    removeChosenTiles(tiles);
    reset();
    updateTilePositions(tiles);
    setTiles(tiles);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.header}>
        <ChosenLetters
          {...{chosenLetters, wordIsValid, confirmWord}}
        />
      </View>
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
  }
});
