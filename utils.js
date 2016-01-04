'use strict'
import React, { AsyncStorage } from 'react-native';
import {
  USER_DETAILS,
  LOGIN_DETAILS
} from './constants/ApiUrls';
import Events from 'react-native-simple-events';

let userDetailsFromAsyncStorage = null;

export const serializeJSON = ( json ) => {
 return Object.keys(json).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(json[keyName])
  }).join('&');
}

export const callOnFetchError = (error, url="url not specified") => {
  console.log(error, url);
  Events.trigger('Ready', {message: 'Limited or no internet connection.'});
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
  try {
    return await AsyncStorage.getItem(USER_DETAILS)
    .then(userDetails => {
      return JSON.parse(userDetails);
    });
  } catch (error) {
    return 'there was an error fetching from asyncstorage';
  }
}

export const getAccessToken = async () => {
  try {
   return await AsyncStorage.getItem(LOGIN_DETAILS)
    .then(loginDetails => {
      return JSON.parse(loginDetails).access_token;
    })
  }catch(e){
    return 'there was an error fetching login details from asyncstorage';
  }
}

export const performAPIAction = (params) => {
  try{
    fetch( params.link, { method: params.action})
    .then(response => {
      console.log(response);
    }).catch(e => {
      callOnFetchError(e, params.link);
    }).done();
  }catch(e){
    Events.trigger('Ready', {message: 'Limited or no internet connection.'});
  }
}
