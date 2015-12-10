'use strict';

import * as types from '../constants/ActionTypes';

/* actions creators for artist */

export function requestArtists() {
  return {
    type: types.REQUEST_ARTIST,
  };
}

export function requestArtist(artist) {
  return {
    type: types.REQUEST_ARTIST,
    artist,
  };
}

export function receiveArtists(json) {
  return {
    type: types.RECEIVE_ARTISTS,
    artists: json.data.clildren.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function receiveArtist(artist, josn) {
  return {
    type: types.RECEIVE_ARTIST,
    artist,
    details: json.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function selectArtist(artist) {
  return {
    type: types.SELECT_ARTIST,
    artist,
  };
}

export function fetchArtists() {
  return function(dispatch) {
    dispatch(requestArtists());
    return fetch('url to fetch artists')
      .then(response => response.json())
      .then(json => dispatch(
        receiveArtists(json);
      ));
  }
}

export function requestArtist(artist) {
  return function(dispatch) {
    dispatch(requestArtist(artist));
    return fetch('url to fetch artist')
      .then(response => response.json())
      .then(json => dispatch(
        receiveArtist(artist, json)
      ));
  }
}
