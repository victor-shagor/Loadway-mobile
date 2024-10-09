import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { appColors } from "@src/constants/colors";
import { ComplaintAPIProps, ComplaintProps } from "@src/models/messaging";
import { ComplaintStateProps } from "./complaints";

interface SearchProps {
  setSearch: (text:string)=> void;
}

const SearchInput = ({ setSearch }: SearchProps) => {

  return (
    <View style={styles.searchInputContainer}>
      <View style={styles.searchInput}>
        <AntDesign
          name="search1"
          size={24}
          color={appColors.lightGray}
          style={{ alignSelf: "center" }}
        />
        <TextInput
          keyboardType={"default"}
          placeholder={"Search"}
          placeholderTextColor={appColors.deepGray}
          onChangeText={(text) => setSearch(text)}
          style={{ flex: 1 }}
        />
      </View>

      <TouchableOpacity>
        <Ionicons name="filter" size={24} color={appColors.lightGray} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 0.9,
    backgroundColor: appColors.gray,
    padding: 8,
    gap: 15,
    minHeight: 56,
    borderRadius: 10,
  },
});

export default SearchInput;
