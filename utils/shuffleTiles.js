import {
  updateTilePositions
} from './updateTilePosition'

import {
  NUM_OF_COLUMNS, TILE_ANIMATION_TYPES
} from '../constants'

export function shuffleTiles(oldTiles) {
  // convert from 2D to 1D
  flattenedTileArray = [];
  oldTiles.forEach(col => {
    flattenedTileArray = flattenedTileArray.concat(col);
  });

  // shuffle the 1D array
  flattenedTileArray = shuffle(flattenedTileArray);

  // convert from 1D to 2D
  const newTiles = [];
  for (let i=0; i<NUM_OF_COLUMNS; i++) {
    newTiles.push([]);
  }
  let curColIndex = 0;
  while (flattenedTileArray.length > 0) {
    const tile = flattenedTileArray.shift();
    newTiles[curColIndex].push(tile);
    curColIndex = (curColIndex + 1) % NUM_OF_COLUMNS;
  }

  updateTilePositions(newTiles, TILE_ANIMATION_TYPES.SHUFFLE);
  return newTiles;
}

// copied from: https://stackoverflow.com/a/2450976/7438905
function shuffle(array) {
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
