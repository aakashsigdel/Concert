'use strict'

import React from 'react-native';
import {
  Component,
  Navigator,
  Image,
  AlertIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  NativeModules,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import Loader from '../../components.ios/Loader';
import Calander from '../Calander';
import FAB from '../FAB';

var Share = NativeModules.KDSocialShare;

let QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/contents/photos/photoId?access_token=abcde';
export default class Photo extends Component {
  constructor() {
    super();
    this.state = {
      photoDetail: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    let query = QUERY_URL.replace('photoId', this.props.photoId);
    fetch(query)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        photoDetail: responseData.data,
        isLoading: false,
      });
    }).done();
  }

	_handelUserPress(userId) {
    this.props.navigator.push({name: 'profile', index: 5, userId: userId});
	}

	_sharePhoto () {
	  console.log(this.state.photoDetail.image.original);
	  Share.shareOnFacebook({
        'text':'Global democratized marketplace for art',
        'imagelink': this.state.photoDetail.image.original,
    },
    (result) => {
      console.log('aakash hero dai ko', result);
    });
  }

  render () {
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
              <Image
              source={require('../../assets/images/like.png')}
              style={styles.heart}
              />
              <Text
              style={styles.likeCount}
              >
                {this.state.photoDetail.total_likes} LIKES
              </Text>
            </View>

          </View>
          <Text
          style={styles.caption}
          >
            {this.state.photoDetail.caption}
            What a night.
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

let styles=StyleSheet.create(require('./style.json'));
