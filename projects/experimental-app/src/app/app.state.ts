import { Score } from './store-data/models/score.model';

export interface AppState {
  readonly score: Score[];
}
