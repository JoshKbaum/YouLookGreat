import React from 'react';
import {
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import { Feather, FontAwesome, Octicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
import styles from './styles'

const Preview = props => {
  // console.log('______', props.cameraProps);
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
      {/* HUD */}
      <View style={styles.hud}>
        {/* SAVE BUTTON */}
        <TouchableHighlight
          style={{
            width: 35,
            height: 35,
            backgroundColor: 'pink',
          }}
          onPress={() => {
             props.cameraProps.savePhoto();
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
                marginLeft: 1,
              }}
            />
          </View>
        </TouchableHighlight>
        {/* FLIP */}
        <TouchableHighlight
          style={{ width: 35, height: 35, backgroundColor: 'goldenrod' }}
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
                marginLeft: 1,
              }}
            />
          </View>
        </TouchableHighlight>
        {/* REPEAT */}
        <TouchableHighlight
          style={{ width: 35, height: 35, backgroundColor: 'darkolivegreen' }}
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
          style={{ width: 35, height: 35, backgroundColor: 'darkslateblue' }}
          onPress={() => props.cameraProps.cancelPhoto()}
        >
          <View style={{ alignItems: 'center' }}>
            <FontAwesome
              name="remove"
              size={32}
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 1,
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Preview;
