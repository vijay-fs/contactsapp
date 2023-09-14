import React, { useEffect, useState, useMemo, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getContactsList } from "../../actions";
import { View, Text, FlatList, Button, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// Implement your Contact List screen here

const ContactListScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.getContacts.contacts);
  useEffect(() => {
    // Dispatch the action to fetch contacts when the component mounts
    dispatch(getContactsList());
  }, [isFocused]);

  return (
    <ScrollView>
      <View>
        <Text>Contact List Screen</Text>
        {contacts.map((item, index) => (
          <View key={index}>
            <Text>{index + 1}</Text>
            {item && (
              <>
                <Text>{item.name}</Text>
                <Text>{item.phone}</Text>
                <Text>{item.email}</Text>
              </>
            )}
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate("ContactDetails", { contact: item })
              }
            />
          </View>
        ))}

        <Button
          style={{ marginTop: 20 }}
          title="Add Contact"
          onPress={() => navigation.navigate("AddContact")}
        />
      </View>
    </ScrollView>
  );
};

export default ContactListScreen;
