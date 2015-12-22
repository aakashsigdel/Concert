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

const {deviceWidth, deviceHeight} = Dimensions.get('window');
const Share = NativeModules.KDSocialShare;
const header = StyleSheet.create(require('./header.json'));
const comment = StyleSheet.create(require('./comment.json'));

export default class Review extends Component {
  constructor() {
    super();
    this.state = {
      renderPlaceholderOnly: true,
      isLoading: false,
      isLiked: false,
      likeCount: 328,
      heartImage: require('../../assets/images/like.png'),
    };
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: false,
      });
    });
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
      console.log('aakash hero dai ko', result);
      this.setState({
        isLoading: false,
      });
    });
  }

  _toggleLike() {
    this.setState({
      isLiked: !this.state.isLiked,
      heartImage: this.state.isLiked?  require('../../assets/images/like.png' ) : require('../../assets/images/liked.png'),
      likeCount: this.state.isLiked? 328 : 329,
    })
  }

	// TODO: this function should be in a global module
	_getStars(yellowStars) {
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
    // navigate to profile page when username is pressed
    this.props.navigator.push({name: 'profile', index: 5, userId: userId, userName: userName});
	}

  _renderPlaceholder() {
    return (
      <View style={{flex:1, backgroundColor: 'black'}}>
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
        mid="SKO/TORP"
        right={require('../../assets/images/shareAlt.png')}
        clickableRight={true}
        clickFunctionRight={this._sharePhoto.bind(this)}
      />

        <View style={heroElement.container}> 
          <Image 
            source={require('../../assets/images/review_view.png')} 
            style={heroElement.image} /> 
          <View
            style={heroElement.footer}>
            <Calander
              month={'SEP'}
              day={'10'}
            />
            <Text
              style={heroElement.footerText}>
              SKANDERBORG FESTIVAL
            </Text>
          </View>
        </View> 

        <View style={comment.container} > 
          <View style={comment.header} >
            <TouchableOpacity
              onPress={this._handleUserPress.bind(this, 1, 'JIMMI ANDERSEN')}
              style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={comment.starImage}
                source={require('../../assets/images/userpicCopy.png')}
              />
              <View style={comment.headerText}>
                <Text style={comment.whiteText} >JIMMI ANDERSEN</Text>
                <View style={header.ratingStars} >
                  {this._getStars(3)}
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
                Pop artists aren’t often regarded as the best and as the most popular group at the same time. In the English-speaking pop world in the last decade, only maybe Adele, Beyonce and Taylor Swift have earned the same, simultaneous caliber of critical praise and concert tickets sold.{'\n'}{'\n'}In South Korea, however, there is BigBang. The establishedelectronic dance music that defines pop the world over.{'\n'}

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
                name: 'addReview'
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
              name: 'Go to SKO/TORP page',
              action: () => this.props.navigator.pop()
            }
          ]}
        />
      </View>
    ) ;
  }
}

