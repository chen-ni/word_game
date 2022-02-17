import {
  Dimensions,
} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const NUM_OF_COLUMNS = 9;
export const NUM_OF_ROWS = 13;

export const TILE_SIZE = WINDOW_WIDTH / NUM_OF_COLUMNS


// chosen letters
export const CHOSEN_LETTERS_BOARD_HEIGHT = 100;

// tile connections
export const CONNECTION_HEIGHT = TILE_SIZE * 0.7;


// styles
export const GAME_BACKGROUND_COLOR = '#e0b35f';