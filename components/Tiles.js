import {
  StyleSheet,
  Animated
} from 'react-native';

import {
  TILE_SIZE
} from '../constants'

export const Tiles = ({ tiles, handleTapTile }) => 
  <>
    {
      tiles.map(col => 
        col.map(tile => 
          <Animated.Text
            key={tile.key}
            style={[
              styles.tile,
              tile.chosen ? styles.chosen : {},
              {
                left: tile.animatedPositionX,
                bottom: tile.animatedPositionY,
              }
            ]}
            onPress={() => handleTapTile(tile)}
          >
            {tile.letter}
          </Animated.Text>
        )
      )
    }
  </>

const styles = StyleSheet.create({
  tile: {
    fontSize: TILE_SIZE * 0.6, 
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: '#fce5c0',
    textAlign: 'center',
    position: 'absolute',
    fontWeight: '200',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  chosen: {
    color: '#fce5c0',
    backgroundColor: '#806543'
  }
});