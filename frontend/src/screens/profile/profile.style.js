import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
  darkenView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  userWrapper: {
    paddingTop: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  avatar: {
    borderRadius: 100,
    width: 80,
    height: 80,
  },

  usernameWrapper: {
    flex: 1,
    gap: 10
  },

  username: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 18,
    color: COLORS.text,
  },

  hello: {
    fontFamily: 'Mulish-Regular',
    fontSize: 13
  },

  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },

  profileActionText: {
    fontSize: 14,
    color: COLORS.text,
    fontFamily: 'Mulish-Bold'
  },

  editProfileIcon: {
    fontSize: 14,
    color: COLORS.white
  },

  profile: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: 150
  },

  libraryWrapper: {
    marginTop: 30,
    paddingHorizontal: 15,
    gap: 10,
  },

  heading: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
    color: COLORS.text
  },

  libraryItem: {
    width: 160,
    height: 100,
    borderRadius: 5,
    backgroundColor: COLORS.lightBlack,
    padding: 15,
    justifyContent: 'space-between'
  },

  libraryItemText: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Mulish-Bold'
  },

  myPlaylistWrapper: {
    marginTop: 30,
    paddingHorizontal: 15
  },

  addPlaylistBtn: {
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  addIconWrapper: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.lightBlack,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  addIcon: {
    fontSize: 25,
    color: COLORS.white
  },

  textWrapper: {
    gap: 5
  },  

  addPlaylistBtnText: {
    fontFamily: 'Mulish-Bold',
    color: COLORS.text,
    fontSize: 15
  },

  toolTip: {
    fontFamily: 'Mulish-Regular',
    fontSize: 13,
    color: COLORS.grey
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  }
})