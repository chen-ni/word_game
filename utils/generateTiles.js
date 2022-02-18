import { NUM_OF_COLUMNS, NUM_OF_ROWS, TILE_SIZE } from '../constants';

const getRandomLetterWithFrequency = () => {
  // adapted from https://gist.github.com/furf/2413792
  const lookup = {
    // Ranges calculated from data found at
    // http://en.wikipedia.org/wiki/Letter_frequency
    a: 8167,  b: 9659,  c: 12441, d: 16694,
    e: 29396, f: 31624, g: 33639, h: 39733,
    i: 46699, j: 46852, k: 47624, l: 51649,
    m: 54055, n: 60804, o: 68311, p: 70240,
    q: 70335, r: 76322, s: 82649, t: 91705,
    u: 94463, v: 95441, w: 97801, x: 97951,
    y: 99925, z: 100000
  }

  const random = Math.random() * 100000;

  for (letter in lookup) {
    if (random < lookup[letter]) {
      return letter.toUpperCase();
    }
  }
}

const getId = () => Math.random().toString(16)

export function generateTiles() {
  result = []
  for (let i=0; i<NUM_OF_COLUMNS; i++) {
    col = []
    for (let j=0; j<NUM_OF_ROWS; j++) {
      col.push(
        {
          letter: getRandomLetterWithFrequency(),
          key: getId(),
          chosen: false,
          colIndex: i,
          rowIndex: j,
          get positionX() {
            return this.colIndex * TILE_SIZE;
          },
          get positionY() {
            return this.rowIndex * TILE_SIZE;
          },
          animatedPositionX: undefined,
          animatedPositionY: undefined,
        }
      )
    }
    result.push(col)
  }

  return result
}
