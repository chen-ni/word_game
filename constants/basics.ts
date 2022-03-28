import { Dimensions } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('screen').width;
export const WINDOW_HEIGHT = Dimensions.get('screen').height;
export const NUM_OF_COLUMNS = 9;
export const NUM_OF_ROWS = 13;

export const TILE_SIZE = WINDOW_WIDTH / NUM_OF_COLUMNS

// shuffling
export const SHUFFLE_TIME = 1500; // 1.5s
