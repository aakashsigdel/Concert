'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Image,
	InteractionManager,
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Loader from '../../components.ios/Loader';
import Calander from '../Calander';
import { callOnFetchError } from '../../utils.js';



let QUERY_URL = {
  latest: 'http://api.revuzeapp.com:80/api/v1/reviews/latest?access_token=abcde',
  concertId: 'http://api.revuzeapp.com:80/api/v1/concerts/12/reviews?access_token=abcde',
  userId: 'http://api.revuzeapp.com:80/api/v1/users/userId/reviews?access_token=abcde'
}
export default class Reviews extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
			isLoading: true,
      apiData: null,
		};
	}

	componentDidMount() {
		this._fetchData();
	}

  componentDidUpdate(prevProps) {
    if (this.props.filterText 
       && (prevProps.filterText !== this.props.filterText) 
       && (!this.state.isLoading)
       && (this.state.apiData)) {
         this._fetchData();
    }
  }

  _fetchData() {
    let query = this.props.fetchURL;
    fetch(query)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
        isLoading: false,
        apiData: responseData.data,
      });
    })
    .catch((error) => {
      callOnFetchError(error, query);
    }).done();
  }

	// this function sholud be in a global module
	_getStars(yellowStars) {
		let stars = [];
		for(let i = 0; i < yellowStars; i++) {
			stars.push(
			  <Image
			    key={100 - i}
          source={require('../../assets/images/star_yellow.png')}
          style={styles.yellowStar}
			  />
			);
		}
		for(let i = 0; i < (5 - yellowStars); i++) {
			stars.push(
			  <Image
			    key={i}
          source={require('../../assets/images/star_white.png')}
          style={styles.whiteStar}
			  />
			);
		}
		return stars;
	}

	_handlePress(review) {
    this.props.navigator.push({
      name: 'review', 
      review_id: review.id
    });
	}

	_renderReview(review) {
    // artist image if there is no review image
    console.log(review)
		let image = review.image ? review.image : review.concert.artist.image
		return(
			<TouchableOpacity
        activeOpacity={0.5}
        onPress={this._handlePress.bind(this, review)}
			>
        <View style={styles.reviewContainer}>

          {/*need to change this later*/}
          <Image 
            source={{uri: image.original}}
            style={styles.profileImage} />
            
            {/*calendar Component*/}
            <View style={styles.calendarContainer}>
              <Calander 
                month="sep"
                day={17}
              />
            </View>

          {/*Review Details*/}
          <View style={styles.reviewDetails}>

            <View style={styles.starsAndUser}>
              <View style={styles.ratingStars}>
                {this._getStars(Number(review.rating))}
              </View>
              <Image 
              source={require('../../assets/images/user_default.png')}
              style={styles.userImage} />
            </View>
            
            <View style={styles.nameAndComment}>
              <Text style={styles.username}>
                {
                  (() => {
                    if(this.props.fetchFor === 'concert')
                      return review.user.full_name.toUpperCase()
                    else if(this.props.fetchFor === 'user')
                      return this.props.userName.toUpperCase()
                    else if(this.props.fetchFor === 'latest')
                      return review.user.full_name.toUpperCase()
                    else
                      return review.user.full_name.toUpperCase()
                  })()
                }
              </Text>
              <Text style={styles.comment}>{review.comment}</Text>
            </View>

          </View>

        </View>
    </TouchableOpacity>
		);
	}

	render() {
		if(this.state.isLoading) {
			return <Loader />;
		}
		return(
			<ListView
        renderSectionHeader={this.props.sectionHeader}
        renderHeader={this.props.header}
				dataSource={this.state.dataSource}
				renderRow={this._renderReview.bind(this)}
				style={[styles.listView, this.props.styles]} />
		)
	}
}

const styles = StyleSheet.create(require('./style.json'));
