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
  camera = null;

  state = {
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.front,
    flashMode: Camera.Constants.FlashMode.off,
    captures: [],
    capturing: null,
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });

  // taking photo and playing sound
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
    } else {
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
                left: 0,
                top: 0,
                right: 0,
                zIndex: 100,
                alignItems: 'center',
              }}
            >
                {/* CAMERA FLASH BUTTON */}
              <View style={{ flexDirection: 'row', flex: 4 }}>
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
              <View style={{ flexDirection: 'row', flex: 4 }}>
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
              <AntDesign name="setting" size={32} color="white" />

              <Feather
                name="circle"
                size={52}
                color="white"
                onPress={this.handleShortCapture}
              />
              <Icon
                name="ios-images"
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
}

/*
TODO
find best icons,
icon placement,
icon functionality
move styling to style page,
research if permissions are accidentally denied
customeise permissions text
*/
