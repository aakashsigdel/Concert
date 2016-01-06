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
  console.debug(params);
  return ;
  try{
    fetch( params.link, { method: params.action})
    .then(response => {
      console.debug(response);
    }).catch(e => {
      console.debug('apiactionerroror: ', e);
      callOnFetcherroror(e, params.link);
    }).done();
  }catch(e){
    console.debug('apiactionerroror: ', e);
    Events.trigger('Ready', {message: 'Limited or no internet connection.'});
  }
}

export let DataFactory = () => {
  let apiData = {};
  let shouldUpdate = false;
  let populateApiData = ( data ) => {
    apiData = Object.assign(
      {},
      apiData,
      data
    )
  }

  let sendApiData = () => {
    if(Object.keys(apiData).length === 0 )
      return false
    else
      return apiData
  }

  return {
    setData: populateApiData,
    getData: sendApiData,
    toggleShouldUpdate: () => {
      console.log('toggling shouldUpdate.. was -> ' + shouldUpdate)
      shouldUpdate = !shouldUpdate
      console.log('toggled to -> ' + shouldUpdate)
    },
    shouldUpdate: () => {
      console.log('asked for shouldUpdate state. my state is shouldUpdate = ' + shouldUpdate)
      return shouldUpdate
    },
  }
}
