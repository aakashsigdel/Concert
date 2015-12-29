'use strict';
const ACCESS_TOKEN = 'abcde';
const API_BASE = "http://api.revuzeapp.com:80/api/v1"
const LOGIN_DETAILS = '@Revuze:loginDetails';
const SUFFIX = "?access_token=" + ACCESS_TOKEN;
const SEARCH_SUFFIX = SUFFIX + '&q={search_token}';
const USER_DETAILS = '@Revuze:userDetails';

const CONCERT = {
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkin' + SUFFIX,
};

const CONCERTS = {
  PAST_URL: API_BASE + '/concerts/past' + SUFFIX,
  UPCOMING_URL: API_BASE + '/concerts/upcoming' + SUFFIX,
  CHECKINS_URL: API_BASE + '/users/{user_id}/checkins' + SUFFIX,
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkins' + SUFFIX,
  DETAIL_URL: API_BASE + '/concerts/{concert_id}' + SUFFIX,
  ARTIST_UPCOMING_URL: API_BASE + '/artists/{artist_id}/concerts/upcoming' + SUFFIX,
  ARTIST_PAST_URL: API_BASE + '/artists/{artist_id}/concerts/past' + SUFFIX,
};

const REVIEW = {
  DETAILURL: API_BASE + '/reviews/{review_id}' + SUFFIX,
  ADD_URL: API_BASE + '/concerts/{concert_id}/reviews' + SUFFIX,
  LIKEURL: API_BASE + '/reviews/{review_id}/likes' + SUFFIX + '&like={like}',
};

const REVIEWS = {
  LATEST_URL: API_BASE + '/reviews/latest' + SUFFIX,
  CONCERT_URL: API_BASE + '/concerts/{concert_id}/reviews' + SUFFIX,
  USER_URL: API_BASE + '/users/{user_id}/reviews' + SUFFIX,
}

const PHOTOS = {
  LIKEURL: API_BASE + '/photos/{photo_id}/likes' + SUFFIX + '&like={like}',
}; 

const USER = {
  FOLLOW_URL: API_BASE + '/users/{user_id}/follow' + SUFFIX,
  UNFOLLOW_URL: API_BASE + '/users/{user_id}/un-follow' + SUFFIX,
  LOGIN_URL: API_BASE + '/auth/facebook',
  DETAIL_URL: API_BASE + '/users/me?access_token={access_token}',
};

const USERS = {
  USER_DETAIL_URL : API_BASE + '/users/{user_id}' + SUFFIX,
  PROFILE_EDIT_URL: API_BASE + '/users/me' + SUFFIX,
};

const SEARCH = {
  CONCERTS_URL: API_BASE + '/concerts/search' + SEARCH_SUFFIX,
  REVIEWS_URL: API_BASE + '/reviews/search' + SEARCH_SUFFIX,
  ARTISTS_URL: API_BASE + '/artists/search' + SUFFIX + '&name={search_token}',
  USERS_URL: API_BASE + '/users/search' + SEARCH_SUFFIX,
};

export {
  CONCERT,
  CONCERTS,
  LOGIN_DETAILS,
  PHOTOS,
  REVIEW,
  REVIEWS,
  SEARCH,
  USER,
  USERS,
  USER_DETAILS,
};
