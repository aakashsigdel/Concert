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


class ConcertReview extends Component {
	render() {
		return(
			<Header />
		);
	}
}
AppRegistry.registerComponent('ConcertReview', () => ConcertReview);
