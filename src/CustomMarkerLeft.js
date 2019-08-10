import React from 'react';
import { StyleSheet, Image } from 'react-native';

class CustomMarkerLeft extends React.Component {
  render() {
    return (
      <Image
        style={styles.image}
        source={
          require('../assets/images/redDown.png')
        }
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    transform: [{ rotateX: '180deg' }],

  },
});

export default CustomMarkerLeft;