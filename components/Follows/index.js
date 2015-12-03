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

const USERS_URL = 'http://api.revuzeapp.com:80/api/v1/users/1/following?access_token=abcde';
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
    fetch(USERS_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        apiData: responseData.data,
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      });
      console.log(responseData.data[0])
    }).done();
  }

  componentDidMount () {
    this._fetchData()
  }

  render () {
    return (
      <View>
        <HeaderBar
          left={require('../../assets/images/backIcon@2x.png')}
          mid="FOLLOWERS"
          clickableLeft={true}
          clickFunctionLeft={ () => {
            try{ this.props.navigator.pop(); } catch (ex) {}
          }}
        />
        <ListView
          style={styles.listView}
          dataSource={ this.state.dataSource }
          renderRow={(user) =>
            <View
              style={[ styles.listItem, styles.displayAsRow ]}>
              <View
                style={styles.displayAsRow}>
                <Image
                  style={styles.image}
                  source={require('../../assets/images/userpicCopy.png')}
                />
                <Text
                  style={styles.text}>
                  {user.full_name.toUpperCase()}
                </Text>
              </View>
              {(
                ()=>{
                  if (user.following === 1){
                    return(
                      <TouchableHighlight
                        style={styles.button}>
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
                            style={[styles.button, styles.follow]}>
                            <Text style={[styles.text, styles.followText]}>
                              ✛   FOLLOW
                            </Text>
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
