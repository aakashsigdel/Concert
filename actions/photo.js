'use strict';

import * as types from '../constants/ActionTypes';

/* actions creators for photos */

export function requestPhotos(concert) {
  return {
    type: types.REQUEST_PHOTOS,
    concert,
  };
}

export function requestPhoto(photo) {
  return {
    type: types.REQUEST_PHOTO,
    photo,
  };
}

export function receivePhotos(concert, json) {
  return {
    type: types.RECEIVE_PHOTOS,
    concert,
    photos: json.data.clildren.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function receivePhoto(photo, josn) {
  return {
    type: types.RECEIVE_PHOTO,
    photo,
    details: json.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function selectPhoto(photo) {
  return {
    type: types.SELECT_PHOTO,
    photo,
  };
}

export function fetchPhotos(concert) {
  return function(dispatch) {
    dispatch(requestPhotos(concert));
    return fetch('url to fetch photos')
      .then(response => response.json())
      .then(json => dispatch(
        receivePhotos(concert, json)
      ));
  }
}

export function fetchPhoto(photo) {
  return function(dispatch) {
    dispatch(requestPhoto(photo));
    return fetch('url to fetch photo')
      .then(response => response.json())
      .then(json => dispatch(
        receivePhoto(photo, json)
      ));
  }
}
