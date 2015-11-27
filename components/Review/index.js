'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Image,
	StyleSheet,
  ScrollView,
	Text,
	View,
} from 'react-native';

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView style={{ flex: 1}}>

        <View style={header.container}> 
          <Image
            style={header.left} 
            source={require('../../assets/images/clearCopy.png')} />
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
            <View style="headerText" >
              <Text style={comment.whiteText} >JIMMI ANDERSEN</Text>
              <View style={comment.stars} >
                <Text style={comment.whiteText} > ☆ ☆ ☆ ☆ ☆ </Text>
              </View>
            </View>

            <View
              style={comment.starContainer} >
              <Image 
                source={require('../../assets/images/like.png')}
                style={comment.likeImage}
              />
              <Text
                style={comment.whiteText}>
                329 LIKES
              </Text>
            </View>

            <View style={comment.text}>
              <Text 
                style={comment.whiteText}>
                asldfkjas;ldkfjasd;lkfjasd;lkfjasd;lkfjasd;lf
              </Text>
            </View>

          </View>

        </View> 

      </ScrollView> 
    )
  }

}

let header = StyleSheet.create(require('./header.json'));
let heroElement = StyleSheet.create(require('./heroElement.json'));
let comment = StyleSheet.create(require('./comment.json'));
