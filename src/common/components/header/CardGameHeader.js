import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {updateStepsCount} from '../../../redux/actions';

const HomeHeader = props => {
  const {leftButtonTitle, title} = props?.params;
  const leftButtonCallback = props.leftButtonCallback;
  const steps = useSelector(state => state?.cardGame?.stepsCount);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={leftButtonCallback}>
            <Text style={styles.leftButtonTextStyle}>{leftButtonTitle}</Text>
          </Pressable>
          <View style={styles.stepsWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.stepsCount}>{steps}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    backgroundColor: '#2E3E43',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftButtonTextStyle: {
    padding: 8,
    fontSize: 20,
    fontWeight: '400',
    color: '#28A0EA',
  },
  stepsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  title: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  stepsCount: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    paddingRight: 8,
    fontSize: 30,
    fontWeight: '400',
    color: '#28A0EA',
  },
});

const mapStateToProps = state => {
  return {
    stepCount: state?.cardGame?.stepsCount,
  };
};

export default connect(mapStateToProps, {
  updateStepsCount,
})(HomeHeader);
