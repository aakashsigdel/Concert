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
	Dimensions,
	Component
} from 'react-native';
import Loader from '../../components.ios/Loader';


var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id/photos?access_token=abcde';
export default class Photos extends Component {
	constructor(props) {
		super(props);
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

	_calculateImageSize() {
		var IMAGE_PER_ROW = 3;
		var TOTAL_MARGINE_BETWEEN_IMAGES = 3 + 3;
		var {width, height} = Dimensions.get('window');
		var size  = (width - TOTAL_MARGINE_BETWEEN_IMAGES) / IMAGE_PER_ROW;
		return {width: size, height: size};
	}

	_fetchPhotos() {
		var query = QUERY_URL.replace('concert_id', 12);
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					isLoading: false
				});
			}).done();
	}

	_handlePress (photoId) {
    this.props.navigator.push(
      {
        name: 'photo',
        index: 5,
        photoId: photoId,
      }
    );
	}

	_renderPhotoThumbs(photo) {
	  let photoDetails = {
      photoId: photo.id,
	  }
		return(
			<TouchableOpacity
			onPress={this._handlePress.bind(this, photo.id)}
			style={styles.photoThumbContainer}
			>
				<Image source={{uri: photo.image.original}}
					style={[styles.photoThumb, this._calculateImageSize()]} />
			</TouchableOpacity>
		);
	}

	render() {
		if(this.state.isLoading) {
			return <Loader />
		}
		return(
			<ListView
				contentContainerStyle={styles.listView}
				dataSource={this.state.dataSource}
				renderRow={this._renderPhotoThumbs.bind(this)} />
		);
	}
}

//Photos.propTypes = { concertId: React.propTypes.string.isRequired };

var styles = StyleSheet.create(require('./style.json'));
