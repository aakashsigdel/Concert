'use strict';

import React from 'react-native';
import {
  AsyncStorage,
  Component,
  Dimensions,
  Image,
  InteractionManager,
  StyleSheet,
  ListView,
  StaticContainer,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Concerts from '../Concerts';
import InternalNavigation from '../InternalNavigation';
import HeaderBar from '../HeaderBar';
import styles from './style';
import { USERS } from '../../constants/ApiUrls.js'
import { callOnFetchError } from '../../utils.js';
import { CONCERTS, REVIEWS, USER, ASYNC_STORAGE_KEY } from '../../constants/ApiUrls';


const VIEWPORT = Dimensions.get('window');

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }),
      followersNum: 0,
      followingNum: 0,
      bio: '',
      profilePic: '',
      isLoggedInUser: this.props.isLoggedInUser,
      userName: this.props.userName, // not anti-pattern because it is not used for syncing data
      userId: 1,
      activeView: 'Photos',
      userDetails: {data: {full_name: 'aakash'}},
      renderPlaceholder: true,
      following: 0,
    };
    this.loggedInUser = 0;
  }

	setActiveView(view) {
		this.setState({
			activeView: view
		});
	}

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._fetchData();
      this.setState({
        renderPlaceholder: false,
      });
    });
    this._getLoggedInUserId();
  }
  
  _fetchData () {
    let url = USERS.USER_DETAIL_URL.replace('{user_id}', this.props.userId);
    fetch(url)
      .then ((response) => response.json())
      .then ((responseData) => {
        console.log(responseData);
          this.setState ({
            bio: responseData.data.bio,
            followersNum: responseData.data.followers_count,
            following: responseData.data.following,
            followingNum: responseData.data.following_count,
            profilePic: responseData.data.profile_picture,
            renderPlaceholder: false,
            userData: responseData.data,
            userId: responseData.data.id,
            userName: responseData.data.full_name,
            profilePic: 
              responseData.data.profile_picture.trim() === ''
                ?  require('../../assets/images/user_default.png')
                : {uri: responseData.data.profile_picture},
        });
      })
      .catch((error) => {
        callOnFetchError(error, query);
      }).done();
  }

  _handlePress(type, userId=1) {
    this.props.navigator.push({name: 'follows', index: 8, type: type, userId: userId});
  }

  _renderPlaceholder () {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
  }

  _followPress () {
    console.log(this.state.following);
    let query = '';
    if(this.state.following === 1)
      query = USER.UNFOLLOW_URL.replace('{user_id}', this.state.userId);
    else
      query = USER.FOLLOW_URL.replace('{user_id}', this.state.userId);
    console.log(query);

    fetch(query, {method: 'POST'})
      .then(response => {
        this.setState({
          following: this.state.following === 0 ? 1 : 0,
          followersNum: this.state.following === 0 ? 
              this.state.followersNum + 1 : this.state.followersNum - 1
        });
        console.log(response, this.state.following ? 'Unfollowed' : 'Followed');
      })
      .done();
    
  }

  async _getLoggedInUserId() {
    await AsyncStorage.getItem(ASYNC_STORAGE_KEY).then(
      (value) => {this.loggedInUser = Number(value)}
    );
  }
  _renderHeader() {
    return (
      <View style={styles.topView}>
        <View style={styles.noBio}>
          <TouchableHighlight
            onPress={this._handlePress.bind(this, 'followers', this.state.userId)}>
            <View style={styles.follow}>
              <Text style={styles.followNum}>
                {this.state.followersNum}
              </Text>
              <Text style={styles.followText}>FOLLOWERS</Text>
            </View>
          </TouchableHighlight>
          <Image 
            source={this.state.profilePic}
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
        <Text style={styles.bio}>{this.state.userData.bio}</Text>

        <View style={styles.userBtn}>
          {(()=>{
            console.log('boottle bhitra bottle', this.state.userId, this.loggedInUser)
            if(this.loggedInUser === this.state.userId){
              return (
                <TouchableHighlight
                  underlayColor='#F9A000'
                  style={styles.btnTouch}
                  onPress={()=> this.props.navigator.replace({
                    name: 'editProfile',
                    index: 10,
                    userData: this.state.userData,
                  })}>

                  <Text style={styles.btnText}>EDIT</Text>
                </TouchableHighlight>
                )
            }else{
              let underlayColor = this.props.following === 1 ? 'grey' : '#F9A000';
              return(
                <TouchableOpacity
                  onPress={this._followPress.bind(this)}
                  style={[
                  this.state.following === 1 ? styles.unfollowButton : styles.btnTouch,
                  {flexDirection: 'row'}
                  ]}>
                  <Image
                    style={styles.doneImage}
                    source={require('../../assets/images/done_colored.png')}/>
                  <Text style={styles.btnText}>
                    {this.state.following === 1 ? 'Following' : 'FOLLOW'}
                  </Text>
                </TouchableOpacity>
                )
            }
          })()}
        </View>
      </View>
    )
  }

  _renderSectionHeader(){
    return <InternalNavigation 
      setActiveView={this.setActiveView.bind(this)} 
      activeView={this.state.activeView}
    />
  }

  render () {
    console.log(this.state.following);
    if(this.state.renderPlaceholder)
      return this._renderPlaceholder();
    return (
      <View style={styles.container}>
        <HeaderBar 
          left={require('../../assets/images/backIcon.png')}
          mid={this.state.userData.full_name}
          clickableLeft={true}
          clickFunctionLeft={ _=> {this.props.navigator.pop()}}
        />
        {( _ => {
          switch(this.state.activeView) {
            case 'Photos': 
              return <Photos 
                header={this._renderHeader.bind(this)}
                sectionHeader={this._renderSectionHeader.bind(this)}
                navigator={this.props.navigator}
                concertId={this.props.concertId}
              />;

            case 'Reviews':
              return <Reviews 
                header={this._renderHeader.bind(this)}
                sectionHeader={this._renderSectionHeader.bind(this)}
                navigator={this.props.navigator}
                concertId={this.props.concertId}
                fetchFor='userId'
                fetchURL={REVIEWS.USER_URL.replace('{user_id}', this.props.userId)}
                userId={this.props.userId}
                userName={this.props.userName}
              />;

            case 'Concerts':
              return <Concerts 
                header={this._renderHeader.bind(this)}
                sectionHeader={this._renderSectionHeader.bind(this)}
                calanderHeader={true}
                fetchURL={CONCERTS.CHECKINS_URL.replace('{user_id}', this.props.userId)}
                navigator={this.props.navigator}
              />;
          }
        })()}
      </View>
    );
  }
}
