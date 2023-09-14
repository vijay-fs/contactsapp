import React from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { addContactRequest } from "../../actions";
import { useNavigation } from "@react-navigation/native";
const AddContactScreen = (props) => {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState("");
  const [imageBase64, setImageBase64] = React.useState("");
  const [hasPermission, setHasPermission] = React.useState(null);
  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3], // You can adjust this to your preferred aspect ratio
        base64: true, // Capture the image as base64
      }).then((result) => {
        console.log(result.assets[0].base64);
        setImage(result.assets[0].uri);
        setImageBase64(result.assets[0].base64);
      });
    } else {
      // Handle camera permission not granted
    }
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const addContact = () => {
    // Create a contactData object with the input values
    const contactData = {
      name: name,
      phone: phone,
      email: email,
      profilePicture: imageBase64,
    };

    // Dispatch the action to add a contact
    props.dispatch(addContactRequest(contactData));
    navigation.navigate("ContactList");
  };
  return (
    <View>
      <Text>Add Contact Screen</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Pick an image from camera roll" onPress={openCamera} />
      {imageBase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      ) : null}
      <Button title="Add" onPress={addContact} />
    </View>
  );
};

export default connect()(AddContactScreen);
