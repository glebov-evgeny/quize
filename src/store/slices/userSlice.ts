import { createSlice } from '@reduxjs/toolkit'

interface IUser {
    email: string | null
    token: string | null
    id: string | null
}

const initialState:IUser = {
    email: localStorage.getItem('email') || null,
    token:  localStorage.getItem('token') || null,
    id: localStorage.getItem('id') || null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            localStorage.clear()
        },
    }
})

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;