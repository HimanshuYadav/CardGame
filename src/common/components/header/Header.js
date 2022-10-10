import React from 'react';
import {StyleSheet, View} from 'react-native';
import CardGameHeader from './CardGameHeader';

export const HeaderTypes = {
  HOME: 'CardGameHeader',
};

const Header = props => {
  const {type, params, render} = props;
  const leftButtonCallback = props?.leftButtonCallback;
  const rightButtonCallback = props?.rightButtonCallback;

  return (
    <>
      <View style={styles.container} render={render}>
        {type === HeaderTypes.HOME ? (
          <CardGameHeader
            leftButtonCallback={leftButtonCallback}
            rightButtonCallback={rightButtonCallback}
            params={params}
          />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default Header;
