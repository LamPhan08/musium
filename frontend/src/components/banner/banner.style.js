import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const {width, height} = Dimensions.get('window')

export default styles = StyleSheet.create({
  bannerContainer: {
    // marginHorizontal: 15,
    marginBottom: 35
  },

  title: {
    fontFamily: 'Mulish-ExtraBold',
    color: COLORS.text,
    fontSize: 20,
    marginBottom: 12
  },
  
  flatList: {
    borderRadius: 10,
    overflow: 'hidden'
  },

  bannerItem: {
    // marginHorizontal: 1
  },

  bannerImage: {
    height: 200,
    width: width - 30,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'grey',
    borderRadius: 50,
    marginHorizontal: 5,
  },

  popupModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  optionWrapper: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: COLORS.lightBlack,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: height / 2 - (height * 0.5) / 2,
    left: width / 2 - (width * 0.8) / 2,
    paddingVertical: 20
  },

  bannerSongThumbnail: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 8
  },

  bannerSongTitle: {
    marginTop: 20,
    fontFamily: 'Mulish-Bold',
    color: COLORS.text,
    fontSize: 16
  },

  bannerSongArtistsNames: {
    marginTop: 5,
    fontFamily: 'Mulish-Regular',
    color: COLORS.grey,
    fontSize: 13,
    flex: 1
  },

  btn: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 20,
    marginTop: 10
  },

  playSongBtnIcon: {
    fontSize: 18,
    color: COLORS.white,
  },

  btnText: {
    fontFamily: 'Mulish-Bold',
    fontSize: 14
  },

  backBtn: {
    marginTop: 20,
    alignItems: 'center'
  },

  backBtnText: {
    fontFamily: 'Mulish-Regular',
    fontSize: 14
  }
})