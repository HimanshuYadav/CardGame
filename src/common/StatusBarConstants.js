import {Dimensions, Platform, StatusBar} from 'react-native';
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const XII_WIDTH = 390;
const XII_HEIGHT = 844;
const {height, width} = Dimensions.get('window');
export const hasNotch = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT) ||
      (width === XII_WIDTH && height === XII_HEIGHT)
    : false;
export const StatusBarHeight = Platform.select({
  ios: hasNotch() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});
export const BottomBarHeight = Platform.select({
  ios: hasNotch() ? 34 : 0,
  android: 0,
  default: 0,
});
