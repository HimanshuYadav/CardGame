import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {
  updateGameState,
  updateLoadingState,
  updateStepsCount,
} from '../../redux/actions';
import {
  shuffle,
  generateRandomNumbers,
  GAME_STATES,
} from '../../common/Utility';
import Header, {HeaderTypes} from '../../common/components/header/Header';
import CardGameView from './CardGameView';
import {connect, useSelector} from 'react-redux';
import PopupModal from '../../common/components/modal/Popup';

const CardGameContainer = props => {
  const [datasource, setDatasource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const headerParams = {
    leftButtonTitle: 'Restart',
    title: 'STEPS:',
  };
  const gameState = useSelector(state => state?.cardGame?.gameState);

  useEffect(() => {
    restartGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (gameState) {
      case GAME_STATES.PREPARING:
        if (datasource == null) {
          //Initially intantly prepare the game
          setDatasource(generateRandomNumberArrayOfCount(12));
        } else {
          //After completion restart the game after dismissing the modal (animation)
          setTimeout(() => {
            restartGame();
          }, 1000);
        }
        break;
      case GAME_STATES.IN_PROGRESS:
        setShowModal(false);
        break;
      case GAME_STATES.COMPLETED:
        //To show game complition Modal
        setShowModal(true);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  function generateRandomNumberArrayOfCount(count) {
    let evenCount = count;
    if (count < 12) {
      evenCount = 12;
    }
    if (evenCount % 2 !== 0) {
      evenCount = evenCount + 1;
    }
    let nums = generateRandomNumbers(evenCount / 2);
    let objs = nums?.map((number, index) => ({
      frontText: '?',
      backText: number,
      isSelected: false,
      isFreezed: false,
      animatedValue: 0,
      currentValue: 0,
    }));
    objs = [...objs, ...objs];
    let shuffledArray = shuffle(objs);
    let indexedArray = shuffledArray.map((item, index) => ({...item, index}));
    return indexedArray;
  }

  function restartGame() {
    setShowModal(false);
    props?.updateStepsCount(0);
    props?.updateGameState(GAME_STATES.PREPARING);
    setDatasource(null);
    setDatasource(generateRandomNumberArrayOfCount(12));
  }

  const checkIsGameCompleted = cards => {
    let freezedCards = cards?.filter(checkFreezed);
    if (freezedCards?.length === datasource?.length) {
      props?.updateGameState(GAME_STATES.COMPLETED);
    }
  };

  function checkFreezed(card) {
    return card?.isFreezed === true;
  }

  const headerLeftButtonCallback = () => {
    //On clicking restart button, RESTART THE GAME!!
    restartGame();
  };

  const gamePreparedCallback = item => {
    //Game is prepared, Now move it to Inprogress state.
    props?.updateGameState(GAME_STATES.IN_PROGRESS);
  };

  const onCardClicked = item => {
    props?.updateLoadingState(true);
  };

  const onCardFlipped = cards => {
    let count = props?.stepCount + 1;
    props?.updateStepsCount(count);
    props?.updateLoadingState(false);
    if (cards !== undefined) {
      checkIsGameCompleted(cards);
    }
  };

  const onPopupDismiss = () => {
    restartGame();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        type={HeaderTypes.HOME}
        leftButtonCallback={headerLeftButtonCallback}
        params={headerParams}
        render={true}
      />
      {props?.loading === true ? <View style={styles.loader} /> : null}
      {datasource ? (
        <CardGameView
          datasource={datasource}
          gameState={gameState}
          gamePreparedCallback={gamePreparedCallback}
          onCardClick={onCardClicked}
          onCardFlip={onCardFlipped}
        />
      ) : null}
      {showModal === true ? (
        <PopupModal
          title={'Congratulations!'}
          message={'You win the game by ' + props?.stepCount + ' steps!'}
          dismissButtonTitle={'Try another round'}
          onDismiss={onPopupDismiss}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  loader: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = state => {
  return {
    gameState: state?.cardGame?.gameState,
    loading: state?.cardGame?.loadingState,
    stepCount: state?.cardGame?.stepsCount,
  };
};

export default connect(mapStateToProps, {
  updateGameState,
  updateLoadingState,
  updateStepsCount,
})(CardGameContainer);
