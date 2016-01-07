import {
  Dimensions,
  StyleSheet,
} from 'react-native';
const VIEWPORT = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      top: 0,
      width: VIEWPORT.width,
      height: VIEWPORT.height,
      backgroundColor: 'rgba(17,17,17,0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },

    top: {
      flex: 1,
      justifyContent: 'center',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: 320,
    },

    bottom: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 0,

      borderWidth: 1,
      borderColor: 'rgba(134, 113, 75, 0.4)',
      width: 320,
      flex: 0.3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    alert_box: {
      borderRadius: 10,
      width: 320,
      backgroundColor: 'rgb(246, 166, 9)',
      height: 200,
      alignItems: 'center',
    },

    left: {
      justifyContent: 'center',
      borderRightColor: 'rgba(134, 113, 75, 0.4)',
      borderRightWidth: 1,
      height: 45,
      flex: 1,
      alignItems: 'center',
    },

    right: {
      justifyContent: 'center',
      flex: 1,
    },

    text: {
      textAlign: 'center',
      color: 'white',
      fontSize: 19,
      fontFamily: 'AvenirNext-Medium',
    }
})
