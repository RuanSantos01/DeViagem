import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    cart: null,
    paymentInformations: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setActivities: (state, action) => {
            if (state.user) {
                state.user.activities = action.payload.activities;
            } else {
                console.error("Usuário não existe")
            }
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setCart: (state, action) => {
            state.cart = action.payload.cart;
        },
        setPaymentInformation: (state, action) => {
            state.paymentInformations = action.payload.paymentInformations;
        }
    }
});

export const { setLogin, setLogout, setActivities, setUser, setCart, setPaymentInformation } = authSlice.actions;
export default authSlice.reducer;