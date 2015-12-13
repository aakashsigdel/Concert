'use strict';

import * as actions from '../actions/user';
import * as types from '../constants/ActionTypes';

export default function userReducer(state={}, action) {
  switch(action.type) {

    case types.REQUEST_USERS :
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.REQUEST_USER : 
      return Object.assign({}, state, {
        user: action.user,
      });

    default:
      return state;

  }
}
