'use strict';
import React, {
  View, 
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { performAPIAction } from '../../utils.js'
import styles from './style';
const Events = require('react-native-simple-events');

export default class CustomAlert extends Component {
  _okPress(){
    Events.trigger(
      'DELETE_OK',
      {
        data: this.props.params,
        navigator: this.props.navigator,
      }
    )
  }

  _cancelPress(){
    Events.trigger(
      'DELETE_CANCEL',
      {
        data: this.props.params,
        navigator: this.props.navigator,
      }
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.alert_box}>
          <View style={styles.top}>
            <Text style={[styles.text, {fontSize: 23}]}>
              Are you sure you want to delete this {this.props.text || 'item'}?
            </Text>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity 
              onPress={this._cancelPress.bind(this)}
              style={styles.left}>
              <Text style={styles.text}> Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._okPress.bind(this)}
              style={styles.right}>
              <Text style={[styles.text, {
                color: 'red',
              }]}> Delete {this.props.text || 'item'} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
