'use strict'

import React from 'react-native';
import {
	ListView,
	View,
	Image,
	Text,
	ActivityIndicatorIOS,
	StyleSheet,
	TouchableHighlight,
	Component
} from 'react-native';
import Header from '../Header';
import InternalNavigation from '../InternalNavigation';
import Photos from '../Photos';
import Reviews from '../Reviews';

var QUERY_URL = "http://api.revuzeapp.com:80/api/v1/concerts/past?access_token=abcde";
export default class Concerts extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1.id !== row2.id
			}),
      isLoading: true,
      apiData: null,
		};
		this.count = 1;
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
          return (item.artist.name.toLowerCase().indexOf(that.props.filterText.toLowerCase()) !== -1);
        });
        if(filteredData.length === 0) {
          filterData = this.state.dataSource.cloneWithRows({artist: {name: 'Nothing To Show'}});
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(filteredData),
        });
    }
  }

	_fetchData() {
		var query = QUERY_URL;
		fetch(query)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
          isLoading: false,
          apiData: responseData.data,
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
				});
			}).done();
	}
	
	_handelPress(concertId) {
    this.props.navigator.push({
      name: "concert",
      index: 3,
      concertId: concertId,
    });
	}

	_renderConcert(concert) {
		var backgroundStyle = null;
		if(this.count % 2 === 0)
			backgroundStyle = null
		else
			backgroundStyle = styles.lightBackground;
		++this.count;
		return(
		  <TouchableHighlight
		  onPress={this._handelPress.bind(this, concert.id)}
      >
        <View style={[styles.concertContainer, backgroundStyle]}>
          <Image source={{uri: concert.artist.image.small}} style={styles.profilePicture} />
          <View style={styles.detailContainer}>
            <Text style={styles.title}>
            {
              (() => {
                if(concert.artist.name.length > 15)
                  return concert.artist.name.slice(0, 15) + '...';
                else 
                  return concert.artist.name
              })().toUpperCase()
            }
            </Text>
            <Text style={styles.location}>{concert.location}</Text>
          </View>
          <View style={styles.calanderContainer}>
          <View style={[styles.calanderHeader, 
            this.props.calanderHeader && {backgroundColor: 'white'}]}>
              <Text style={[styles.calanderMonth,
                this.props.calanderHeader && {color: 'black'}]}>
                {concert.date.month.toUpperCase()}
              </Text>
            </View>
            <View style={styles.calanderBody}>
              <Text style={styles.calanderDay}>{concert.date.day}</Text>
            </View>
          </View>
        </View>	
      </TouchableHighlight>
		);
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
		return(
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderConcert.bind(this)}
				style={styles.listView}	/>
		);
	}
}

var styles = StyleSheet.create(require('./style.json'));