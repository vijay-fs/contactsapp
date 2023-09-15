import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { addContactRequest } from "../../actions"; // Import the necessary actions from the actions file
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Chip, Image, Input } from "@rneui/base";

const AddContactScreen = (props) => {
  const navigation = useNavigation(); // Get the navigation object for navigating between screens
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  useEffect(() => {
    // Request camera permissions when the component mounts
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openCamera = async () => {
    if (!hasPermission) {
      // Show an alert if camera permission is not granted
      Alert.alert(
        "Camera Permission",
        "Camera permission is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true, // Capture the image as base64
    });

    if (result.canceled) {
      return;
    }

    setImageBase64(result.assets[0].base64); // Set the captured image as base64
  };

  const addContact = () => {
    // Basic input validation
    if (errorName || errorPhone || errorEmail || !name || !phone || !email) {
      // Show appropriate error messages for invalid input
      errorEmail || errorName || errorPhone
        ? Alert.alert("Validation Error", "Please enter a valid phone number")
        : Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    } else {
      setErrorName(false);
      setErrorPhone(false);
      setErrorEmail(false);

      // Create a contactData object with the input values
      const contactData = {
        name: name,
        phone: phone,
        email: email,
        profilePicture: imageBase64,
      };

      // Dispatch the action to add a contact
      props.dispatch(addContactRequest(contactData));
      navigation.navigate("ContactList"); // Navigate to the ContactList screen after adding the contact
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Add Contact</Text>
        <View style={styles.imageContainer}>
          {imageBase64 ? (
            <TouchableOpacity
              onPress={openCamera}
              style={styles.touchableImageContainer}
            >
              <Image
                source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
                style={styles.image}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={openCamera}
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
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                Add Image
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Input
          label="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            const regex = /^[a-zA-Z ]*$/;
            if (!regex.test(text)) {
              setErrorName(true);
            } else {
              setErrorName(false);
            }
          }}
          inputMode="text"
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
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            const regex = /^[0-9]*$/;
            if (!regex.test(text)) {
              setErrorPhone(true);
            } else {
              setErrorPhone(false);
            }
          }}
          keyboardType="phone-pad"
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
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
            if (!regex.test(text)) {
              setErrorEmail(true);
            } else {
              setErrorEmail(false);
            }
          }}
          keyboardType="email-address"
          inputContainerStyle={{
            borderColor: "grey",
          }}
          inputStyle={{
            fontSize: 16,
          }}
          errorMessage={errorEmail ? "Please enter a valid email" : ""}
        />

        <Chip
          onPress={addContact}
          title="Add Contact"
          icon={{
            name: "save",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          color={"#9315fa"}
          iconRight
          containerStyle={{
            marginVertical: 15,
            width: "40%",
            alignSelf: "center",
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center", // Center align the image horizontally
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 12,
    marginBottom: 24,
  },
  touchableImageContainer: {
    alignItems: "center", // Center align the content horizontally
    justifyContent: "center", // Center align the content vertically
    borderColor: "#9315fa", // Border color when not pressed
    borderWidth: 2, // Border width when not pressed
    borderRadius: 100, // Rounded border for the image container
    width: 200, // Width of the image container
    height: 200, // Height of the image container
    marginTop: 12,
  },
});

export default connect()(AddContactScreen);
