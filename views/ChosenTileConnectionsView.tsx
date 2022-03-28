import {
  View,
  StyleSheet
} from 'react-native';

import {
  TILE_SIZE,
  CONNECTION_HEIGHT
} from '../constants'

import { observer } from "mobx-react-lite"

import { getTilesStoreInstance } from '../stores';

export const ChosenTileConnectionsView = observer(() => {
  const tilesStore = getTilesStoreInstance();

  const connections = [];
  if (tilesStore.chosenTiles.length < 2) {
    return <></>;
  }

  tilesStore.chosenTiles.reduce((prevTile, curTile) => {
    let connectionLength;
    let startPositionX;
    let startPositionY;
    let rotate: string;
    let translateY = 0;
    let translateX = 0;

    // diagonal
    if (prevTile.colIndex !== curTile.colIndex && prevTile.rowIndex !== curTile.rowIndex) {
      connectionLength = TILE_SIZE * 2;
      const startTile = prevTile.colIndex < curTile.colIndex
        ? prevTile
        : curTile;
      startPositionX = startTile.colIndex * TILE_SIZE;
      startPositionY = startTile.rowIndex * TILE_SIZE;
      // slash direction, like `/`
      if ((prevTile.colIndex - curTile.colIndex) * (prevTile.rowIndex - curTile.rowIndex) > 0) {
        rotate = '-45deg';
        translateY = TILE_SIZE * -0.4;
        translateX = TILE_SIZE * 0.5;
      }
      // back-slack direction, like `\`
      else {
        rotate = '45deg';
        translateY = TILE_SIZE * 0.2;
        translateX = TILE_SIZE * 0.3;
      }
    }
    // non-diagonal
    else {
      // vertical
      if (prevTile.colIndex === curTile.colIndex) {
        connectionLength = TILE_SIZE * 1.75;
        const startTile = prevTile.rowIndex < curTile.rowIndex
          ? prevTile
          : curTile;
        startPositionX = startTile.colIndex * TILE_SIZE;
        startPositionY = startTile.rowIndex * TILE_SIZE;
        rotate = '-90deg';
        translateY = TILE_SIZE * -0.38;
        translateX = TILE_SIZE * 0.65;
      }
      // horizontal
      else if (prevTile.rowIndex === curTile.rowIndex) {
        connectionLength = TILE_SIZE * 1.5;
        const startTile = prevTile.colIndex < curTile.colIndex
          ? prevTile
          : curTile;
        startPositionX = startTile.colIndex * TILE_SIZE + TILE_SIZE * 0.25;
        startPositionY = startTile.rowIndex * TILE_SIZE + (TILE_SIZE - CONNECTION_HEIGHT) * 0.5;
        rotate = '0deg';
        translateY = 0;
      }
    }

    const style = {
      left: startPositionX,
      bottom: startPositionY,
      width: connectionLength,
      transform: [
        {
          rotate
        },
        {
          translateY
        },
        {
          translateX
        },
      ]
    }

    connections.push({
      id: JSON.stringify(style),
      style
    });

    return curTile;
  })

  return (
    <>
      {
        connections.map((connection) => (
          <View
            key={connection.id}
            style={[
              styles.baseStyle,
              connection.style
            ]}
          />
        ))
      }
    </>
  )
});

const styles = StyleSheet.create({
  baseStyle: {
    position: 'absolute',
    backgroundColor: 'red',
    opacity: 0.5,
    height: CONNECTION_HEIGHT,
    borderRadius: 100,
  }
})