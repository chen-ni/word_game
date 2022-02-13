export function removeChosenTiles(tiles) {
  tiles.forEach(column => {
    for (i=column.length-1; i>=0; i--) {
      const tile = column[i]
      if (tile.chosen) {
        column.splice(i, 1)
      }
    }
  })
}