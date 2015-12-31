'use strict'

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Loader from '../../components.ios/Loader';
import {
  callOnFetchError,
  getAccessToken,
} from '../../utils.js';
import { USERS } from '../../constants/ApiUrls';


const USERS_URL = 'http://api.revuzeapp.com:80/api/v1/users/1/following?access_token=abcde';
export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }),
      isLoading: true,
      apiData: null,
    };
  }

  componentDidMount() {
    this._fetchData();
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
    getAccessToken().then( access_token => {
      let query = this.props.fetchURL.replace('abcde', access_token);
      console.log(query);
      fetch(query)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          apiData: responseData.data,
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          isLoading: false,
        });
      })
      .catch((error) => {
        callOnFetchError(error, query);
      }).done();
    })
  }

  _handelGlobalNavPress(name, index, userId, userName) {
    this.props.navigator.push({
        name: name,
        index: index,
        userId: userId,
        userName: userName,
        fetchURL: USERS.USER_DETAIL_URL.replace('{user_id}', userId),
      });
  }

  _renderRow (rowData) {
    return(
      <TouchableHighlight
      onPress={this._handelGlobalNavPress.bind(this, 'profile', 3, rowData.id, rowData.full_name)}
      >
        <View style={styles.listItem}>
          <Image
            source={
              rowData.profile_picture.trim().length > 0
              ? {uri: rowData.profile_picture}
              : require('../../assets/images/user_default.png')
            }
          style={styles.listImage}
          />
          <Text
          style={styles.listText}>
            {rowData.full_name.toUpperCase()}
          </Text> 
        </View>
      </TouchableHighlight>
    );
  }

  render () {
    if(this.state.isLoading)
      return <Loader />;
    return (
      <ListView
        dataSource={this.state.dataSource}
        style={styles.listView}
        renderRow={this._renderRow.bind(this)} />

    );
  }
}

let styles = StyleSheet.create(require('./style.json'));
