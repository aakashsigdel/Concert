'use strict'

import React from 'react-native';
import {
  AppRegistry,
  Component,
  Dimensions,
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
import EditReview from './components/EditReview';
import FancyMessageBar from './components/FancyMessageBar';
import Follows from './components/Follows';
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
import {
  performAPIAction,
  DataFactory,
} from './utils';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

console.log(Dimensions.get('window'));
class ConcertReview extends Component {
	constructor() {
		super();
    this.state = {
      showFancy: {status: false, data: {message: 'ERROR'}, isLoading: false},
      showCustomAlert: false,
    };
	}

  componentDidMount () {
    StatusBarIOS.setHidden(true);
    Events.on( 'SHOW_CUSTOM_ALERT',
      'SHOW_CUSTOM_ALERT_LISTENER',
      data => {
        console.log(data)
        this.setState({
          showCustomAlert: true,
          data: data,
        })
      }
    );

    Events.on( 'DELETE_OK',
      'DELETE_OK_LISTENER',
      data => {
        const routes = this.state.data.navigator.getCurrentRoutes();
        console.log(this.state.data);
        performAPIAction(this.state.data);
        this.state.data.navigator.popToRoute(routes[routes.length - 3]);
        this.setState({
          showCustomAlert: false,
        });
        Events.trigger(
          'RELOAD',
          {
            message: 'Delete Successful',
            id:      this.state.data.id,
          }
        )
      });
    
    Events.on( 'DELETE_CANCEL',
      'DELETE_CANCEL_LISTENER',
      data => {
        console.log(data);
        this.setState({
          showCustomAlert: false,
        })
        setTimeout(_=> this.state.navigator.pop(), 0);
    });

    Events.on('Ready', 'myId', data => {
      this.setState({
        showFancy: Object.assign(
          {},
          this.state.showFancy,
          {
            status: true,
            message: data.message,
            viewStyle: data.viewStyle,
            textStyle: data.textStyle,
          }
        ),
      });
      setTimeout(() => {
        this.setState({
          showFancy: Object.assign({}, this.state.showFancy, {status: false}),
        });
      }, 5000);
    // Action to throw errors
    Events.on('Ready', 'myId', data => {
      this.setState({
        showFancy: Object.assign(
          {},
          this.state.showFancy,
          {
            status: true,
            data: Object.assign(
              {},
              this.state.showFancy.data,
              data.data,
              {
                viewStyle: undefined,
                actionType: undefined,
                isLoading: undefined
              }
            ),
          }
        ),
      });
    });

    //Action triggered when photo or review begins posting
    Events.on('POST', 'postId', data => {
      this.setState({
        showFancy: Object.assign({}, this.state.showFancy,
                                 {
                                   status: true,
                                   data: Object.assign({}, this.state.showFancy.data, data.data, {actionType: undefined}),
                                   isLoading: true,
                                 }),
      });
    });

    // Action triggered when photo or review finish posting
    Events.on(
      'POSTED',
      'postedId',
      data => {
        this.setState({
          showFancy: Object.assign(
            {},
            this.state.showFancy,
            {
              status: true,
              data: Object.assign({}, this.state.showFancy.data, data.data),
              isLoading: false,
            }
          ),
        });
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
            dataFactory={DataFactory}
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
           dataFactory={DataFactory}
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
          userName={route.userName}
          />
        );
      case 'artist':
        return (
          <Artist
            artistId={route.artistId}
            artistName={route.artistName}
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
      case 'editReview':
        return <EditReview 
          navigator={navigator}
          concertId={route.concertId}
          params={route.params}
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
          params={route.params}
        />;
      case 'photoEditComment':
        return <PhotoEditComment
          fetchURL={route.fetchURL}
          photoId={route.photoId}
          caption={route.caption}
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
          if (this.state.showCustomAlert)
            return <CustomAlert
              style={{flex:1}}
            />;

          if (this.state.showFancy.status)
            return <FancyMessageBar
              message={this.state.showFancy.data.message}
              viewStyle={this.state.showFancy.data.viewStyle}
              messageStyle={this.state.showFancy.data.messageStyle}
              actionType={this.state.showFancy.data.actionType}
              actionFunction={this.state.showFancy.data.actionFunction}
              isLoading={this.state.showFancy.isLoading}
            />
        })()}
      </View>
    );
  }
}

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
