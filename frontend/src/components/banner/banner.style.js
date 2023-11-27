import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/colors";

const {width} = Dimensions.get('window')

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
})