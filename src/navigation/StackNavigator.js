import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "../Screens/ContactListScreen";
import AddContactScreen from "../Screens/AddContactScreen";
import ContactDetailsScreen from "../Screens/ContactDetailsScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ContactList">
      <Stack.Screen name="ContactList" component={ContactListScreen} />
      <Stack.Screen name="AddContact" component={AddContactScreen} />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
