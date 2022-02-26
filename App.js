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
  Tiles,
  TileInteractionLayer
} from './components';

import { initializeSounds } from './utils';

import {
  GAME_BACKGROUND_COLOR, TILE_SIZE
} from './constants'

import { getTilesStoreInstance } from './stores';

export default function App() {
  const tilesStore = getTilesStoreInstance();

  // initialization
  useEffect(() => {
    // sounds
    initializeSounds();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.header}>
        <ChosenLetters />
      </View>
      {
        !tilesStore.chosenLetters && (
          <View>
            <Text
              style={styles.shuffleButton}
              onPress={tilesStore.shuffle}
            >
              shuffle
            </Text>
          </View>
        )
      }
      <Tiles />
      <ChosenTileConnections />
      <TileInteractionLayer />
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
