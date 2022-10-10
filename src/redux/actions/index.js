import {GAME_STATE, LOADING_STATE, STEPS_COUNTER} from './types';

export const updateGameState = data => {
  return {
    type: GAME_STATE,
    payload: data,
  };
};

export const updateLoadingState = data => {
  return {
    type: LOADING_STATE,
    payload: data,
  };
};

export const updateStepsCount = data => {
  return {
    type: STEPS_COUNTER,
    payload: data,
  };
};
