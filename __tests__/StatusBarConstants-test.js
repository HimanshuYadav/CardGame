import {Dimensions, Platform, StatusBar} from 'react-native';
import {
  StatusBarHeight,
  BottomBarHeight,
  hasNotch,
} from '../src/common/StatusBarConstants';
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const XII_WIDTH = 390;
const XII_HEIGHT = 844;
const {height, width} = Dimensions.get('window');

test('hasNotch', () => {
  const notchFlag = hasNotch();
  const localNotchFlag =
    Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
      ? (width === X_WIDTH && height === X_HEIGHT) ||
        (width === XSMAX_WIDTH && height === XSMAX_HEIGHT) ||
        (width === XII_WIDTH && height === XII_HEIGHT)
      : false;
  expect(notchFlag).toEqual(localNotchFlag);
});

test('StatusBarHeight', () => {
  const statusBarHeight = StatusBarHeight;
  const localStatusBarHeight = Platform.select({
    ios: hasNotch() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0,
  });
  expect(statusBarHeight).toBe(localStatusBarHeight);
});

test('BottomBarHeight', () => {
  const bottomBarHeight = BottomBarHeight;
  const localBottomBarHeight = Platform.select({
    ios: hasNotch() ? 34 : 0,
    android: 0,
    default: 0,
  });
  expect(bottomBarHeight).toEqual(localBottomBarHeight);
});
