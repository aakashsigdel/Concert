'use strict';

import React, {
  CameraRoll,
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';

var deviceWidth = Dimensions.get('window').width;

export default class CameraConfirmation extends Component {
  _confirm() {
    this.props.navigator.push({
      name: 'photoAddComment',
      index: 22,
      concertId: this.props.concertId
    });
  }

  _cancel() {
    this.props.navigator.pop();
  }

  render () {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: this.props.imageUrl}} 
          style={[styles.capturedImage, {width: deviceWidth, height: deviceWidth}]} 
          />
          <View style={[styles.confirm, {width: deviceWidth}]}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._confirm.bind(this)}
            >
              <View style={styles.circle}>
                <Text style={styles.yesText}>Yes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._cancel.bind(this)}
            >
              <View style={styles.circle}>
                <Image
                  source={require('../../assets/images/clearCopy.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
