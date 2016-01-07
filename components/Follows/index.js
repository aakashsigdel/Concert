'use strict'

import React from 'react-native';
import {
	ListView,
	View,
	Image,
	Text,
	ActivityIndicatorIOS,
	StyleSheet,
	TouchableHighlight,
	Component
} from 'react-native';
import HeaderBar from '../HeaderBar';
import Reviews from '../Reviews';
import {
  callOnFetchError,
  getAccessToken,
} from '../../utils.js';
import { USER } from '../../constants/ApiUrls.js';

const styles = StyleSheet.create(require('./style.json'))
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.following !== r2.following })
const RefreshableListView = require('react-native-refreshable-listview');

export default class Follows extends Component {
  constructor() {
    super()
    this.state = {
      apiData: [],
      dataSource: ds.cloneWithRows([]),
    };
  }

  _fetchData() {
    return new Promise((resolve, reject) => {
      getAccessToken().then( access_token =>{
        let query_url = (this.props.type === 'followers') ?  USER.FOLLOWED_BY_URL: USER.FOLLOWING_URL;

        query_url = query_url
        .replace('{user_id}', this.props.userId)
        .replace('abcde', access_token);

        fetch(query_url)
        .then((response) => response.json())
        .then((responseData) => {
          this.state.apiData = responseData.data;
          this.setState({
            dataSource: ds.cloneWithRows(this.state.apiData),
          });
          resolve(responseData.data);
        })
        .catch((error) => {
          reject(error)
          callOnFetchError(error, query_url);
        }).done();
      })
    })
  }

  componentDidMount () {
    this._fetchData()
  }

  _handlePress(userId) {
    this.props.navigator.push({name: 'profile', index: 7, userId: userId});
  }

  _renderPresentationalFollow(id, shouldFollow){
    const refreshedData = this.state.apiData.map( user => {
      if (user.id === id) user.following = shouldFollow ? 1 : 0;
      return user;
    })
    this.setState({
      dataSource: ds.cloneWithRows(refreshedData),
    })
  }

  _followPress ( id, shouldFollow ) {
    this._renderPresentationalFollow(id, shouldFollow);

    getAccessToken().then( access_token => {
      let query = shouldFollow
        ? USER.FOLLOW_URL.replace('{user_id}', id)
        : USER.UNFOLLOW_URL.replace('{user_id}', id);

      query = query.replace('abcde', access_token); 
      fetch(query, {method: 'POST'})
      .then(r => r.json())
      .then(response => {
        if (! response.success)
          this._renderPresentationalFollow(id, !shouldFollow)
      })
      .catch( error => {
        this._renderPresentationalFollow(id, !shouldFollow);
        callOnFetchError(error, query);
      }).done();
    })
  }

  _renderRow(user){
    return <View
      style={[ styles.listItem, styles.displayAsRow ]}>
      <TouchableHighlight
        onPress={this._handlePress.bind(this, user.id)}
        >
        <View
          style={styles.displayAsRow}>
          <Image
            style={styles.image}
            source={
              user.profile_picture.trim().length > 0
                ? {uri: user.profile_picture}
                : require('../../assets/images/user_default.png')
            }
          />
          <Text
            style={styles.text}>
            {
              (() => {
                if(user.full_name.length < 15)
                  return user.full_name.toUpperCase();
                else
                  return user.full_name.toUpperCase().slice(0, 15) + '...';
              })()
            }
          </Text>
        </View>
      </TouchableHighlight>
      {(
        ()=>{
          if (user.following === 1){
            return(
              <TouchableHighlight
                onPress={this._followPress.bind(this, user.id, false)}
                style={[styles.button, styles.right]}>
                <View
                  style={styles.displayAsRow}>
                  <Image
                    style={styles.doneImage}
                    source={require('../../assets/images/done_colored.png')}/>
                  <Text style={[styles.text, styles.followText, { color: 'rgb(249,180,0)' }]}>
                    FOLLOWING
                  </Text>
                </View>
              </TouchableHighlight>
              )
          }
          else {
            return(
              <TouchableHighlight
                onPress={this._followPress.bind(this, user.id, true)}
                style={[styles.button, styles.follow, styles.right]}>
                <View
                  style={styles.displayAsRow}>
                  <Image 
                    style={{
                      marginRight: 12.5,
                    }}
                    source={require('../../assets/images/add.png')}/>
                  <Text style={[styles.text, styles.followText]}>
                    FOLLOW
                  </Text>
                </View>
              </TouchableHighlight>
              )  
          }
        }

      )()}
    </View>
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/backIcon@2x.png')}
          mid={this.props.type.toUpperCase()}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.replace({
            name: 'profile',
            userId: this.props.userId,
            userName: this.props.userName,
          })}
        />
        <RefreshableListView
          style={styles.listView}
          loadData={this._fetchData.bind(this)}
          dataSource={ this.state.dataSource }
          renderRow={this._renderRow.bind(this) }
        />
      </View>
    )
  }
}
