'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Dimensions,
	Image,
	InteractionManager,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
  AlertIOS,
  NativeModules,
  ScrollView,
} from 'react-native';

import Calander from '../Calander';
import FAB from '../FAB';
import Loader from '../../components.ios/Loader';
import HeaderBar from '../../components/HeaderBar';
import heroElement from './heroElement';
import { REVIEW } from '../../constants/ApiUrls.js'
import {
  callOnError,
  callOnFetchError,
  getAccessToken,
  getUserDetailsFromAsyncStorage,
  serializeJSON ,
} from '../../utils.js';


const {deviceWidth, deviceHeight} = Dimensions.get('window');
const Share = NativeModules.KDSocialShare;
const Events = require('react-native-simple-events');
const header = StyleSheet.create(require('./header.json'));
const comment = StyleSheet.create(require('./comment.json'));

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      renderPlaceholderOnly: true,
      loggedInUserDetail: null,
      total_likes: 0,
      isLiked: false,
      heartImage: null,
      review: {},
    };
  }

  componentDidMount () {
    this._fetchData();
  }

  _fetchData() {
    getAccessToken().then( access_token => {
      const url = REVIEW.DETAILURL
        .replace('{review_id}', this.props.id)
        .replace('abcde', access_token);
      getUserDetailsFromAsyncStorage()
      .then( res =>{
        this.state.loggedInUserDetail = res;
        fetch(url)
        .then( res => res.json())
        .then( res => {
          res.data.userPic = res.data.user.profile_picture.trim().length > 0
            ? {uri:res.data.user.profile_picture}
            : require('../../assets/images/user_default.png');
            try {
            res.data.artistPic =
              res.data.image !== null &&
              res.data.image.large.trim().length > 0
              ? {uri:res.data.image.large}
              : {uri: res.data.concert.artist.image.large};
            } catch (error) {
              res.data.artistPic = require('../../assets/images/default_artist_page.png');
            }

          const artistName = res.data.concert.artist.name.trim().length > 15
            ? res.data.concert.artist.name.slice(0,15) + '...'
            : res.data.concert.artist.name;

          this.state.optionsForFAB = [
            {
              name: `Go to  ${artistName}\'s page`,
              action: () => this.props.navigator.replace({
                name: 'artist',
                index: 6,
                artistId: res.data.concert.artist.id,
              })
            }
          ]

          if (this.state.loggedInUserDetail.id === res.data.user.id){
            this.state.optionsForFAB = [
              ...this.state.optionsForFAB,
              {
                name: 'Edit',
                action: () => this.props.navigator.replace({
                  name: 'editReview',
                  concert_id: this.state.review.concert.id,
                  params: {
                    action: 'PUT',
                    review: res.data,
                    url: url,
                  },
                })
              },
              {
                name: 'Delete',
                action: () => {
                  Events.trigger(
                    'SHOW_CUSTOM_ALERT',
                    {
                      view:   'Review',
                      action: 'DELETE',
                      params: this.props.params,
                      id: this.props.id,
                      navigator: this.props.navigator,
                      link:   url,
                    }
                  )
                  // this.props.navigator.replace({
                  //   name: 'customAlert',
                  //   params: {
                  //     action :'DELETE',
                  //     id: this.props.id,
                  //     link: url,
                  //     name: 'review',
                  //   },
                  // })
                } 
              },
            ]
          }

          this.setState({
            renderPlaceholderOnly: false,
            isLoading: false,
            review: res.data,
            isLiked: (res.data.liked === 0)? false : true,
            total_likes: res.data.total_likes,
            heartImage: (res.data.liked === 0)
              ? require('../../assets/images/like.png' ) 
              : require('../../assets/images/liked.png'),
          })
        })
        .catch((error) => {
          callOnFetchError(error, url);
        }).done();
      })
    } )
  }

  _sharePhoto () {
    this.setState({
      isLoading: true,
    });
    Share.shareOnFacebook({
      'imagelink': 'http://api.revuzeapp.com/media/photos/2015/08/04/IMG_1438663957935.jpg',
    },
    (result) => {
      this.setState({
        isLoading: false,
      });
    });
  }

  _renderPresentationalToggleLike(action){
    this.setState({
      isLiked: !this.state.isLiked,

      total_likes: (action === '1')
        ? this.state.total_likes + 1
        : this.state.total_likes - 1,

        heartImage: (action === '0')
          ? require('../../assets/images/like.png' ) 
          : require('../../assets/images/liked.png'),
    })
  }

  _toggleLike() {
    getAccessToken().then(access_token => {
      // action == 0 -> unlike
      // action == 1 -> like
      const action = this.state.isLiked ? '0': '1';

      const url = REVIEW.LIKEURL.replace(
        '{review_id}',
        this.state.review.id
      ).replace( '{like}', action)
      .replace('abcde', access_token);

      this._renderPresentationalToggleLike(action);

      fetch(url, {
        method: 'POST',
        body: serializeJSON({
          like: action 
        })
      })
      .then(res => {
        if (!res.ok)
          this._renderPresentationalToggleLike(action === '0'? '1': '0')
      })
      .catch((error) => {
        callOnFetchError(error, url);
        this._renderPresentationalToggleLike(action === '0'? '1': '0')
      }).done();
    })
  }

  _getStars(yellowStars) {
    // TODO: this function should be in a global module
    let stars = [];
    for(let i = 0; i < yellowStars; i++) {
      stars.push(
        <Image
          key={100 - i}
          source={require('../../assets/images/star_yellow.png')}
          style={header.yellowStar}
        />
      );
    }
    for(let i = 0; i < (5 - yellowStars); i++) {
      stars.push(
        <Image
          key={i}
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
    this.props.navigator.push({
      name: 'profile',
      index: 5,
      userId: this.state.review.user.id, 
      userName: this.state.review.user.full_name,
    });
  }

  _renderPlaceholder() {
    return (
      <View style={{flex:1, backgroundColor: 'black', alignItems: 'center', justifyContent:'center'}}>
      </View>
    );
  }

  render() {
    if(this.state.renderPlaceholderOnly)
      return this._renderPlaceholder();
    if(this.state.isLoading)
      return <Loader
        loadingMessage="Loading Review"
      />
    return (
      <View style={{ flex: 1}}>

        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
          mid={this.state.review.concert.artist.name}
          right={require('../../assets/images/shareAlt.png')}
          clickableRight={true}
          clickFunctionRight={this._sharePhoto.bind(this)}
        />

      <View style={heroElement.container}> 
        <Image 
          source={this.state.review.artistPic}
          style={heroElement.image} /> 
        <View
          style={heroElement.footer}>
          <Calander
            month={this.state.review.concert.date.month.toUpperCase()}
            day={this.state.review.concert.date.day}
          />
          <Text
            style={heroElement.footerText}>
            {this.state.review.concert.location.toUpperCase()}
          </Text>
        </View>
      </View> 

      <View style={comment.container} > 
        <View style={comment.header} >
          <TouchableOpacity
            onPress={this._handleUserPress.bind(this, this.state.review.user.id , this.state.review.user.full_name )}
            style={{flex: 1, flexDirection: 'row'}}>
            <Image
              style={comment.starImage}
              source={this.state.review.userPic}
            />
            <View style={comment.headerText}>
              <Text style={comment.whiteText} > {this.state.review.user.full_name}</Text>
              <View style={header.ratingStars} >
                {this._getStars(this.state.review.rating)}
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._toggleLike.bind(this)}
            style={comment.starContainer}>
            <Image 
              source={this.state.heartImage}
              style={comment.likeImage}
            />
            <Text
              style={comment.likesText}>
              {this.state.total_likes} 

              {this.state.total_likes === 1 ? ' LIKE' : ' LIKES ' }
            </Text>
          </TouchableOpacity>


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
              {this.state.review.comment}
            </Text>
          </ScrollView>
        </View>

      </View> 

      <FAB 
        navigator={this.props.navigator}
        links={this.state.optionsForFAB}
      />
    </View>
    ) ;
  }
}

