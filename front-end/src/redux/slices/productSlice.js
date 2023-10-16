//FILE NÀY BỎ HOANG

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  params_name: "",
  brand: "",
  name: "",
  image: "",
  price: "",
  old_price: "",
  discount: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      state.params_name = action.payload.params_name;
      state.brand = action.payload.brand;
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.price = action.payload.price;
      state.old_price = action.payload.old_price;
      state.discount = action.payload.discount;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;
