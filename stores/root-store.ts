import { MainStore } from './main-store';
import { TileStore } from './tile-store';
import { ScoreSystemStore } from './score-system-store';

export class RootStore {
  public mainStore: MainStore;
  public tileStore: TileStore;
  public scoreSystemStore: ScoreSystemStore;
}

