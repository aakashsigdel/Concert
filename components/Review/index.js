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

const {deviceWidth, deviceHeight} = Dimensions.get('window');
const Share = NativeModules.KDSocialShare;
const header = StyleSheet.create(require('./header.json'));
const comment = StyleSheet.create(require('./comment.json'));

// TODO: handle like image state
// -> if liked, one image, 
//   if not, other

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
      renderPlaceholderOnly: true,
      isLoading: false,
      isLiked: false,
      likeCount: 0,
      heartImage: require('../../assets/images/like.png'),
      review: {},
    };
  }

  componentDidMount () {
    this._fetchData();
  }

  _fetchData() {
    const url = REVIEW.DETAILURL.replace('{review_id}', this.props.id);
    console.log(url);
    fetch(url)
      .then( res => res.json())
      .then( res => {
        res.data.userPic = (res.data.user.profile_picture.trim().length > 0) ? {uri:res.data.user.profile_picture}: require('../../assets/images/user_default.png');
        res.data.artistPic = (res.data.concert.artist.image.original.trim().length > 0) ? {uri:res.data.concert.artist.image.original}: require('../../assets/images/default_artist_page.png');

        this.setState({
          renderPlaceholderOnly: false,
          review: res.data,
        })
      })
      .then(_=> {
        this.setState({
          likeCount: this.state.review.total_likes,
        })
      })
  }

	_sharePhoto () {
	  this.setState({
      isLoading: true,
    });
	  Share.shareOnFacebook({
        'text':'Global democratized marketplace for art',
        'imagelink': 'http://api.revuzeapp.com/media/photos/2015/08/04/IMG_1438663957935.jpg',
    },
    (result) => {
      this.setState({
        isLoading: false,
      });
    });
  }

  _toggleLike() {
    // const url = REVIEW.LIKEURL.replace('{review_id}', this.state.review.id).replace('{like}', 1);
    // fetch(url, {method: POST})
    // .then(res => {
    //
    // })
    this.setState({
      isLiked: !this.state.isLiked,
      heartImage: this.state.isLiked?  require('../../assets/images/like.png' ) : require('../../assets/images/liked.png'),
      likeCount: this.state.isLiked? this.state.likeCount - 1 : this.state.likeCount + 1 ,
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
        <Text style={{color: 'lightgray'}}> Loading.. </Text>
      </View>
    );
  }

	render() {
    if(this.state.renderPlaceholderOnly)
      return this._renderPlaceholder();

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

                onError={_=> {
                  console.log('error getting image', _);
                  console.log('url-=> ', this.state.review.userPic);
                }}
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
                {this.state.likeCount} LIKES
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
          links={[
            {
              name: 'Edit',
              action: () => this.props.navigator.replace({
                name: 'addReview',
                edit: true,
                concert_id: this.state.review.concert.id,
              })
            },
            {
              name: 'Delete',
              action: () => {
                this.props.navigator.replace({
                  name: 'customAlert',
                  text: 'review',
                })
              } 
            },
            {
              name: 'Go to ' + this.state.review.concert.artist.name + '\'s page',
              action: () => this.props.navigator.pop()
            }
          ]}
        />
      </View>
    ) ;
  }
}

