'use strict'

import React from 'react-native';

import {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Calander extends Component {
  render () {
    return (
      <View style={styles.calanderContainer}>
      <View style={styles.calanderHeader}>
          <Text style={styles.calanderMonth}>
            {this.props.month.toUpperCase() || 'SEP'}
          </Text>
        </View>
        <View style={styles.calanderBody}>
          <Text style={styles.calanderDay}>{this.props.day || 17}</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
