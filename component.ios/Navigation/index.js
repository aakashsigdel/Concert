'use strict'

import React from 'react-native';
import {
	Text,
	View,
	StyleSheet,
	Component
} from 'react-native';

export default class Navigation extends Component {
	render() {
		return(
			<View style={styles.navContainer}>
				<View style={styles.navTextContainer}>
					<Text style={styles.navTextReviews}>REVIEWS</Text>
				</View>
				<View style={styles.navTextContainer}>
					<Text style={styles.navTextPhotos}>PHOTOS</Text>
				</View>
				<View style={styles.navTextContainer}>
					<Text style={styles.navTextConcerts}>CONCERTS</Text>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));
