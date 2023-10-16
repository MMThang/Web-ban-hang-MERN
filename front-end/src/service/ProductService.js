import axios from "axios";

export const getProduct = async (param_name) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/product/${param_name}`
  );
  return res.data;
};

export const getListProduct = async (productType, productLimit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/product/t/${productType}`,
    {
      headers: {
        limit: productLimit,
      },
    }
  );
  return res.data;
};
