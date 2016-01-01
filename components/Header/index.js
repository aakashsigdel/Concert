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
import Loader from '../../components.ios/Loader';
import {
  callOnFetchError,
  getAccessToken,
} from '../../utils.js';

let QUERY_URL = `http://api.revuzeapp.com:80/api/v1/concerts/concert_id?access_token=abcde`;
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
    getAccessToken().then( access_token => {
      let query = QUERY_URL
      .replace('concert_id', this.props.concertId)
      .replace('abcde', access_token);

      fetch(query)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          concertData: responseData,
          isLoading: false
        });
      })
      .catch((error) => {
        callOnFetchError(error, query);
      }).done();
    } )
  }

	_handelPress() {
	  this.props.navigator.pop();
	}

	render() {
		if(this.state.isLoading) {
			return <Loader />;
		}
		return(
			<View style={styles.headerContainer}>
				<Image 
					source={{uri: this.state.concertData.data.artist.image.original}} 
					style={[styles.titleImage, this._calculateImageSize()]} />
				<View style={styles.titleContainer}>
					<TouchableOpacity
					style={styles.navBtn}
          onPress={this._handelPress.bind(this)}
					>
						<Image
						source={require('../../assets/images/backIcon.png')}
						style={styles.navBtnImg} />
					</TouchableOpacity>
					<Text style={styles.titleText}>
						{
						  (() => {
						    if(this.state.concertData.data.artist.name.length < 20)
                  return this.state.concertData.data.artist.name.toUpperCase()
                else
                  return this.state.concertData.data.artist.name.toUpperCase().slice(0, 20) + '...';
						  })()
						}
					</Text>
					<TouchableOpacity style={styles.shareBtn}>
						<Image
						source={require('../../assets/images/shareAlt.png')}
						style={styles.shareBtnImg} />
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
