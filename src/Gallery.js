// import React from 'react';
// import { Text, View } from 'react-native';
// import styles from './styles';
// import * as ImagePicker from 'expo-image-picker';

// export default class Gallery extends React.Component {
//   render() {
//     return (
//       <View>
//         <Text style={styles.text}>This is the gallery page. </Text>
//         <Text onPress={() => this.props.getSwiper().scrollBy(-1)} style={styles.text}>
//           back to camera
//         </Text>
//       </View>
//     );
//   }
// }

import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import styles from './styles';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Text
          onPress={() => this.props.getSwiper().scrollBy(-1)}
          style={styles.text}
        >
          back to camera
        </Text>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
