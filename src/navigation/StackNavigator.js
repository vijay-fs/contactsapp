import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "../Screens/ContactListScreen";
import AddContactScreen from "../Screens/AddContactScreen";
import ContactDetailsScreen from "../Screens/ContactDetailsScreen";
import BusinessCardScanner from "../Screens/BussinessCardScanner";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ContactList">
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
        options={{
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailsScreen}
        options={{
          headerTitle: "Contact Details",
        }}
      />
      <Stack.Screen
        name="BusinessCardScanner"
        component={BusinessCardScanner}
        options={{
          headerTitle: "Scan Business Card",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
