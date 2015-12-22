// vim: foldlevel=1
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

let VIEWPORT = Dimensions.get('window');

let styles = {
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    backgroundColor: 'black',
    width: VIEWPORT.width,
    top: 64,
    left: 0,
  },
  topView: {
    flex: 1.15, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
	calanderContainer: {
    width: 90,
    height: 109,
		alignItems: 'stretch',
    marginTop: -30
	},
	calanderHeader: {
		backgroundColor: 'white',
    height: 30,
		alignItems: 'center',
	},
	calanderBody: {
    flex: 1,
    backgroundColor: 'black',
		height: 23,
		alignItems: 'center',
		justifyContent: 'center',
    overflow: 'hidden',
	},
	calanderMonth: {
		fontSize: 22.5,
		fontFamily: 'AvenirNext-DemiBold',
		color: 'black',
	},
	calanderDay: {
		fontSize: 45.4,
		color: 'white',
		fontFamily: 'AvenirNext-DemiBold',
	},
  calanderTime: {
    color: 'white',
    marginBottom: 5.5,
    fontSize: 12,
    fontFamily: 'AvenirNext-DemiBold',
  },
  mapview: {
    position: 'absolute',
    height: 300,
    width: VIEWPORT.width,
    bottom: 0,
    left: 0,
  },
  attendBtn: {
    width: 146.5,
    height: 35,
    backgroundColor: '#F9B400',
    borderRadius: 16,
    marginBottom: 19.5,
  },
  attendTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  attendText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'AvenirNext-DemiBold',
  },
  headerContainer: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  clear: {
    width: 23,
    height: 23,
    marginLeft: 15,
  },
  shareAlt: {
    width: 22,
    height: 24,
    marginRight: 15,
  },
  headerArtistContainer: {
    alignItems: 'center'
  },
  headerArtistText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'AvenirNext-DemiBold',
  },
  headerConcertLoaction: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'AvenirNext-DemiBold',
  },
  clickable: {
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default styles = StyleSheet.create(styles);
