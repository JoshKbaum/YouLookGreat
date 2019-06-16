import React from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';

export default class settings extends React.Component {
  state = {
    values: this.props.appProps.values,
  };

  multiSliderValuesChange = values => {
    this.setState({
      values,
    });
  };

  render() {
    return (
      <View>
        <MultiSlider
          values={[this.state.values[0], this.state.values[1]]}
          sliderLength={280}
          onValuesChange={this.multiSliderValuesChange}
          min={1}
          max={10}
          step={1}
        />
        <Text style={styles.text}>Enthusiasm:</Text>
        <Text style={styles.text}>Lowest: {this.state.values[0]}</Text>
        <Text style={styles.text}>Highest: {this.state.values[1]}</Text>
        <Text
          onPress={() => {
            this.props.getSwiper().scrollBy(1);
            this.props.appProps.changeRange(this.state.values);
          }}
          style={styles.text}
        >
          back to camera
        </Text>
      </View>
    );
  }
}
