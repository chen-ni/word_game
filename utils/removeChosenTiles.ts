import { TileMatrix } from "../models";

export function removeChosenTiles(tileMatrix: TileMatrix): void {
  tileMatrix.forEach(column => {
    for (let i=column.length-1; i>=0; i--) {
      const tile = column[i]
      if (tile.chosen) {
        column.splice(i, 1)
      }
    }
  })
}