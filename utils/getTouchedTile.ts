import { Tile, TileMatrix } from "../models";
import { TILE_SIZE, WINDOW_HEIGHT } from "../constants";

export function getTouchedTile(x: number, y: number, tileMatrix: TileMatrix): Tile {
  const colIndex = Math.floor(x / TILE_SIZE);
  const rowIndex = Math.floor((WINDOW_HEIGHT - y) / TILE_SIZE);

  if (x < colIndex * TILE_SIZE + 0.2 * TILE_SIZE || x > colIndex * TILE_SIZE + 0.8 * TILE_SIZE) {
    return null;
  }

  if ((WINDOW_HEIGHT - y) < rowIndex * TILE_SIZE + 0.2 * TILE_SIZE || (WINDOW_HEIGHT - y) > rowIndex * TILE_SIZE + 0.8 * TILE_SIZE) {
    return null;
  }

  const column = tileMatrix[colIndex];
  
  if (rowIndex > column.length - 1) {
    return null;
  }

  return column[rowIndex];
}