'use strict';

import React from 'react-native';
import {
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
    };
  }

	setActiveView(view) {
		this.setState({
			activeView: view
		});
	}

  componentDidMount() {
    this._fetchData();
  }
  
  _fetchData () {
    let url = USERS.USER_DETAIL_URL.replace('{user_id}', this.props.userId);
    fetch(url)
      .then ((response) => response.json())
      .then ((responseData) => {
        console.log(responseData);
        InteractionManager.runAfterInteractions(() => {
          this.setState ({
            renderPlaceholder: false,
            userData: responseData.data,
            followersNum: responseData.data.followers_count,
            followingNum: responseData.data.following_count,
            bio: responseData.data.bio,
            profilePic: responseData.data.profile_picture,
            userName: responseData.data.full_name,
            userId: responseData.data.id,
          });
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
        <Text style={styles.bio}>{this.state.userData.bio}</Text>

        <View style={styles.userBtn}>
          {(()=>{
            if(this.props.isLoggedInUser){
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
    )
  }

  _renderSectionHeader(){
    return <InternalNavigation 
      setActiveView={this.setActiveView.bind(this)} 
      activeView={this.state.activeView}
    />
  }

  render () {
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
                userId={this.props.userId}
                userName={this.props.userName}
              />;

            case 'Concerts':
              return <Concerts 
                header={this._renderHeader.bind(this)}
                sectionHeader={this._renderSectionHeader.bind(this)}
                calanderHeader={true}
                navigator={this.props.navigator}
              />;
          }
        })()}
      </View>
    );
  }
}
