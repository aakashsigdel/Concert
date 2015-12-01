'use strict'

import React from 'react-native';
import {
	AppRegistry,
	Component,
  Navigator,
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
import ProfileContainer from './components/ProfileContainer';

var viewConstants = {
	photos: 'Photos',
	reviews: 'Reviews',
	concerts: 'Concerts'
};

class ConcertReview extends Component {
	constructor() {
		super();
		this.state = {
			activeView: viewConstants.concerts
		};
	}

	setActiveView(view) {
		this.setState({
			activeView: view
		});
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
          concert={route.concert}
          />
        );
      case 'review':
        return (
         <Review 
         navigator={navigator}
         />
        );
      case 'profile':
        return (
          <ProfileContainer
          navigator={navigator}
          />
        )
    }
	}

	render () {
		return (
		  <Navigator
      initialRoute={{name: 'login', index: 0}}
      renderScene={this._renderScene}
      />
    );
  }
}

let styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
