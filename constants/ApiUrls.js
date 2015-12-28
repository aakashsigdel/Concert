'use strict';
const API_BASE = "http://api.revuzeapp.com:80/api/v1"
const suffix = "?access_token=abcde"

const CONCERT = {
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkin' + suffix,
}

const REVIEW = {
  DETAILURL: API_BASE + '/reviews/{review_id}' + suffix,
  LIKEURL: API_BASE + '/reviews/{review_id}/likes' + suffix + '&like={like}',
}

export {CONCERT, REVIEW}
