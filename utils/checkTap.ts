import { Tile } from '../models';

export function isValidTap(tile: Tile, lastTile: Tile): boolean {
  if (tile.chosen) {
    return false;
  }

  const { colIndex, rowIndex } = tile;
  const { colIndex: lastColIndex, rowIndex: lastRowIndex } = lastTile;

  if ((Math.abs(colIndex - lastColIndex) > 1)
    || (Math.abs(rowIndex - lastRowIndex) > 1)){
    return false;
  }

  return true;
}
