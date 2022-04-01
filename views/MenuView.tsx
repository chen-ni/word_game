import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { observer } from "mobx-react-lite"

import { MenuState } from '../models';
import { MENU_MOVE_IN_TIME, MENU_MOVE_OUT_TIME, WINDOW_HEIGHT } from "../constants";
import { menuStyles as styles } from "../stylesheets";
import { MainMenuView } from './MainMenuView';
import { WordListView } from './WordListView';
import { getMainStoreInstance } from "../stores/main-store";

export const MenuView = observer(() => {
  const animatedTranslateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const mainStore = getMainStoreInstance();

  useEffect(() => {
    // move in
    Animated.timing(
      animatedTranslateY,
      {
        toValue: 0,
        duration: MENU_MOVE_IN_TIME,
        useNativeDriver: true
      }
    ).start();
  }, [])

  const menuMoveOut = (callback?: Function) => () => {
    // move out
    Animated.timing(
      animatedTranslateY,
      {
        toValue: WINDOW_HEIGHT,
        duration: MENU_MOVE_OUT_TIME,
        useNativeDriver: true
      }
    ).start(() => {
      mainStore.resumeGame();
      callback?.();
    });
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
          <MainMenuView 
            menuMoveOut={menuMoveOut}
          />
        )
      }
      {
        mainStore.menuState === MenuState.WORDLIST && (
          <WordListView />
        )
      }
    </Animated.View>
  )
})
