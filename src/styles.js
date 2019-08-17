import { StyleSheet, Dimensions } from 'react-native';
const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
  },
  gallery: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkcyan',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headline: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 10,
  },
  revisit: {
    height: winHeight,
    width: winWidth,
    // position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF',
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
  hud: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    bottom: 45,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: 100,
    height: 40,
    margin: 10,
  },
  image: {
    height: 300,
    width: 200,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  mirror: {
    flex: 1,
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    transform: [{ rotateY: '180deg' }],
  },
  cancel: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 50,
  },
  repeat: {
    position: 'absolute',
    right: 130,
    bottom: 50,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 50,
  },
  flip: {
    position: 'absolute',
    right: 130,
    bottom: 100,
    backgroundColor: 'transparent',
    fontWeight: '600',
    color: '#FFF',
    fontSize: 23,
    marginTop: 50,
  },
  save: {
    position: 'absolute',
    left: 20,
    bottom: 50,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 23,
    marginTop: 50,
  },
  rightHand: {
    flexDirection: 'column',
    alignItems: 'flex-end', //right
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 5,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  leftHand: {
    flexDirection: 'column',
    alignItems: 'flex-start', // left
    justifyContent: 'center',
    //distance from the edge of screen
    paddingHorizontal: 5,
    marginBottom: 15,
    height: Dimensions.get('window').height - 100,
  },
});
