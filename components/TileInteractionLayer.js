import { observer } from "mobx-react-lite"

import {
  View,
  PanResponder
} from 'react-native';

import {
  TILE_SIZE,
  NUM_OF_COLUMNS,
  NUM_OF_ROWS,
  WINDOW_HEIGHT
} from '../constants'

import { getTilesStoreInstance } from '../stores';

export const TileInteractionLayer = observer(() => {
  const tilesStore = getTilesStoreInstance();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { dx, dy, x0, y0 } = gestureState;

      const x = x0 + dx;
      const y = y0 + dy;

      const colIndex = Math.floor(x / TILE_SIZE);
      const rowIndex = Math.floor((WINDOW_HEIGHT - y) / TILE_SIZE);

      let tile;
      try {
        tile = tilesStore.tiles[colIndex][rowIndex];
      } catch (e) {

        return;
      }

      if (!tile.chosen) {
        tilesStore.handleTapTile(tile);
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy, x0, y0 } = gestureState;

      const x = x0 + dx;
      const y = y0 + dy;

      const colIndex = Math.floor(x / TILE_SIZE);
      const rowIndex = Math.floor((WINDOW_HEIGHT - y) / TILE_SIZE);

      let tile;
      try {
        tile = tilesStore.tiles[colIndex][rowIndex];
      } catch (e) {

        return;
      }

      if (!tile.chosen) {
        tilesStore.handleTapTile(tile);
      }
    },
    // onPanResponderRelease: () => {
    //   setColor('blue')
    // }
  });

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: TILE_SIZE * NUM_OF_COLUMNS,
        height: TILE_SIZE * NUM_OF_ROWS,
        backgroundColor: 'transparent'
      }}
      {...panResponder.panHandlers}
    />
  )
});