import React from 'react';
import { View } from 'react-native';

import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';

import CameraComp from './src/Camera';
import Settings from './src/Settings';
import Gallery from './src/Gallery';
import styles from './src/styles';

// this.swiper = undefined;

console.disableYellowBox = true;


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [4, 6],
      newPhotos: 0,
      girl: false,
      leftHanded: false,
    };
  }

  changeRange = (newNumbers) => {
    this.setState({
      values: newNumbers,
    });
  };

  changeVoice = (decision) => {
    this.setState({ girl: decision});
  }

  changeHand = (decision) => {
    this.setState({leftHanded: decision})
  }
  refreshGallery = () => {
    this.setState(prevState => ({
      newPhotos: prevState.newPhotos + 1
    }));
    // console.log('this function is firing', this.state.newPhotos)
  }

  render() {
    return (
      <Container>
        <Content>
          <Swiper
            index={1}
            showsPagination={false}
            ref={e => {
              this.swiper = e;
            }}
            // to disable swiping
            scrollEnabled={false}
          >
            <View style={styles.slideDefault}>
              <Settings
                getSwiper={() => this.swiper}
                appProps={{
                  values: this.state.values,
                  changeRange: this.changeRange,
                  girl: this.state.girl,
                  changeVoice: this.changeVoice,
                  leftHanded: this.state.leftHanded,
                  changeHand: this.changeHand
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CameraComp
                getSwiper={() => this.swiper}
                appProps={{
                  values: this.state.values,
                  girl: this.state.girl,
                  leftHanded: this.state.leftHanded,
                  refreshGallery: this.refreshGallery,
                }}
              />
            </View>
            <View style={styles.slideDefault}>
              <Gallery
                getSwiper={() => this.swiper}
                appProps={{
                  newPhotos: this.state.newPhotos,
                }}
              />
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}
