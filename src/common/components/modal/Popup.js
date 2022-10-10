import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';

const PopupModal = props => {
  const {title, message, dismissButtonTitle, onDismiss, show} = props;

  const onPopupClose = () => {
    onDismiss();
  };

  return (
    <Modal
      visible={show}
      transparent
      onRequestClose={() => !show}
      animationType="fade"
      hardwareAccelerated>
      <View style={styles.modalContainer}>
        <View style={[styles.modalSubContainer]}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.textStyle}>{message}</Text>
          <TouchableOpacity
            style={styles.dismissButtonStyle}
            onPress={onPopupClose}>
            <Text style={styles.dismissTextStyle}>{dismissButtonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#00000099',
    paddingHorizontal: '5%',
  },
  modalSubContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  titleStyle: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    alignContent: 'center',
  },
  textStyle: {
    paddingTop: 4,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400',
    alignContent: 'center',
  },
  dismissButtonStyle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgray',
  },
  dismissTextStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#1C7EEA',
  },
});
