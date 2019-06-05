import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';

import styles from './src/styles';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Swiper
          index={1}>
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Settings</Text>
            </View>
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Camera</Text>
            </View>
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Gallery</Text>
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}
