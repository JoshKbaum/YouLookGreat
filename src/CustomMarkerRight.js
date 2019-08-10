import React from 'react';
import { StyleSheet, View } from 'react-native';

class CustomMarkerRight extends React.Component {
  render() {
    return (
      <View style={styles.triangleUp} />
    );
  }
}

const styles = StyleSheet.create({
  triangleUp: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'darkolivegreen'
  }

});

export default CustomMarkerRight;
