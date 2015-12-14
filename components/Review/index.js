'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Dimensions,
	Image,
	StyleSheet,
  ScrollView,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';

import Calander from '../Calander';
import FAB from '../FAB';

let {deviceWidth, deviceHeight} = Dimensions.get('window');

export default class Review extends Component {
  constructor() {
    super();
    this.state = {};
  }

	// TODO: this function should be in a global module
	_getStars(yellowStars) {
		let stars = [];
		for(let i = 0; i < yellowStars; i++) {
			stars.push(
			  <Image
          source={require('../../assets/images/star_yellow.png')}
          style={header.yellowStar}
			  />
			);
		}
		for(let i = 0; i < (5 - yellowStars); i++) {
			stars.push(
			  <Image
          source={require('../../assets/images/star_white.png')}
          style={header.whiteStar}
			  />
			);
		}
		return stars;
	}

	_handleBackPress() {
	  this.props.navigator.pop();
	}

	_handleUserPress(userId, userName) {
    // navigate to profile page when username is pressed
    this.props.navigator.push({name: 'profile', index: 5, userId: userId, userName: userName});
	}

  render() {
    return (
      <View style={{ flex: 1}}>

        <View style={header.container}> 
          <TouchableHighlight
          onPress={this._handleBackPress.bind(this)}>
            <Image
              style={header.left} 
              source={require('../../assets/images/clearCopy.png')} />
          </TouchableHighlight>
          <Text
            style={ header.titleText }> 
            SKO/TORP 
          </Text> 
          <Image 
            style={header.right} 
            source={require('../../assets/images/shareAlt.png')} 
          /> 
        </View> 

        <View style={heroElement.container}> 
          <Image 
            source={require('../../assets/images/review_view.png')} 
            style={heroElement.image} /> 
          <View
            style={heroElement.footer}>
            <Calander
              month={'SEP'}
              day={'10'}
            />
            <Text
              style={heroElement.footerText}>
              SKANDERBORG FESTIVAL
            </Text>
          </View>
        </View> 

        <View style={comment.container} > 
          <View style={comment.header} >
            <Image
              style={comment.starImage}
              source={require('../../assets/images/userpicCopy.png')}
            />
            <View style={comment.headerText}>
              <TouchableHighlight
              onPress={this._handleUserPress.bind(this, 1, 'JIMMI ANDERSEN')}
              >
                <Text style={comment.whiteText} >JIMMI ANDERSEN</Text>
              </TouchableHighlight>
              <View style={header.ratingStars} >
                {this._getStars(3)}
              </View>
            </View>

            <View
              style={comment.starContainer} >
              <Image 
                source={require('../../assets/images/like.png')}
                style={comment.likeImage}
              />
              <Text
                style={comment.likesText}>
                329 LIKES
              </Text>
            </View>


          </View>

          <View 
           style={{ 
             paddingTop: 13,
             paddingBottom: 10.5,
             paddingLeft: 15,
             paddingRight: 15,
           }}
          >
            <ScrollView style={comment.text}>
              <Text 
                style={comment.longText}>
                Pop artists aren’t often regarded as the best and as the most popular group at the same time. In the English-speaking pop world in the last decade, only maybe Adele, Beyonce and Taylor Swift have earned the same, simultaneous caliber of critical praise and concert tickets sold.{'\n'}{'\n'}In South Korea, however, there is BigBang. The establishedelectronic dance music that defines pop the world over.{'\n'}

                </Text>
            </ScrollView>
          </View>

        </View> 

        <FAB 
          navigator={this.props.navigator}
          links={[
            {
              name: 'Go to SKO/TORP page'
            }
          ]}
        />
      </View> 
    )
  }

}

let header = StyleSheet.create(require('./header.json'));
let heroElement = StyleSheet.create(require('./heroElement.json'));
let comment = StyleSheet.create(require('./comment.json'));
