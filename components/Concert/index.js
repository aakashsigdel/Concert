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

export default class Concert extends Component {
  constructor () {
    super();
    this.state = {
      renderPlaceholder: true,
    };
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholder: false,
      });
    });
  }

  _handelPress() {
    this.props.navigator.pop();
  }

  _renderPlaceHolder () {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
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
        onPress={this._handelPress.bind(this)}
        >
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
                {'sep'.toUpperCase()}
              </Text>
            </View>
            <View style={styles.calanderBody}>
              <Text style={styles.calanderDay}>{17}</Text>
              <Text style={styles.calanderTime}>9 - 11 PM</Text>
            </View>
          </View>

        </View>


        <View style={styles.bottomView}>

          <MapView
          style={styles.mapview}
          />
          <View style={styles.attendBtn}>
            <TouchableHighlight
            underlayColor='#F9A000'
            style={styles.attendTouch} 
            >
              <Text style={styles.attendText}>ATTEND</Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    );
  }
}

