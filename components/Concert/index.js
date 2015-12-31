'use strict'

import React from 'react-native';
import {
  Component,
  Image,
  InteractionManager,
  MapView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import styles from './style';
import { CONCERTS } from '../../constants/ApiUrls.js'
import {
  serializeJSON,
  callOnFetchError,
  getAccessToken,
} from '../../utils.js'

export default class Concert extends Component {
  constructor () {
    super();
    this.state = {
      renderPlaceholder: true,
    };
  }

  componentDidMount () {
    console.log(this.props.concert, this.props.concertId, 'props');
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholder: false,
        concert: this.props.concert,
        toggleAttending: this.props.toggleAttending,
      });
    })
  }

  _handlePress() {
    this.props.navigator.pop();
  }

  _renderPlaceHolder () {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
  }

  _renderPresentationalAttend(c){
    console.log('was ', )
    this.setState({
      concert: Object.assign({}, this.state.concert, {checked_in: c})
    })
  }

  _attendConcert(){
    getAccessToken().then( access_token => {
      const url = CONCERTS.CHECKINURL
      .replace('{concert_id}', this.props.concertId)
      .replace('abcde', access_token);

      console.log('before', this.state)
      const params = { checkin: this.state.concert.checked_in === 1 ? 0 : 1 };

      let c = this.state.concert.checked_in === 0? 1 : 0;
      this._renderPresentationalAttend(c);

      fetch(
        url,
        { 
          method: 'POST',
          json: true,
          body: serializeJSON(params)
        }
      ).then( res => {
        console.log(url, params, res);
        this.props.toggleAttending(this.props.concertId, c);
        if(!res.ok)
          this._renderPresentationalAttend(c === 0? 1 : 0)
      })
      .catch((error) => {
        this._renderPresentationalAttend(c === 0? 1 : 0)
        callOnFetchError(error);
      }).done();
    } )
  }

  render () {
    if(this.state.renderPlaceholder)
      return this._renderPlaceHolder();
    return (
      <View style={styles.container}>

        <Image
          source={{uri:this.state.concert.artist.image.original}}
          style={styles.backgroundImage}
        />

      {/* headerbar should be here*/}
      <View style={styles.headerContainer}>
        <TouchableHighlight
          style={styles.clickable}
          onPress={this._handlePress.bind(this)}>
          <Image
            source={require('../../assets/images/clearCopy.png')}
            style={styles.clear}
          />
        </TouchableHighlight>

        <View style={styles.headerArtistContainer}>
          <Text style={styles.headerArtistText}>
            {
              (() => {
                if(this.props.concert.artist.name.length < 15)
                  return this.props.concert.artist.name.toUpperCase();
                return this.props.concert.artist.name.slice(0, 15).toUpperCase() + '...';
              })()
            }
          </Text>
          <Text style={styles.headerConcertLoaction}>
            { this.props.concert.location.toUpperCase() }
          </Text>
        </View>

        <Image
          source={require('../../assets/images/shareAlt.png')}
          style={styles.shareAlt}
        />
      </View>

      {/*Calander module*/}
      <View style={styles.topView}>

        <View style={styles.calanderContainer}>
          <View style={styles.calanderHeader}>
            <Text style={styles.calanderMonth}>
              {this.state.concert.date.month.toUpperCase()}
            </Text>
          </View>
          <View style={styles.calanderBody}>
            <Text style={styles.calanderDay}>{this.state.concert.date.day}</Text>
            {/* <Text style={styles.calanderTime}>9 - 11 PM</Text> */}
          </View>
        </View>

      </View>


      <View style={styles.bottomView}>

        <MapView
          style={styles.mapview}
        />
        <TouchableOpacity
          onPress={this._attendConcert.bind(this)}
          activeOpacity={0.6}
          underlayColor='#F9A000'
          style={[styles.attendBtn, 
            this.state.concert.checked_in === 1  ? styles.attending : null
          ]} 
          >
          <View style={styles.attendTouch}>
            {
              this.state.concert.checked_in === 1 ? 
              <Image
                style={styles.doneImage}
                source={require('../../assets/images/done_colored.png')}/>
              : null
            }
              <Text style={[styles.attendText, 
                this.state.concert.checked_in === 1  ? styles.attendingText : null
              ]}>
              {this.state.concert.checked_in === 1 ? 'ATTENDING' : 'ATTEND'}
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
    );
  }
}

