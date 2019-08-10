import React from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { MediaLibrary } from 'expo';

const Preview = props => {
  return (
    <View>
      <FadeIn>
        <Image
          source={{ uri: props.cameraProps.uri }}
          style={[
            styles.preview,
            props.cameraProps.flip ? styles.mirror : styles.preview,
          ]}
        />
      </FadeIn>
      {/* CANCEL BUTTON */}
      <Text
        style={styles.cancel}
        onPress={() => props.cameraProps.cancelPhoto()}
      >
        Cancel
      </Text>
      {/* FLIP BUTTON */}
      <Text style={styles.flip} onPress={() => props.cameraProps.flipPhoto()}>
        Flip
      </Text>
      {/* REPEAT BUTTON */}
      <Text
        style={styles.repeat}
        onPress={() => {
          props.cameraProps.playCompliment();
        }}
      >
        Repeat
      </Text>
      {/* SAVE BUTTON */}
      <Text
        style={styles.save}
        onPress={async () => {
          //save to camera roll and copy to 'YLG' album
          let photo = await MediaLibrary.createAssetAsync(
            props.cameraProps.path
          );
          // photo.filename = 'tomtom'
          //  console.log('this photo info is saved', photo)
          const album = await MediaLibrary.getAlbumAsync('You Look Great');
          // console.log('-=========', album)
          if (album === null) {
            await MediaLibrary.createAlbumAsync('You Look Great', photo, false);
          } else {
            MediaLibrary.addAssetsToAlbumAsync([photo], album, true);
          }
          //this may not work
          props.cameraProps.refreshGallery();
          // console.log(']]', this.state.path, album)
          props.cameraProps.cancelPhoto();
        }}
      >
        Save
      </Text>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  mirror: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    transform: [{ rotateY: '180deg' }],
  },
  cancel: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 50,
  },
  repeat: {
    position: 'absolute',
    right: 130,
    bottom: 50,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 50,
  },
  flip: {
    position: 'absolute',
    right: 130,
    bottom: 100,
    backgroundColor: 'transparent',
    fontWeight: '600',
    color: '#FFF',
    fontSize: 23,
    marginTop: 50,
  },
  save: {
    position: 'absolute',
    left: 20,
    bottom: 50,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 50,
  },
});
