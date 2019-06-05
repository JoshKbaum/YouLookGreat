import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

import { Camera, Permissions } from 'expo';

import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Button,
} from 'native-base';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import createIconSet from '@expo/vector-icons/createIconSet';

export default class CameraComponent extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, justifyContent: 'space-between' }}
            type={this.state.type}
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
              <View style={{ flexDirection: 'row', flex: 4 }}>
                <Icon
                  name="ios-flash"
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    // justifyContent: 'flex-start',
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', flex: 4 }}>
                <Icon
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
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
              <Feather name="circle" size={52} color="white" />

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
move styling to style page
*/
