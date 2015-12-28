import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');

let styles = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  background: {
    position: 'absolute',
    backgroundColor: 'black',
    width: VIEWPORT.width,
    height: VIEWPORT.height,
    top: 0,
  },

  buttons:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  button:{
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  addReview__icon: {
    width: 45,
    height: 45,
    marginBottom: 20,
  },

  addReview__text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },

  addPhoto__icon: {
    width: 45,
    height: 45,
    marginBottom: 20,
  },
  
  addPhoto__text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
}

export default styles = StyleSheet.create(styles);
