export function isValidTap(tile, lastTile) {
  if (tile.chosen) {
    return false;
  }

  const { colIndex, rowIndex } = tile;
  const { colIndex: lastColIndex, rowIndex: lastRowIndex } = lastTile;

  if ((Math.abs(colIndex - lastColIndex) > 1)
    || (Math.abs(rowIndex - lastRowIndex) > 1)){
    return false
  }

  return true
}
