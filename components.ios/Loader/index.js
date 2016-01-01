'use strict'

import React from 'react-native';
import {
  ActivityIndicatorIOS,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './style';

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          hidden='true'
          size='large' />
        <Text style={styles.loadingText}>{this.props.loadingMessage}</Text>
      </View>
    );
  }
}

Loader.propTypes = {
  loadingMessage: React.PropTypes.string,
};

Loader.defaultProps = {
  loadingMessage: 'Loading...',
};
