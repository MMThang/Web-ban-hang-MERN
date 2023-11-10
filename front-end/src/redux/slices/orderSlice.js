import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItemPayload } = action.payload;
      const itemInTheArray = state?.orderItems?.find(
        (item) => item?.product === orderItemPayload.product
      );
      if (itemInTheArray) {
        itemInTheArray.amount += orderItemPayload?.amount;
      } else {
        state.orderItems.push(orderItemPayload);
      }
    },

    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemInTheArray = state?.orderItems.find(
        (item) => item?.product !== idProduct
      );
      itemInTheArray.orderItems = itemInTheArray;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, removeOrderProduct } = orderSlice.actions;

export default orderSlice.reducer;
