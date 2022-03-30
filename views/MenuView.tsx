import React, { FC, useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { MenuState } from '../models';
import { MENU_MOVE_IN_TIME, MENU_MOVE_OUT_TIME, WINDOW_HEIGHT } from "../constants";
import { menuStyles as styles } from "../stylesheets";
import { MainMenuView } from './MainMenuView';
import { WordListView } from './WordListView';

interface MenuViewProps {
  onResume: () => void;
  onRestart: () => void;
}

export const MenuView: FC<MenuViewProps> = (props) => {
  const [menuState, setMenuState] = useState<MenuState>(MenuState.MAIN_MENU);
  const animatedTranslateY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const { onResume, onRestart } = props;

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

  const menuMoveOut = (callback) => () => {
    // move out
    Animated.timing(
      animatedTranslateY,
      {
        toValue: WINDOW_HEIGHT,
        duration: MENU_MOVE_OUT_TIME,
        useNativeDriver: true
      }
    ).start(callback);
  }

  const enterWordList = () => {
    setMenuState(MenuState.WORDLIST);
  }

  const enterMainMenu = () => {
    setMenuState(MenuState.MAIN_MENU);
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
        menuState === MenuState.MAIN_MENU && (
          <MainMenuView 
            onResume={menuMoveOut(onResume)}
            onEnterWordList={enterWordList}
          />
        )
      }
      {
        menuState === MenuState.WORDLIST && (
          <WordListView
            onReturn={enterMainMenu}
          />
        )
      }
    </Animated.View>
  )
}
