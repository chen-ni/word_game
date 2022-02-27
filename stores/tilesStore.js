import { action, computed, makeAutoObservable, observable } from 'mobx';
import {
  updateTilePositions,
  generateTiles,
  isValidTap,
  checkWord,
  removeChosenTiles,
  triggerTapSound,
  shuffleTiles
} from '../utils';

import { TILE_ANIMATION_TYPES } from '../constants';


class TilesStore {
  tiles = observable([]);
  chosenTiles = observable([]);
  chosenLetters = observable('');

  constructor() {
    makeAutoObservable(this, {
      tiles: observable,
      chosenTiles: observable,
      chosenLetters: computed,
      clearChosen: action.bound,
      handleTapTile: action.bound,
      confirmWord: action.bound,
      shuffle: action.bound
    })

    const tiles = generateTiles();
    updateTilePositions(tiles);

    this.tiles.replace(tiles);
  }

  get chosenLetters() {
    return this.chosenTiles
      .map(tile => tile.letter)
      .reduce((a, b) => a + b, '');
  }

  get wordIsValid() {
    return checkWord(this.chosenLetters);
  } 

  clearChosen () {
    this.chosenTiles.replace([]);

    this.tiles.forEach(column => {
      column.forEach(tile => {
        tile.chosen = false
      })
    })
  }

  handleTapTile(tile) {
    if (this.chosenTiles.length > 0) {
      const lastTile = this.chosenTiles[this.chosenTiles.length-1];
      if (!isValidTap(tile, lastTile)) {
        return this.clearChosen();
      }
    }

    tile.chosen = true
    triggerTapSound(this.chosenTiles.length);
    this.chosenTiles.replace([...this.chosenTiles, tile]);
  }

  confirmWord() {
    removeChosenTiles(this.tiles);
    this.clearChosen();
    updateTilePositions(this.tiles, TILE_ANIMATION_TYPES.FALL_DOWN);
    this.tiles.replace([...this.tiles])
  }

  shuffle () {
    this.clearChosen();
    const shuffledTiles = shuffleTiles(this.tiles);
    this.tiles.replace([...shuffledTiles]);
  }
}

const tilesStore = new TilesStore();

export function getTilesStoreInstance() {
  return tilesStore;
}