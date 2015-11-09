'use strict'

import React from 'react-native';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	Component
} from 'react-native';

var viewConstants = {
	photos: 'Photos',
	reviews: 'Reviews',
	concerts: 'Concerts'
};

export default class Navigation extends Component {
	_setViewAndHighlight(view) {
		this.props.setActiveView(view);
	}

	render() {
		return(
			<View style={styles.navContainer}>
				<TouchableHighlight style={styles.navTextContainer}
					underlayColor="#FFDD83"
					onPress={this._setViewAndHighlight.bind(this, viewConstants.reviews)}>
					<Text style={[styles.navTextReviews, 
						(this.props.activeView === viewConstants.reviews) && styles.textOpaque]}>
						REVIEWS
					</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.navTextContainer}
					underlayColor="#FFDD83"
					onPress={this._setViewAndHighlight.bind(this, viewConstants.photos)}>
					<Text style={[styles.navTextPhotos,
						(this.props.activeView === viewConstants.photos) && styles.textOpaque]}>
						PHOTOS
					</Text>
				</TouchableHighlight>
				<TouchableHighlight style={styles.navTextContainer}
					underlayColor="#FFDD83"
					onPress={this._setViewAndHighlight.bind(this, viewConstants.concerts)}>
					<Text style={[styles.navTextConcerts,
						(this.props.activeView === viewConstants.concerts) && styles.textOpaque]}>
						CONCERTS
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));
