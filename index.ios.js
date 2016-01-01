'use strict'

import React from 'react-native';
import {
  AppRegistry,
  Component,
  Navigator,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Events from 'react-native-simple-events';
import ActionScreen from './components/ActionScreen';
import AddReview from './components/AddReview';
import Artist from './components/Artist';
import BlankLoader from './components/BlankLoader';
import ButtonsScreen from './components/ButtonScreen';
import CameraConfirmation from './components/CameraConfirmation';
import CameraRollPhotos from './components/CameraRollPhotos';
import ChooseConcert from './components/ChooseConcert';
import Concert from './components/Concert';
import Concerts from './components/Concerts';
import CustomAlert from './components/CustomAlert';
import EditProfile from './components/EditProfile';
import FancyMessageBar from './components/FancyMessageBar';
import Follows from './components/Follows';
import Header from './components/Header';
import Home from './components/Home';
import InternalNavigation from './components/InternalNavigation';
import Intro from './components/Intro';
import Photo from './components/Photo';
import PhotoAddComment from './components/PhotoAddComment';
import PhotoEditComment from './components/PhotoEditComment';
import Photos from './components/Photos';
import ProfileContainer from './components/ProfileContainer';
import Review from './components/Review';
import Reviews from './components/Reviews';
import SearchActive from './components/SearchActive';
import UserCamera from './components/UserCamera';

class ConcertReview extends Component {
	constructor() {
		super();
    this.state = {
      showFancy: {status: false, message: 'ERROR'},
    };
	}

  componentDidMount () {
    StatusBarIOS.setHidden(true);
    let _this = this;
    Events.on('Ready', 'myId', data => {
      _this.setState({
        showFancy: Object.assign({}, this.state.showFancy, {status: true, message: data.message}),
      });
      setTimeout(() => {
        _this.setState({
          showFancy: Object.assign({}, this.state.showFancy, {status: false}),
        });
      }, 2000);
    });
  }

  componentWillUnmount () {
    alert('bue');
    Events.rm('Ready', 'myId');
  }

	_renderScene(route, navigator) {
	  switch(route.name) {
      case 'login':
        return (
          <Intro
            navigator={navigator}
          />
        );
      case 'home':
        return (
          <Home
            navigator={navigator}
          />
        );
      case 'buttonScreen':
        return (
          <ButtonsScreen
            navigator={navigator}
          />
        );
      case 'search_active':
        return (
          <SearchActive
          navigator={navigator}
          />
        );
      case 'concert':
        return (
          <Concert
          navigator={navigator}
          concertId={route.concertId}
          toggleAttending={route.toggleAttending}
          concert={route.concert}
          />
        );
      case 'review':
        return (
         <Review 
           navigator={navigator}
           id={route.review_id}
         />
        );
      case 'profile':
        return (
          <ProfileContainer
            navigator={navigator}
            userId={route.userId}
            isLoggedInUser={route.isLoggedInUser}
            userName={route.userName}
          />
        );
      case 'photo':
        return (
          <Photo
            navigator={navigator}
            photoId={route.photoId}
          />
        );
      case 'follows':
        return (
          <Follows
          navigator={navigator}
          type={route.type}
          userId={route.userId}
          />
        );
      case 'artist':
        return (
          <Artist
            artistId={route.artistId}
            navigator={navigator}
          />
        );
      case 'chooseConcert':
        return (
          <ChooseConcert
            navigator={navigator}
            review={route.review}
            fetchURL={route.fetchURL}
          />
        );
      case 'editProfile':
        return <EditProfile
          navigator={navigator}
          userData={route.userData}
        />;
      case 'addReview':
        return <AddReview 
          navigator={navigator}
          concertId={route.concertId}
          imageData={route.imageData}
        />;
      case 'camera':
        return <UserCamera
          navigator={navigator}
          concertId={route.concertId}
          review={route.review}
        />;
      case 'photoAddComment':
        return <PhotoAddComment
          navigator={navigator}
          concertId={route.concertId}
          imageData={route.imageData}
        />;
      case 'actionScreen':
        return <ActionScreen
          navigator={navigator}
          links={route.links}
        />;
      case 'cameraConfirmation':
        return <CameraConfirmation
          navigator={navigator}
          imageData={route.imageData}
          concertId={route.concertId}
          review={route.review}
        />;
      case 'customAlert':
        return <CustomAlert
          navigator={navigator}
          text={route.text}
        />;
      case 'photoEditComment':
        return <PhotoEditComment
          navigator={navigator}
        />
      case 'blankLoader':
        return <BlankLoader
          navigator={navigator}
        />
      case 'cameraroll':
        return <CameraRollPhotos
          navigator={navigator}
          concertId={route.concertId}
          review={route.review}
        />
      default:
        return (
          <Intro
            navigator={navigator}
          />
        );
    }
	}

	render () {
		return (
      <View style={{flex: 1}}>
        <Navigator
          initialRoute={{name: 'home', index: 0}}
          renderScene={this._renderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
        />
        {(() => {
          if (this.state.showFancy.status)
            return <FancyMessageBar
              message={this.state.showFancy.message}
              viewStyle={this.state.showFancy.viewStyle}
              messageStyle={this.state.showFancy.messageStyle}
            />
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
