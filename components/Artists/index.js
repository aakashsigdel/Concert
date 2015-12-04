import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const ARTISTS_URL = 'http://api.revuzeapp.com:80/api/v1/artists/search?name=a&access_token=abcde';
const styles = require('./style.json');

export default class Artists extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      })
    };
  }

  componentDidMount(){
    // this._fetchData();
  }

  _fetchData() {
    fetch(ARTISTS_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
      });
    }).done();
  }

  _renderRow(rowData){
    return(
      <TouchableHighlight>
        <View
          style={styles.row}>

            <Text style={styles.artist_name}>SKO/TORP</Text>
            <Text style={styles.genre}>Pop</Text>
          
          {/* <View></View> */}
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        style={styles.container}
        renderRow={this._renderRow}>
      </ListView>
    )
  }
}
