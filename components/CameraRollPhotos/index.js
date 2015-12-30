'use strict';

import React, {
  CameraRoll,
  Component,
  Image,
  InteractionManager,
  ListView,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBar from '../HeaderBar';
import styles from './style';

export default class CameraRollPhotos extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.node.image.uri !== row2.node.image.uri
      }),
      renderPlaceholder: true,
    };
  }

  componentDidMount () {
    this._getPhotosFromCameraRoll();
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholder: false,
      });
    });
  }

  _getPhotosFromCameraRoll () {
    CameraRoll.getPhotos(
      {first: this.props.batchSize},
      (data) => {
        console.log(data);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.edges),
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }

  _selectPhoto (edge) {
    console.log(edge);
    this.props.navigator.push({
      name: 'addReview',
      imageData: edge.node,
      concertId: this.props.concertId,
      review: this.props.review,
    });
  }

  _renderPhotosRow (edge) {
    console.log('renderPhotosRow', edge);
    return (
      <TouchableOpacity style={styles.rowContainer}
        activeOpacity={0.7}
        onPress={this._selectPhoto.bind(this, edge)}
        >
        <Image
          source={{uri: edge.node.image.uri}}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }

  _renderPlaceHolder() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}></View>
    );
  }

  render () {
    if (this.state.renderPlaceholder)
      return this._renderPlaceHolder();
    return (
      <View style={styles.container}>
        <HeaderBar
          left={require('../../assets/images/clearCopy.png')}
          clickableLeft={true}
          clickFunctionLeft={() => this.props.navigator.pop()} 
          mid="Camera Roll"
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderPhotosRow.bind(this)}
          contentContainerStyle={styles.listView}
        />
      </View>
    );
  }
}

CameraRollPhotos.propTypes = {
  batchSize: React.PropTypes.number.isRequired,
};

CameraRollPhotos.defaultProps = {
    batchSize: 1000,
};
