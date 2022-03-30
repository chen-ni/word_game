import { makeAutoObservable, observable } from 'mobx';

import { ConfirmedWord } from '../models';

export class ScoreSystemStore {
  public confirmedWords: ConfirmedWord[] = [];

  constructor() {
    makeAutoObservable(this, {
      confirmedWords: observable,
    })
  }

  public addConfirmedWord(wordWithScore: ConfirmedWord): void {
    for (let i = 0; i < this.confirmedWords.length; i++) {
      if (wordWithScore.score > this.confirmedWords[i].score) {
        this.confirmedWords.splice(i, 0, wordWithScore);
        return;
      }
    }
    this.confirmedWords.push(wordWithScore);
  }
}

const scoreSystemStore = new ScoreSystemStore();

export function getScoreSystemStoreInstance() {
  return scoreSystemStore;
}