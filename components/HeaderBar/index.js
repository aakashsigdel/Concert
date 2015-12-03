'use strict';

import React from 'react-native';
import {
  Component,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
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
    this._formatHeaderBar(
      this.props.left, 'left', 
      this.props.clickableLeft,
      this.props.clickFunctionLeft,
    );
    this._formatHeaderBar(
      this.props.mid, 'mid',
      this.props.clickableMid,
      this.props.clickFunctionMid,
    );
    this._formatHeaderBar(
      this.props.right, 'right',
      this.props.clickableRight,
      this.props.clickFunctionRight,
    );
  }

  // check if image or text should be displayed in HeaderBar
  _formatHeaderBar (item, styleInitiail, clickable, clickFunction=false) {
    if(item !== null) {
      if(typeof(item) === 'string') {
        if(clickable) {
          this.headerJSX.push (
            <TouchableHighlight
            onPress={clickFunction}
            >
              <Text style={styles[styleInitiail + 'Text']}>
              {item.toUpperCase()}
              </Text>
            </TouchableHighlight>
          );
        }
        else {
          this.headerJSX.push (
            <Text style={styles[styleInitiail + 'Text']}>
            {item.toUpperCase()}
            </Text>
          );
        }
      } else {
        if(clickable) {
          this.headerJSX.push(
              <TouchableHighlight
              onPress={clickFunction}
              >
                <Image
                source={item}
                style={styles[styleInitiail + 'Image']}
                />
              </TouchableHighlight>
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
