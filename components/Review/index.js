'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Image,
	StyleSheet,
  ScrollView,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

	_getStars(yellowStars) {
		var stars = [];
		for(var i = 0; i < yellowStars; i++) {
			stars.push(<Text style={header.yellowStar}>★</Text>);
		}
		for(var i = 0; i < (5 - yellowStars); i++) {
			stars.push(<Text style={header.whiteStar}>★</Text>);
		}
		return stars;
	}

	_handelPress() {
	  this.props.navigator.pop();
	}

  render() {
    return (
      <View style={{ flex: 1}}>

        <View style={header.container}> 
          <TouchableHighlight
          onPress={this._handelPress.bind(this)}
          >
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
        </View> 

        <View style={comment.container} > 
          <View style={comment.header} >
            <Image
              style={comment.starImage}
              source={require('../../assets/images/music_star.png')}
            />
            <View style={comment.headerText}>
              <Text style={comment.whiteText} >JIMMI ANDERSEN</Text>
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
                Pop artists aren’t often regarded as the best and as the most popular group at the same time. In the English-speaking pop world in the last decade, only maybe Adele, Beyonce and Taylor Swift have earned the same, simultaneous caliber of critical praise and concert tickets sold.{'\n'} 
                In South Korea, however, there is BigBang. The establishedelectronic dance music that defines pop the world over.{'\n'}

                </Text>
            </ScrollView>
          </View>

        </View> 

      </View> 
    )
  }

}

let header = StyleSheet.create(require('./header.json'));
let heroElement = StyleSheet.create(require('./heroElement.json'));
let comment = StyleSheet.create(require('./comment.json'));
