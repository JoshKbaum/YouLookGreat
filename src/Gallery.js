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
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      showSelectedPhoto: false,
      uri: '',
    };
  }
  // state = {
  //   images: null,
  //   showSelectedPhoto: false,
  //   uri: '',
  // };

  /* FUNCTIONS */
  goBackToGallery = () => {
    this.setState({
      showSelectedPhoto: false,
    });
  };

  _getImages = () => {
    CameraRoll.getPhotos({
      first: 18,
      groupTypes: 'Album',
      groupName: 'You Look Great',
    }).then(r => this.setState({ images: r.edges }));
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  /* LIFECYCLE */
  componentDidMount() {
    this.getPermissionAsync();
    this._getImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.appProps.newPhotos !== prevProps.appProps.newPhotos) {
      console.log('gallery state is firing');
      this._getImages();
    }
  }

  render() {
    let { showSelectedPhoto, uri, images } = this.state;
    if (showSelectedPhoto) {
      return (
        <SelectedPhoto
          galleryProps={{
            goBackToGallery: this.goBackToGallery,
            uri: this.state.uri,
            showSelectedPhoto: this.state.showSelectedPhoto,
          }}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Gallery</Text>
        {/* <Button title="load images from YLG folder" onPress={this._getImages} /> */}
        {images && (
          <ScrollView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {this.state.images.map((photo, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  onPress={() => {
                    this.setState({
                      showSelectedPhoto: true,
                      uri: photo.node.image.uri,
                    });
                    // photo.node.image.filename = 'tom';
                    console.log('this is what the info is', photo);
                  }}
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
            <Text style={styles.text}>Newer</Text>

            <Text style={styles.text}>Older</Text>
          </ScrollView>
        )}
        {!images && <Text>You have no photos yet!</Text>}
        <Text
          onPress={() => {
            this.props.getSwiper().scrollBy(-1);
          }}
          style={styles.text}
        >
          back to camera
        </Text>
      </View>
    );
  }
}
