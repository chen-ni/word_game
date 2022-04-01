import React, { useEffect } from 'react';
import {
  StyleSheet, View, SafeAreaView, Text,
} from 'react-native';
import { observer } from "mobx-react-lite"

import { GameState } from './models';
import {
  ChosenLettersView,
  ChosenTileConnectionsView,
  TileMatrixView,
  TileInteractionLayerView,
} from './views';
import { initializeSounds, stopBackgroundMusic } from './utils';
import { GAME_BACKGROUND_COLOR, TILE_SIZE } from './constants';
import { MenuView } from './views';
import { getMainStoreInstance } from './stores/main-store';

function App() {
  const mainStore = getMainStoreInstance();
  
  // initialization
  useEffect(() => {
    // sounds
    (async () => { await initializeSounds();})();

    return () => {
      stopBackgroundMusic();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChosenLettersView />
      </View>
      <Text 
        style={styles.menuButton}
        onPress={() => {mainStore.showMenu();}}
      >
        MENU
      </Text>
      <TileMatrixView />
      <ChosenTileConnectionsView />
      <TileInteractionLayerView />
      {
        mainStore.gameState === GameState.MENU && (
          <MenuView />
        )
      }
    </SafeAreaView>
  );
};

export default observer(App);

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
