'use strict'

import React from 'react-native';
import {
	Text,
	View,
	StyleSheet,
	AppRegistry,
	Component
} from 'react-native';
import Header from './component.ios/Header';
import InternalNavigation from './component.ios/InternalNavigation';
import Photos from './component.ios/Photos';
import Reviews from './component.ios/Reviews';
import Concerts from './component.ios/Concerts';

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

	render() {
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
	}
}

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1
	}
});

AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
