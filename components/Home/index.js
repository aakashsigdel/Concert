'use strict'
import React from 'react-native';
import Swiper from 'react-native-swiper';

import {
  Component,
  Dimensions,
  Image,
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

var {width, height} = Dimensions.get('window');

export default class Home extends Component {
  render() {
    var paginationHeight =  height / 1.7;
    return(
      <View style={styles.container}>
        <HeaderBar />
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
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
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
              <Text style={styles.carouselText}>UPCOMMING CONCERTS</Text>
            </View>
            <View style={styles.lowerView}>
              <Concerts 
              calanderHeader={true}
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
