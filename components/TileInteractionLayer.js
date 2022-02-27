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
import { getTouchedTile } from "../utils/getTouchedTile";

export const TileInteractionLayer = observer(() => {
  const tilesStore = getTilesStoreInstance();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { dx, dy, x0, y0 } = gestureState;

      const x = x0 + dx;
      const y = y0 + dy;

      const tile = getTouchedTile(x, y, tilesStore.tiles);

      if (tile && !tile.chosen) {
        tilesStore.handleTapTile(tile);
      }
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy, x0, y0 } = gestureState;

      const x = x0 + dx;
      const y = y0 + dy;

      const tile = getTouchedTile(x, y, tilesStore.tiles);

      if (!tile) {
        return;
      }

      if (!tile.chosen) {
        tilesStore.handleTapTile(tile);
      } else {
        tilesStore.truncateChosen(tile);
      }
    },
    onPanResponderRelease: () => {
      if (tilesStore.wordIsValid) {
        tilesStore.confirmWord();
      } else {
        tilesStore.clearChosen();
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