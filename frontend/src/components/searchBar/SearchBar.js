import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, View, Keyboard, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from "../../constants/colors";


const SearchBar = ({ searchText, setSearchText, setFocus, handleFind }) => {
  const inputRef = useRef()

  const clearSearchText = () => {
    setSearchText('')

    inputRef.current.clear()
    inputRef.current.focus()
  }

  return (
    <View style={styles.searchBarcontainer}>
      <Ionicons
        name="search"
        style={styles.searchIcon}
      />
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Bạn muốn nghe gì?"
        value={searchText}
        onFocus={() => setFocus(false)}
        placeholderTextColor={COLORS.grey}
        onChangeText={text => setSearchText(text)}
        cursorColor={COLORS.primary}
        textAlignVertical='center'
        returnKeyType="search"
        onSubmitEditing={handleFind}
      />

      {searchText !== '' && 
        <TouchableOpacity>
          <Entypo name="cross" style={styles.crossIcon} onPress={clearSearchText} />
        </TouchableOpacity>
      }
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBarcontainer: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: COLORS.lightBlack,
    paddingHorizontal: 10,
    gap: 5,
    flex: 1
  },

  searchIcon: {
    fontSize: 18,
    color: COLORS.grey
  },

  input: {
    fontFamily: 'Mulish-Regular',
    color: COLORS.text,
    flex: 1,
    height: 40,
    fontSize: 13,
  },

  crossIcon: {
    fontSize: 22,
    color: COLORS.grey,
  }
});