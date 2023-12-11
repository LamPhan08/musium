import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import  Feather from "react-native-vector-icons/Feather";
import  Entypo from "react-native-vector-icons/Entypo";


const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={
          !props.clicked
            ? styles.searchBar__unclicked
            : styles.searchBar__clicked
        }
      >
        <Feather
          name="search"
          size={18}
          color="black"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
          onFocus={() => {
            props.setClicked(true);
          }}
        />
        
        {props.clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              props.setSearchPhrase("")
              props.setClicked(false);
              Keyboard.dismiss();
             
          }}/>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: "center",
    width: "90%",
  },
  searchBar__unclicked: {
    paddingRight:20,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 25,
    alignItems: "center",
  },
  searchBar__clicked: {
    paddingRight:20,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 25,
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "85%",
  },
});