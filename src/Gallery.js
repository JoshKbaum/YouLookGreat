import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  CameraRoll,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { Permissions, Constants } from 'expo';
import styles from './styles';

import SelectedPhoto from './SelectedPhoto';

export default class Gallery extends React.Component {
  state = {
    images: null,
    showSelectedPhoto: false,
    uri: '',
  };

  render() {
    let { showSelectedPhoto, uri, images } = this.state;
    if (showSelectedPhoto) {
      return <SelectedPhoto uri={uri} />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Gallery</Text>
        <Button title="load images from YLG folder" onPress={this._getImages} />
        {images && (
          <ScrollView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {this.state.images.map((photo, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  onPress={() =>
                    this.setState({
                      showSelectedPhoto: true,
                      uri: photo.node.image.uri,
                    })
                  }
                >
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      marginBottom: 5,
                      marginLeft: 3,
                      marginRight: 3,
                    }}
                    source={{ uri: photo.node.image.uri }}
                  />
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        )}
        {!images && <Text>You have no photos yet!</Text>}
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

  _getImages = () => {
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
