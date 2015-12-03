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

const styles = StyleSheet.create(require('./style.json'));
const navBtn = "http://aakashsigdel.github.io/Concert/navBtn.png";
const USERS_URL = 'http://api.revuzeapp.com:80/api/v1/users/1/following?access_token=abcde';

export default class SearchActive extends Component {
  constructor() {
    super()
    this.navigator = null;
    this.state = {
      filterText : "text",
      navigator: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      })
    };
  }

  componentDidMount () {
    this._fetchData();
  }

  _fetchData() {
    fetch(USERS_URL)
    .then((response) => response.json())
    .then((responseData) => {
      const names = responseData.data.map((user) => user)
      this.setState({
        apiData: responseData.data,
        dataSource: this.state.dataSource.cloneWithRows(names),
      });
      console.log(responseData)
    }).done();
  }

  _renderScene (route, navigator)  {
    this.navigator = navigator;
	  switch(route.name) {
      case 'reviews' :
        return (
          <Reviews />
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
          <ListView
            dataSource={this.state.dataSource}
            style={styles.listView}
            renderRow={(rowData) =>{ 
              console.log('dommy', rowData);
              return(<TouchableHighlight
              onPress={this._handelGlobalNavPress.bind(this, 'profile', 3, rowData.id)}
              >
                <View style={styles.listItem}>
                  <Image
                    source={require('../../assets/images/userpicCopy.png')}
                    style={styles.listImage}
                  />
                  <Text
                    style={styles.listText}>
                    {rowData.full_name.toUpperCase()}
                  </Text> 
                </View>
              </TouchableHighlight>)}
            }>
          </ListView>
        );
      case 'artists':
        return (
          <View></View>
        );
      default:
        return (
          <View></View>
        );
    }
  }

  _handlePress(name, index) {
    this.navigator.push({name: name, index: index});
  }

  _handelGlobalNavPress(name, index, userId) {
    this.props.navigator.push({name: name, index: index, userId: userId});
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
