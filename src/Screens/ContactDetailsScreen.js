import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { updateContactRequest, deleteContactRequest } from "../../actions";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";

const ContactDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { contact } = route.params;
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(contact.name);
  const [updatedPhone, setUpdatedPhone] = useState(contact.phone);
  const [updatedEmail, setUpdatedEmail] = useState(contact.email);
  const [updatedImage, setUpdatedImage] = useState(contact.profilePicture);
  console.log(contact._id, "contact details");
  const handleUpdateContact = () => {
    // Create an updated contact object with the new data
    const updatedContact = {
      name: "updatedName",
      phone: "8943849400",
      email: "Vmail@yopmail.com",
      profilePicture: updatedImage,
    };

    // Dispatch the action to update the contact
    dispatch(updateContactRequest(contact._id, updatedContact));
    navigation.navigate("ContactList");
    setEditMode(false);
  };

  const handleDeleteContact = () => {
    // Dispatch the action to delete the contact
    dispatch(deleteContactRequest(contact._id));
    // Navigate to the Contacts Screen
    navigation.navigate("ContactList");
  };
  const EditContact = () => {
    setEditMode(true);
  };

  return (
    <View>
      <Text>Contact Details Screen</Text>
      <Text>{contact.name}</Text>
      <Text>{contact.phone}</Text>
      <Text>{contact.email}</Text>
      <Image
        source={{ uri: `data:image/jpeg;base64,${contact.profilePicture}` }}
        style={{ width: 200, height: 200 }}
      />

      {editMode ? (
        <Button title="Update" onPress={handleUpdateContact} />
      ) : (
        <Button title="Edit" onPress={EditContact} />
      )}
      <Button title="Delete" onPress={handleDeleteContact} />
    </View>
  );
};

export default ContactDetailsScreen;
