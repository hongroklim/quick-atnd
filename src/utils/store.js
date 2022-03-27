import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import paramReducer from "./paramSlice";
import filterReducer from "./filterSlice";
import rosterReducer from "./rosterSlice";
import logFilterReducer from "./logFilterSlice";

export default configureStore({
  reducer: {
    param: paramReducer,
    filter: filterReducer,
    roster: rosterReducer,
    logFilter: logFilterReducer
  },
  middleware: [thunk]
})
