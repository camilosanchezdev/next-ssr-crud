import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface authStateAttributes {
    isAuthenticated: boolean;
    token: string;
}

const authInitialState: authStateAttributes = {
    isAuthenticated: false,
    token: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        loginAction: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        logoutAction: (state) => {
            state.isAuthenticated = false;
            state.token = '';
        },
    },
});

export const { loginAction, logoutAction } = authSlice.actions;
