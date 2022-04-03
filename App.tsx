import React, { useEffect } from 'react';
import {
  StyleSheet, View, SafeAreaView, Text, StatusBar
} from 'react-native';
import { observer } from "mobx-react-lite"

import { GameState } from './models';
import {
  ChosenLettersView,
  ChosenTileConnectionsView,
  TileMatrixView,
  TileInteractionLayerView,
  MenuView,
  ScoreBoardView
} from './views';
import { initializeSounds, stopBackgroundMusic } from './utils';
import { GAME_BACKGROUND_COLOR, MENU_BUTTON_FONT_SIZE, PAGE_MARGIN, TILE_SIZE } from './constants';
import { getMainStoreInstance, getTileStoreInstance } from './stores';

function App() {
  const mainStore = getMainStoreInstance();
  const tileStore = getTileStoreInstance();

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
      <Text 
        style={[styles.menuButton, {
          top: StatusBar.currentHeight,
        }]}
        onPress={() => {mainStore.showMenu();}}
      >
        MENU
      </Text>
      <ScoreBoardView />
      {
        tileStore.chosenTiles.length > 0 && (
          <View style={styles.header}>
            <ChosenLettersView />
          </View>
        )
      }
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
    left: PAGE_MARGIN,
    fontSize: MENU_BUTTON_FONT_SIZE,
    color: 'black',
  }
});
