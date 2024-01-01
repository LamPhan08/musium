import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/colors'

export default styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },

  headerIcon: {
    fontSize: 23,
    color: COLORS.white,
  },

  headerLabel: {
    flex: 1,
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center'
  },

  editBtn: {
    height: 23
  },

  editBtnText: {
    fontFamily: 'Mulish-Bold',
    fontSize: 16
  },
  avatar: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },

  editIcon: {
    color: COLORS.white,
    fontSize: 15,
    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 7,
    backgroundColor: COLORS.primary
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 15,
    color: COLORS.text,
    fontFamily: 'Mulish-Regular'
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.primary,

  },

  label: {
    fontSize: 20,
    flex: 2,
    color: '#fff',
  },

  sheet: {
    backgroundColor: COLORS.headerBlack,
    padding: 16,
    height: 340,
    width: "100%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },

  panel: {
    padding: 20,
    backgroundColor: COLORS.headerBlack,
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

  panelTitle: {
    fontSize: 25,
    color: COLORS.text,
    fontFamily: 'Mulish-Bold',
    height: 35,
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: 'Mulish-Regular',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 15,
    fontFamily: 'Mulish-Bold',
    color: 'white',
  },
})