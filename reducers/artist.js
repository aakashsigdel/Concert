'use strict';

import * as actions from '../actions/artist';
import * as types from '../constants/ActionTypes';

export default function artistReducer(state={}, action) {
  switch(action.type) {

    case types.REQUEST_ARTISTS :
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.REQUEST_ARTIST : 
      return Object.assign({}, state, {
        artist: action.artist,
      });

    default:
      return state;

  }
}
