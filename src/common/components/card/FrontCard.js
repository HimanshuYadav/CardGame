import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const FrontCard = props => {
  const {cardText, HEIGHT, WIDTH} = props;
  return (
    <>
      <View style={[styles.container, {height: HEIGHT, width: WIDTH}]}>
        <Text style={styles.textStyle}>{cardText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '400',
    color: 'white',
  },
});

export default FrontCard;
