import { createStackNavigator, createAppContainer } from 'react-navigation';
import Gallery from './Gallery';
import Settings from './Settings'
import Camera from './Camera';


const AppNavigator = createStackNavigator(
  {
    Camera: Camera,
    Gallery: Gallery,
    Settings: Settings,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const Navigator = createAppContainer(AppNavigator);
export default Navigator;
