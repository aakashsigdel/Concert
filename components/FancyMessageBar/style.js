'use strict';

import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');

let styles ={
  container: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.8,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold',
  },
}

export default styles = StyleSheet.create(styles);
