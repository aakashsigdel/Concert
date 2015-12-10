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

