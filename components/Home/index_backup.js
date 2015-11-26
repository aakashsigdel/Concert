'use strict'
import React from 'react-native';

import {
  Component,
  Dimensions,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Concerts from '../Concerts';
import Loader from '../../components.ios/Loader';

var QUERY_URL = 'http://api.revuzeapp.com:80/api/v1/concerts/concert_id/reviews?access_token=abcde';
export default class Home extends Component {
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
		var query = QUERY_URL.replace('concert_id', '12');
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

  _renderHotReviews(review) {
    return(
      <View style={styles.listItemConcert}>
        <Image style={styles.listItemConcertImage}
          source={{uri: review.user.profile_picture}} />
        <Text style={styles.listItemConcertName}>{review.user.full_name.toUpperCase()}</Text>
        <View style={styles.listItemConcertratingStars}>
          {this._getStars(Number(review.rating))}
        </View>
      </View>
    );
  }

  _handelPress() {
    this.props.navigator.push({
      name: 'search_active',
      index: 2,
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.reviewContainer}>
          <View style={styles.title}>
            <Text style={styles.subTitle}>HOT REVIEW</Text>
            <TouchableHighlight>
              <Text style={styles.seeAllLink}>SEE ALL</Text>
            </TouchableHighlight>
          </View>
          {
            (() => {
              if(this.state.isLoading)
               return  <Loader />;
              return (
                  <View style={styles.carousel}>
                    <ListView
                      horizontal={true}
                      dataSource={this.state.dataSource}
                      renderRow={this._renderHotReviews.bind(this)} />
                  </View>
              );
            })()
          }
        </View>
        <View style={styles.concertContainer}>
          <View style={styles.title}>
            <Text style={styles.subTitle}>UPCOMMING CONCERTS</Text>
            <TouchableHighlight
              onPress={this._handelPress.bind(this)}
            >
              <Text style={styles.seeAllLink}>SEE ALL</Text>
            </TouchableHighlight>
          </View>
            <Concerts 
            calanderHeader={true}
            navigator={this.props.navigator}
            />
        </View>
      </View>
    );
  }  
}

var styles = StyleSheet.create(require('./style.json'));
