import { Tile, TileMatrix, TileAnimationType } from '../models';
import { updateTilePositions } from './updateTilePosition';

import { NUM_OF_COLUMNS } from '../constants'

export function shuffleTiles(oldTileMatrix: TileMatrix): TileMatrix {
  // convert from 2D to 1D
  let tileArray: Tile[] = [];
  oldTileMatrix.forEach(col => {
    tileArray = tileArray.concat(col);
  });

  // shuffle the 1D array
  tileArray = shuffle(tileArray);

  // convert from 1D to 2D
  const newTileMatrix: TileMatrix = [];
  for (let i=0; i<NUM_OF_COLUMNS; i++) {
    newTileMatrix.push([]);
  }
  let curColIndex = 0;
  while (tileArray.length > 0) {
    const tile = tileArray.shift();
    newTileMatrix[curColIndex].push(tile);
    curColIndex = (curColIndex + 1) % NUM_OF_COLUMNS;
  }

  updateTilePositions(newTileMatrix, TileAnimationType.SHUFFLE);
  return newTileMatrix;
}

// copied from: https://stackoverflow.com/a/2450976/7438905
function shuffle(array: Tile[]): Tile[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
