import React from 'react';
import { StyleSheet, Image } from 'react-native';

class CustomMarkerRight extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={require('../assets/images/greenUp.png')}
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
});

export default CustomMarkerRight;
