import { Audio } from 'expo-av';

export let tileCrashSound: Audio.Sound;
export let tapSounds: Audio.Sound[];

export async function initializeSounds() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/sounds/tile_crash.m4a')
  );
  tileCrashSound = sound;

  tapSounds = [null, null, null, null, null];
  [ // because require doesn't support dynamic string
    require('../assets/sounds/1.m4a'),
    require('../assets/sounds/2.m4a'),
    require('../assets/sounds/3.m4a'),
    require('../assets/sounds/4.m4a'),
    require('../assets/sounds/5.m4a')
  ].map(async (resource, index) => {
    const { sound } = await Audio.Sound.createAsync(resource);
    tapSounds[index] = sound;
  })
}

export function triggerTapSound(numOfChosenTiles) {
  if (numOfChosenTiles == 0) {
    return;
  }
  
  let index = Math.min(numOfChosenTiles - 1, 4);

  const sound = tapSounds[index];

  sound.replayAsync();
}

export function triggerTileCrashSound() {
  tileCrashSound.replayAsync();
}
