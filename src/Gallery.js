import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  CameraRoll,
  ScrollView,
} from 'react-native';
import { Permissions, Constants } from 'expo';
import styles from './styles';

export default class Gallery extends React.Component {
  state = {
    images: null,
  };

  render() {
    let { images } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="load images from YLG folder"
          onPress={this._loadImages}
        />
        {images && (
          <ScrollView>
            {this.state.images.map((p, i) => {
              return (
                <Image
                  key={i}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              );
            })}
          </ScrollView>
        )}
        <Text
          onPress={() => this.props.getSwiper().scrollBy(-1)}
          style={styles.text}
        >
          back to camera
        </Text>
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

  _loadImages = () => {
    CameraRoll.getPhotos({
      first: 20,
      groupTypes: 'Album',
      groupName: 'You Look Great',
    }).then(r => this.setState({ images: r.edges }));
    // console.log('=====', this.state.images);
  };
}

/*
TODO:
show updated image selection on load
build grid with pagination
select photo to view full size
on full size, repeat compliment

*/
