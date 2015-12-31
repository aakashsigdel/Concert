'use strict'
import { AsyncStorage } from 'react-native';
import { USER_DETAILS, LOGIN_DETAILS } from './constants/ApiUrls';
import Events from 'react-native-simple-events';

let userDetailsFromAsyncStorage = null;

export const serializeJSON = ( json ) => {
 return Object.keys(json).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(json[keyName])
  }).join('&');
}

export const callOnFetchError = (error, url="not specified") => {
  Events.trigger('Ready', {message: 'My Error Message'});
  try {
    console.log('FETCH ERROR! url -> ', url, error);
  } catch (error) {
    console.log(error, 'utils error');
    throw error;
  }
}

export const refreshUserDataOnAsyncStorage = async() => {
}

export const getUserDetailsFromAsyncStorage = async ( refresh = false ) => {
  /*
   * Sets the local var `userDetailsFromAsyncStorage` (if
   * not already set) with the value retrieved from AsyncStorage
   * that's set on login.
   * 
   * TODO:
   * the following is not implemented yet __>
   * Default behavior is to return the local value of `userDetailsFromAsyncStorage`
   * if it's already set.
   *
   * Call with refresh=true param if you want to explicitly refresh 
   * (and reset `userDetailsFromAsyncStorage`) with data from API
  */
  // if (refresh) refreshUserDataOnAsyncStorage();
  console.log('called');
  try {
    return await AsyncStorage.getItem(USER_DETAILS)
    .then(userDetails => {
      console.log(' sending... ', userDetails)
      return JSON.parse(userDetails);
    });
  } catch (error) {
    console.log('error in utilsjs', error)
    return 'there was an error fetching from asyncstorage';
  }
}

export const getAccessToken = async () => {
  console.log( 'getAccessToken called.. ' );
  try {
   return await AsyncStorage.getItem(LOGIN_DETAILS)
    .then(loginDetails => {
      console.log('login details in utils.js', JSON.parse(loginDetails).access_token);
      return JSON.parse(loginDetails).access_token;
    })
  }catch(e){
    console.log('error in utilsjs.there was an error fetching login details from asyncstorage', error)
    return 'there was an error fetching login details from asyncstorage';
  }
}
