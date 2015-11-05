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
	constructor() {
		super();
		this.state = {
			photos: true,
			reviews: false,
			concerts: false
		}
	}
	_setViewAndHighlight(view) {
		this.props.setActiveView(view);
		switch(view) {
			case viewConstants.photos:
				this.setState({
					photos: true,
					reviews: false,
					concerts: false
				});
				break;
			case viewConstants.reviews:
				this.setState({
					photos: false,
					reviews: true,
					concerts: false
				});
				break;
			case viewConstants.concerts:
				this.setState({
					photos: false,
					reviews: false,
					concerts: true
				});
				break;
		}
	}
	render() {
		return(
			<View style={styles.navContainer}>
				<TouchableOpacity style={styles.navTextContainer}
					onPress={this._setViewAndHighlight.bind(this, viewConstants.reviews)}>
					<Text style={[styles.navTextReviews, 
						this.state.reviews && styles.textOpaque]}>
						REVIEWS
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navTextContainer}
					onPress={this._setViewAndHighlight.bind(this, viewConstants.photos)}>
					<Text style={[styles.navTextPhotos,
						this.state.photos && styles.textOpaque]}>
						PHOTOS
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.navTextContainer}
					onPress={this._setViewAndHighlight.bind(this, viewConstants.concerts)}>
					<Text style={[styles.navTextConcerts,
						this.state.concerts && styles.textOpaque]}>
						CONCERTS
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));
