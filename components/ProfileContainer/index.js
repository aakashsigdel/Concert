'use strict'

import React from 'react-native';
import {
  Component,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Concerts from '../Concerts';
import InternalNavigation from '../InternalNavigation';
import HeaderBar from '../HeaderBar';

var viewConstants = {
	photos: 'Photos',
	reviews: 'Reviews',
	concerts: 'Concerts'
};
let QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/users/userId?access_token=abcde';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followersNum: 0,
      followingNum: 0,
      bio: '',
      profilePic: '',
      isLoggedInUser: this.props.isLoggedInUser,
      userName: this.props.userName, // not anti-pattern because it is not used for syncing data
      userId: 1,
      activeView: viewConstants.photos,
      userDetails: {data: {full_name: 'aakash'}},
      renderPlaceholder: true,
    };
  }

	setActiveView(view) {
		this.setState({
			activeView: view
		});
	}

  componentDidMount() {
    this._fetchData();
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholder: false,
      });
    });
  }
  
  _fetchData () {
    let query_url = QUERY_URL.replace('userId', this.props.userId);
    fetch (query_url)
      .then ((response) => response.json())
      .then ((responseData) => {
        this.setState ({
          followersNum: responseData.data.followers_count,
          followingNum: responseData.data.following_count,
          bio: responseData.data.bio,
          profilePic: responseData.data.profile_picture,
          userName: responseData.data.full_name,
          userId: responseData.data.id,
        });
      }).done();
  }

  _handlePress(type, userId) {
    this.props.navigator.push({name: 'follows', index: 8, type: type, userId: userId});
  }

  _renderPlaceholder () {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
  }

  render () {
    if(this.state.renderPlaceholder)
      return this._renderPlaceholder();
    return (
      <View style={styles.container}>
        <HeaderBar 
          left={require('../../assets/images/backIcon.png')}
          mid={this.state.userName}
          right={require('../../assets/images/settings.png')}
          clickableLeft={true}
          clickFunctionLeft={() => {this.props.navigator.pop()}}
        />
        <View style={styles.topView}>
          <View style={styles.noBio}>
            <TouchableHighlight
              onPress={this._handlePress.bind(this, 'followers', this.state.userId)}
            >
              <View style={styles.follow}>
                <Text style={styles.followNum}>
                  {this.state.followersNum}
                </Text>
                <Text style={styles.followText}>FOLLOWERS</Text>
              </View>
            </TouchableHighlight>
            <Image 
              source={require('../../assets/images/userpicCopy.png')}
              style={styles.profileImage} 
            />
            <TouchableHighlight
              onPress={this._handlePress.bind(this, 'following', this.state.userId)}>
              <View style={styles.follow}>
                <Text style={styles.followNum}>
                  {this.state.followingNum}
                </Text>
                <Text style={styles.followText}>FOLLOWING</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Text style={styles.bio}>
            This is who i am. In eum odio menandri, 
            delenit antiopam pri eu, 
            falli inter es set at eos Has te novum perpetua.... 
          </Text>

          <View style={styles.userBtn}>
            {(()=>{
              if(this.props.isLoggedInUser){
                return (
                  <TouchableHighlight
                    underlayColor='#F9A000'
                    style={styles.btnTouch}
                    onPress={()=> this.props.navigator.push({
                      name: 'editProfile',
                      index: 10,
                    })}>
                    
                    <Text style={styles.btnText}>EDIT</Text>
                  </TouchableHighlight>
                  )
                }else{
                  return(
                    <TouchableHighlight
                      underlayColor='#F9A000'
                      style={styles.btnTouch}>
                      <Text style={styles.btnText}>FOLLOW</Text>
                    </TouchableHighlight>
                    )
                }
            })()}
          </View>
        </View>

        <View style={styles.bottomView}>
          <InternalNavigation 
            setActiveView={this.setActiveView.bind(this)} 
            activeView={this.state.activeView} />
          {
            (() => {
              switch(this.state.activeView) {
                case viewConstants.photos: 
                  return <Photos 
                    navigator={this.props.navigator}
                    concertId={this.props.concertId}
                    />
                case viewConstants.reviews:
                  return <Reviews 
                    navigator={this.props.navigator}
                    concertId={this.props.concertId}
                    />
                case viewConstants.concerts:
                  return <Concerts 
                  calanderHeader={true}
                    navigator={this.props.navigator}
                    />
              }
            })()
          }

        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
