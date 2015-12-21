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


var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/12/reviews?access_token=abcde';
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
        let that = this;
        let filteredData = this.state.apiData.filter(function(item, index){
          return (item.user.full_name.toLowerCase().indexOf(that.props.filterText.toLowerCase()) !== -1);
        });
        if(filteredData.length === 0) {
          filterData = this.state.dataSource.cloneWithRows({user: {full_name: 'Nothing To Show'}});
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(filteredData),
        });
    }
  }

	_fetchData() {
		var query = QUERY_URL.replace('concert_id', this.props.concertId);
		fetch(query)
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.data),
				isLoading: false,
        apiData: responseData.data,
			});
		}).done();
	}

	// this function sholud be in a global module
	_getStars(yellowStars) {
		var stars = [];
		for(var i = 0; i < yellowStars; i++) {
			stars.push(
			  <Image
			    key={100 - i}
          source={require('../../assets/images/star_yellow.png')}
          style={styles.yellowStar}
			  />
			);
		}
		for(var i = 0; i < (5 - yellowStars); i++) {
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

	_handelPress() {
    this.props.navigator.push({name: 'review', index: 4});
    // InteractionManager.runAfterInteractions(() => {
    //   alert('hello');
    //   this.props.navigator.push({name: 'review', index: 4});
    // })
	}

	_renderReview(review) {
		return(
			<TouchableOpacity
			activeOpacity={0.5}
			onPress={this._handelPress.bind(this)}
			>
        <View style={styles.reviewContainer}>

          {/*need to change this later*/}
          <Image 
            source={require('../../assets/images/reviewPlaceholder.png')} 
            style={styles.profileImage} />
            
            {/*calendar Component*/}
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <Text style={styles.calendarMonth}>
                  {'sep'.toUpperCase()}
                </Text>
              </View>
              <View style={styles.calendarBody}>
                <Text style={styles.calendarDay}>{17}</Text>
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

var styles = StyleSheet.create(require('./style.json'));
