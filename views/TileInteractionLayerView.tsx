import React from 'react';
import { observer } from "mobx-react-lite"

import {
  View,
  PanResponder
} from 'react-native';

import {
  TILE_SIZE,
  NUM_OF_COLUMNS,
  NUM_OF_ROWS
} from '../constants'

import { getTileStoreInstance } from '../stores';
import { getTouchedTile } from "../utils/getTouchedTile";

export const TileInteractionLayerView = observer(() => {
  const tileStore = getTileStoreInstance();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { dx, dy, x0, y0 } = gestureState;

      const x = x0 + dx;
      const y = y0 + dy;

      const tile = getTouchedTile(x, y, tileStore.tiles);

      if (tile && !tile.chosen) {
        tileStore.handleTapTile(tile);
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy, x0, y0 } = gestureState;

      const x = x0 + dx;
      const y = y0 + dy;

      const tile = getTouchedTile(x, y, tileStore.tiles);

      if (!tile) {
        return;
      }

      if (!tile.chosen) {
        tileStore.handleTapTile(tile);
      } else {
        tileStore.truncateChosen(tile);
      }
    },
    onPanResponderRelease: () => {
      if (tileStore.wordIsValid) {
        tileStore.confirmWord();
      } else {
        tileStore.clearChosen();
      }
    }
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