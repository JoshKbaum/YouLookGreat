import React from 'react';
import {Text, View } from 'react-native';
import styles from './styles';

export default class Settings extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Settings are on this page</Text>
        <Text onPress={() => this.props.getSwiper().scrollBy(1)} style={styles.text}>
          back to camera
        </Text>
      </View>
    );
  }
}
