import React, { FC, useRef, useEffect } from "react";
import { Animated } from "react-native";
import { MenuState } from '../models';
import { getMainStoreInstance } from "../stores";
import { WINDOW_HEIGHT } from "../constants";
import { menuStyles as styles } from "../stylesheets";
import { MainMenuView } from './MainMenuView';
import { WordListView } from './WordListView';

interface MenuViewProps {
  onResume: () => void;
  onRestart: () => void;
}

export const MenuView: FC<MenuViewProps> = (props) => {
  const animatedTranslateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current
  const mainStore = getMainStoreInstance();

  const { onResume, onRestart } = props;

  useEffect(() => {
    // move in
    Animated.timing(
      animatedTranslateY,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }
    ).start();
  }, [])

  const menuMoveOut = (callback) => () => {
    // move out
    Animated.timing(
      animatedTranslateY,
      {
        toValue: WINDOW_HEIGHT,
        duration: 100,
        useNativeDriver: true
      }
    ).start(callback);
  }

  return (
    <Animated.View style={[
      styles.menu,
      {
        transform: [
          {
            translateY: animatedTranslateY
          },
        ]
      }
    ]}>
      {
        mainStore.menuState === MenuState.MAIN_MENU && (
          <MainMenuView onResume={menuMoveOut(onResume)} />
        )
      }
      {
        mainStore.menuState === MenuState.WORD_LIST && <WordListView />
      }
    </Animated.View>
  )
}
