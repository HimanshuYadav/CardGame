import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AnimatedCard from '../../common/components/card/AnimatedCard';
import {getWindowWidth, getWindowHeight} from '../../common/Utility';
import {
  StatusBarHeight,
  BottomBarHeight,
} from '../../common/StatusBarConstants';

const CardGameView = props => {
  const [datasource, setDatasource] = useState(props?.datasource);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const gameState = props?.gameState;
  const gamePreparedCallback = props?.gamePreparedCallback;
  const onCardClicked = props?.onCardClick;
  const onCardFliped = props?.onCardFlip;
  const totalWidthOffset = 6 * 4;
  const totalHeightOffset = 8 * 4;
  const headerHeight = 50;
  const cardWidth = (getWindowWidth() - totalWidthOffset) / 3;
  const cardHeight =
    (getWindowHeight() -
      StatusBarHeight -
      BottomBarHeight -
      headerHeight -
      totalHeightOffset) /
    4;

  useEffect(() => {
    gamePreparedCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCardClickedCallback = item => {
    onCardClicked();
  };

  const flipCallback = item => {
    if (firstCard == null) {
      setFirstCard(item);
      setSecondCard(null);
      let first = {
        ...item,
        isFreezed: true,
        isSelected: true,
      };
      const array = datasource?.map(dataItem =>
        dataItem?.index === first?.index ? first : dataItem,
      );
      setDatasource(null);
      setDatasource(array);
      onCardFliped();
    } else if (secondCard == null) {
      setSecondCard(item);
      let first = null;
      let second = null;
      if (firstCard?.backText === item?.backText) {
        first = {
          ...firstCard,
          isFreezed: true,
          isSelected: true,
        };
        second = {
          ...item,
          isFreezed: true,
          isSelected: true,
        };
      } else {
        first = {
          ...firstCard,
          isFreezed: false,
          isSelected: false,
        };
        second = {
          ...item,
          isFreezed: false,
          isSelected: false,
        };
      }
      const array = datasource?.map(dataItem =>
        dataItem?.index === first?.index
          ? first
          : dataItem?.index === second?.index
          ? second
          : dataItem,
      );
      setFirstCard(null);
      setSecondCard(null);
      setDatasource(null);
      setDatasource(array);
      onCardFliped(array);
      return;
    }
  };

  return (
    <View style={styles.container}>
      {datasource ? (
        <FlatList
          data={datasource}
          renderItem={({item, index}) => (
            <AnimatedCard
              gameState={gameState}
              cardData={item}
              HEIGHT={cardHeight}
              WIDTH={cardWidth}
              flipCallback={flipCallback}
              cardClickCallback={onCardClickedCallback}
            />
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3E43',
  },
});

export default CardGameView;
