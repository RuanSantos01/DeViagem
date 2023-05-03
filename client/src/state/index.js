import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
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
        }
    }
});

export const { setLogin, setLogout, setActivities, setUser } = authSlice.actions;
export default authSlice.reducer;