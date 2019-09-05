import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './styles';
import SwitchToggle from 'react-native-switch-toggle';
import CustomMarkerLeft from './CustomMarkerLeft';
import CustomMarkerRight from './CustomMarkerRight';

export default class settings extends React.Component {
  state = {
    values: this.props.screenProps.values,
    girl: this.props.screenProps.girl,
    leftHanded: this.props.screenProps.leftHanded,
    fontLoaded: this.props.screenProps.fontLoaded,
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

  saveSettings = async (key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(this.state));
    } catch (error) {
      console.log(error.message);
    }
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
      <View style={styles.settings}>
        {this.state.fontLoaded ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.headline, { fontFamily: 'Heavitas' }]}>
              Settings
            </Text>

            <Text style={[styles.text, { fontFamily: 'Heavitas' }]}>
              Orientation:
            </Text>

            <SwitchToggle
              backTextRight={this.getRightTextHand()}
              backTextLeft={this.getLeftTextHand()}
              containerStyle={{
                marginTop: 16,
                width: 260,
                height: 55,
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
              backgroundColorOn= 'silver' //"#a0e1e5"
              backgroundColorOff= 'silver'  //"#e5e1e0"
              circleStyle={{
                width: 45,
                height: 45,
                borderRadius: 27.5,
                backgroundColor: 'blue', // rgb(102,134,205)
              }}
              switchOn={!this.state.leftHanded}
              onPress={() => {
                this.orientationChange();
              }}
              circleColorOff="darkcyan"
              circleColorOn="darkgoldenrod"
              duration={500}
            />
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={[styles.text, { fontFamily: 'Heavitas' }]}>
              Voice:
            </Text>
            <SwitchToggle
              backTextRight={this.getRightTextGender()}
              backTextLeft={this.getLeftTextGender()}
              containerStyle={{
                marginTop: 16,
                width: 160,
                height: 55,
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
              backgroundColorOn= 'silver' //"#a0e1e5"
              backgroundColorOff= 'silver' //"#e5e1e0"
              circleStyle={{
                width: 45,
                height: 45,
                borderRadius: 27.5,
                backgroundColor: 'blue', // rgb(102,134,205)
              }}
              switchOn={this.state.girl}
              onPress={() => {
                this.genderChange();
              }}
              circleColorOff= 'darkcyan' //"blue"
              circleColorOn="darkgoldenrod"
              duration={500}
            />
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
            <Text style={[styles.text, { fontFamily: 'Heavitas' }]}>
              Enthusiasm:
            </Text>
            <MultiSlider
              values={[this.state.values[0], this.state.values[1]]}
              sliderLength={280}
              onValuesChange={this.multiSliderValuesChange}
              min={1}
              max={10}
              step={1}
              selectedStyle={{
                backgroundColor: 'darkgoldenrod',
              }}
              unselectedStyle={{
                backgroundColor: 'silver',
              }}
              trackStyle={{
                height: 5
              }}
              isMarkersSeparated={true}
              customMarkerLeft={() => {
                return <CustomMarkerLeft currentValue={this.state.values[0]} />;
              }}
              customMarkerRight={() => {
                return (
                  <CustomMarkerRight currentValue={this.state.values[1]} />
                );
              }}
              allowOverlap
            />
            <Text>
              <Text style={[styles.text, { fontFamily: 'Heavitas' }]}>
                Lowest:
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: 'Heavitas', color: 'lightcoral' },
                ]}
              >{' '}
                {this.state.values[0]}
              </Text>
            </Text>
            <Text>
              <Text style={[styles.text, { fontFamily: 'Heavitas' }]}>
                Highest:
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: 'Heavitas', color: 'darkolivegreen' },
                ]}
              >
                {' '}
                {this.state.values[1]}
              </Text>
            </Text>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
            <Text
              onPress={() => {
                this.props.navigation.navigate('Camera');
                this.props.screenProps.changeRange(this.state.values);
                this.props.screenProps.changeVoice(this.state.girl);
                this.props.screenProps.changeHand(this.state.leftHanded);
                this.saveSettings('userSettings')
                // console.log('this was pressed', this.state);
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
