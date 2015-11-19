'use strict'
import React from 'react-native';
import Carousel from 'react-native-carousel';

import {
  Component,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Concerts from '../Concerts';

export default class Home extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.reviewContainer}>
          <View style={styles.title}>
            <Text style={styles.subTitle}>HOT REVIEW</Text>
            <TouchableHighlight>
              <Text style={styles.seeAllLink}>SEE ALL</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.carousel}></View>
        </View>
        <View style={styles.concertContainer}>
          <View style={styles.title}>
            <Text style={styles.subTitle}>UPCOMMING CONCERTS</Text>
            <TouchableHighlight>
              <Text style={styles.seeAllLink}>SEE ALL</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.concerts}>
            <Concerts calanderHeader={true}/>
          </View>
        </View>
      </View>
    );
  }  
}

var styles = StyleSheet.create(require('./style.json'));
