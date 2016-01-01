'use strict';
import React, {
  View, 
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { performAPIAction } from '../../utils.js'

const styles = StyleSheet.create(require('./style.json'));

export default class CustomAlert extends Component {
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
              onPress={() => this.props.navigator.pop()}
              style={styles.left}>
              <Text style={styles.text}> Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                performAPIAction(this.props.params);
                this.props.navigator.pop();
                this.props.navigator.pop();
              }}
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
