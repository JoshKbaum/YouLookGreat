import React from 'react';
import { Text, View } from 'react-native';

import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';

import CameraComp from './src/Camera';
import Settings from './src/Settings';
import Gallery from './src/Gallery';
import styles from './src/styles';

// this.swiper = undefined;

export default class App extends React.Component {
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
          >
            <View style={styles.slideDefault}>
              <Settings getSwiper={() => this.swiper} s/>
            </View>
            <View style={{ flex: 1 }}>
              <CameraComp getSwiper={() => this.swiper} />
            </View>
            <View style={styles.slideDefault}>
              <Gallery getSwiper={() => this.swiper} />
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}
