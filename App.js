import React from 'react';
import { View } from 'react-native';

import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';

import CameraComp from './src/Camera';
import Settings from './src/Settings';
import Gallery from './src/Gallery';
import styles from './src/styles';


// this.swiper = undefined;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [4, 6],
    };
  }

  changeRange = newNumbers => {
    this.setState(
      {
        values: newNumbers,
      }
    );
  };

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
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CameraComp
                getSwiper={() => this.swiper}
                appProps={{ values: this.state.values }}
              />
             
            </View>
            <View style={styles.slideDefault}>
              <Gallery getSwiper={() => this.swiper} appProps={{ values: this.state.values }} />
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}
