'use strict';

import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';


export default class BlankLoader extends Component {
  render () {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

var styles = StyleSheet.create(require('./styles.json'));
