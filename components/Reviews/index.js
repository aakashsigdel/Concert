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


var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/12/reviews?access_token=abcde';
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

        {/*need to change this later*/}
				<Image 
					source={require('../../assets/images/reviewPlaceholder.png')} 
					style={styles.profileImage} />
          
          {/*Calander Component*/}
        <View style={styles.calanderContainer}>
        <View style={[styles.calanderHeader, 
          this.props.calanderHeader && {backgroundColor: 'white'}]}>
            <Text style={[styles.calanderMonth,
              this.props.calanderHeader && {color: 'black'}]}>
              {'sep'.toUpperCase()}
            </Text>
          </View>
          <View style={styles.calanderBody}>
            <Text style={styles.calanderDay}>{17}</Text>
          </View>
        </View>

        {/*Review Details*/}
				<View style={styles.reviewDetails}>

					<View style={styles.starsAndUser}>
            <View style={styles.ratingStars}>
              {this._getStars(Number(review.rating))}
            </View>
            <Image 
            source={require('../../assets/images/userpicCopy.png')}
            style={styles.userImage} />
					</View>
					
					<View style={styles.nameAndComment}>
            <Text style={styles.username}>{review.user.full_name.toUpperCase()}</Text>
            <Text style={styles.comment}>{review.comment}</Text>
					</View>

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
			  renderHeader={this.props.reviewHeader}
				dataSource={this.state.dataSource}
				renderRow={this._renderReview.bind(this)}
				style={styles.listView} />
		)
	}
}

//Reviews.propTypes = { concertId: Reaact.propTypes.string.isRequired };

var styles = StyleSheet.create(require('./style.json'));
