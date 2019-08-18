import React from 'react';
import AppNavigator from './AppNavigator';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [4, 6],
      newPhotos: 0,
      girl: false,
      leftHanded: false,
      fontLoaded: false,
    };
  }

  /*  FUNCTIONS */
  changeRange = newNumbers => {
    this.setState({
      values: newNumbers,
    });
  };

  changeVoice = decision => {
    this.setState({ girl: decision });
  };

  changeHand = decision => {
    this.setState({ leftHanded: decision });
  };

  refreshGallery = () => {
    this.setState(prevState => ({
      newPhotos: prevState.newPhotos + 1,
    }));
  };

  loadSettings = async key => {
    try {
      const jsonSavedSettings = await AsyncStorage.getItem(key);
      const savedSettings = JSON.parse(jsonSavedSettings);
      if (savedSettings !== null) {
        this.setState({
          girl: savedSettings.girl,
          leftHanded: savedSettings.leftHanded,
          values: savedSettings.values,
        });
         console.log('this is working', this.state)
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* LIFECYCLE */
  async componentDidMount() {
    await Font.loadAsync({
      Heavitas: require('./assets/fonts/Heavitas.ttf'),
    });
    this.loadSettings('userSettings');
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <AppNavigator
        screenProps={{
          values: this.state.values,
          changeRange: this.changeRange,
          girl: this.state.girl,
          changeVoice: this.changeVoice,
          leftHanded: this.state.leftHanded,
          changeHand: this.changeHand,
          newPhotos: this.state.newPhotos,
          refreshGallery: this.refreshGallery,
          fontLoaded: this.state.fontLoaded,
        }}
      />
    );
  }
}
