/// Get Contact
export const GET_CONTACTS_LIST = "GET_CONTACTS_LIST";
export const GET_CONTACTS_SUCCESS = "GET_CONTACTS_SUCCESS";
export const GET_CONTACTS_FAILED = "GET_CONTACTS_FAILED";
/// Add Contact
export const ADD_CONTACT_REQUEST = "ADD_CONTACT_REQUEST";
export const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS";
export const ADD_CONTACT_FAILURE = "ADD_CONTACT_FAILURE";
/// Delete Contact
export const DELETE_CONTACT_REQUEST = "DELETE_CONTACT_REQUEST";
export const DELETE_CONTACT_SUCCESS = "DELETE_CONTACT_SUCCESS";
export const DELETE_CONTACT_FAILURE = "DELETE_CONTACT_FAILURE";
/// Update Contact
export const UPDATE_CONTACT_REQUEST = "UPDATE_CONTACT_REQUEST";
export const UPDATE_CONTACT_SUCCESS = "UPDATE_CONTACT_SUCCESS";
export const UPDATE_CONTACT_FAILURE = "UPDATE_CONTACT_FAILURE";

// Get Contact
export const getContactsList = () => ({
  type: GET_CONTACTS_LIST,
});

// Add Contact
export const addContactRequest = (contactData) => ({
  type: ADD_CONTACT_REQUEST,
  payload: contactData,
});

export const updateContactRequest = (contactId, contactData) => ({
  type: UPDATE_CONTACT_REQUEST,
  payload: { contactId, contactData },
});

export const deleteContactRequest = (contactId) => ({
  type: DELETE_CONTACT_REQUEST,
  payload: contactId,
});
