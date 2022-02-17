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

import {
  ChosenLetters,
  ChosenTileConnections
} from './components';

import {
  updateTilePositions,
  generateTiles,
  isValidTap,
  checkWord,
  removeChosenTiles,
  TILE_SIZE,
  GAME_BACKGROUND_COLOR
} from './utils';

export default function App() {
  const [tiles, setTiles] = useState([]);
  const [chosenTiles, setChosenTiles] = useState([]);

  const chosenLetters = chosenTiles
    .map(tile => tile.letter)
    .reduce((a, b) => a + b, '');

  const wordIsValid = checkWord(chosenLetters);

  useEffect(() => {
    // initialize tiles
    const tiles = generateTiles()
    updateTilePositions(tiles)
    setTiles(tiles)
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
    reset()
    updateTilePositions(tiles);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.header}>
        <ChosenLetters
          chosenLetters={chosenLetters}
          wordIsValid={wordIsValid}
          confirmWord={confirmWord}
        />
      </View>
      {
        tiles.map(col => 
          col.map(tile => (
            tile.animatedPositionY
            ? <Animated.Text
                key={tile.key}
                style={[
                  styles.tile,
                  {
                    left: tile.positionX,
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
                    left: tile.positionX,
                    bottom: tile.positionY,
                  }
                ]}
                onPress={() => handleTapTile(tile)}
              >
                {tile.letter}
              </Text>
          ))
        )
      }

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
  tile: {
    fontSize: TILE_SIZE * 0.6, 
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: '#fce5c0',
    textAlign: 'center',
    position: 'absolute',
    fontWeight: '200',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  chosen: {
    color: '#fce5c0',
    backgroundColor: '#806543'
  }
});
