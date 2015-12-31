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
import Header from './components/Header';
import InternalNavigation from './components/InternalNavigation';
import Photos from './components/Photos';
import Review from './components/Review';
import Reviews from './components/Reviews';
import Concerts from './components/Concerts';
import Home from './components/Home';
import SearchActive from './components/SearchActive';
import Artist from './components/Artist';
import Intro from './components/Intro';
import Concert from './components/Concert';
import ChooseConcert from './components/ChooseConcert';
import ProfileContainer from './components/ProfileContainer';
import Photo from './components/Photo';
import Follows from './components/Follows';
import ButtonsScreen from './components/ButtonScreen';
import AddReview from './components/AddReview';
import PhotoAddComment from './components/PhotoAddComment';
import ActionScreen from './components/ActionScreen';
import UserCamera from './components/UserCamera';
import CameraConfirmation from './components/CameraConfirmation';
import EditProfile from './components/EditProfile';
import CustomAlert from './components/CustomAlert';
import PhotoEditComment from './components/PhotoEditComment';
import BlankLoader from './components/BlankLoader';
import CameraRollPhotos from './components/CameraRollPhotos';

class ConcertReview extends Component {
	constructor() {
		super();
	}

  componentDidMount () {
    StatusBarIOS.setHidden(true);
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
    );
  }
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
