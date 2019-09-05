import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import styles from './styles';
import { Icon } from 'native-base';



export default class SelectedPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: false,
    };
  }

  flipPhoto = () => {
    this.setState({
      flip: !this.state.flip,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.galleryProps.uri }}
style={[
            styles.revisit,
            this.state.flip ? styles.revisitMirror : styles.revisit,
          ]}        />
        {/* style={[
            styles.preview,
            props.cameraProps.flip ? styles.mirror : styles.preview,
          ]} */}
        {/* HUD */}
        <View style={styles.hud}>
          {/* REPEAT */}
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: 'pink',
            }}
            onPress={() =>
              this.props.galleryProps.loadCompliment(this.props.galleryProps.filename)
            }
          >
            <View style={{ alignItems: 'center' }}>
              <FontAwesome
                name="repeat"
                size={30}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 2,
                }}
              />
            </View>
          </TouchableOpacity>
          {/* FLIP */}
          <TouchableOpacity
            style={{ width: 35, height: 35, backgroundColor: 'goldenrod' }}
            onPress={() => this.flipPhoto()}
          >
            <View style={{ alignItems: 'center' }}>
              <Octicons
                name="mirror"
                size={30}
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginTop: 2,
                  marginLeft: 1,
                }}
              />
            </View>
          </TouchableOpacity>
          {/* BACK TO GALLERY */}
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: 'darkolivegreen',
            }}
            onPress={() => {
              this.props.galleryProps.goBackToGallery();
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Icon
                name="md-images"
                style={{
                  color: 'white',
                  marginTop: 1.4,
                  marginLeft: 1,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
// const SelectedPhoto = props => {
//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: props.galleryProps.uri }} style={styles.revisit} />
//       {/* style={[
//             styles.preview,
//             props.cameraProps.flip ? styles.mirror : styles.preview,
//           ]} */}
//       {/* HUD */}
//       <View style={styles.hud}>
//         {/* REPEAT */}
//         <TouchableOpacity
//           style={{
//             width: 35,
//             height: 35,
//             backgroundColor: 'pink',
//           }}
//           onPress={() =>
//             props.galleryProps.loadCompliment(props.galleryProps.filename)
//           }
//         >
//           <View style={{ alignItems: 'center' }}>
//             <FontAwesome
//               name="repeat"
//               size={30}
//               style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 marginTop: 2,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//          {/* FLIP */}
//          <TouchableOpacity
//           style={{ width: 35, height: 35, backgroundColor: 'goldenrod' }}
//           onPress={() => props.cameraProps.flipPhoto()}
//         >
//           <View style={{ alignItems: 'center' }}>
//             <Octicons
//               name="mirror"
//               size={30}
//               style={{
//                 color: 'white',
//                 fontWeight: 'bold',
//                 marginTop: 2,
//                 marginLeft: 1,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//         {/* BACK TO GALLERY */}
//         <TouchableOpacity
//           style={{
//             width: 35,
//             height: 35,
//             backgroundColor: 'darkolivegreen',
//           }}
//           onPress={() => {
//             props.galleryProps.goBackToGallery();
//           }}
//         >
//           <View style={{ alignItems: 'center' }}>
//             <Icon
//               name="md-images"
//               style={{
//                 color: 'white',
//                 marginTop: 1.4,
//                 marginLeft: 1,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default SelectedPhoto;
