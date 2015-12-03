'use strict'

import React from 'react-native';
import {
  Component,
  Image,
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
let QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/users/12?access_token=abcde';

export default class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      followersNum: 0,
      followingNum: 0,
      bio: '',
      profilePic: '',
      userName: '',
      activeView: viewConstants.photos,
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
    fetch (QUERY_URL)
      .then ((response) => response.json())
      .then ((responseData) => {
        this.setState ({
          followersNum: responseData.data.followers_count,
          followingNum: responseData.data.following_count,
          bio: responseData.data.bio,
          profilePic: responseData.data.profile_picture,
          userName: responseData.data.full_name,
        });
      }).done();
  }

  render () {
    console.log(this.state.userName, 'phoneT');
    return (
      <View style={styles.container}>
        <HeaderBar 
        left={require('../../assets/images/backIcon.png')}
        mid={this.state.userName}
        right={require('../../assets/images/shareAlt.png')}
        />
        <View style={styles.topView}>
          <View style={styles.noBio}>
            <View style={styles.follow}>
              <Text style={styles.followNum}>
                {this.state.followersNum}
              </Text>
              <Text style={styles.followText}>FOLLOWERS</Text>
            </View>
            <Image 
            source={require('../../assets/images/userpicCopy.png')}
            style={styles.profileImage} 
            />
            <View style={styles.follow}>
              <Text style={styles.followNum}>
              {this.state.followingNum}
              </Text>
              <Text style={styles.followText}>FOLLOWERS</Text>
            </View>
          </View>
          <Text style={styles.bio}>
            This is who i am. In eum odio menandri, 
            delenit antiopam pri eu, 
            falli inter es set at eos Has te novum perpetua.... 
          </Text>

          <View style={styles.userBtn}>
            <TouchableHighlight
            underlayColor='#F9A000'
            style={styles.btnTouch} 
            >
              <Text style={styles.btnText}>EDIT</Text>
            </TouchableHighlight>
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