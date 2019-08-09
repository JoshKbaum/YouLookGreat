import { createStackNavigator, createAppContainer } from 'react-navigation';

import Camera from './src/Camera';
import Gallery from './src/Gallery';
import Settings from './src/Settings';

const AppNavigator = createStackNavigator(
  {
    Camera: { screen: Camera },
    Gallery: { screen: Gallery },
    Settings: { screen: Settings },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
      gesturesEnabled: false,
    },
  }
);

const Navigator = createAppContainer(AppNavigator);
export default Navigator;
