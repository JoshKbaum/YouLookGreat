import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
  Octicons,
} from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import { MediaLibrary } from 'expo';

const Preview = props => {
  return (
    <View >
      <FadeIn>
        <Image
          source={{ uri: props.cameraProps.uri }}
          style={[
            styles.preview,
            props.cameraProps.flip ? styles.mirror : styles.preview,
          ]}
        />
      </FadeIn>
      {/* HUD */}
      <View style={styles.hud}>
        {/* SAVE BUTTON */}
        <TouchableHighlight
          style={{
            width: 35,
            height: 35,
            backgroundColor: 'pink',
            // position: 'absolute',
            // bottom: 45,
          }}
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
              await MediaLibrary.createAlbumAsync(
                'You Look Great',
                photo,
                false
              );
            } else {
              MediaLibrary.addAssetsToAlbumAsync([photo], album, true);
            }
            //this may not work
            props.cameraProps.refreshGallery();
            // console.log(']]', this.state.path, album)
            props.cameraProps.cancelPhoto();
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Feather
              name="save"
              size={30}
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: 1.5,
                marginLeft: 1
              }}
            />
          </View>
        </TouchableHighlight>
        {/* FLIP */}
        <TouchableHighlight
          style={{ width: 35, height: 35, backgroundColor: 'goldenrod'}}
          onPress={() => props.cameraProps.flipPhoto()}
        >
          <View style={{ alignItems: 'center' }}>
            <Octicons
              name="mirror"
              size={30}
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginTop: 2,
                marginLeft: 1
              }}
            />
          </View>
        </TouchableHighlight>
        {/* REPEAT */}
        <TouchableHighlight
          style={{ width: 35, height: 35, backgroundColor: 'darkolivegreen'}}
          onPress={() => {
            props.cameraProps.playCompliment();
          }}
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
        </TouchableHighlight>
        {/* CANCEL */}
        <TouchableHighlight
          style={{ width: 35, height: 35, backgroundColor: 'darkslateblue'}}
          onPress={() => props.cameraProps.cancelPhoto()}
        >
          <View style={{ alignItems: 'center' }}>
            <FontAwesome
              name="remove"
              size={32}
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 1
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  hud: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    bottom: 45
  },
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
  rightHand: {
    flexDirection: 'row',
    alignItems: 'flex-end', //right
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 5,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
});
