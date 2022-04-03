import { makeAutoObservable, observable } from 'mobx';

import { ConfirmedWord } from '../models';

export class ScoreSystemStore {
  public confirmedWords: ConfirmedWord[] = [];
  public totalScore: number = 0;

  constructor() {
    makeAutoObservable(this, {
      confirmedWords: observable,
    })
  }

  reset(): void {
    this.confirmedWords = [];
    this.totalScore = 0;
  }

  addConfirmedWord(confirmedWord: ConfirmedWord): void {
    for (let i = 0; i < this.confirmedWords.length; i++) {
      if (confirmedWord.score > this.confirmedWords[i].score) {
        this.confirmedWords.splice(i, 0, confirmedWord);
        return;
      }
    }
    this.confirmedWords.push(confirmedWord);
    this.totalScore += confirmedWord.score;
  }
}

const scoreSystemStore = new ScoreSystemStore();

export function getScoreSystemStoreInstance() {
  return scoreSystemStore;
}