import axios from "axios";

export const axiosJWT = axios.create();

export const signInUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/user/sign-in`,
    data
  );
  return res.data;
};
export const signOutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/user/sign-out`
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const getUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BACKEND_URL}/user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_BACKEND_URL}/user/get-all`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async ({ id, access_token }) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_BACKEND_URL}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const addCartProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_BACKEND_URL}/user/add-product/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const removeCartProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_BACKEND_URL}/user/remove-product/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const refreshToken = async () => {
//   const res = await axios.post(
//     `${process.env.REACT_APP_BACKEND_URL}/user/refresh-token`,
//     {
//       withCredentials: true,
//     }
//   );
//   return res.data;
// };
