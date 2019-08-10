import React from 'react';
import AppNavigator from './AppNavigator';
import * as Font from 'expo-font';
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

  /* LIFECYCLE */
  async componentDidMount() {
    await Font.loadAsync({
      Heavitas: require('./assets/fonts/Heavitas.ttf'),
    });
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
          fontLoaded: this.state.fontLoaded
        }}
      />
    );
  }
}
