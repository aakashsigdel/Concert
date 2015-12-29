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
import { callOnFetchError } from '../../utils.js';


const USERS_URL = 'http://api.revuzeapp.com:80/api/v1/users/userId/following?access_token=abcde';
const styles = StyleSheet.create(require('./style.json'))

export default class Follows extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      })
    };
  }

  _fetchData() {
    let query_url = '';
    if(this.props.type == 'followers')
      query_url = USERS_URL.replace('following', 'followed-by')  ;
    else
      query_url = USERS_URL;
    query_url = query_url.replace('userId', this.props.userId);
    fetch(query_url)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        apiData: responseData.data,
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      });
    })
    .catch((error) => {
      callOnFetchError(error, query_url);
    }).done();
  }

  componentDidMount () {
    this._fetchData()
  }

  _handlePress(userId) {
    this.props.navigator.push({name: 'profile', index: 7, userId: userId});
  }

  render () {
    return (
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/backIcon@2x.png')}
          mid={this.props.type.toUpperCase()}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.jumpBack()}
        />
        <ListView
          style={styles.listView}
          dataSource={ this.state.dataSource }
          renderRow={(user) =>
            <View
              style={[ styles.listItem, styles.displayAsRow ]}>
              <TouchableHighlight
              onPress={this._handlePress.bind(this, user.id)}
              >
                <View
                  style={styles.displayAsRow}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/userpicCopy.png')}
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
          }>
          </ListView>
        </View>
    )
  }
}
