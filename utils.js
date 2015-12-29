'use strict'

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
