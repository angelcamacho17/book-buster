import { Action, createReducer, on } from '@ngrx/store'
import { Score } from '../models/score.model'
import * as ScoreActions from '../actions/score.actions'

// Section 1
const initialState: Score = {
    team: 'Aleti',
    goals: 1
}

const _scoreReducer = createReducer(initialState,
  on(ScoreActions.increment, state => state = {
    goals: state.goals + 1,
    team: 'real madrid'
  }),
  on(ScoreActions.decrement, state => state = {
    goals: state.goals - 1,
    team: 'barca'
  }),
  on(ScoreActions.reset, state => state = {
    goals: 500,
    team: 'aleti'
  }),
);

// Section 2
export function scoreReducer(state, action) {
  return _scoreReducer(state, action);
}
