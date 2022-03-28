import { Animated } from 'react-native';

import { TileAnimationType, Tiles } from '../models';
import { getFallDownTime } from './getFallDownTime';
import { SHUFFLE_TIME } from '../constants';
import { triggerTileCrashSound } from './sounds';

export function updateTilePositions(tiles: Tiles, animationType: TileAnimationType) {
  tiles.forEach((col, colIndex) => 
  col.forEach((tile, rowIndex) => {
      const oldPositionX = tile.positionX;
      const oldPositionY = tile.positionY;

      tile.rowIndex = rowIndex;
      tile.colIndex = colIndex;

      tile.animatedPositionX = null;
      tile.animatedPositionY = null;

      if (animationType === TileAnimationType.FALL_DOWN) {
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
              triggerTileCrashSound();
            }
          );
        }
      } else if (animationType === TileAnimationType.SHUFFLE) {
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
