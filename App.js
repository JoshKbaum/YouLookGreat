import React from 'react';
import AppNavigator from './AppNavigator';
import * as Font from 'expo-font';
import { AsyncStorage, View, Image } from 'react-native';
import { SplashScreen, Icon } from 'expo';

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
      isReady: false,
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
// preload user settings
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
        // console.log('this is working', this.state);
      }
    } catch (error) {
      console.log(error);
    }
  };
// preload fonts and icons
  cacheResourcesAsync = async () => {
    await Promise.all([
      Font.loadAsync({
        Heavitas: require('./assets/fonts/Heavitas.ttf'),
        ...Icon.AntDesign.font,
        ...Icon.Feather.font,
        ...Icon.MaterialIcons.font,
        ...Icon.FontAwesome.font,
        ...Icon.Octicons.font,
        ...Icon.Ionicons.font,
      }),
    ])
    this.setState({ fontLoaded: true });
    this.setState({ isReady: true });
    SplashScreen.hide();
  };

  /* LIFECYCLE */
  componentDidMount() {
    SplashScreen.preventAutoHide();
    this.loadSettings('userSettings');
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash.png')}
            onLoad={this.cacheResourcesAsync}
          />
        </View>
      );
    }
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
