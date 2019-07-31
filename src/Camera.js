import React from 'react';
import { Camera, Permissions, Audio, MediaLibrary } from 'expo';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Vibration,
} from 'react-native';
// import * as Haptics from 'expo-haptics';
import { Header, Icon } from 'native-base';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';

// import styles from './styles';

// [[all, one, sounds],[all, two, sounds], [all, three, sounds]...]
// since expo does not currently allow template literals, this code cannot be DRY
const allSounds = [
  [require('../assets/audio/1.mp3')],
  [require('../assets/audio/2.mp3')],
  [require('../assets/audio/3.mp3')],
  [require('../assets/audio/4.mp3')],
  [require('../assets/audio/5.mp3')],
  [require('../assets/audio/6.mp3')],
  [require('../assets/audio/7.mp3')],
  [require('../assets/audio/8.mp3')],
  [require('../assets/audio/9.mp3')],
  [require('../assets/audio/10.mp3')],
];

export default class CameraComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      hasCameraPermission: null,
      cameraType: Camera.Constants.Type.front,
      flashMode: Camera.Constants.FlashMode.off,
      values: this.props.appProps.values,
      compliment: null,
      girl: this.props.appProps.girl,
    };
  }

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });

  takePicture = async () => {
    try {
      // take pic
      const data = await this.camera.takePictureAsync();
      this.setState({ path: data.uri });
      this.pickCompliment();
      Vibration.vibrate(100);
      // console.log('this is the photo data', data)
    } catch (err) {
      console.log('err: ', err);
    }
  };

  pickCompliment = () => {
    const soundBank = allSounds
      .slice(this.state.values[0] - 1, this.state.values[1])
      .flat();
    const compliment = soundBank[Math.floor(Math.random() * soundBank.length)];
    this.setState({ compliment: compliment });
    this.playCompliment();
  };

  playCompliment = async () => {
    const { sound } = await Audio.Sound.createAsync(this.state.compliment, {
      shouldPlay: true,
      isLooping: false,
    });
    this.sound = sound;
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  // updates the props when user changes settings
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.appProps.values !== prevState.values) {
      console.log('camera state is firing');
      return { values: nextProps.appProps.values };
    } else {
      return null; // Triggers no change in the state
    }
  }

  renderCamera() {
    const { hasCameraPermission, flashMode } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }

    return (
      <Camera
        ref={camera => {
          this.camera = camera;
        }}
        style={styles.preview}
        flashMode={flashMode}
        type={this.state.cameraType}
      >
        <Header
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
            left: 15,
            top: 0,
            right: 0,
            zIndex: 1,
            alignItems: 'center',
          }}
        >
          {/* CAMERA FLASH BUTTON */}
          {/* FLEX SPACE SHOULD BE FIXED */}
          <View style={{ flexDirection: 'row', flex: 9 }}>
            <Ionicons
              name={
                flashMode == Camera.Constants.FlashMode.on
                  ? 'ios-flash'
                  : 'ios-flash-off'
              }
              size={30}
              style={{
                color: 'white',
                fontWeight: 'bold',
                // justifyContent: 'flex-start',
              }}
              onPress={() =>
                this.setFlashMode(
                  flashMode === Camera.Constants.FlashMode.on
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.on
                )
              }
            />
          </View>
          {/* CAMERA TYPE BUTTON */}
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Icon
              onPress={() => {
                this.setState({
                  cameraType:
                    this.state.cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
                // Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              }}
              name="ios-reverse-camera"
              style={{
                color: 'white',
                fontWeight: 'bold',
                justifyContent: 'flex-end',
              }}
            />
          </View>
        </Header>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginBottom: 15,
          }}
        >
          {/* SETTINGS BUTTON */}
          <AntDesign
            name="setting"
            size={32}
            color="white"
            onPress={() => this.props.getSwiper().scrollBy(-1)}
          />
          {/* CIRCLE TAKE PHOTO BUTTON */}
          {/* <Feather
              name="circle"
              size={72}
              color="white"
              onPress={this.handleShortCapture}
            /> */}
          <TouchableHighlight
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <View />
          </TouchableHighlight>
          {/* GALLERY BUTTON */}
          <Icon
            name="ios-images"
            onPress={() => this.props.getSwiper().scrollBy(1)}
            style={{
              color: 'white',
              fontWeight: 'bold',
              justifyContent: 'flex-start',
            }}
          />
        </View>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <FadeIn>
          <Image source={{ uri: this.state.path }} style={styles.preview} />
        </FadeIn>
        {/* CANCEL BUTTON */}
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >
          Cancel
        </Text>
        {/* FLIP BUTTON */}
        <Text
          style={styles.flip}
          onPress={() => this.setState({ path: null })}
        >
          Flip
        </Text>
        {/* REPEAT BUTTON */}
        <Text style={styles.repeat} onPress={() => this.playCompliment()}>
          Repeat
        </Text>
        {/* SAVE BUTTON */}
        <Text
          style={styles.save}
          onPress={async () => {
            //save to camera roll and copy to 'YLG' album
            let photo = await MediaLibrary.createAssetAsync(this.state.path);
            // photo.filename = 'tomtom'
            //  console.log('this photo info is saved', photo)
            const album = await MediaLibrary.getAlbumAsync('You Look Great');
            // console.log('-=========', album.locationNames)
            if (album === null) {
              await MediaLibrary.createAlbumAsync(
                'You Look Great',
                photo,
                false
              );
            } else {
              MediaLibrary.addAssetsToAlbumAsync([photo], album, true);
            }
            this.props.appProps.refreshGallery();
            this.setState({ path: null });
          }}
        >
          Save
        </Text>
        {/* <TouchableHighlight
          onPress={() => {
            CameraRoll.saveToCameraRoll(this.state.path);
            this.setState({ path: null });
          }}
          style={styles.button}
        >
          <Text>Save</Text>
        </TouchableHighlight> */}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  frontPhoto: {
    transform: [{ rotateY: '180deg' }],
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
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
    color: '#FFF',
    fontWeight: '600',
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
  button: {
    height: 50,
    width: 50,
  },
});
