'use strict'

import React from 'react-native';
import{
  Component,
  Image,
  ListView,
  Navigator,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Concerts from '../Concerts'
import InternalNavigation from '../InternalNavigation';
import Photos from '../Photos';
import Reviews from '../Reviews';
import Home from '../Home';
import Users from '../Users';
import Artists from '../Artists';

const styles = StyleSheet.create(require('./style.json'));

export default class SearchActive extends Component {
  constructor() {
    super()
    this.navigator = null;
    this.state = {
      filterText : 'text',
      activeView: 'reviews',
      reviewSearchText: '',
      concertSearchText: '',
      artistsSearchText: '',
      usersSearchText: '',
    };
  }

  _renderScene (route, navigator)  {
    this.navigator = navigator;
	  switch(route.name) {
      case 'reviews' :
        return (
          <Reviews 
          filterText={this.state.filterText} 
          navigator={this.props.navigator}
          />
        );
      case 'concerts' :
        return(
          <Concerts 
            calanderHeader={true} 
            filterText={this.state.filterText} 
            navigator={this.props.navigator} 
          /> 
        );
      case 'users':
        return (
          <Users
          filterText={this.state.filterText}
          navigator={this.props.navigator}
          />
        );
      case 'artists':
        return (
          <Artists
          filterText={this.state.filterText} 
          navigator={this.props.navigator} 
          />
        );
      default:
        return (
          <Artists/>
        );
    }
  }

  _handlePress(name, index) {
    this.navigator.push({name: name, index: index});
    this.setState({
      activeView: name,
    })
  }

  render() {
    return (
        <View style={styles.container} >
          <View style={styles.header} >
            <View style={styles.inputContainer}>
              <Image
                source={require('../../assets/images/search_icon.png')}
                style={styles.searchIcon}
              />
              <TextInput 
                style={styles.inputBox}
                onChangeText={(text) => this.setState({filterText: text})}
                placeholder="Search and you will find.."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>
          </View>

          <View style={styles.tabBar}>
            <TouchableHighlight
              onPress={this._handlePress.bind(this, 'reviews', 0)}>
              {(() => {
                console.log('activeview', this.state.activeView);
                if (this.state.activeView == 'reviews')
                  return <Text style={[styles.font, styles.active]}>REVIEWS</Text>
                else
                  return <Text style={styles.font}>REVIEWS</Text>
              })()}
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._handlePress.bind(this, 'concerts', 1)}>
              {(() => {
                if (this.state.activeView == 'concerts')
                  return <Text style={[styles.font, styles.active]}>CONCERTS</Text>
                else
                  return <Text style={styles.font}>CONCERTS</Text>
              })()}
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._handlePress.bind(this, 'artists', 2)}>
              {(() => {
                if (this.state.activeView == 'artists')
                  return <Text style={[styles.font, styles.active]}>ARTISTS</Text>
                else
                  return <Text style={styles.font}>ARTISTS</Text>
              })()}
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._handlePress.bind(this, 'users', 3)}>
              {(() => {
                if (this.state.activeView == 'users')
                  return <Text style={[styles.font, styles.active]}>USERS</Text>
                else
                  return <Text style={styles.font}>USERS</Text>
              })()}

            </TouchableHighlight>
          </View>

          <View style={styles.list}>
            <Navigator
              initialRoute={{name: 'concerts', index: 0}}
              renderScene={this._renderScene.bind(this)}
              configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
            />
          </View>
        </View>
      );
  }
}
