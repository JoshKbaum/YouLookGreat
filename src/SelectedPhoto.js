import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { Icon } from 'native-base';

const SelectedPhoto = props => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.galleryProps.uri }} style={styles.revisit} />
      {/* HUD */}
      <View style={styles.hud}>
        {/* REPEAT */}
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            backgroundColor: 'pink',
          }}
          onPress={() =>
            props.galleryProps.loadCompliment(props.galleryProps.filename)
          }
        >
          <View style={{ alignItems: 'center' }}>
            <FontAwesome
              name="repeat"
              size={30}
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: 2,
              }}
            />
          </View>
        </TouchableOpacity>
        {/* BACK TO GALLERY */}
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            backgroundColor: 'darkolivegreen',
          }}
          onPress={() => {
            props.galleryProps.goBackToGallery();
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Icon
              name="md-images"
              style={{
                color: 'white',
                marginTop: 1.4,
                marginLeft: 1,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectedPhoto;
