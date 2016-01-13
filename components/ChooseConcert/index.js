'use strict';
import React from 'react-native';
import {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpactity,
  Image,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import Concerts from '../Concerts';
const styles = require('./style.json');
import { getAccessToken } from '../../utils.js';
const URL_SUFFIX = '&past=1';

export default class ChooseConcert extends Component {
  constructor () {
    super();
    this.state = {
      searchText: '',
    };
    this.searchText = '';
  }

  render (){
    return(
      <View
        style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.jumpBack()}
          mid={'SELECT CONCERT'}
        />

      <View style={styles.body}>
        <View style={styles.searchHeader}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.searchIcon}
              source={require('../../assets/images/search_icon.png')}
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={text => {this.searchText = text}}
              onEndEditing={
                _ => {
                  this.setState({
                    searchText: this.searchText,
                  });
                }
              }
            />
          </View>
        </View>
        <Concerts
          filterText={this.state.searchText}
          navigator={this.props.navigator}
          select={true}
          review={this.props.review}
          fetchURL={this.props.fetchURL.replace('{search_token}', this.state.searchText)}
        />
      </View>
    </View>
    )
  }
}
