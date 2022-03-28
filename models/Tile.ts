import { Animated } from 'react-native';
import { TILE_SIZE } from '../constants';

export class Tile {
  key: string;
  letter: string;
  chosen: boolean;
  colIndex: number;
  rowIndex: number;
  animatedPositionX: Animated.Value;
  animatedPositionY: Animated.Value;

  constructor(colIndex: number, rowIndex: number, letter: string) {
    this.key = Math.random().toString(16);
    this.letter = letter;
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
    this.chosen = false;
  }

  get positionX() {
    return this.colIndex * TILE_SIZE;
  }

  get positionY() {
    return this.rowIndex * TILE_SIZE;
  }
}
