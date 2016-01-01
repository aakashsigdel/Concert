import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');
const HEADERBAR_HEIGHT = 0.096 * VIEWPORT.height;

let styles = {
  container: {
    height: HEADERBAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  leftImage: {
    width: 0.54 * HEADERBAR_HEIGHT,
    height: 0.54 * HEADERBAR_HEIGHT,
    resizeMode: 'contain',
  },
  midImage: {
    width: 88,
    height: 26.7,
    resizeMode: 'contain',
  },
  rightImage: {
    width: 0.54 * HEADERBAR_HEIGHT,
    height: 0.54 * HEADERBAR_HEIGHT,
    resizeMode: 'contain',
  },
  leftText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNext-DemiBold',
  },
  midText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNext-DemiBold',
  },
  rightText: {
    color: 'white',
    fontSize: 18,
    marginRight: 15,
    fontFamily: 'AvenirNext-DemiBold',
  },
  clickable: {
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles = StyleSheet.create(styles);
