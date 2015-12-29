'use strict';

const ACCESS_TOKEN = 'abcde';
const API_BASE = "http://api.revuzeapp.com:80/api/v1";
const SUFFIX = "?access_token=" + ACCESS_TOKEN;
const SEARCH_SUFFIX = SUFFIX + '&q={search_token}';
const USER_DETAILS = '@Revuze:userDetails';
const LOGIN_DETAILS = '@Revuze:loginDetails';

const CONCERT = {
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkin' + SUFFIX,
};

const REVIEW = {
  DETAILURL: API_BASE + '/reviews/{review_id}' + SUFFIX,
  ADD_URL: API_BASE + '/concerts/{concert_id}/reviews' + SUFFIX,
};

const CONCERTS = {
  PAST_URL: API_BASE + '/concerts/past' + SUFFIX,
  UPCOMING_URL: API_BASE + '/concerts/upcoming' + SUFFIX,
  CHECKINS_URL: API_BASE + '/users/{user_id}/checkins' + SUFFIX,
  ARTIST_UPCOMING_URL: API_BASE + '/artists/{artist_id}/concerts/upcoming' + SUFFIX,
  ARTIST_PAST_URL: API_BASE + '/artists/{artist_id}/concerts/past' + SUFFIX,
};

const REVIEWS = {
  LATEST_URL: API_BASE + '/reviews/latest' + SUFFIX,
  CONCERT_URL: API_BASE + '/concerts/{concert_id}/reviews' + SUFFIX,
  USER_URL: API_BASE + '/users/{user_id}/reviews' + SUFFIX,
}

const SEARCH = {
  CONCERTS_URL: API_BASE + '/concerts/search' + SEARCH_SUFFIX,
  REVIEWS_URL: API_BASE + '/reviews/search' + SEARCH_SUFFIX,
  ARTISTS_URL: API_BASE + '/artists/search' + SUFFIX + '&name={search_token}',
  USERS_URL: API_BASE + '/users/search' + SEARCH_SUFFIX,
};

const USER = {
  FOLLOW_URL: API_BASE + '/users/{user_id}/follow' + SUFFIX,
  UNFOLLOW_URL: API_BASE + '/users/{user_id}/un-follow' + SUFFIX,
  LOGIN_URL: API_BASE + '/auth/facebook',
  DETAIL_URL: API_BASE + '/users/me?access_token={access_token}',
};

export {
  CONCERT,
  CONCERTS,
  LOGIN_DETAILS,
  REVIEW,
  REVIEWS,
  SEARCH,
  USER,
  USER_DETAILS,
};
