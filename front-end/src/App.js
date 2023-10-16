import { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isJsonString } from "./utils";
import routes from "./routes";
import jwt_decode from "jwt-decode";
import { axiosJWT, getUser, refreshToken } from "./service/UserService";
import { updateUser } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { PrivateRoute, AdminRoute } from "./routes/SpecialRoute";

function App() {
  const dispatch = useDispatch();

  const handleGetUser = useCallback(
    async (id, accessToken) => {
      const res = await getUser(id, accessToken);
      dispatch(updateUser({ ...res?.data, access_token: accessToken }));
    },
    [dispatch]
  );

  useEffect(() => {
    let { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetUser(decoded?.id, storageData);
    }
  }, [handleGetUser]);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);

      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      let { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await refreshToken();

        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      console.log(error);
    }
  );

  return (
    <Router>
      <Routes>
        {routes.map(
          (route, index) => {
            return route.isPrivate ? (
              route.isAdmin ? (
                <Route element={<AdminRoute />} key={index}>
                  <Route element={route.element} path={route.path} />
                </Route>
              ) : (
                <Route element={<PrivateRoute />} key={index}>
                  <Route element={route.element} path={route.path} />
                </Route>
              )
            ) : (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
          // return (
          //   <Route key={index} path={route.path} element={route.element} />
          // );
        )}
      </Routes>
    </Router>
  );
}

export default App;
