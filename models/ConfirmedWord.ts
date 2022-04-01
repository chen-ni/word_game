export class ConfirmedWord {
  public word: string;
  public score: number;
  public id: string;

  constructor(word: string, score: number) {
    this.word = word;
    this.score = score;
    this.id = this.toString();
  }

  public toString(): string {
    return `${this.word}(${this.score})`;
  }
}
