import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, View, Keyboard, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from "../../constants/colors";
import styles from './searchBar.style'

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