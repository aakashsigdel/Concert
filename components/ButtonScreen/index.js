'use strict'
import React, {
  Component, 
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import HeaderBar from '../HeaderBar'

const styles = require('./style.json');

export default class ButtonsScreen extends Component {
  constructor(){
    super();
  }

  render(){
    return(
      <View
        style={styles.container}>

        <Image
          style={styles.background}
          source={require('../../assets/images/backgroundCopy.png')}
        />

        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={()=> this.props.navigator.jumpBack()}
          mid={require('../../assets/images/brand_icon.png')}
        />
        <View
          style={styles.buttons}>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({
              name: 'chooseConcert',
              review: true
            })}
            activeOpacity={0.7}>
            <View
              style={styles.button}>
              <Image
                style={styles.addReview__icon}
                source={require('../../assets/images/review.png')}
              />
              <Text
                style={styles.addReview__text}>
                ADD REVIEW
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigator.push({name: 'chooseConcert', index: 33})}
            activeOpacity={0.7}>
            <View
              style={styles.button}>
              <Image
                style={styles.addPhoto__icon}
                source={require('../../assets/images/photo.png')}
              />
              <Text
                style={styles.addPhoto__text}>
                ADD PHOTO
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
