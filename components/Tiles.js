import {
  StyleSheet,
  Text,
  Animated
} from 'react-native';

import {
  TILE_SIZE
} from '../constants'

export const Tiles = ({ tiles, handleTapTile }) => {

  return (
    <>
      {
        tiles.map(col => 
          col.map(tile => (
            tile.animatedPositionY
            ? <Animated.Text
                key={tile.key}
                style={[
                  styles.tile,
                  {
                    left: tile.positionX,
                    bottom: tile.animatedPositionY,
                  }
                ]}
              >
                {tile.letter}
              </Animated.Text>
            : <Text
                key={tile.key}
                style={[
                  styles.tile,
                  tile.chosen ? styles.chosen : {},
                  {
                    left: tile.positionX,
                    bottom: tile.positionY,
                  }
                ]}
                onPress={() => handleTapTile(tile)}
              >
                {tile.letter}
              </Text>
          ))
        )
      }
    </>
  )
}

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