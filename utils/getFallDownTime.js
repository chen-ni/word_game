import { TILE_SIZE } from './constants'

export function getFallDownTime(distance) {
  const unitTime = 300; // 0.3s
  
  return unitTime * Math.abs(distance / TILE_SIZE);
}