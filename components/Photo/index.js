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

var Share = NativeModules.KDSocialShare;

let QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/photos/photoId?access_token=abcde';
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
    let query = QUERY_URL.replace('photoId', this.props.photoId);
    fetch(query)
    .then((response) => response.json())
    .then((responseData) => {
      console.log('photo res data', responseData);
      this.setState({
        photoDetail: responseData.data,
        isLoading: false,
        isLiked: (responseData.data.liked === 0)? false : true,
        total_likes: responseData.data.total_likes,
        heartImage: (responseData.data.liked === 0)
          ? require('../../assets/images/like.png' ) 
          : require('../../assets/images/liked.png'),
      });
    }).done();
  }

	_handelUserPress(userId) {
    this.props.navigator.push({name: 'profile', index: 5, userId: userId});
	}

	_sharePhoto () {
	  this.setState({
      isLoading: true,
    });

	  Share.shareOnFacebook({
        'imagelink': this.state.photoDetail.image.original,
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

  _toggleLike() {
    // action == 0 -> unlike
    // action == 1 -> like
    const action = this.state.isLiked ? '0': '1';

    const url = PHOTOS.LIKEURL
      .replace( '{photo_id}', this.state.photoDetail.id)
      .replace( '{like}', action);

    console.log(action, url)

    fetch(url, {method: 'POST'})
      .then(res => {
        this.setState({
          isLiked: !this.state.isLiked,
          
          total_likes: (action === '1')
            ? this.state.total_likes + 1
            : this.state.total_likes - 1,

          heartImage: (action === '0')
            ? require('../../assets/images/like.png' ) 
            : require('../../assets/images/liked.png'),
        })
      }).then(_=> console.log('state', this.state))
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
          source={{uri: this.state.photoDetail.image.original}}
          style={styles.mainPhoto}
          />
          <View style={styles.photoDetail}>
            <Calander
            month={this.state.photoDetail.date.month}
            day={this.state.photoDetail.date.day}
            />
            <Text style={styles.concertName}>
              {this.state.photoDetail.concert.location}
            </Text>
          </View>
        </View>

        <View style={styles.bottomView}>
          <View style={styles.userAndLikes}>

            <View style={styles.user}>
              <Image
              source={require('../../assets/images/userpicCopy.png')}
              style={styles.profileImage}
              />
              <TouchableHighlight
              onPress={this._handelUserPress.bind(this, this.state.photoDetail.user.id)}
              >
                <Text
                style={styles.userName}
                >
                  {this.state.photoDetail.user.full_name.toUpperCase()}
                </Text>
              </TouchableHighlight>
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
          <Text
          style={styles.caption}
          >
            {this.state.photoDetail.caption}
          </Text>
        </View>

        <FAB 
          navigator={this.props.navigator}
          links={[
            {
              name: 'Edit',
              action: () => this.props.navigator.push({name: 'photoEditComment', index: 52}),
            },
            {
              name: 'Delete',
              action: () => this.props.navigator.replace({
                name: 'customAlert',
                text: 'photo',
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
              })
            },
            {
              name: 'Go to SKO/TORP page',
            }
          ]}
        />
      </View>
    );
  }
}

