'use strict'

import React from 'react-native';
import {
	ActivityIndicatorIOS,
	Component,
	Image,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';
import InternalNavigation from '../InternalNavigation';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Events from 'react-native-simple-events';
import {
  callOnFetchError,
  getAccessToken,
} from '../../utils.js';
const RefreshableListView = require('react-native-refreshable-listview');
const ds = new ListView.DataSource({ rowHasChanged:  (r1, r2) => r1 != r2 }); 

export default class Concerts extends Component {
	constructor() {
		super();
		this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
      apiData: null,
		};
		this.count = 1;
	}

	componentDidMount() {
		this._fetchData();
    Events.on(
      'UPDATE_CONCERTS',
      'UPDATE_CONCERTS_LISTENER',
      eventData => {
        let newData = this.state.apiData.filter(concert => concert.id != eventData.concert.id);
        if(newData.length === 0)
          newData = [{id: 0}];
        this.setState({
          dataSource: ds.cloneWithRows(newData),
          apiData: newData
        })
      }
    )
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
    return new Promise( (resolve, reject) => {
      getAccessToken().then( access_token => {
        let query = this.props.fetchURL.replace('abcde', access_token);
        this.setState({isLoading: true});
        fetch(query)
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.data.length === 0)
            responseData.data = [{id: 0}];
          this.setState({
            isLoading: false,
            apiData: responseData.data,
            dataSource: ds.cloneWithRows(responseData.data),
          });
          resolve(responseData.data);
        })
        .catch((error) => {
          callOnFetchError(error, query);
          reject(error);
        }).done();
      })
    });
	}
	
	_handlePress(concertId, concert) {
	  if(this.props.select) {
      if (this.props.review) {
        this.props.navigator.push({
          name: 'addReview',
          index: 55,
          concertId: concertId,
          review: this.props.review,
        });
      } else {
        this.props.navigator.push({
          name: 'camera',
          index: 42,
          concertId: concertId,
          review: this.props.review,
        });
      }
    } else {
      this.props.navigator.push({
        name: "concert",
        index: 3,
        concertId: concertId,
        toggleAttending: this._toggleAttending.bind(this),
        concert: concert,
      });
    }
	}

	_renderConcert(concert) {
    // Render No data if Id is 0
    if (concert.id === 0){
      return (
        <View style={
          {
            flex: 1,
            marginTop: 10,
            backgroundColor: '#1C1C1C',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }>
          <Text style={{fontSize: 20, color: 'grey', fontStyle: 'italic'}}> 
            No Data to Display
          </Text>
        </View>
      )
    }
		var backgroundStyle = null;
		if(this.count % 2 === 0)
			backgroundStyle = null
		else
			backgroundStyle = styles.lightBackground;
		++this.count;
		return(
		  <TouchableHighlight
		  onPress={this._handlePress.bind(this, concert.id, concert)}
      >
        <View style={[styles.concertContainer, backgroundStyle]}>
          <Image source={{uri: concert.artist.image.small }} style={styles.profilePicture} />
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

  _toggleAttending(id, c){
    this.state.apiData.filter(c => c.id == id)[0].checked_in = c;
    this.setState();
  }

	render() {
		if(this.state.isLoading) {
			return(
				<View style={styles.loadingContainer}>
					<ActivityIndicatorIOS
						hidden="true"
						size="large" />
					<Text style={styles.loadingText}>Loading Concerts...</Text>
				</View>
			);
		}
		return(
      <View style={styles.container}>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this._renderConcert.bind(this)}
          renderHeaderWrapper={this.props.header}
          loadData={this._fetchData.bind(this)}
          renderSectionHeader={this.props.sectionHeader}
          style={styles.listView}	/>
      </View>
		);
	}
}

const styles = StyleSheet.create(require('./style.json'));
