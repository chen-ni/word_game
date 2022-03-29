import { makeAutoObservable, observable } from 'mobx';

import { GameState, MenuState } from '../models';

class MainStore {
  public gameState: GameState = GameState.NORMAL;
  public menuState: MenuState = MenuState.MAIN_MENU;

  constructor() {
    makeAutoObservable(this, {
      gameState: observable,
      menuState: observable,
    })
  }
}

const mainStore = new MainStore();

export function getMainStoreInstance() {
  return mainStore;
}