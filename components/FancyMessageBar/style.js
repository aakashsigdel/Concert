'use strict';

import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');

let styles ={
  container: {
    position: 'absolute',
    width: VIEWPORT.width,
    height: 40,
    backgroundColor: 'red',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold',
  },
}

export default styles = StyleSheet.create(styles);
