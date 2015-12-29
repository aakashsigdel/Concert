'use strict'
import React from 'react-native';
import Swiper from 'react-native-swiper';

import {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  InteractionManager,
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
import styles from './style';
import { CONCERTS, REVIEWS, USER_DETAILS } from '../../constants/ApiUrls';

var {width, height} = Dimensions.get('window');

export default class Home extends Component {
  constructor () {
    super();
    this.state = {
      activeDot: <View style={styles.activeDot}/>,
      dot: <View style={styles.dot}/>,
      disabledDot: <View style={styles.disabledDot}/>,
      renderPlaceholder: true,
    };
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions( async () => {
      console.log('k ho ta userdetail', this.userDetails);
      await (async () => {
        try {
          await AsyncStorage.getItem(USER_DETAILS)
          .then(userDetails => {
            console.log('khassai ta kehi hoina', userDetails);
            this.userDetails = JSON.parse(userDetails);
            this.setState({
              renderPlaceholder: false,
            });
          });
        } catch (error) {
          console.log('lau aayo aayo error', error)
          this.props.navigator.replace({name: 'login'});
        }
      })();
    });
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
                    width: width,
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

  _renderPlaceholder () {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
  }

  render() {
    var paginationHeight =  height / 1.7;
    if (this.state.renderPlaceholder)
      return this._renderPlaceholder();
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
          right={{uri: this.userDetails.profile_picture}}
          clickableRight={true}
          clickFunctionRight={() => this.props.navigator.push({
            name: 'profile',
            index: 20,
            isLoggedInUser: true,
            userId: this.userDetails.id,
            userName: this.userDetails.full_name,
          })}
          styleRight={{borderColor: '#F9B400', borderWidth: 1, borderRadius: 16}}
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
            fetchFor="latest"
            fetchURL={REVIEWS.LATEST_URL}
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
            fetchURL={CONCERTS.UPCOMING_URL}
          />

          <SearchActive 
            navigator={this.props.navigator}
          />

        </Swiper>
      </View>
    );
  }  
}
