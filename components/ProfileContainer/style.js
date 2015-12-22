'use strict';
import React, {Dimensions, StyleSheet} from 'react-native';
const VIEWPORT = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topView: {
    marginTop: 15,
    width: VIEWPORT.width,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  noBio: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomView: {
    flex: 2,
  },
  follow: {
    backgroundColor: 'transparent',
  },
  followNum: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'AvenirNext-DemiBold',
    alignSelf: 'center',
  },
  followText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'AvenirNext-Regular',
  },
  profileImage: {
    width: 150,
    height: 150,
  },
  bio: {
    color: 'white',
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 13.5,
    width: 279.5,
    marginTop: 10,
  },
  userBtn: {
    width: 146.5,
    height: 35,
    backgroundColor: '#F9B400',
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 19.5,
  },
  btnTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'AvenirNext-DemiBold',
  },
  internalNavigation: {
    width: VIEWPORT.width,
  },
});
