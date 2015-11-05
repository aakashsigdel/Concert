'use strict'

import React from 'react-native'
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Component,
} from 'react-native';

export default class Header extends Component {
	render() {
		return(
			<View style={styles.headerContainer}>
				<Image source={require('image!titleImage')} style={styles.titleImage} />
				<View style={styles.titleContainer}>
					<TouchableOpacity style={styles.navBtn}>
						<Image source={require('image!navBtn')} style={styles.navBtnImg} />
					</TouchableOpacity>
					<Text style={styles.titleText}>SKO/TORP</Text>
					<TouchableOpacity style={styles.shareBtn}>
						<Image source={require('image!share')} style={styles.shareBtnImg} />
					</TouchableOpacity>
				</View>
				<View style={styles.descPanel}>
					<Text style={styles.descText}>Last Played at Skanderborg Festival • 5 days ago</Text>
					<View style={styles.ratingBox}>
						<Text style={styles.ratingNum}>4.5</Text>
						<Text style={styles.star}>★</Text>
					</View>
				</View>
			</View>
		)
	}
}

var styles = StyleSheet.create(require('./style.json'));
