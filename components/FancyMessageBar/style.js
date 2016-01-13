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
  },

  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold',
  },

  viewStyle: {
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 4,
  },

  dismiss: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 0,
  },

  showViewButton: {
    flex: 4,
    marginRight: 25,
    justifyContent: 'center',
  },

  dismissPost: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

}

export default styles = StyleSheet.create(styles);
