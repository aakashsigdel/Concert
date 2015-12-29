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
import { CONCERTS } from '../../constants/ApiUrls';
const styles = require('./style.json');

export default class ChooseConcert extends Component {
  render (){
    return(
      <View
        style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.jumpBack()}
          mid={'SELECT CONCERT'}
          right={'NEXT'}
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
              />
            </View>
          </View>
          <Concerts
            navigator={this.props.navigator}
            select={true}
            review={this.props.review}
            fetchURL={CONCERTS.UPCOMING_URL}
          />
        </View>
      </View>
    )
  }
}
