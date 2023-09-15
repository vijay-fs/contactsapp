import { combineReducers } from "redux";
import {
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_LIST,
  GET_CONTACTS_FAILED,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILURE,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
} from "./actions"; // Import action types

// Reducer for managing contact data
const FetchContacts = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case GET_CONTACTS_LIST:
      // When fetching contact list, return the current state as it is
      return {
        ...state,
      };
    case GET_CONTACTS_SUCCESS:
      // When successfully fetching contacts, update the state with the new contacts data
      return {
        ...state,
        contacts: action.contacts,
      };
    case GET_CONTACTS_FAILED:
      // When fetching contacts fails, return the current state as it is
      return {
        ...state,
      };
    case ADD_CONTACT_REQUEST:
      // When adding a contact, return the current state as it is
      return {
        ...state,
      };
    case ADD_CONTACT_SUCCESS:
      // When successfully adding a contact, update the state by adding the new contact to the list
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case ADD_CONTACT_FAILURE:
      // When adding a contact fails, return the current state as it is
      return {
        ...state,
      };
    case UPDATE_CONTACT_SUCCESS:
      // When successfully updating a contact, find the index of the edited contact in the list
      const updatedIndex = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );

      // Create a new array with the updated contact
      const updatedContacts = [...state.contacts];
      updatedContacts[updatedIndex] = action.payload;

      // Update the state with the updated contact list
      return {
        ...state,
        contacts: updatedContacts,
      };
    case DELETE_CONTACT_SUCCESS:
      // When successfully deleting a contact, filter out the deleted contact from the list
      const filteredContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );

      // Update the state with the filtered contact list
      return {
        ...state,
        contacts: filteredContacts,
      };

    default:
      // For any other action types, return the current state as it is
      return state;
  }
};

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  getContacts: FetchContacts, // Assign the FetchContacts reducer to the 'getContacts' key in the root state
});

export default rootReducer;
