import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const SelectedPhoto = (props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.galleryProps.uri }} style={styles.image} />
      <Text
        onPress={() => {
          // console.log('repeat compliment');
        }}
        style={styles.text}
      >
        Repeat Compliment
      </Text>
      <Text
        onPress={() => {
           props.galleryProps.goBackToGallery()

        }}
        style={styles.text}
      >
        back to gallery
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 200,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default SelectedPhoto;
