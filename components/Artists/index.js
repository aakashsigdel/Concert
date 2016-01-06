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
import { callOnFetchError, getAccessToken } from '../../utils.js';

const ARTISTS_URL = 'http://api.revuzeapp.com:80/api/v1/artists/search?name=ab&access_token=abcde';
const styles = require('./style.json');

export default class Artists extends Component {
  constructor(){
    super();
    this.count = 0;
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id
      }),
      apiData: null,
    };
  }

  componentDidMount(){
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
      fetch(query)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          apiData: responseData.data,
        });
      })
      .catch((error) => {
        callOnFetchError(error, query);
      }).done();
    });
  }

  _handlePress(artistId) {
    this.props.navigator.push({name: 'artist', index: 6, artistId: artistId});
  }

  _renderRow(rowData){
    var backgroundStyle = null;
    if(this.count % 2 === 0)
      backgroundStyle = styles.lightBackground;

    this.count += 1;

    return(
      <TouchableHighlight
        onPress={this._handlePress.bind(this, rowData.id)}>
        <View
          style={[styles.row, backgroundStyle]}>
          <Image
            source={{uri:rowData.image.small}}
            style={styles.profile_image}/>
          <View
            style={styles.text_container}>
            <Text style={styles.artist_name}>
              {(()=> {
                if (rowData.name.length > 25)
                  return rowData.name.slice(0,25) + "..."
                return rowData.name
              })()}
            </Text>
            <Text style={styles.genre}>Pop</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    if (this.state.isLoading) return <Loader/>

    return (
      <ListView
        dataSource={this.state.dataSource}
        style={styles.container}
        renderRow={this._renderRow.bind(this)}>
      </ListView>
    )
  }
}
