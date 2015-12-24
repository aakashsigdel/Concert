'use strict';
const API_BASE = "http://api.revuzeapp.com:80/api/v1"
const suffix = "?access_token=abcde"

 const CONCERT = {
  CHECKINURL: API_BASE + '/concerts/{concert_id}/checkin' + suffix,
}
export {CONCERT}
