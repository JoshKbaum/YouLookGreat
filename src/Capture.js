import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Camera } from 'expo';
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import { Icon } from 'native-base';

export default class Capture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.cameraProps.hasCameraPermission === null) {
      return <View />;
    } else if (this.props.cameraProps.hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
    return (
      <Camera
        ref={this.props.cameraProps.setRef
        }
        style={styles.preview}
        flashMode={this.props.cameraProps.flashMode}
        type={this.state.cameraType}
        zoom={this.props.cameraProps.zoom}
      >
        {/* HUD */}
        <View style={[this.props.cameraProps.leftHanded ? styles.leftHand : styles.rightHand]}>
          {/* SETTINGS BUTTON */}
          <TouchableHighlight
            style={{
              width: 35,
              height: 35,
              backgroundColor: 'lightcoral',
              marginTop: 170,
            }}
            onPress={() => this.props.cameraProps.navigation.navigate('Settings')}
          >
            <View style={{ alignItems: 'center' }}>
              <AntDesign
                name="setting"
                size={30}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 2,
                  marginLeft: 0.5,
                }}
              />
            </View>
          </TouchableHighlight>
          {/* VOLUME BUTTON */}
          <TouchableHighlight
            style={{ width: 35, height: 35, backgroundColor: 'goldenrod' }}
            onPress={() => {
              this.setState({
                mute: mute === true ? false : true,
              });
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Feather
                name={this.props.cameraProps.mute == true ? 'volume' : 'volume-x'}
                size={32}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </View>
          </TouchableHighlight>
          {/* GALLERY BUTTON */}
          <TouchableHighlight
            style={{ width: 35, height: 35, backgroundColor: 'darkolivegreen' }}
            onPress={() => this.props.cameraProps.navigation.navigate('Gallery')}
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
          </TouchableHighlight>
          {/* CAMERA TYPE BUTTON */}
          <TouchableHighlight
            style={{ width: 35, height: 35, backgroundColor: 'pink' }}
            onPress={() => {
              this.setState({
                cameraType:
                  this.state.cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                zoom: this.state.zoom === 0.1 ? 0 : 0,
              });
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Ionicons
                name="md-reverse-camera"
                size={30}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 1.5,
                }}
              />
            </View>
          </TouchableHighlight>
          {/* FLASH BUTTON */}
          <TouchableHighlight
            style={{ width: 35, height: 35, backgroundColor: 'darkslateblue' }}
            onPress={() =>
              this.setFlashMode(
                flashMode === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.on
              )
            }
          >
            <View style={{ alignItems: 'center' }}>
              <MaterialIcons
                name={
                    this.props.cameraProps.flashMode == Camera.Constants.FlashMode.on
                    ? 'flash-on'
                    : 'flash-off'
                }
                size={30}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 3,
                  marginLeft: 2,
                }}
              />
            </View>
          </TouchableHighlight>
          {/* BACK ONLY / ZOOM BUTTON */}
          {this.props.cameraProps.cameraType === Camera.Constants.Type.back ? (
            <TouchableHighlight
              style={{ width: 35, height: 35, backgroundColor: 'lightcoral' }}
              onPress={() => {
                this.setState({
                  zoom: this.state.zoom === 0 ? 0.1 : 0,
                });
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Feather
                  name={this.props.cameraProps.zoom == 0 ? 'zoom-in' : 'zoom-out'}
                  size={30}
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: 1,
                    marginLeft: 1,
                  }}
                />
              </View>
            </TouchableHighlight>
          ) : null}
        </View>
        {/* CAPTURE PHOTO BUTTON */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginBottom: 15,
            zIndex: 1,
          }}
        >
          <TouchableHighlight
            style={styles.capture}
            onPress={this.props.cameraProps.takePicture.bind(this)}
            // COME BACK TO THIS
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <View />
          </TouchableHighlight>
        </View>
      </Camera>
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
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  rightHand: {
    flexDirection: 'column',
    alignItems: 'flex-end', //right
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 5,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
  leftHand: {
    flexDirection: 'column',
    alignItems: 'flex-start', // left
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 5,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
});
