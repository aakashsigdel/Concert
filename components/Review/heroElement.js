'use strict';
import React, { Dimensions } from 'react-native';
const VIEWPORT = Dimensions.get('window');

export default heroElement = {
  container: {
    flex: 2,
    backgroundColor: 'black',
  },

  footer:{
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(17,17,17,0.5)',
    paddingLeft: 15,
    paddingTop: 7,
    alignItems: 'center',
  },

  footerText: {
    color: 'white',
    paddingLeft: 25,
    fontWeight: 'bold',
    fontSize: 12,
  },

  image: {
    width: VIEWPORT.width,
  },
}
