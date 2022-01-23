import {
    Dimensions,
  } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const NUM_OF_COLUMNS = 9;
export const NUM_OF_ROWS = 13;

export const TILE_SIZE = WINDOW_WIDTH / NUM_OF_COLUMNS