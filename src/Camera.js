import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Camera, Permissions, Audio } from 'expo';
import { Header, Icon } from 'native-base';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';

// audio source
const source = {
  uri: 'https://freesound.org/data/previews/413/413854_4337854-hq.mp3',
};

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.front,
    flashMode: Camera.Constants.FlashMode.off,
    captures: [],
    capturing: null,
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    const { sound } = await Audio.Sound.createAsync(source, {
      shouldPlay: true,
      isLooping: false,
    });
    this.sound = sound;
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures],
    });
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1, justifyContent: 'space-between' }}
          type={this.state.cameraType}
          flashMode={flashMode}
          ref={camera => (this.camera = camera)}
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
            //   THIS MAY NOT BE THE BEST ANSWER
              onPress={() => this.props.navigation.navigate('Settings')}
            />
             {/* CIRCLE TAKE PHOTO BUTTON */}
            <Feather
              name="circle"
              size={52}
              color="white"
              onPress={this.handleShortCapture}
            />
            {/* GALLERY BUTTON */}
            <Icon
              name="ios-images"
                          //   THIS MAY NOT BE THE BEST ANSWER
              onPress={() => this.props.navigation.navigate('Gallery')}
              style={{
                color: 'white',
                fontWeight: 'bold',
                justifyContent: 'flex-start',
              }}
            />
          </View>
        </Camera>
      </View>
    );
  }
}

/*
TODO
hold photo after taken, ask to save
take photo button should change on press
find best icons,
icon placement, spacing
icon functionality, pagination
move styling to style page,
research if permissions are accidentally denied
customeise permissions text
*/
