import React from 'react';
import { View, Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';
import SwitchToggle from 'react-native-switch-toggle';

export default class settings extends React.Component {
  state = {
    values: this.props.appProps.values,
    girl: this.props.appProps.girl,
    leftHanded: this.props.appProps.leftHanded,
  };

  // FUNCTIONS
  orientationChange = () => {
    this.setState({ leftHanded: !this.state.leftHanded });
  };

  genderChange = () => {
    this.setState({ girl: !this.state.girl });
  };

  multiSliderValuesChange = values => {
    this.setState({
      values,
    });
  };

  // BUTTON TEXT
  getRightTextGender() {
    return this.state.girl ? '' : 'Boy';
  }

  getLeftTextGender() {
    return this.state.girl ? 'Girl' : '';
  }

  getRightTextHand() {
    return this.state.leftHanded ? 'Left' : '';
  }

  getLeftTextHand() {
    return this.state.leftHanded ? '' : 'Right';
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Orientation:</Text>
        <SwitchToggle
          backTextRight={this.getRightTextHand()}
          backTextLeft={this.getLeftTextHand()}
          containerStyle={{
            marginTop: 16,
            width: 160,
            height: 65,
            borderRadius: 30,
            padding: 5,
          }}
          type={1}
          buttonStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}
          rightContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          leftContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          buttonTextStyle={{ fontSize: 20 }}
          textRightStyle={{ fontSize: 20 }}
          textLeftStyle={{ fontSize: 20 }}
          backgroundColorOn="#a0e1e5"
          backgroundColorOff="#e5e1e0"
          circleStyle={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            backgroundColor: 'blue', // rgb(102,134,205)
          }}
          switchOn={!this.state.leftHanded}
          onPress={() => {
            this.orientationChange();
            console.log('+++', this.state);
          }}
          circleColorOff="blue"
          circleColorOn="pink"
          duration={500}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        />
        <Text style={styles.text}>Voice:</Text>
        <SwitchToggle
          backTextRight={this.getRightTextGender()}
          backTextLeft={this.getLeftTextGender()}
          containerStyle={{
            marginTop: 16,
            width: 160,
            height: 65,
            borderRadius: 30,
            padding: 5,
          }}
          type={1}
          buttonStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}
          rightContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          leftContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          buttonTextStyle={{ fontSize: 20 }}
          textRightStyle={{ fontSize: 20 }}
          textLeftStyle={{ fontSize: 20 }}
          backgroundColorOn="#a0e1e5"
          backgroundColorOff="#e5e1e0"
          circleStyle={{
            width: 55,
            height: 55,
            borderRadius: 27.5,
            backgroundColor: 'blue', // rgb(102,134,205)
          }}
          switchOn={this.state.girl}
          onPress={() => {
            this.genderChange();
            console.log('+++', this.state);
          }}
          circleColorOff="blue"
          circleColorOn="pink"
          duration={500}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        />
        <Text style={styles.text}>Enthusiasm:</Text>
        <MultiSlider
          values={[this.state.values[0], this.state.values[1]]}
          sliderLength={280}
          onValuesChange={this.multiSliderValuesChange}
          min={1}
          max={10}
          step={1}
        />
        <Text style={styles.text}>Lowest: {this.state.values[0]}</Text>
        <Text style={styles.text}>Highest: {this.state.values[1]}</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginTop: 20,
          }}
        />
        <Text
          onPress={() => {
            this.props.getSwiper().scrollBy(1);
            this.props.appProps.changeRange(this.state.values);
            this.props.appProps.changeVoice(this.state.girl);
            this.props.appProps.changeHand(this.state.leftHanded);
            console.log('this was pressed', this.state);
          }}
          style={styles.text}
        >
          back to camera
        </Text>
      </View>
    );
  }
}
