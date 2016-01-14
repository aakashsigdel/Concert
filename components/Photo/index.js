'use strict'

import React from 'react-native';
import {
  Component,
  Navigator,
  Image,
  InteractionManager,
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  NativeModules,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import Loader from '../../components.ios/Loader';
import Calander from '../Calander';
import FAB from '../FAB';
import styles from './style'
import { PHOTOS } from '../../constants/ApiUrls.js'
import {
  callOnFetchError,
  getUserDetailsFromAsyncStorage,
  serializeJSON,
  getAccessToken,
} from '../../utils.js';

const Share = NativeModules.KDSocialShare;
const Events = require('react-native-simple-events');

export default class Photo extends Component {
  constructor() {
    super();
    this.state = {
      photoDetail: null,
      isLoading: true,
      renderPlaceholder: true,
      total_likes: 0,
      isLiked: false,
      heartImage: null,
      loggedInUserDetail: null,
      optionsForFAB: null,
    };
  }

  componentDidMount() {
    this._fetchData();
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholder: false,
      });
    });
  }

  _fetchData() {
    getAccessToken().then( access_token => {
      const query = PHOTOS.GET_PHOTO_URL
        .replace('{photo_id}', this.props.photoId)
        .replace('abcde', access_token);

      getUserDetailsFromAsyncStorage()
      .then(res=> {
        this.state.loggedInUserDetail = res;
        fetch(query)
        .then((response) => response.json())
        .then((responseData) => {
          const artistName_truncated = responseData.data.concert.artist.name.trim().length > 15
            ? responseData.data.concert.artist.name.slice(0, 15) + '...'
            : responseData.data.concert.artist.name;
            // es6 template strings FTW! :D
            this.state.optionsForFAB = [
              {
                name: `Go to ${artistName_truncated} page`,
                action: () => this.props.navigator.replace({
                  name: 'artist',
                  index: 6,
                  artistId: responseData.data.concert.artist.id,
                  artistName: responseData.data.concert.artist.name,
                })
              }
            ];

            // if photo belongs to loggedIn user, 
            // we need to add additional actions to FAB
            if (this.state.loggedInUserDetail.id == responseData.data.user.id){
              this.state.optionsForFAB = [
                ...this.state.optionsForFAB,
                {
                  name: 'Edit',
                  action: () => this.props.navigator.replace({
                    name: 'photoEditComment',
                    index: 52,
                    fetchURL: query,
                    photoId: this.props.photoId,
                    caption: this.state.photoDetail.caption,
                  }),
                },
                {
                  name: 'Delete',
                  action: () => {
                    Events.trigger(
                      'SHOW_CUSTOM_ALERT',
                      {
                        view: 'Photo',
                        action: 'DELETE',
                        id: this.props.photoId,
                        navigator: this.props.navigator,
                        link: query,
                      }
                    )
                  }
                }
              ]
            }

            this.setState({
              photoDetail: responseData.data,
              isLoading: false,
              isLiked: (responseData.data.liked === 0)? false : true,
              total_likes: responseData.data.total_likes,
              profile_picture: responseData.data.user.profile_picture.trim().length === 0
                ? require('../../assets/images/user_default.png')
                : {uri: responseData.data.user.profile_picture},
                heartImage: (responseData.data.liked === 0)
                  ? require('../../assets/images/like.png' ) 
                  : require('../../assets/images/liked.png'),
            });
        })
        .catch((error) => {
          callOnFetchError(error, query);
        }).done();

      })
    } )
  }

	_handelUserPress(userId) {
    this.props.navigator.push({
      name: 'profile',
      index: 5,
      userId: userId,
      userName: this.state.photoDetail.user.full_name,
    });
	}

	_sharePhoto () {
	  this.setState({
      isLoading: true,
    });

	  Share.shareOnFacebook({
        'imagelink': this.state.photoDetail.image.large,
    },
    (result) => {
      this.setState({
        isLoading: false,
      });
    });
  }

  _renderPlaceHolder() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
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
    getAccessToken().then( access_token =>{
      // action == 0 -> unlike
      // action == 1 -> like
      const action = this.state.isLiked ? '0': '1';

      const url = PHOTOS.LIKEURL
        .replace( '{photo_id}', this.state.photoDetail.id)
        .replace( 'abcde', access_token );

      this._renderPresentationalToggleLike(action);

      fetch( url, { 
        method: 'POST',
        body: serializeJSON({
          like: action
        })
      }).then(res => {
        if (!res.ok)
          this._renderPresentationalToggleLike(action === '0'? '1': '0')
          
      })
      .catch((error) => {
        this._renderPresentationalToggleLike(action === '0'? '1': '0')
        callOnFetchError(error, url);
      }).done();
    } )
  }

  render () {
    if(this.state.renderPlaceholder)
      return this._renderPlaceHolder();
    if(this.state.isLoading)
      return <Loader />
    return (
      <View style={styles.container}>
        <HeaderBar
        left={require('../../assets/images/clearCopy.png')}
        mid={this.state.photoDetail.concert.artist.name}
        right={require('../../assets/images/shareAlt.png')}
        clickableLeft={true}
        clickFunctionLeft={
          () => {
            this.props.navigator.pop();
          }
        }
        clickableRight={true}
        clickFunctionRight={
          () => {
            this._sharePhoto();
          }
        }
        />
        <View style={styles.topView}>
          <Image
            source={{uri: this.state.photoDetail.image.large}}
            style={styles.mainPhoto}
          />
          <View style={styles.photoDetail}>
            <Calander
            month={this.state.photoDetail.date.month}
            day={this.state.photoDetail.date.day}
            />
            <Text style={styles.concertName}>
              {this.state.photoDetail.concert.location.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.bottomView}>

          <TouchableOpacity
            onPress={this._handelUserPress.bind(this, this.state.photoDetail.user.id)}
            activeOpacity={0.8}
            >
            <View style={styles.userAndLikes}>

              <View style={styles.user}>
                <Image
                  source={this.state.profile_picture}
                  style={styles.profileImage}
                />
                <Text
                  style={styles.userName}
                  >
                  {this.state.photoDetail.user.full_name.toUpperCase()}
                </Text>
              </View>

              <View style={styles.likes}>
                <TouchableOpacity
                  onPress={this._toggleLike.bind(this)}
                  style={styles.starContainer}>
                  <Image 
                    source={this.state.heartImage}
                    style={styles.likeImage}
                  />
                  <Text
                    style={styles.likeCount}>
                    {this.state.total_likes} 

                    {this.state.total_likes === 1 ? ' LIKE' : ' LIKES ' }
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableOpacity>
          <Text
          style={styles.caption}
          >
            {this.state.photoDetail.caption}
          </Text>
        </View>

        <FAB 
          navigator={this.props.navigator}
          links={this.state.optionsForFAB}
        />
      </View>
    );
  }
}

