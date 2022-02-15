import {
    Dimensions,
  } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const NUM_OF_COLUMNS = 9;
export const NUM_OF_ROWS = 13;

export const TILE_SIZE = WINDOW_WIDTH / NUM_OF_COLUMNS


export const GROUND_WIDTH = WINDOW_HEIGHT;
export const GROUND_HEIGHT = 100;
export const GROUND_X = WINDOW_WIDTH / 2;
export const GROUND_Y = WINDOW_HEIGHT + GROUND_HEIGHT/2;

// styles
export const GAME_BACKGROUND_COLOR = '#e0b35f';