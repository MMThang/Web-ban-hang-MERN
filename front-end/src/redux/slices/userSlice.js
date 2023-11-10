import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  cart: [],
  phone: "",
  address: "",
  district: "",
  ward: "",
  city: "",
  avatar: "",
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.district = action.payload.district;
      state.ward = action.payload.ward;
      state.city = action.payload.city;
      state.avatar = action.payload.avatar;
      state.access_token = action.payload.access_token;
    },
    addCartProduct: (state, action) => {
      const { product } = action.payload;
      const isProductInArray = state?.cart?.find(
        (item) => item?.productId === product.productId
      );
      if (isProductInArray) {
        isProductInArray.amountBuy += product.amountBuy;
      } else {
        state.cart.push(product);
      }
    },
    removeCartProduct: (state, action) => {
      const { productId } = action.payload;
      const newArrayWithoutDeletedProduct = state?.cart?.filter(
        (item) => item?.productId !== productId
      );
      state.cart = newArrayWithoutDeletedProduct;
    },
    removeCheckedCartProduct: (state, action) => {
      const listCheck = action.payload;
      const newArrayList = state.cart.filter(
        (item) => !listCheck.includes(item.productId)
      );
      state.cart = newArrayList;
    },
    increaseAmount: (state, action) => {
      const { productId } = action.payload;
      const isProductInArray = state?.cart?.find(
        (item) => item?.productId === productId
      );
      if (isProductInArray.amountBuy !== isProductInArray.amountInStock) {
        isProductInArray.amountBuy++;
      }
    },
    decreaseAmount: (state, action) => {
      const { productId } = action.payload;
      const isProductInArray = state?.cart?.find(
        (item) => item?.productId === productId
      );
      if (isProductInArray.amountBuy !== 1) {
        isProductInArray.amountBuy--;
      }
    },
    logoutUser: (state) => {
      state.name = "";
      state.email = "";
      state.cart = [];
      state.access_token = "";
    },
    resetCartUser: (state) => {
      state.cart = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUser,
  logoutUser,
  addCartProduct,
  removeCartProduct,
  removeCheckedCartProduct,
  increaseAmount,
  decreaseAmount,
  resetCartUser,
} = userSlice.actions;

export default userSlice.reducer;
