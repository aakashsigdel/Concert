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

var QUERY_URL = "http://api.revuzeapp.com:80/api/v1/concerts/past?access_token=abcde";
export default class Concerts extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
			isLoading: true
		};
		this.count = 1;
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData() {
		var query = QUERY_URL;
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					isLoading: false
				});
			}).done();
	}

	_renderConcert(concert) {
		var backgroundStyle = null;
		if(this.count % 2 === 0)
			backgroundStyle = null
		else
			backgroundStyle = styles.lightBackground;
		++this.count;
		return(
			<View style={[styles.concertContainer, backgroundStyle]}>
				<Image source={{uri: concert.artist.image.small}} style={styles.profilePicture} />
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{concert.artist.name}</Text>
					<Text style={styles.location}>{concert.location}</Text>
				</View>
				<View style={styles.calanderContainer}>
        <View style={[styles.calanderHeader, 
          this.props.calanderHeader && {backgroundColor: 'white'}]}>
						<Text style={[styles.calanderMonth,
              this.props.calanderHeader && {color: 'black'}]}>{concert.date.month.toUpperCase()}</Text>
					</View>
					<View style={styles.calanderBody}>
						<Text style={styles.calanderDay}>{concert.date.day}</Text>
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
				dataSource={this.state.dataSource}
				renderRow={this._renderConcert.bind(this)}
				style={styles.listView}	/>
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));
