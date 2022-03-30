import { Audio } from 'expo-av';

let backgroundMusic: Audio.Sound;
let tileCrashSound: Audio.Sound;
let tapSounds: Audio.Sound[];

export async function initializeSounds() {
  // load background music
  const { sound: backgroundMusicTmp } = await Audio.Sound.createAsync(
    require('../assets/audio/bgm.m4a')
  );
  backgroundMusic = backgroundMusicTmp;
  startBackgroundMusic();

  // load tile crash sound
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/audio/tile_crash.m4a')
  );
  tileCrashSound = sound;

  // load tap sounds
  tapSounds = [null, null, null, null, null];
  [ // because require doesn't support dynamic string
    require('../assets/audio/1.m4a'),
    require('../assets/audio/2.m4a'),
    require('../assets/audio/3.m4a'),
    require('../assets/audio/4.m4a'),
    require('../assets/audio/5.m4a')
  ].map(async (resource, index) => {
    const { sound } = await Audio.Sound.createAsync(resource);
    tapSounds[index] = sound;
  })
}

export function startBackgroundMusic() {
  backgroundMusic.setIsLoopingAsync(true);
  backgroundMusic.replayAsync();
}

export function stopBackgroundMusic() {
  backgroundMusic.stopAsync();
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
