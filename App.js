import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./src/navigation/StackNavigator";
import "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";

import mysaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mysaga);
const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
