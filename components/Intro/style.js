import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');

let styles  = {
  container: {
    position: 'relative',
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: VIEWPORT.width,
    height: VIEWPORT.height,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  titleText: {
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'AvenirNext-DemiBold',
    height: 80,
    marginTop: -45,
  },
  phoneIntro: {
    width: 198,
    height: 406.5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLoginBtn: {
    position: 'absolute',
    height: 0.1 * VIEWPORT.height,
    backgroundColor: '#1C1C1C',
    bottom: 0,
    right: 0,
    left: 0,
  },
  loginDescContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  facebookLoginText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNext-DemiBold',
  },
  facebookIcon: {
    marginRight: 26.5,
  },
}
export default styles = StyleSheet.create(styles);
