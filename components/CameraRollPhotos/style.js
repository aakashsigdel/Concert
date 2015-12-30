'use strict';

import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const VIEWPORT = Dimensions.get('window');

let styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: VIEWPORT.width / 3.2,
    height: VIEWPORT.width / 3.2,
    margin: 3,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
}

export default styles = StyleSheet.create(styles);
