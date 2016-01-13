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
import {
  callOnFetchError,
  getAccessToken,
  DataFactory,
} from '../../utils.js';

const Events = require('react-native-simple-events'),
      RefreshableListView = require('react-native-refreshable-listview'),
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id != r2.id}),
      styles = require('./style');

export default class Reviews extends Component {
	constructor() {
		super();
		this.state = {
      dataSource: ds.cloneWithRows([]),
			isLoading: true,
      apiData: {},
		};
	}

	componentDidMount() {
    this._fetchData();
    Events.on(
      'RELOAD',
      'RELOAD_ID',
      data => {
        this.setState({isLoading: true});
        let newData = this.state.apiData.filter(row => row.id != data.id);
        if(newData.length === 0)
          newData = [{id: 0}];
        this.setState({
          isLoading: false,
          apiData: newData,
          dataSource: ds.cloneWithRows(newData)
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
    const p = new Promise((resolve, reject) => {
      getAccessToken().then( access_token =>{
        this.setState({isLoading: true});
        let query = this.props.fetchURL
        .replace('abcde', access_token);

        fetch(query)
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.data.length === 0)
            responseData.data = [{id: 0}];
          this.setState({
            dataSource: ds.cloneWithRows(responseData.data),
            isLoading: false,
            apiData: responseData.data,
          });
          resolve(responseData.data);
        })
        .catch((error) => {
          callOnFetchError(error, query);
          reject(error);
        }).done();
      } )
    })
    return p;
  }

  _toggleAttending(id){
    this.state.responseData.data.filter(item => item.id === id)
  }

	// this function sholud be in a global module
	_getStars(yellowStars) {
    switch(yellowStars) {
      case 0: 
        return <Image
          style={styles.star}
          source={require('../../assets/images/0star.png')}
        />
      case 1:
        return <Image
          style={styles.star}
          source={require('../../assets/images/1star.png')}
        />
      case 2:
        return <Image
          style={styles.star}
          source={require('../../assets/images/2star.png')}
        />
      case 3:
        return <Image
          style={styles.star}
          source={require('../../assets/images/3star.png')}
        />
      case 4:
        return <Image
          style={styles.star}
          source={require('../../assets/images/4star.png')}
        />
      case 5:
        return <Image
          style={styles.star}
          source={require('../../assets/images/5star.png')}
        />
      default:
        return <Image
          style={styles.star}
          source={require('../../assets/images/5star.png')}
        />
    }
	}

	_handlePress(review) {
    this.props.navigator.push({
      name: 'review', 
      review_id: review.id
    });
	}

	_renderReview(review) {
    // Render No data if Id is 0
    if (review.id === 0){
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
    // artist image if there is no review image
		let image = review.image ? review.image : review.concert.artist.image
		return(
			<TouchableOpacity
        activeOpacity={0.5}
        onPress={this._handlePress.bind(this, review)}
			>
        <View style={styles.reviewContainer}>

          {/*need to change this later*/}
          <Image 
            source={{uri: image.small}}
            style={styles.profileImage} />
            
            {/*calendar Component*/}
            <View style={styles.calendarContainer}>
              <Calander 
                month={review.concert.date.month.toUpperCase()}
                day={review.concert.date.day}
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
                    else if(this.props.userName)
                      return this.props.userName.toUpperCase()
                    else
                      return review.user.full_name.toUpperCase()
                  })()
                }
              </Text>
              <Text style={styles.comment}>
                {
                  review.comment.lenth < 40 ? review.comment : review.comment.slice(0, 40)
                }
              </Text>
            </View>

          </View>

        </View>
    </TouchableOpacity>
		);
	}

	render() {
		if(this.state.isLoading) {
      return <Loader 
        loadingMessage="Loading Reviews..."
      />;
		}
		return(
      <RefreshableListView
        renderSectionHeader={this.props.sectionHeader}
				dataSource={this.state.dataSource}
        renderHeaderWrapper={this.props.header}
        loadData={this._fetchData.bind(this)}
				renderRow={this._renderReview.bind(this)}
				scrollRenderAheadDistance={50}
				style={[styles.listView, this.props.styles]} />
		)
	}
}
