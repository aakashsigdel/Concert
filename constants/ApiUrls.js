'use strict';
const API_BASE = "http://api.revuzeapp.com:80/api/v1";
const suffix = "?access_token=abcde";
const search_suffix = '?access_token=abcde&q={search_token}';

const ASYNC_STORAGE_KEY = '@Revuze:userId'
const CONCERT = {
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkin' + suffix,
};

const REVIEW = {
  DETAILURL: API_BASE + '/reviews/{review_id}' + suffix,
  ADD_URL: API_BASE + '/concerts/{concert_id}/reviews' + 
  '?access_token=V1pjhW7FbjNtbiXuwLRXCOmsohFmFu',
};

const CONCERTS = {
  PAST_URL: API_BASE + '/concerts/past' + suffix,
  UPCOMING_URL: API_BASE + '/concerts/upcoming' + suffix,
  CHECKINS_URL: API_BASE + '/users/{user_id}/checkins' + suffix,
  ARTIST_UPCOMING_URL: API_BASE + '/artists/{artist_id}/concerts/upcoming' + suffix,
  ARTIST_PAST_URL: API_BASE + '/artists/{artist_id}/concerts/past' + suffix,
};

const REVIEWS = {
  LATEST_URL: API_BASE + '/reviews/latest' + suffix,
  CONCERT_URL: API_BASE + '/concerts/{concert_id}/reviews' + suffix,
  USER_URL: API_BASE + '/users/{user_id}/reviews' + suffix,
}

const SEARCH = {
  CONCERTS_URL: API_BASE + '/concerts/search' + search_suffix,
  REVIEWS_URL: API_BASE + '/reviews/search' + search_suffix,
  ARTISTS_URL: API_BASE + '/artists/search' + suffix + '&name={search_token}',
  USERS_URL: API_BASE + '/users/search' + search_suffix,
};

const USERS = {
  FOLLOW_URL: API_BASE + '/users/{user_id}/follow' + suffix,
  UNFOLLOW_URL: API_BASE + '/users/{user_id}/un-follow' + suffix,
};

export {
  ASYNC_STORAGE_KEY,
  CONCERT,
  CONCERTS,
  REVIEW,
  REVIEWS,
  SEARCH,
  USERS,
};
