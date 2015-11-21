'use strict'

import React from 'react-native';
import{
  Component,
  Image,
  ListView,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Concerts from '../Concerts'
import InternalNavigation from '../InternalNavigation';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Home from '../Home';

let styles = StyleSheet.create(require('./styles.json'));
let navBtn = "http://aakashsigdel.github.io/Concert/navBtn.png";

export default class SearchActive extends Component {
  constructor() {
    super()
    this.state = {
      filterText : "",
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }),
    };
  }

  _handelPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
        <View style={styles.container} >
          <View style={styles.header} >
            <TouchableOpacity 
            style={styles.nav}
            onPress={this._handelPress.bind(this)}
            >
              <Image 
                source={{uri: navBtn}}
                style={styles.navBtn}
              />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Image
                source={require('../../assets/images/search_icon.png')}
                style={styles.searchIcon}
              />
              <TextInput 
                style={styles.inputBox}
                autoFocus={true}
                onChangeText={(text) => this.setState({filterText: text})}
                placeholder="type something.."
              />
            </View>
          </View>
          <View style={styles.tabBar}>
            <TouchableHighlight>
              <Text style={styles.font}>REVIEWS</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.font, styles.active}>CONCERTS</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.font}>ARTISTS</Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text style={styles.font}>USERS</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.list}>
            <Concerts 
              calanderHeader = {true}
              filterText = {this.state.filterText}
              navigator={this.props.navigator}
            />
          </View>
        </View>
      );
  }
}
