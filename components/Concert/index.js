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
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import styles from './style';
import { CONCERTS } from '../../constants/ApiUrls.js'

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

  _attendConcert(){
    const url = CONCERTS.CHECKINURL.replace('{concert_id}', this.props.concertId);
    fetch(url, {method: 'POST'}).then( res => {
      console.log(url, res);
      res.ok ? alert('Sucess!') : alert('Nope!')
    })
  }

  render () {
    if(this.state.renderPlaceholder)
      return this._renderPlaceHolder();
    return (
      <View style={styles.container}>

        <Image
          source={require('../../assets/images/background_crowd.png')}
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
        <View style={styles.attendBtn}>
          <TouchableHighlight
            onPress={this._attendConcert.bind(this)}
            underlayColor='#F9A000'
            style={styles.attendTouch} 
            >
            <Text style={styles.attendText}>
              {this.state.concert.checked_in === 1 ? '√ ATTENDING' : 'ATTEND'}
            </Text>
          </TouchableHighlight>
        </View>

      </View>
    </View>
    );
  }
}

