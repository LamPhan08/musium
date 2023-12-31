import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center'
  },

  noSongsWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  musicIcon: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: COLORS.lightBlack,
    fontSize: 30,
    color: COLORS.grey
  },

  noSongs: {
    fontFamily: 'Mulish-Bold',
    color: COLORS.grey,
    fontSize: 15
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },

  headerIcon: {
    fontSize: 23,
    color: COLORS.white
  },

  headerLabel: {
    flex: 1,
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center'
  },

  invisibleView: {
    width: 23,
    height: 23,
  },

  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },

  playAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  playIcon: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    color: COLORS.white,
    fontSize: 20,
  },

  all: {
    fontFamily: 'Mulish-Bold',
    color: COLORS.text,
  },

  searchIcon: {
    fontSize: 22,
    color: COLORS.grey
  },

  songList: {
    paddingHorizontal: 15
  }
})