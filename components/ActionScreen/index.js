'use strict'
import React, {
  View,
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create(require('./style.json'));
import HeaderBar from '../HeaderBar';

export default class ActionScreen extends Component {
  constructor(){
    super();
    this.rows = [];
  }

  _populateRows() {
    console.log('here in the populaterows', this.props.links);
    this.props.links.map((child) => {
      this.rows.push(
        <TouchableHighlight
          style={styles.row}
          onPress={() => console.log(child, ' pressed')}>
          <Text style={styles.text}>{child}</Text>
        </TouchableHighlight>
      )
    })
  }

  render() {
    this._populateRows();
    return(
      <View style={styles.superContainer}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()}
        />
        <View style={styles.container}>
          {this.rows.map((row) => row)}
        </View>
      </View>
    )
  }
}
