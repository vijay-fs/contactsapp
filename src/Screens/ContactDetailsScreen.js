import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { updateContactRequest, deleteContactRequest } from "../../actions"; // Import the necessary actions from the actions file
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Input } from "@rneui/themed";
import { Chip } from "@rneui/base";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const ContactDetailsScreen = ({ route }) => {
  const dispatch = useDispatch(); // Get access to the Redux dispatch function
  const navigation = useNavigation(); // Get the navigation object for navigating between screens
  const { contact } = route.params; // Extract the contact object from route params
  const [editMode, setEditMode] = useState(false); // State for controlling edit mode
  const [updatedName, setUpdatedName] = useState(contact.name); // State for updated name
  const [updatedPhone, setUpdatedPhone] = useState(contact.phone); // State for updated phone
  const [updatedEmail, setUpdatedEmail] = useState(contact.email); // State for updated email
  const [updatedImage, setUpdatedImage] = useState(contact.profilePicture); // State for updated image
  const [hasPermission, setHasPermission] = useState(null); // State to track camera permission
  const [errorName, setErrorName] = useState(false); // State to track name validation
  const [errorPhone, setErrorPhone] = useState(false); // State to track phone validation
  const [errorEmail, setErrorEmail] = useState(false); // State to track email validation

  const handleUpdateContact = () => {
    // Create an updated contact object with the new data
    if (
      !errorEmail &&
      !errorName &&
      !errorPhone &&
      updatedName &&
      updatedPhone &&
      updatedEmail
    ) {
      const updatedContact = {
        name: updatedName,
        phone: updatedPhone,
        email: updatedEmail,
        profilePicture: updatedImage,
      };

      // Dispatch the action to update the contact
      dispatch(updateContactRequest(contact._id, updatedContact));
      navigation.navigate("ContactList"); // Navigate to the ContactList screen after updating the contact
      setEditMode(false); // Exit edit mode
    } else {
      Alert.alert("Please enter valid data"); // Show an alert for invalid data
    }
  };

  const handleDeleteContact = () => {
    // Dispatch the action to delete the contact
    dispatch(deleteContactRequest(contact._id));
    // Navigate to the Contacts Screen
    navigation.navigate("ContactList");
  };

  const EditContact = () => {
    setEditMode(true); // Enable edit mode
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access your photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true, // Capture the selected image as base64
    });

    if (!result.cancelled) {
      setUpdatedImage(result.assets[0].base64); // Set the selected image as base64
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      {editMode ? (
        <View
          style={{
            elevation: 10,
            backgroundColor: "white",
            padding: 20,
            paddingHorizontal: 40,
            borderRadius: 20,
          }}
        >
          {updatedImage ? (
            <TouchableOpacity onPress={openImagePicker}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${updatedImage}`,
                }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  alignSelf: "center",
                  marginBottom: 60,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={openImagePicker}
              style={{
                backgroundColor: "#9315fa",
                padding: 15,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                width: 200,
                alignSelf: "center",
                height: 200,
                marginBottom: 60,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Add Image
              </Text>
            </TouchableOpacity>
          )}
          <Input
            label="Name"
            value={updatedName}
            onChangeText={(text) => {
              setUpdatedName(text);
              const regex = /^[a-zA-Z ]*$/;
              if (!regex.test(text)) {
                setErrorName(true);
              } else {
                setErrorName(false);
              }
            }}
            maxLength={30}
            inputContainerStyle={{
              borderColor: "grey",
            }}
            inputStyle={{
              fontSize: 16,
            }}
            errorMessage={errorName ? "Please enter a valid name" : ""}
          />
          <Input
            label="Mobile Number"
            value={updatedPhone}
            onChangeText={(text) => {
              setUpdatedPhone(text);
              const regex = /^[0-9]*$/;
              if (!regex.test(text)) {
                setErrorPhone(true);
              } else {
                setErrorPhone(false);
              }
            }}
            maxLength={10}
            inputContainerStyle={{
              borderColor: "grey",
            }}
            inputStyle={{
              fontSize: 16,
            }}
            errorMessage={errorPhone ? "Please enter a valid phone number" : ""}
          />
          <Input
            label="Email"
            value={updatedEmail}
            onChangeText={(text) => {
              setUpdatedEmail(text);
              const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
              if (!regex.test(text)) {
                setErrorEmail(true);
              } else {
                setErrorEmail(false);
              }
            }}
            inputContainerStyle={{
              borderColor: "grey",
            }}
            inputStyle={{
              fontSize: 16,
            }}
            errorMessage={errorEmail ? "Please enter a valid email" : ""}
          />
        </View>
      ) : (
        <View
          style={{
            elevation: 10,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Image
            source={{
              uri: contact.profilePicture
                ? `data:image/jpeg;base64,${contact.profilePicture}`
                : "https://randomuser.me/api/portraits/men/36.jpg",
            }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              alignSelf: "center",
              marginBottom: 60,
            }}
          />
          <View>
            <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: "600" }}>
              Name :{" "}
              <Text
                style={{ fontSize: 13, marginBottom: 10, fontWeight: "400" }}
              >
                {contact.name}{" "}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: "600" }}>
              Mobile Number :{" "}
              <Text
                style={{ fontSize: 13, marginBottom: 10, fontWeight: "400" }}
              >
                {contact.phone}
              </Text>
            </Text>
            <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: "600" }}>
              Email :{" "}
              <Text
                style={{ fontSize: 13, marginBottom: 10, fontWeight: "400" }}
              >
                {contact.email}
              </Text>
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          gap: 20,
        }}
      >
        <Chip
          onPress={editMode ? handleUpdateContact : EditContact}
          title={editMode ? "Save" : "Edit"}
          icon={{
            name: editMode ? "save" : "edit",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          color={"#9315fa"}
          iconRight
          containerStyle={{
            marginVertical: 15,
            width: 100,
          }}
        />

        {!editMode && (
          <Chip
            onPress={handleDeleteContact}
            title={"Delete"}
            icon={{
              name: "trash",
              type: "font-awesome",
              size: 20,
              color: "white",
            }}
            color={"#F44336"}
            iconRight
            containerStyle={{
              marginVertical: 15,
              width: 100,
            }}
          />
        )}
      </View>
      <Chip
        onPress={
          () => navigation.navigate("BusinessCardScanner") // Navigate to the BusinessCardScanner screen when the button is pressed
        }
        title="Business Card Scanner"
        icon={{
          name: "address-card",
          type: "font-awesome",
          size: 20,
          color: "white",
        }}
        color={"#9315fa"}
        iconRight
        containerStyle={{
          marginVertical: 15,
          width: "60%",
          alignSelf: "center",
        }}
      />
    </ScrollView>
  );
};

export default ContactDetailsScreen;
