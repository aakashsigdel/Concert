'use strict';

import * as actions from '../actions/concert';
import * as types from '../constants/ActionTypes';

export default function concertReducer(state={}, action) {
  switch(action.type) {
    case types.REQUEST_CONCERTS :
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.REQUEST_CONCERT : 
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.RECEIVE_CONCERTS :
      return Object.assign({}, state, {
        isFetching: false,
        period: action.period,
        concerts: action.concerts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}
