import {
  tapSounds,
} from './sounds'

export function triggerTapSound(prevNum) {
  if (prevNum > 4) {
    prevNum = 4;
  }

  const sound = tapSounds[prevNum];

  sound.replayAsync();
}
