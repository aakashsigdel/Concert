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
  constructor () {
    super();
    this.state = {
      activeDot: <View style={styles.activeDot}/>,
      dot: <View style={styles.dot}/>,
      disabledDot: <View style={styles.disabledDot}/>,
    };
  }

  _listHeader (id, title) {
    return <View style={{
                height: 200,  
                justifyContent: 'center',
                backgroundColor: 'transparent',
                alignItems: 'center'
              }}>
                <Image
                  source={require('../../assets/images/background_crowd.png')}
                  style={{
                    position: 'absolute', 
                    top: 0,
                    height: 200,
                  }}
                />

                <Text style={styles.carouselText}>{{title}}</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: Dimensions.get('window').width,
                }}>
                  {[1,2,3,4].map( n => (n === id) ?  this.state.activeDot : this.state.dot)}
                </View>
            </View>
  }

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
          right={require('../../assets/images/userpicCopy.png')}
          clickableRight={true}
          clickFunctionRight={() => this.props.navigator.push({
            name: 'profile',
            index: 20,
            isLoggedInUser: true,
            userId: 1,
            userName: 'JIMMI ANDERSEN'
          })}
        />
        <Swiper showButton={false}
          activeDot={this.state.disabledDot}
          dot={this.state.disabledDot}
          paginationStyle={{position: 'absolute', top: -paginationHeight}}>

          <Reviews 
            concertId={12}
            calanderHeader={true}
            navigator={this.props.navigator}
            header={_=> this._listHeader(1, 'HOT REVIEWS')} 
          />

          <Photos 
            concertId={12}
            calanderHeader={true}
            navigator={this.props.navigator}
            header={_=> this._listHeader(2, 'LATEST PHOTOS')} 
          />


          <Concerts 
            calanderHeader={true}
            navigator={this.props.navigator}
            header={_=> this._listHeader(3, 'UPCOMING CONCERTS')} 
          />

          <SearchActive 
            navigator={this.props.navigator}
          />

        </Swiper>
      </View>
    );
  }  
}

var styles = StyleSheet.create(require('./style.json'));
