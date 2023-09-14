import { takeEvery, put, call } from "redux-saga/effects";
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
import axios from "axios";
const API_URL = "https://contact-list-app-lovat.vercel.app/api";

async function contactsFetch() {
  const timestamp = Date.now();
  const url = `${API_URL}/contacts?timestamp=${timestamp}`;
  const response = await axios.get(url);
  return response.data;
}
async function addContactAPI(contactData) {
  const timestamp = Date.now();
  const response = await axios.post(
    `${API_URL}/add-contact?timestamp=${timestamp}`,
    contactData
  );
  return response.data;
}
async function updateContactAPI(contactId, contactData) {
  const timestamp = Date.now();
  const response = await axios.put(
    `${API_URL}/contact/${contactId}?timestamp=${timestamp}`,
    contactData
  );
  console.log(response.data, "update response");

  return response.data;
}

async function deleteContactAPI(contactId) {
  const timestamp = Date.now();
  const response = await axios.delete(
    `${API_URL}/contact/${contactId}?timestamp=${timestamp}`
  );
  console.log(response.data, "delete response");
  return response.data; // This is the deleted contact
}

function* fetchContactsList() {
  const contacts = yield call(contactsFetch);
  yield put({ type: GET_CONTACTS_SUCCESS, contacts });
}
function* addContact(action) {
  try {
    const contact = yield call(addContactAPI, action.payload);
    yield put({ type: ADD_CONTACT_SUCCESS, contact });
  } catch (error) {
    yield put({ type: ADD_CONTACT_FAILURE, error });
  }
}
function* updateContact(action) {
  try {
    const { contactId, contactData } = action.payload;
    const updatedContact = yield call(updateContactAPI, contactId, contactData);
    yield put({ type: UPDATE_CONTACT_SUCCESS, payload: updatedContact });
  } catch (error) {
    yield put({ type: UPDATE_CONTACT_FAILURE, error });
  }
}

function* deleteContact(action) {
  try {
    const contactId = action.payload;
    yield call(deleteContactAPI, contactId);
    yield put({ type: DELETE_CONTACT_SUCCESS, payload: contactId });
  } catch (error) {
    yield put({ type: DELETE_CONTACT_FAILURE, error });
  }
}

function* mySaga() {
  yield takeEvery(GET_CONTACTS_LIST, fetchContactsList);
  yield takeEvery(ADD_CONTACT_REQUEST, addContact);
  yield takeEvery(UPDATE_CONTACT_REQUEST, updateContact);
  yield takeEvery(DELETE_CONTACT_REQUEST, deleteContact);
}

export default mySaga;
