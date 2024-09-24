import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        onlineUser: [],
        socketConnection: null,
     },
    reducers: {
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload;
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload;
        },
        setContactList: (state, action) => {
            state.contactList = action.payload;
          }
    }
})

export const { setOnlineUser, setSocketConnection, setContactList } = userSlice.actions;
export default userSlice.reducer;
