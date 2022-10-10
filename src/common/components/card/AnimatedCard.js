import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {GAME_STATES} from '../../Utility';
import BackCard from './BackCard';
import FrontCard from './FrontCard';

const AnimatedCard = props => {
  const {gameState, cardData, HEIGHT, WIDTH, flipCallback} = props;
  const newCardData = cardData;
  const cardClickCallback = props?.cardClickCallback;

  let animatedValue = new Animated.Value(cardData?.animatedValue);
  let currentValue = cardData?.currentValue;

  useEffect(() => {
    if (
      gameState === GAME_STATES.PREPARING &&
      (cardData?.isFreezed === true || cardData?.isSelected === true)
    ) {
      // Flip cards to initial state through animation.
      if (currentValue >= 90) {
        Animated.spring(animatedValue, {
          toValue: 0,
          tension: 10,
          friction: 8,
          useNativeDriver: true,
        }).start(() => {});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    if (
      gameState === GAME_STATES.IN_PROGRESS &&
      cardData?.isFreezed === false &&
      currentValue >= 90
    ) {
      // Flip card to show number.
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData]);

  animatedValue.addListener(({value}) => {
    currentValue = value;
    newCardData.animatedValue = value;
    newCardData.currentValue = currentValue;
  });

  const flipAnimation = () => {
    if (cardData?.isFreezed) {
      return;
    }
    setTimeout(() => {
      cardClickCallback();
    }, 500);
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {
        flipCallback(newCardData);
      });
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {
        flipCallback(newCardData);
      });
    }
  };

  const setFrontCardInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const setBackCardInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const rotateFrontCardYAnimatedStyle = {
    transform: [{rotateY: setFrontCardInterpolate}],
  };

  const rotateBackCardYAnimatedStyle = {
    transform: [{rotateY: setBackCardInterpolate}],
  };

  return (
    <SafeAreaView style={[styles.container, {height: HEIGHT, width: WIDTH}]}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => flipAnimation()}>
        <View style={styles.container}>
          <Animated.View
            style={[
              rotateFrontCardYAnimatedStyle,
              styles.frontCardStyle,
              {height: HEIGHT, width: WIDTH},
            ]}>
            <FrontCard
              cardText={cardData?.frontText}
              HEIGHT={HEIGHT}
              WIDTH={WIDTH}
            />
          </Animated.View>
          <Animated.View
            style={[
              rotateBackCardYAnimatedStyle,
              styles.backCardStyle,
              {height: HEIGHT, width: WIDTH},
            ]}>
            <BackCard
              cardText={cardData?.backText}
              HEIGHT={HEIGHT}
              WIDTH={WIDTH}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 4,
  },
  frontCardStyle: {
    borderRadius: 6,
    borderWidth: 6,
    borderColor: 'white',
    backgroundColor: '#28A0EA',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCardStyle: {
    borderRadius: 6,
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
});

export default AnimatedCard;
