import React from 'react';
import {
  Image,
  View,
  Text,
  CameraRoll,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import { Permissions, Constants, Audio } from 'expo';
import styles from './styles';
import SelectedPhoto from './SelectedPhoto';

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      showSelectedPhoto: false,
      uri: '',
      photoPage: 1,
      fontLoaded: this.props.screenProps.fontLoaded,
      filename: null,
    };
  }

  /* FUNCTIONS */
  goBackToGallery = () => {
    this.setState({
      showSelectedPhoto: false,
    });
  };

  getImages = () => {
    CameraRoll.getPhotos({
      first: this.state.photoPage * 18,
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

  loadCompliment = async (photo) => {
    try {
      const value = await AsyncStorage.getItem(photo);
      if (value !== null) {
        this.replayCompliment(value);
        // console.log('this is the data', value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  replayCompliment = async loadedCompliment => {
    const { sound } = await Audio.Sound.createAsync(+loadedCompliment, {
      shouldPlay: true,
      isLooping: false,
    });
    this.sound = sound;
  };

  /* LIFECYCLE */
  componentDidMount() {
    this.getPermissionAsync();
    this.getImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.screenProps.newPhotos !== prevProps.screenProps.newPhotos) {
      console.log('gallery state is firing');
      this.getImages();
    }
  }

  render() {
    let { showSelectedPhoto, uri, images, filename } = this.state;
    if (showSelectedPhoto && this.state.fontLoaded) {
      return (
        <SelectedPhoto
          galleryProps={{
            goBackToGallery: this.goBackToGallery,
            uri: this.state.uri,
            showSelectedPhoto: this.state.showSelectedPhoto,
            filename: this.state.filename,
            loadCompliment: this.loadCompliment,
          }}
        />
      );
    }

    return (
      <View style={styles.gallery}>
        {this.state.fontLoaded ? (
          <View>
            <Text
              style={[
                styles.headline,
                { paddingTop: 20, fontFamily: 'Heavitas' },
              ]}
            >
              Gallery
            </Text>
            {images && (
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingTop: 20,
                }}
              >
                {this.state.images.map((photo, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      onPress={() => {
                        this.setState({
                          showSelectedPhoto: true,
                          uri: photo.node.image.uri,
                          filename: photo.node.image.filename,
                        });
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
                        // path to URI, maybe save filename too so that it is ready to be called in the selected photo component
                        source={{ uri: photo.node.image.uri }}
                      />
                    </TouchableHighlight>
                  );
                })}
                {this.state.photoPage > 1 && (
                  <Text
                    style={[
                      styles.text,
                      { paddingRight: 8, fontFamily: 'Heavitas' },
                    ]}
                    onPress={async () => {
                      await this.setState({
                        photoPage: this.state.photoPage - 1,
                      });
                      this.getImages();
                    }}
                  >
                    Less
                  </Text>
                )}
                {this.state.images.length >= this.state.photoPage * 18 && (
                  <Text
                    style={[styles.text, { fontFamily: 'Heavitas' }]}
                    onPress={async () => {
                      await this.setState({
                        photoPage: this.state.photoPage + 1,
                      });
                      this.getImages();
                    }}
                  >
                    More
                  </Text>
                )}
              </ScrollView>
            )}
            {!images && <Text>You have no photos yet!</Text>}
            <Text
              onPress={() => {
                this.props.navigation.navigate('Camera');
              }}
              style={[styles.text, { fontFamily: 'Heavitas' }]}
            >
              back to camera
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}
