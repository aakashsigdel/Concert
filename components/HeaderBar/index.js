'use strict';

import React from 'react-native';
import {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class HeaderBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
        source={require('../../assets/images/revuze-icon.png')}
        style={styles.musicStar}
        />
        <Image
        source={require('../../assets/images/brand_icon.png')}
        style={styles.brandIcon}
        />
        <Image
        source={require('../../assets/images/userpicCopy.png')}
        style={styles.userImage}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create(require('./style.json'));
