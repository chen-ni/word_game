import { action, computed, makeAutoObservable, observable } from 'mobx';
import {
  updateTilePositions,
  generateTileMatrix,
  isValidTap,
  checkWord,
  removeChosenTiles,
  triggerTapSound,
  shuffleTiles,
  getScoreForWord
} from '../utils';

import { TileAnimationType, Tile, TileMatrix, ConfirmedWord } from '../models';
import { getScoreSystemStoreInstance, ScoreSystemStore } from './score-system-store';

export class TileStore {
  public tiles: TileMatrix = [];
  public chosenTiles: Tile[] = [];

  private scoreSystemStore: ScoreSystemStore;

  constructor() {
    makeAutoObservable(this, {
      tiles: observable,
      chosenTiles: observable,
      chosenLetters: computed,
      clearChosen: action.bound,
      handleTapTile: action.bound,
      confirmWord: action.bound,
      shuffle: action.bound
    });
    this.reset();
    this.scoreSystemStore = getScoreSystemStoreInstance();
  }

  reset(): void {
    const tiles: TileMatrix = generateTileMatrix();
    updateTilePositions(tiles, TileAnimationType.NONE);

    this.tiles = tiles;
  }

  get chosenLetters() {
    return this.chosenTiles
      .map(tile => tile.letter)
      .reduce((a, b) => a + b, '');
  }

  get wordIsValid(): boolean {
    return checkWord(this.chosenLetters);
  } 

  clearChosen(): void {
    this.chosenTiles = [];

    this.tiles.forEach(column => {
      column.forEach(tile => {
        tile.chosen = false
      })
    })

    this.tiles = [...this.tiles];
  }

  truncateChosen(tile: Tile): void {
    let truncatedIndex = -1;

    for (let i=this.chosenTiles.length-1; i>=0; i--) {
      const chosenTile = this.chosenTiles[i];
      if (chosenTile.key === tile.key) {
        truncatedIndex = i;
      }
    }

    if (truncatedIndex < 0 || truncatedIndex === this.chosenTiles.length-1) {
      return;
    }

    this.chosenTiles.slice(truncatedIndex + 1).forEach(tile => {
      tile.chosen = false;
    })

    this.chosenTiles = this.chosenTiles.slice(0, truncatedIndex + 1);
    triggerTapSound(this.chosenTiles.length);
    
    this.tiles = [...this.tiles];
  }

  handleTapTile(tile) {
    if (this.chosenTiles.length > 0) {
      const lastTile = this.chosenTiles[this.chosenTiles.length-1];
      if (!isValidTap(tile, lastTile)) {
        return this.clearChosen();
      }
    }

    tile.chosen = true
    this.chosenTiles = [...this.chosenTiles, tile];
    this.tiles = [...this.tiles];
    triggerTapSound(this.chosenTiles.length);
  }

  confirmWord() {
    this.scoreSystemStore.addConfirmedWord(new ConfirmedWord(
      this.chosenLetters,
      getScoreForWord(this.chosenLetters)
    ));
    removeChosenTiles(this.tiles);
    this.clearChosen();
    updateTilePositions(this.tiles, TileAnimationType.FALL_DOWN);
    this.tiles = [...this.tiles];
  }

  shuffle () {
    this.clearChosen();
    const shuffledTiles = shuffleTiles(this.tiles);
    this.tiles = [...shuffledTiles];
  }
}

const tileStore = new TileStore();

export function getTileStoreInstance() {
  return tileStore;
}