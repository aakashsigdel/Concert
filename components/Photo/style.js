import {
  Dimensions,
  StyleSheet,
} from 'react-native';

let VIEWPORT = Dimensions.get('window');
let styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topView: {
    flex: 1.65,
  },
  bottomView: {
    flex: 1,
		backgroundColor: '#1C1C1C',
  },
  mainPhoto: {
    flex: 1,
  },
  photoDetail: {
    position: 'absolute',
    bottom: 0,
    width: VIEWPORT.width,
    height: 50,
    backgroundColor: 'rgba(17, 17, 17, 0.5)',
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
  },
  concertName: {
    color: 'white',
    marginLeft: 27.8,
    fontSize: 11,
    fontWeight: 'bold',
		fontFamily: 'AvenirNext-DemiBold'
  },
  userAndLikes: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7.5,
  },
  profileImage: {
    borderWidth: 1,
    borderColor: 'rgb(249, 180, 0)',
    borderRadius: 22,
    height: 45,
    width: 45,
    marginLeft: 15,
    marginRight: 11,
  },
  userName: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'AvenirNext-DemiBold',
    fontWeight: 'bold',
  },
  likes: {
    flex: 1,
  },
  likeCount: {
    color: 'white',
    opacity: 0.8,
    fontSize: 9,
    fontFamily: 'AvenirNext-Regular',
    marginTop: 6.5,
  },
  caption: {
    color: 'white',
    marginTop: 10.5,
    fontSize: 12,
    fontFamily: 'AvenirNext-Regular',
    lineHeight: 16,
    paddingLeft: 15,
  },

  likeImage: {
    width: 30,
    height: 27.5,
  },
}

export default StyleSheet.create(styles);
