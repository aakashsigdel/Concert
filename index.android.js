'use strict'

import React from 'react-native';
import {
	Text,
	View,
	StyleSheet,
	AppRegistry,
	Component,
} from 'react-native';
import Header from './component.android/Header';
import Navigation from './component.android/Navigation';
import Photos from './component.android/Photos';
import Reviews from './component.android/Reviews';
import Concerts from './component.android/Concerts';
import SearchActive from './component.android/SearchActive';

var viewConstants = {
	photos: 'Photos',
	reviews: 'Reviews',
	concerts: 'Concerts'
};

class ConcertReview extends Component {
	constructor() {
		super();
		this.state = {
			activeView: viewConstants.photos
		};
	}

	setActiveView(view) {
		this.setState({
			activeView: view
		});
	}

	render() {
    return(
      <SearchActive/>
    )
		// return(
		// 	<View style={styles.mainContainer}>
		// 		<Header />
		// 		<Navigation 
		// 			setActiveView={this.setActiveView.bind(this)} 
		// 			activeView={this.state.activeView} />
		// 		{
		// 			(() => {
		// 				switch(this.state.activeView) {
		// 					case viewConstants.photos: 
		// 						return <Photos />
		// 					case viewConstants.reviews:
		// 						return <Reviews />
		// 					case viewConstants.concerts:
		// 						return <Concerts />
		// 				}
		// 			})()
		// 		}
		// 	</View>
		// );
	}
}

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
// what
