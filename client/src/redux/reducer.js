import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import recpSlice from './recpSlice'

const rootReducer = combineReducers({
    user: userSlice,
    recps: recpSlice
});

export {rootReducer};

