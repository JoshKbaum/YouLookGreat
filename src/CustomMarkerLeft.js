import React from 'react';
import { StyleSheet, View } from 'react-native';

class CustomMarkerLeft extends React.Component {
  render() {
    return (
      <View style={styles.triangleDown} />

    );
  }
}

const styles = StyleSheet.create({
  triangleDown: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'lightcoral',
    transform: [
      {rotate: '180deg'}
    ]
  }

});

export default CustomMarkerLeft;