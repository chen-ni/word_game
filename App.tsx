import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, SafeAreaView, Text,
} from 'react-native';

import { GameState } from './models';
import {
  ChosenLettersView,
  ChosenTileConnectionsView,
  TileMatrixView,
  TileInteractionLayerView,
} from './views';
import { initializeSounds, stopBackgroundMusic } from './utils';
import { GAME_BACKGROUND_COLOR, TILE_SIZE } from './constants';
import { getTileStoreInstance } from './stores';
import { MenuView } from './views';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.NORMAL);

  const tileStore = getTileStoreInstance();

  // initialization
  useEffect(() => {
    // sounds
    (async () => { await initializeSounds();})();

    return () => {
      stopBackgroundMusic();
    };
  }, []);

  const showMenu = () => {
    setGameState(GameState.MENU);
  };

  const resumeGame = () => {
    setGameState(GameState.NORMAL);
  };

  const restartGame = () => {
    tileStore.reset();
    setGameState(GameState.NORMAL);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChosenLettersView />
      </View>
      <Text 
        style={styles.menuButton}
        onPress={showMenu}
      >
        MENU
      </Text>
      {!tileStore.chosenLetters && (
        <View>
          <Text style={styles.shuffleButton} onPress={tileStore.shuffle}>
            shuffle
          </Text>
        </View>
      )}
      <TileMatrixView />
      <ChosenTileConnectionsView />
      <TileInteractionLayerView />
      {
        gameState === GameState.MENU && (
          <MenuView
            onResume={resumeGame}
            onRestart={restartGame}
          />
        )
      }
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
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: 'white',
    color: 'black',
  },
  shuffleButton: {
    position: 'absolute',
    top: -100,
    left: 0,
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: 'white',
    color: 'black',
  },
});
