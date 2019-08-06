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
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
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
      zoom: 0,
      values: this.props.appProps.values,
      compliment: null,
      girl: this.props.appProps.girl,
      leftHanded: this.props.appProps.leftHanded,
      flip: false,
    };
  }

  // FUNCTIONS
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

  // when options change, this will update the state
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.appProps.values !== prevState.values ||
      nextProps.appProps.leftHanded !== prevState.leftHanded ||
      nextProps.appProps.girl !== prevState.girl
    ) {
      console.log('camera state is firing');
      return {
        values: nextProps.appProps.values,
        leftHanded: nextProps.appProps.leftHanded,
        girl: nextProps.appProps.girl,
      };
    } else {
      return null; // Triggers no change in the state
    }
  }

  renderCamera() {
    const {
      hasCameraPermission,
      flashMode,
      leftHanded,
      girl,
      zoom,
    } = this.state;

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
        zoom={zoom}
      >
        {/* HUD */}
        <View style={[leftHanded ? styles.leftHand : styles.rightHand]}>
          {/* SETTINGS BUTTON */}
          <AntDesign
            name="setting"
            size={30}
            onPress={() => this.props.getSwiper().scrollBy(-1)}
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginTop: 170,
              borderWidth: 1,
              backgroundColor: 'lightcoral',
              borderColor: '#d6d7da',
            }}
          />
          {/* ZOOM BUTTON */}
          {/* <Feather
            name={zoom == 0 ? 'zoom-in' : 'zoom-out'}
            size={30}
            onPress={() => {
              this.setState({
                zoom: this.state.zoom === 0 ? 0.1 : 0,
              });
            }}
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginTop: 10,
              borderWidth: 1,
              borderColor: '#d6d7da',
            }}
          /> */}
          {/* VOLUME BUTTON */}
          <Feather
            name="volume"
            size={32}
            onPress={() => {
              console.log('hi');
            }}
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginTop: 10,
              paddingLeft: 7,
              marginRight: -8,
              borderWidth: 1,
              backgroundColor: 'goldenrod',
              borderColor: '#d6d7da',
            }}
          />
          {/* GALLERY BUTTON */}
          <Icon
            name="md-images"
            onPress={() => this.props.getSwiper().scrollBy(1)}
            style={{
              color: 'white',
              // fontWeight: 'bold',
              marginTop: 10,
              paddingLeft: 3,
              // borderWidth: 1,
              backgroundColor: 'darkolivegreen',
              borderColor: '#d6d7da',
            }}
          />
          {/* CAMERA TYPE BUTTON */}
          <Ionicons
            onPress={() => {
              this.setState({
                cameraType:
                  this.state.cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              });
            }}
            name="md-reverse-camera"
            size={30}
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginTop: 10,
              paddingLeft: 3,
              backgroundColor: 'pink',
              // borderWidth: 1,
              borderColor: '#d6d7da',
            }}
          />
          {/* FLASH BUTTON */}
          <MaterialIcons
            name={
              flashMode == Camera.Constants.FlashMode.on
                ? 'flash-on'
                : 'flash-off'
            }
            size={30}
            style={{
              color: 'white',
              fontWeight: 'bold',
              marginTop: 10,
              // borderWidth: 1,
              backgroundColor: 'darkslateblue',
              borderColor: '#d6d7da',
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
        {/* CIRCLE TAKE PHOTO BUTTON */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginBottom: 15,
            zIndex: 1,
          }}
        >
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
        </View>
      </Camera>
    );
  }

  renderImage() {
    const { flip } = this.state;

    return (
      <View>
        <FadeIn>
          <Image
            source={{ uri: this.state.path }}
            style={[styles.preview, flip ? styles.fliper : styles.preview]}
          />
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
          onPress={() =>
            this.setState({
              flip: this.state.flip === false ? true : false,
            })
          }
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
  fliper: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    transform: [{ rotateY: '180deg' }],
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
  button: {
    height: 50,
    width: 50,
  },
  rightHand: {
    flexDirection: 'column',
    // flex-start = left, flex-end = right
    alignItems: 'flex-end',
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 12,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
  leftHand: {
    flexDirection: 'column',
    // flex-start = left, flex-end = right
    alignItems: 'flex-start',
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 12,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
});
