'use strict'
import React, {
  Component, 
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { CONCERTS, SEARCH } from '../../constants/ApiUrls';

import HeaderBar from '../HeaderBar';
import styles from './style';

export default class ButtonsScreen extends Component {
  constructor(){
    super();
    this.state = {
      renderPlaceHolder: true,
    };
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceHolder: false,
      });
    });
  }

  _renderPlaceHolder () {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
  }

  render(){
    if(this.state.renderPlaceHolder)
      return this._renderPlaceHolder();
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
              review: true,
              fetchURL: SEARCH.CONCERTS_URL,
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
            onPress={() => this.props.navigator.push({
              name: 'chooseConcert',
              index: 33,
              fetchURL: CONCERTS.PAST_URL
            })}
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
