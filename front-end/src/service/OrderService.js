import { axiosJWT } from "./UserService";

export const createOrder = async ({ access_token, ...rest }) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_BACKEND_URL}/order/create-order`,
    rest,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getOrder = async (access_token, orderId) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BACKEND_URL}/order/get-order/${orderId}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getUserOrder = async (access_token, userId) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BACKEND_URL}/order/my-order/${userId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
