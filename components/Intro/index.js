'use strict'

import React from 'react-native';
import {
  AsyncStorage,
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { FBSDKAccessToken } from 'react-native-fbsdkcore';
import { FBSDKLoginButton } from 'react-native-fbsdklogin';
import { FBSDKLoginManager } from 'react-native-fbsdklogin';
import styles from './style';
import { USER_DETAILS, USER, LOGIN_DETAILS } from '../../constants/ApiUrls';

export default class Intro extends Component {
  _login() {
    FBSDKLoginManager.logInWithReadPermissions(['public_profile'], async (error, result) => {
      if (error)
        alert('ERROR: Login Failed');
      else {
        if (result.isCancelled)
          alert('ERROR: Login Failed');
        else {
          FBSDKAccessToken.getCurrentAccessToken(token => {
            if(token) {
              fetch(USER.LOGIN_URL + '?fb_access_token=' + token.tokenString)
              .then(response => response.json())
              .then(async responseData => {
                try {
                  await AsyncStorage.setItem(LOGIN_DETAILS, JSON.stringify(responseData));
                  fetch(USER.DETAIL_URL.replace('{access_token}', responseData.access_token))
                  .then(response => response.json())
                  .then(async responseData => {
                    try {
                      await AsyncStorage.setItem(
                        USER_DETAILS, 
                        JSON.stringify(responseData.data)
                      );
                      this.props.navigator.replace({name: 'home', index: 1});
                    } catch (error) {
                      alert('ERROR: Login Failed');
                    }
                  });
                } catch (error) {
                  alert('ERROR: Login Failed');
                }
              })
              .catch(error => {
                alert('ERROR: Login Failed');
              });
            } else {
              alert('ERROR: Login Failed');
            }
          });
        }
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
        source={require('../../assets/images/background_crowd.png')}
        style={styles.backgroundImage}
        />
        <View style={styles.subContainer}>
          <Text style={styles.titleText}>RATE THE STARS</Text>
          <Image
          style={styles.phoneIntro}
          source={require('../../assets/images/phone_intro.png')}
          />
        </View>

          <TouchableHighlight
          onPress={this._login.bind(this)}
          style={styles.facebookLoginBtn}
          >
            <View style={styles.loginDescContainer}>
              <Image
              source={require('../../assets/images/loginFacebook.png')}
              style={styles.facebookIcon}
              />
              <Text style={styles.facebookLoginText}>LOGIN WITH FACEBOOK</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
}

