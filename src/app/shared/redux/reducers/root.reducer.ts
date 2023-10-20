import { AnyAction, combineReducers } from '@reduxjs/toolkit';
// import mainReducer from '../slices/main.slice';
import { authSlice } from '../slices/auth.slice';
// import { userSlice } from '../slices/user.slice';

const appReducer = combineReducers({
    // main: mainReducer,
    auth: authSlice.reducer,
    // user: userSlice.reducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
    return appReducer(state, action);
};
