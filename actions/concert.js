'use strict';

import * as types from '../constants/ActionTypes';

/* actions creators for concerts */

export function requestConcerts(period) {
  return {
    type: types.REQUEST_CONCERTS,
    period,
  };
}

export function requestConcert(concert) {
  return {
    type: types.REQUEST_CONCERT,
    concert,
  };
}

export function receiveConcerts(period, json) {
  return {
    type: types.RECEIVE_CONCERTS,
    period,
    concerts: json.data.clildren.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function receiveConcert(concert, josn) {
  return {
    type: types.RECEIVE_CONCERT,
    concert,
    details: json.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function selectConcert(concert) {
  return {
    type: types.SELECT_CONCERT,
    concert,
  };
}

/* thunks */
export function fetchConcerts(period) {
  return function(dispatch) {
    dispatch(requestConcerts(period));
    return fetch('url for fetching concerts')
      .then(response => response.json())
      .then(json => dispatch(
        receiveConcerts(period, json)
      ));
  }
}

export function fetchConcert(concert) {
  return function(dispatch) {
    dispatch(requestConcert(concert));
    return fetch('url for fetching concert ')
      .then(response => response.json())
      .then(json => dispatch(
        receiveConcert(concert, json)
      ));
  }
}
