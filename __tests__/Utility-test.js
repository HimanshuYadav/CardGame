import {
  generateRandomNumbers,
  shuffle,
  getWindowWidth,
  getWindowHeight,
} from '../src/common/Utility';
import {Dimensions} from 'react-native';

describe('generateRandomNumbersArray', () => {
  it('should return a random list of 12 numbers', () => {
    const list1 = generateRandomNumbers(12);
    expect(list1.length).toEqual(12);
    const list2 = generateRandomNumbers(12);
    expect(list2.length).toEqual(12);
    expect(list1).not.toEqual(list2);
  });
});

describe('ShuffleArray', () => {
  it('should shuffle the array', () => {
    const list = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    const shuffled = shuffle([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
    expect(list.length).toEqual(shuffled.length);
    expect(list).not.toEqual(shuffled);
  });
});

test('getWindowWidth', () => {
  const windowWidthUsingFunction = getWindowWidth();
  const windowWidth = Dimensions.get('window').width;
  expect(windowWidthUsingFunction).toEqual(windowWidth);
});

test('getWindowHeight', () => {
  const windowHeightUsingFunction = getWindowHeight();
  const windowHeight = Dimensions.get('window').height;
  expect(windowHeightUsingFunction).toEqual(windowHeight);
});
