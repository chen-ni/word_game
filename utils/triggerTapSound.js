import {
  tapSounds,
} from './sounds'

export function triggerTapSound(numOfChosenTiles) {
  if (numOfChosenTiles == 0) {
    return;
  }
  
  let index = Math.min(numOfChosenTiles - 1, 4);

  const sound = tapSounds[index];

  sound.replayAsync();
}
