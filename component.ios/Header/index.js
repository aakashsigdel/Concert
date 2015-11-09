'use strict'

import React from 'react-native'
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ActivityIndicatorIOS,
	Component,
	Dimensions,
} from 'react-native';

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id?access_token=abcde';
export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			concertData: null,
			isLoading: true
		};
	}

	componentDidMount() {
		this._fetchData();
	}

	_calculateImageSize() {
		var {width, height} = Dimensions.get('window');
		var size = height - (height / 2.28);
		return {width: width, height: size};
	}

	_fetchData() {
		var query = QUERY_URL.replace('concert_id', 12);
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					concertData: responseData,
					isLoading: false
				});
			});
	}

	render() {
		if(this.state.isLoading) {
			return(
				<View style={styles.loadingContainer}>
					<ActivityIndicatorIOS
						hidden="true"
						size="large" />
					<Text style={styles.loadingText}>Loading...</Text>
				</View>
			);
		}
		console.log(this.state.concertData, "aakash sigdel is very good");
		return(
			<View style={styles.headerContainer}>
				<Image 
					source={{uri: this.state.concertData.data.artist.image.original}} 
					style={[styles.titleImage, this._calculateImageSize()]} />
				<View style={styles.titleContainer}>
					<TouchableOpacity style={styles.navBtn}>
						<Image source={require('image!navBtn')} style={styles.navBtnImg} />
					</TouchableOpacity>
					<Text style={styles.titleText}>
						{this.state.concertData.data.artist.name.toUpperCase()}
					</Text>
					<TouchableOpacity style={styles.shareBtn}>
						<Image source={require('image!share')} style={styles.shareBtnImg} />
					</TouchableOpacity>
				</View>
				<View style={styles.descPanel}>
					<Text style={styles.descText}>
						{'Last Played at ' + this.state.concertData.data.location + ' • 5 days ago'}
					</Text>
					<View style={styles.ratingBox}>
						<Text style={styles.ratingNum}>
							{Number(this.state.concertData.data.rating).toFixed(1)}
						</Text>
						<Text style={styles.star}>★</Text>
					</View>
				</View>
			</View>
		)
	}
}

var styles = StyleSheet.create(require('./style.json'));
