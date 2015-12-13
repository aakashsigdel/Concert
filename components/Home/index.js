'use strict'
import React from 'react-native';
import Swiper from 'react-native-swiper';

import {
  Component,
  Dimensions,
  Image,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Concerts from '../Concerts';
import HeaderBar from '../HeaderBar';
import Reviews from '../Reviews';
import Photos from '../Photos';
import SearchActive from '../SearchActive';

var {width, height} = Dimensions.get('window');

export default class Home extends Component {
  render() {
    var paginationHeight =  height / 1.7;
    return(
      <View style={styles.container}>
        <HeaderBar 
          left={require('../../assets/images/revuze-icon.png')}
          clickableLeft={true}
          clickFunctionLeft={()=>{
            this.props.navigator.push({
              name: "buttonScreen",
              index: 19,
              sceneConfig: Navigator.SceneConfigs.VerticalDownSwipeJump,
            });
          }}
          mid={require('../../assets/images/brand_icon.png')}
          right={require('../../assets/images/shareAlt.png')}
        />
        <Image
          source={require('../../assets/images/background_crowd.png')}
          style={styles.backgroundImage}
        />
        <Swiper showButton={false}
        activeDot={
          <View 
          style={
            {
              backgroundColor:'#F9B400',
              width: 7.5,
              height: 7.5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }
          } />
        }
        dot={
          <View style={
            {
              backgroundColor: 'transparent',
              borderColor: '#F9B400',
              borderWidth: 1,
              width: 7.5,
              height: 7.5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }
          } />
        }
            paginationStyle={{position: 'absolute', top: -paginationHeight}}
        >

          <View style={styles.wrapper}>
            <View style={styles.carousel}>
              <Text style={styles.carouselText}>HOT REVIEWS</Text>
            </View>
            <View style={styles.lowerView}>
              <Reviews 
                concertId={12}
                calanderHeader={true}
                navigator={this.props.navigator}
              />
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.carousel}>
              <Text style={styles.carouselText}>LATEST PHOTOS</Text>
            </View>
            <View style={styles.lowerView}>
              <Photos 
              concertId={12}
              calanderHeader={true}
              navigator={this.props.navigator}
              />
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.carousel}>
              <Text style={styles.carouselText}>UPCOMING CONCERTS</Text>
            </View>
            <View style={styles.lowerView}>
              <Concerts 
              calanderHeader={true}
              navigator={this.props.navigator}
              />
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.lowerView}>
              <SearchActive 
              navigator={this.props.navigator}
              />
            </View>
          </View>

        </Swiper>
      </View>
    );
  }  
}

var styles = StyleSheet.create(require('./style.json'));
