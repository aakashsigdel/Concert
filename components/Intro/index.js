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
import { FBSDKLoginButton } from 'react-native-fbsdklogin';
import { FBSDKLoginManager } from 'react-native-fbsdklogin';
import styles from './style';
import { ASYNC_STORAGE_KEY } from '../../constants/ApiUrls';

export default class Intro extends Component {
  _login() {
    FBSDKLoginManager.logInWithReadPermissions(['public_profile'], async (error, result) => {
      if (error)
        alert('Error in Login');
      else {
        // if (result.isCancelled)
        //   alert('Login Cancelled');
        // else {
        try {
          await AsyncStorage.setItem(ASYNC_STORAGE_KEY, '1');
          this.props.navigator.replace({name: 'home', index: 1});
        } catch (error) {
          alert('login failed');
        }
          // AsyncStorage.setItem('userId', '1', (err, result) => {
          //   if (err)
          //     alert('Login Failed');
            // this.props.navigator.replace({name: 'home', index: 1});
          // })
        // }
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

