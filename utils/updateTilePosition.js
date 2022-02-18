import { Animated } from 'react-native';

import { getFallDownTime } from './getFallDownTime';
import { TILE_ANIMATION_TYPES, SHUFFLE_TIME } from '../constants';
import { tileCrashSound } from './sounds';

export function updateTilePositions(tiles, animationType) {
  tiles.forEach((col, colIndex) => 
  col.forEach((tile, rowIndex) => {
      const oldPositionX = tile.positionX;
      const oldPositionY = tile.positionY;

      tile.rowIndex = rowIndex;
      tile.colIndex = colIndex;

      tile.animatedPositionX = tile.positionX;
      tile.animatedPositionY = tile.positionY;

      if (animationType === TILE_ANIMATION_TYPES.FALL_DOWN) {
        if (oldPositionY !== tile.positionY) {
          tile.animatedPositionY = new Animated.Value(oldPositionY);
          Animated.timing(
            tile.animatedPositionY,
            {
              toValue: tile.positionY,
              duration: getFallDownTime(tile.positionY - oldPositionY),
              useNativeDriver: false
            }
          ).start(
            // callback when animation is done
            () => {
              tileCrashSound.replayAsync();
            }
          );
        }
      }

      if (animationType === TILE_ANIMATION_TYPES.SHUFFLE) {
        if (oldPositionX !== tile.positionX) {
          tile.animatedPositionX = new Animated.Value(oldPositionX);
          Animated.timing(
            tile.animatedPositionX,
            {
              toValue: tile.positionX,
              duration: SHUFFLE_TIME,
              useNativeDriver: false
            }
          ).start();
        }
        if (oldPositionY !== tile.positionY) {
          tile.animatedPositionY = new Animated.Value(oldPositionY);
          Animated.timing(
            tile.animatedPositionY,
            {
              toValue: tile.positionY,
              duration: SHUFFLE_TIME,
              useNativeDriver: false
            }
          ).start();
        }
      }
    }
  ))
}
