import React from 'react';
import { Image, View, Text, AsyncStorage } from 'react-native';
import styles from './styles';

const SelectedPhoto = props => {
  return (
    <View style={styles.gallery}>
      <Image source={{ uri: props.galleryProps.uri }} style={styles.image} />
      <Text
        onPress={() => props.galleryProps.loadCompliment(props.galleryProps.filename)}
        style={[styles.text, { fontFamily: 'Heavitas' }]}
      >
        Repeat Compliment
      </Text>
      <Text
        onPress={() => {
          props.galleryProps.goBackToGallery();
        }}
        style={[styles.text, { fontFamily: 'Heavitas' }]}
      >
        back to gallery
      </Text>
    </View>
  );
};

export default SelectedPhoto;
