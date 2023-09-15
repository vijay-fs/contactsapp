import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Chip } from "@rneui/base";

function BusinessCardScanner() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scannedBusinessCard, setScannedBusinessCard] = useState(null);

  useEffect(() => {
    (async () => {
      // Request camera permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");

      // Request camera roll permissions
      const { status: cameraRollStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraRollStatus !== "granted") {
        alert("Camera roll permission is required to upload business cards.");
      }
    })();
  }, []);

  const handleScanBusinessCard = async () => {
    if (hasCameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true, // Capture the image as base64
      });

      if (result.canceled) {
        return;
      }

      setScannedBusinessCard(result.assets[0].base64);
    } else {
      Alert.alert("Camera permission is required to scan business cards.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {scannedBusinessCard ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${scannedBusinessCard}` }}
          style={{ width: "100%", height: "80%" }}
        />
      ) : (
        <Camera
          style={{ width: 200, height: 200 }}
          type={Camera.Constants.Type.back}
        />
      )}

      {/* <TouchableOpacity onPress={handleScanBusinessCard}>
        <Text>Scan Business Card</Text>
      </TouchableOpacity> */}
      <Chip
        onPress={handleScanBusinessCard}
        title="Scan"
        icon={{
          name: "camera",
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
  );
}

export default BusinessCardScanner;
