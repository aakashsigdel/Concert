'use strict';

import React, {
  CameraRoll,
  Component,
  Image,
  ListView,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';

export default class CameraRollPhotos extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.node.image.uri !== row2.node.image.uri
      }),
    };
  }

  componentDidMount () {
    this._getPhotosFromCameraRoll();
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

  _selectPhoto () {

  }

  _renderPhotosRow (edge) {
    console.log('renderPhotosRow', edge);
    return (
      <TouchableOpacity style={styles.rowContainer}
        activeOpacity={0.7}
        onPress={this._selectPhoto.bind(this)}
        >
        <Image
          source={{uri: edge.node.image.uri}}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderPhotosRow.bind(this)}
        contentContainerStyle={styles.listView}
      />
    );
  }
}

CameraRollPhotos.propTypes = {
  batchSize: React.PropTypes.number.isRequired,
};

CameraRollPhotos.defaultProps = {
    batchSize: 50,
};
