import { makeAutoObservable, observable } from 'mobx';

import { GameState, MenuState } from '../models';
import { getTileStoreInstance } from './tile-store';

export class MainStore {
  public gameState = GameState.NORMAL;
  public menuState = MenuState.MAIN_MENU;

  constructor() {
    makeAutoObservable(this, {
      gameState: observable,
      menuState: observable,
    });
  }

  showMenu(): void {
    getTileStoreInstance().clearChosen();
    this.gameState = GameState.MENU;
    this.enterMainMenu();
  };

  enterMainMenu(): void {
    this.menuState = MenuState.MAIN_MENU;
  }

  enterWordlist(): void {
    this.menuState = MenuState.WORDLIST;
  }

  resumeGame(): void {
    this.gameState = GameState.NORMAL;
  };

  restartGame(): void {
    getTileStoreInstance().reset();
    this.gameState = GameState.NORMAL;
  }
}

const mainStore = new MainStore();

export function getMainStoreInstance() {
  return mainStore;
}