import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store/Store';
import CardGameContainer from './src/containers/game_home/CardGameContainer';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <CardGameContainer />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
