import {applyMiddleware, compose, createStore} from 'redux';
import thunk from "redux-thunk";

import RootReducer from "./Reducers/index";
import AsyncStorage from "@react-native-community/async-storage"
import { persistStore, persistReducer } from 'redux-persist';

const middleWare= applyMiddleware(thunk);

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    storage: AsyncStorage,
  };

const persistedReducer = persistReducer(persistConfig,RootReducer);


const  store=createStore(persistedReducer, compose(middleWare));

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
  store,
  persistor,
};
