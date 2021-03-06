'use strict';
import React, { Dimensions, StyleSheet } from 'react-native';
const VIEWPORT = Dimensions.get('window');

export default heroElement = StyleSheet.create({
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
    paddingBottom: 4,
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
    height: VIEWPORT.height / 2.0,
  },
});
