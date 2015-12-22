import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');

let styles = {
  container: {
		backgroundColor: '#1C1C1C',
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    height: 200,
    top: 0,
  },
  wrapper: {
    flex: 1,
  },
  carousel: {
    height: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'AvenirNext-Regular',
  },
  lowerView: {
    flex: 6.6
  },
  dot: {
    backgroundColor: 'transparent',
    borderColor: '#F9B400',
    borderWidth: 1,
    width: 7.5,
    height: 7.5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor:'#F9B400',
    width: 7.5,
    height: 7.5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  disabledDot: {
    backgroundColor: 'rgba(0,0,0,0)',
  }
}

export default styles = StyleSheet.create(styles);
