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
  constructor() {
    super();
    this.state ={
      left: '', // element on the left
      mid: '',
      right: '',
    };
    this.headerJSX = []; // array of elements to rendered
  }
  
  componentWillMount() {
    this._formatHeaderBar(this.props.left, 'left');
    this._formatHeaderBar(this.props.mid, 'mid');
    this._formatHeaderBar(this.props.right, 'right');
  }

  // check if image or text should be displayed in HeaderBar
  _formatHeaderBar (item, styleInitiail) {
    if(item !== null) {
      if(typeof(item) === 'string') {
        this.headerJSX.push (
          <Text style={styles[styleInitiail + 'Text']}>
          {item.toUpperCase()}
          </Text>
        );
      } else {
        this.headerJSX.push(
          <Image
          source={item}
          style={styles[styleInitiail + 'Image']}
          />
        );
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
      {
        this.headerJSX.map((item) => item)
      }
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
