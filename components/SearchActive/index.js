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
      filterText : "text",
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
                autoFocus={true}
                onChangeText={(text) => this.setState({filterText: text})}
                placeholder="Search and you will find.."
              />
            </View>
          </View>

          <View style={styles.tabBar}>
            <TouchableHighlight
            onPress={this._handlePress.bind(this, 'reviews', 0)}
            >
              <Text style={styles.font}>REVIEWS</Text>
            </TouchableHighlight>
            <TouchableHighlight
            onPress={this._handlePress.bind(this, 'concerts', 1)}
            >
              <Text style={styles.font}>CONCERTS</Text>
            </TouchableHighlight>
            <TouchableHighlight
            onPress={this._handlePress.bind(this, 'artists', 2)}
            >
              <Text style={styles.font}>ARTISTS</Text>
            </TouchableHighlight>
            <TouchableHighlight
            onPress={this._handlePress.bind(this, 'users', 3)}
            >
              <Text style={styles.font}>USERS</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.list}>
            <Navigator
              initialRoute={{name: 'concerts', index: 0}}
              renderScene={this._renderScene.bind(this)}
            />
          </View>
        </View>
      );
  }
}
