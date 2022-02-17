import { Audio } from 'expo-av';

export let tileCrashSound;

export async function initializeSounds() {
  console.log('Loading Sound');
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/sounds/tile_crash.m4a')
  );
  tileCrashSound = sound;
}
