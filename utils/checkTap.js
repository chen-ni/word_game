export function isValidTap(colIndex, rowIndex, lastColIndex, lastRowIndex, tile) {
  if (tile.chosen) {
    return false
  }

  if (!lastColIndex && !lastRowIndex) {
    return true
  }

  if ((Math.abs(colIndex - lastColIndex) > 1)
    || (Math.abs(rowIndex - lastRowIndex) > 1)){
    return false
  }

  return true
}
