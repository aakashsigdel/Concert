'use strict'

import React from 'react-native';
import {
	View,
	ListView,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicatorIOS,
	Dimensions,
	Component
} from 'react-native';
import Loader from '../../components.ios/Loader';
import styles from './style.js';
import {
  callOnFetchError,
  getAccessToken,
} from '../../utils.js';
const deviceWidth = Dimensions.get('window').width;
const RefreshableListView = require('react-native-refreshable-listview');
const Events = require('react-native-simple-events');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id != r2.id });

export default class Photos extends Component {
	constructor(props) {
		super(props);
		this.state = {
      dataSource: ds.cloneWithRows([]),
      isLoading: true,
      apiData: []
		};
	}

	componentDidMount() {
		this._fetchPhotos();
    Events.on(
      'RELOAD',
      'RELOAD_ID',
      data => {
        const newData = this.state.apiData.filter(photo => photo.id !== data.id); // filter
        this.setState({
          isLoading: false,
          apiData: newData,
          dataSource: ds.cloneWithRows(newData)
        })
      }
    )
	}

	_calculateImageSize() {
		var IMAGE_PER_ROW = 3;
		var TOTAL_MARGINE_BETWEEN_IMAGES = 3 + 3;
		var {width, height} = Dimensions.get('window');
		var size  = (width - TOTAL_MARGINE_BETWEEN_IMAGES) / IMAGE_PER_ROW;
		return {width: size, height: size};
	}

	_fetchPhotos() {
    return new Promise ( (resolve, reject) => {
      getAccessToken().then( access_token =>{
        this.setState({isLoading: true})
        let query = this.props.fetchURL
        .replace('abcde', access_token);
        fetch(query)
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.data.length === 0)
            responseData.data = [{id: 0}];
          this.setState({
            dataSource: ds.cloneWithRows(responseData.data),
            isLoading: false,
            apiData: responseData.data,
          });
          resolve(responseData.data);
        })
        .catch((error) => {
          this.setState({isLoading: true})
          callOnFetchError(error, query);
          reject(error);
        }).done();
      } )
    })
	}

	_handlePress (photoId) {
    this.props.navigator.push(
      {
        name: 'photo',
        index: 5,
        photoId: photoId,
      }
    );
	}

	_renderPhotoThumbs(photo) {
    // Render No data if Id is 0
    if (photo.id === 0){
      return (
        <View style={
          {
            marginTop: 10,
            backgroundColor: '#1C1C1C',
            marginLeft: deviceWidth / 2 - deviceWidth / 4,
          }
        }>
          <Text style={{fontSize: 20, color: 'grey', fontStyle: 'italic'}}> 
            No Data to Display
          </Text>
        </View>
      )
    }
	  let photoDetails = {
      photoId: photo.id,
	  }
		return(
			<TouchableOpacity
			onPress={this._handlePress.bind(this, photo.id)}
			style={styles.photoThumbContainer}
			>
				<Image source={{uri: photo.image.small}}
					style={[styles.photoThumb, this._calculateImageSize()]} />
			</TouchableOpacity>
		);
	}

	render() {
		if(this.state.isLoading) {
      return <Loader 
        loadingMessage='Loading Photos...'
      />
		}
		return(
			<RefreshableListView
				contentContainerStyle={styles.listView}
				style={{backgroundColor: '#1C1C1C'}}
				dataSource={this.state.dataSource}
        renderHeaderWrapper={this.props.header}
        renderSectionHeader={this.props.sectionHeader || null}
        loadData={this._fetchPhotos.bind(this)}
				renderRow={this._renderPhotoThumbs.bind(this)} />
		);
	}
}

//Photos.propTypes = { concertId: React.propTypes.string.isRequired };

