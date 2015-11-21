'use strict'

import React from 'react-native';
import {
	ListView,
	View,
	Image,
	Text,
	ActivityIndicatorIOS,
	StyleSheet,
	Component
} from 'react-native';
import Loader from '../../components.ios/Loader';


var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id/reviews?access_token=abcde';
export default class Reviews extends Component {
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
		this._fetchData();
	}

	_fetchData() {
		var query = QUERY_URL.replace('concert_id', this.props.concertId);
		fetch(query)
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.data),
				isLoading: false
			});
		}).done();
	}

	// this function sholud be in a global module
	_getStars(yellowStars) {
		var stars = [];
		for(var i = 0; i < yellowStars; i++) {
			stars.push(<Text style={styles.yellowStar}>★</Text>);
		}
		for(var i = 0; i < (5 - yellowStars); i++) {
			stars.push(<Text style={styles.whiteStar}>★</Text>);
		}
		return stars;
	}

	_renderReview(review) {
		return(
			<View style={styles.reviewContainer}>
				<Image 
					source={{uri: review.user.profile_picture}} 
					style={styles.profileImage} />
				<View style={styles.reviewDetails}>
					<View style={styles.ratingStars}>
						{this._getStars(Number(review.rating))}
					</View>
					<Text style={styles.username}>{review.user.full_name.toUpperCase()}</Text>
					<Text style={styles.locAndTime}>
						{'Kathmandu Festival ● ' + review.date.split(',')[0] + ' ago'}
					</Text>
					<Text style={styles.comment}>{review.comment}</Text>
				</View>
			</View>
		);
	}

	render() {
		if(this.state.isLoading) {
			return <Loader />;
		}
		return(
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderReview.bind(this)}
				style={styles.listView} />
		)
	}
}

//Reviews.propTypes = { concertId: Reaact.propTypes.string.isRequired };

var styles = StyleSheet.create(require('./style.json'));
