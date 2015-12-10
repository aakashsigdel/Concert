'use strict';

import * as types from '../constants/ActionTypes';

/* actions creators for reviews */

export function requestReviews(concert) {
  return {
    type: types.REQUEST_REVIEWS,
    concert,
  };
}

export function requestReview(review) {
  return {
    type: types.REQUEST_REVIEW,
    review,
  };
}

export function receiveReviews(concert, json) {
  return {
    type: types.RECEIVE_REVIEWS,
    concert,
    reviews: json.data.clildren.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function receiveReview(review, josn) {
  return {
    type: types.RECEIVE_REVIEW,
    review,
    details: json.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function selectReview(review) {
  return {
    type: types.SELECT_REVIEW,
    review,
  };
}
