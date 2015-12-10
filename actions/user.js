'use strict';

import * as types from '../constants/ActionTypes';

/* actions creators for users */

export function requestUsers(user) {
  return {
    type: types.REQUEST_USERS,
    user,
  };
}

export function requestUser(user) {
  return {
    type: types.REQUEST_USER,
    user,
  };
}

export function receiveUsers(json) {
  return {
    type: types.RECEIVE_USERS,
    users: json.data.clildren.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function receiveUser(user, josn) {
  return {
    type: types.RECEIVE_USER,
    user,
    details: json.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function selectUser(user) {
  return {
    type: types.SELECT_USER,
    user,
  };
}

/* users thunks */
export function fetchUsers(user) {
  return function(dispatch) {
    dispatch(requestUsers(user));
    return fetch('url to fetch users')
      .then(response => response.json())
      .then(json => dispatch(
        receiveUsers(user, json)
      ));
  }
}

export function fetchUser(user) {
  return function(dispatch) {
    dispatch(requestUser(user));
    return fetch('url to fetch user')
      .then(response => response.json())
      .then(json => dispatch(
        receiveUser(user, json)
      ));
  }
}
