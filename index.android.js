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
import Reviews from './components/Reviews';
import Concerts from './components/Concerts';
import Home from './components/Home';
import SearchActive from './components/SearchActive';
import Artist from './components/Artist';

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
          <Artist
          navigator={navigator}
          concertId={route.concertId}
          />
        );
    }
	}

	render() {
		/*
		 * {
		 return(
			<View style={styles.mainContainer}>
				<Header />
				<InternalNavigation 
					setActiveView={this.setActiveView.bind(this)} 
					activeView={this.state.activeView} />
				{
					(() => {
						switch(this.state.activeView) {
							case viewConstants.photos: 
								return <Photos />
							case viewConstants.reviews:
								return <Reviews />
							case viewConstants.concerts:
								return <Concerts />
						}
					})()
				}
			</View>
		);
		 * }
		*/
		return(
		  <Navigator
      initialRoute={{name: 'home', index: 0}}
      renderScene={this._renderScene} 
      />
		);
	}
}

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
