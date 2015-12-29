'use strict'
import { AsyncStorage } from 'react-native';
import { USER_DETAILS } from './constants/ApiUrls'

export const serializeJSON = ( json ) => {
 return Object.keys(json).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(json[keyName])
  }).join('&');
}

export const callOnFetchError = (error, url="not specified") => {
  try {
    console.log('FETCH ERROR! url -> ', url, error);
  } catch (error) {
    console.log(error, 'utils error');
    throw error;
  }
}

export const getUserDetails = async () => {
  try {
    return await AsyncStorage.getItem(USER_DETAILS)
    .then(userDetails => {
      return JSON.parse(userDetails);
    });
  } catch (error) {
    console.log('error in utilsjs', error)
    return 'there was an error fetching from asyncstorage';
  }
}
