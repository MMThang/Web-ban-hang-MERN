import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  avatar: "",
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.avatar = action.payload.avatar;
      state.access_token = action.payload.access_token;
    },
    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.access_token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
