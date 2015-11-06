'use strict'

import React from 'react-native';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
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
				<TouchableOpacity style={styles.navTextContainer}
					onPress={this._setViewAndHighlight.bind(this, viewConstants.reviews)}>
					<Text style={[styles.navTextReviews, 
						(this.props.activeView === viewConstants.reviews) && styles.textOpaque]}>
						REVIEWS
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navTextContainer}
					onPress={this._setViewAndHighlight.bind(this, viewConstants.photos)}>
					<Text style={[styles.navTextPhotos,
						(this.props.activeView === viewConstants.photos) && styles.textOpaque]}>
						PHOTOS
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navTextContainer}
					onPress={this._setViewAndHighlight.bind(this, viewConstants.concerts)}>
					<Text style={[styles.navTextConcerts,
						(this.props.activeView === viewConstants.concerts) && styles.textOpaque]}>
						CONCERTS
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));
