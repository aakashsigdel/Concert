'use strict';
const API_BASE = "http://api.revuzeapp.com:80/api/v1"
const TOKEN_SUFFIX = "?access_token=abcde"

const CONCERTS = {
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkins' + TOKEN_SUFFIX,
  DETAIL_URL: API_BASE + '/concerts/{concert_id}' + TOKEN_SUFFIX,
}

const REVIEW = {
  DETAILURL: API_BASE + '/reviews/{review_id}' + TOKEN_SUFFIX,
  LIKEURL: API_BASE + '/reviews/{review_id}/likes' + TOKEN_SUFFIX + '&like={like}',
}

const PHOTOS = {
  LIKEURL: API_BASE + '/photos/{photo_id}/likes' + TOKEN_SUFFIX + '&like={like}',
}

export {
  CONCERTS,
  REVIEW,
  PHOTOS,
}
