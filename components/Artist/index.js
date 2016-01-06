'use strict'

import React from 'react-native';
import {
  Component,
  Image,
  InteractionManager,
  NativeModules,
  Text,
  View,
} from 'react-native';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Loader from '../../components.ios/Loader';
import Concerts from '../Concerts';
import HeaderBar from '../HeaderBar';
import InternalNavigation from '../InternalNavigation/';
import FAB from '../FAB';
import {
  PHOTOS,
  REVIEWS,
  CONCERTS,
  ARTISTS,
} from '../../constants/ApiUrls';
import {
  getAccessToken,
  callOnFetchError,
} from '../../utils';
import styles from './style.js';

const Share = NativeModules.KDSocialShare;

export default class Artist extends Component {
  constructor() {
    super();

    this.state = {
      activeView:  'Photos',
      artist: null, 
      renderPlaceHolder: true,
    };

    this.optionsForFAB =[
      {
        name: 'Add Review',
        action: () => this.props.navigator.replace({
          name: 'chooseConcert',
          review: true,
          fetchURL: CONCERTS.ARTIST_PAST_URL.replace('{artist_id}', this.props.artistId),
        })
      },
      {
        name: 'Add Photo',
        action: () => this.props.navigator.replace({
          name: 'chooseConcert',
          fetchURL: CONCERTS.ARTIST_PAST_URL.replace('{artist_id}', this.props.artistId),
        })
      },
    ]
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(_ => {
      this._fetchData();
    })
  }

	_sharePhoto () {
	  this.setState({
      isLoading: true,
    });

	  Share.shareOnFacebook({
      'imagelink': this.state.artist.image.large,
    },
    (result) => {
      this.setState({
        isLoading: false,
      });
    });
  }

  _fetchData(){
    getAccessToken()
    .then(access_token => {
      const url = ARTISTS.ARTIST_DETAIL_URL
      .replace('{artist_id}', this.props.artistId)
      .replace('abcde', access_token);

      fetch(url)
      .then(raw => raw.json())
      .then(res => {
        if(res.meta.status === 200){
          this.setState({
            renderPlaceHolder: false,
            artist: res.data,
          });
        }
      })
      .catch(error => {
        callOnFetchError(error, url);
      }).done();
    })

  }

	setActiveView(view) {
		this.setState({
			activeView: view
		});
	}

  _renderHeader() {
    return (
      <View>
        <Image
          source={{uri: this.state.artist.image.large}}
          style={styles.image}
        />
        <View style={styles.descPanel}>
          <Text style={styles.descText}>
            {
              'Last Played at ' 
              + this.state.artist.last_played.location 
              + ' • '
              + this.state.artist.last_played.time.split(',')[0]
              + ' ago.'
            }
          </Text>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingNum}>
              {Number(this.state.artist.last_played.rating || 0).toFixed(1)}
            </Text>
            <Text style={styles.star}>★</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderSectionHeader(){
    return <InternalNavigation 
      setActiveView={this.setActiveView.bind(this)} 
      activeView={this.state.activeView}
    />
  }

  render() {
    if (this.state.renderPlaceHolder)
      return <Loader />
    return(
			<View style={styles.mainContainer}>
        <HeaderBar
          left={require('../../assets/images/backIcon.png')}
          clickableLeft={true}
          clickFunctionLeft={ _=> this.props.navigator.pop()}
          mid={this.state.artist.name}
          clickableRight={true}
          right={require('../../assets/images/shareAlt.png')}
          clickFunctionRight={
            _ => {
              this._sharePhoto();
            }
          }
        />

				{
					(() => {
						switch(this.state.activeView) {
              case 'Photos':
                return <Photos 
                  navigator={this.props.navigator}
                  header={this._renderHeader.bind(this)}
                  sectionHeader={this._renderSectionHeader.bind(this)}
                  concertId={this.props.concertId}
                  fetchURL={PHOTOS.ARTIST_URL.replace('{artist_id}', this.props.artistId)}
                />;
              case 'Reviews':
                return <Reviews 
                  navigator={this.props.navigator}
                  header={this._renderHeader.bind(this)}
                  sectionHeader={this._renderSectionHeader.bind(this)}
                  concertId={this.props.concertId}
                  concertId={this.props.concertId}
                  fetchURL={REVIEWS.ARTIST_URL.replace('{artist_id}', this.props.artistId)}
                />;
              case 'Concerts':
                return <Concerts 
                  calanderHeader={true}
                  header={this._renderHeader.bind(this)}
                  sectionHeader={this._renderSectionHeader.bind(this)}
                  concertId={this.props.concertId}
                  navigator={this.props.navigator}
                  fetchURL={
                    CONCERTS.ARTIST_UPCOMING_URL
                    .replace('{artist_id}', this.props.artistId )}
                />;
						}
					})()
				}

        <FAB 
          navigator={this.props.navigator}
          links={this.optionsForFAB}
        />
			</View>
		);
  }
}

