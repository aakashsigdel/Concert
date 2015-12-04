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
        let that = this;
        let filteredData = this.state.apiData.filter(function(item, index){
          return (item.full_name.toLowerCase().indexOf(that.props.filterText.toLowerCase()) !== -1);
        });
        if(filteredData.length === 0) {
          filterData = this.state.dataSource.cloneWithRows({full_name: 'Nothing To Show'});
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(filteredData),
        });
    }
  }

  _fetchData() {
    fetch(USERS_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        apiData: responseData.data,
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
        isLoading: false,
      });
    }).done();
  }

  _handelGlobalNavPress(name, index, userId) {
    this.props.navigator.push({name: name, index: index, userId: userId});
  }

  _renderRow (rowData) {
    return(
      <TouchableHighlight
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
