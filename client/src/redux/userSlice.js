import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { onlineUser: [] },
    reducers: {
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload;
        }
    }
})

export const { setOnlineUser } = userSlice.actions;
export default userSlice.reducer;
