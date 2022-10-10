import {Dimensions} from 'react-native';

export function generateRandomNumbers(count) {
  const nums = new Set();
  while (nums.size !== count) {
    nums.add(Math.floor(Math.random() * 100) + 1);
  }
  return Array.from(nums);
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function getWindowWidth() {
  return Dimensions.get('window').width;
}

export function getWindowHeight() {
  return Dimensions.get('window').height;
}

export const GAME_STATES = {
  PREPARING: 'PREPARING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};
