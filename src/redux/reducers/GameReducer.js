import {GAME_STATES} from '../../common/Utility';
import {GAME_STATE, LOADING_STATE, STEPS_COUNTER} from '../actions/types';

const INITIAL_STATE = {
  gameState: GAME_STATES.PREPARING,
  loadingState: false,
  stepsCount: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_STATE:
      return {...state, gameState: action.payload};
    case LOADING_STATE:
      return {...state, loadingState: action.payload};
    case STEPS_COUNTER:
      return {...state, stepsCount: action.payload};
    default:
      return state;
  }
};
