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
} from "./actions";

const FetchContacts = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case GET_CONTACTS_LIST:
      return {
        ...state,
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.contacts,
      };
    case GET_CONTACTS_FAILED:
      return {
        ...state,
      };
    case ADD_CONTACT_REQUEST:
      return {
        ...state,
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case ADD_CONTACT_FAILURE:
      return {
        ...state,
      };
    case UPDATE_CONTACT_SUCCESS:
      // Find the index of the edited contact in the list
      const updatedIndex = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );

      // Create a new array with the updated contact
      const updatedContacts = [...state.contacts];
      updatedContacts[updatedIndex] = action.payload;

      return {
        ...state,
        contacts: updatedContacts,
      };
    case DELETE_CONTACT_SUCCESS:
      // Filter out the deleted contact
      const filteredContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );

      return {
        ...state,
        contacts: filteredContacts,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  getContacts: FetchContacts,
});

export default rootReducer;
