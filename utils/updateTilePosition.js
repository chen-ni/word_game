import { Animated } from 'react-native';

import { getFallDownTime } from './getFallDownTime';
import { TILE_SIZE } from '../constants';
import { tileCrashSound } from './sounds';

export function updateTilePositions(tiles) {
  tiles.forEach(col => 
    col.forEach((tile, rowIndex) => {
      tile.rowIndex = rowIndex;
      const oldPositionY = tile.positionY
      tile.positionY = rowIndex * TILE_SIZE

      // create an animation if position changed
      if (oldPositionY && (oldPositionY !== tile.positionY)) {
        tile.animatedPositionY = new Animated.Value(oldPositionY);
        const fallDownDistance = tile.positionY - tile.animatedPositionY._value;
        Animated.timing(
          tile.animatedPositionY,
          {
            toValue: tile.positionY,
            duration: getFallDownTime(fallDownDistance),
            useNativeDriver: false
          }
        ).start(
          // callback when animation is done
          () => {
            tile.animatedPositionY = undefined;
            tileCrashSound.replayAsync();
          }
        );
      } else {
        tile.animatedPositionY = undefined
      }
    }
  ))
}
