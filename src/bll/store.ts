import {converterReducer} from "./converterReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {transactionsReducer} from "./transactionsReducer";
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
  converterReducer,
  transactionsReducer,
  appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppStoreType = ReturnType<typeof rootReducer>;

