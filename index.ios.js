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
import Navigation from './component.ios/Navigation';


class ConcertReview extends Component {
	render() {
		return(
			<View>
				<Header />
				<Navigation />
			</View>
		);
	}
}
AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
