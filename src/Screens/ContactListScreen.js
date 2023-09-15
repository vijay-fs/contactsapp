import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteContactRequest, getContactsList } from "../../actions"; // Import necessary actions from the actions file
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Avatar, Icon } from "@rneui/base";

const ContactListScreen = ({ route }) => {
  const navigation = useNavigation(); // Get the navigation object for navigating between screens
  const isFocused = useIsFocused(); // Check if the screen is currently focused
  const dispatch = useDispatch(); // Get access to the Redux dispatch function to trigger actions
  const contacts = useSelector((state) => state.getContacts.contacts); // Get the contacts from the Redux store

  useEffect(() => {
    // Use useEffect to trigger actions when the component mounts or when it is focused
    dispatch(getContactsList()); // Dispatch the action to fetch contacts when the component mounts or is focused
  }, [isFocused]); // Depend on isFocused so that the action is re-triggered when the screen becomes focused again

  const renderItem = ({ item }) => (
    // Render each contact item in the list
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        // Navigate to the ContactDetails screen when an item is pressed and pass the contact information as a parameter
        navigation.navigate("ContactDetails", { contact: item });
      }}
    >
      <Avatar
        size={32}
        rounded
        source={{
          uri: item.profilePicture
            ? `data:image/jpeg;base64,${item.profilePicture}`
            : "https://randomuser.me/api/portraits/men/36.jpg",
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {item.phone}
        </Text>
      </View>
      <Icon name="more-vert" style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Contact List</Text>
        {contacts.length === 0 ? (
          // Show an activity indicator while contacts are loading
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        ) : (
          // Render the FlatList with contacts when available
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddContact")} // Navigate to the AddContact screen when the button is pressed
        style={{ position: "absolute", bottom: 40, right: 20 }}
      >
        <Icon
          name="add"
          size={28}
          style={{ padding: 10 }}
          iconStyle={{ color: "white" }}
          backgroundColor={"#9315fa"}
          borderRadius={50}
        />
      </TouchableOpacity>
    </>
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
  },
  loadingIndicator: {
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 24,
    color: "#9315fa",
  },
});
