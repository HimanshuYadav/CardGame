import {combineReducers} from 'redux';
import GameReducer from './GameReducer';

export default combineReducers({
  cardGame: GameReducer,
});
