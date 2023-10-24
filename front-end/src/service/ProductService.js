import axios from "axios";

export const getProduct = async (param_name) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/product/${param_name}`
  );
  return res.data;
};

export const getListProduct = async (
  productType,
  productLimit,
  query = null
) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/product/t/${productType}`,
    {
      params: { ...query },
      headers: {
        limit: productLimit,
      },
    }
  );
  return res.data;
};

export const searchProduct = async (query = null, productLimit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/product/search/result`,
    {
      params: { ...query },
      headers: {
        limit: productLimit,
      },
    }
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/product/create-product`,
    data
  );
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/product/update-product/${id}`,
    data
  );
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/product/delete-product/${id}`
  );
  return res.data;
};
