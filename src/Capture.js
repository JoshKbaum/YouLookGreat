import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Camera } from 'expo';
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialIcons,
} from '@expo/vector-icons';
import { Icon } from 'native-base';
import styles from './styles'

const Capture = props => {
  if (props.cameraProps.hasCameraPermission === null) {
    return <View />;
  } else if (props.cameraProps.hasCameraPermission === false) {
    return <Text> No access to camera </Text>;
  }
  return (
    <Camera
      ref={props.cameraProps.setRef}
      style={styles.preview}
      flashMode={props.cameraProps.flashMode}
      type={props.cameraProps.cameraType}
      zoom={props.cameraProps.zoom}
    >
      {/* HUD */}
      <View
        style={[
          props.cameraProps.leftHanded
            ? styles.leftHand
            : styles.rightHand,
        ]}
      >
        {/* SETTINGS BUTTON */}
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            backgroundColor: 'lightcoral',
            marginTop: 170,
          }}
          onPress={() => props.cameraProps.navigation.navigate('Settings')}
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
        </TouchableOpacity>
        {/* VOLUME BUTTON */}
        <TouchableOpacity
          style={{ width: 35, height: 35, backgroundColor: 'goldenrod' }}
          onPress={() => {
            props.cameraProps.muteAudio()
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Feather
              name={props.cameraProps.mute === true ? 'volume-x' : 'volume-2'}
              size={32}
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </View>
        </TouchableOpacity>
        {/* GALLERY BUTTON */}
        <TouchableOpacity
          style={{ width: 35, height: 35, backgroundColor: 'darkolivegreen' }}
          onPress={() => props.cameraProps.navigation.navigate('Gallery')}
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
        {/* CAMERA TYPE BUTTON */}
        <TouchableOpacity
          style={{ width: 35, height: 35, backgroundColor: 'pink' }}
          onPress={() => {
            props.cameraProps.changeCameraType()
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
        </TouchableOpacity>
        {/* FLASH BUTTON */}
        <TouchableOpacity
          style={{ width: 35, height: 35, backgroundColor: 'darkslateblue' }}
          onPress={() =>
            props.cameraProps.changeFlash()
          }
        >
          <View style={{ alignItems: 'center' }}>
            <MaterialIcons
              name={
                props.cameraProps.flashMode ===
                Camera.Constants.FlashMode.on
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
        </TouchableOpacity>
        {/* BACK ONLY / ZOOM BUTTON */}
        {props.cameraProps.cameraType === Camera.Constants.Type.back ? (
          <TouchableOpacity
            style={{ width: 35, height: 35, backgroundColor: 'lightcoral' }}
            onPress={() => {
              props.cameraProps.changeZoom()
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Feather
                name={props.cameraProps.zoom === 0 ? 'zoom-in' : 'zoom-out'}
                size={30}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 1,
                  marginLeft: 1,
                }}
              />
            </View>
          </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.capture}
          onPress={props.cameraProps.takePicture}
          // COME BACK TO THIS
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default Capture;
