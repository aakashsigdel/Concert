'use strict'

import React from 'react-native';
import {
	View,
	ListView,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicatorIOS,
	ScrollView,
	Component
} from 'react-native';


var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id/photos?access_token=abcde';
export default class Photos extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
			isLoading: true
		};
	}

	componentDidMount() {
		this._fetchPhotos();
	}

	_fetchPhotos() {
		var query = QUERY_URL.replace('concert_id', '12');
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				console.log(responseData);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					isLoading: false
				});
			}).done();
	}

	_renderPhotoThumbs(photo) {
		return(
			<TouchableOpacity style={styles.photoThumbContainer}>
				<Image source={{uri: photo.image.original}}
					style={styles.photoThumb} />
			</TouchableOpacity>
		);
	}

	render() {
		if(this.state.isLoading) {
			return(
				<View style={styles.loadingContainer}>
					<ActivityIndicatorIOS
						hidden='true'
						size='large' />
					<Text style={styles.loadingText}>Loading...</Text>
				</View>
			);
		}
		return(
			<ListView
				contentContainerStyle={styles.listView}
				dataSource={this.state.dataSource}
				renderRow={this._renderPhotoThumbs} />
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));
