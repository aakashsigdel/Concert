'use strict'

import React from 'react-native';
import {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          hidden='true'
          size='large' />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create(require('./style.json'));
