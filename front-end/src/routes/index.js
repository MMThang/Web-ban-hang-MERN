import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import UserInfoPage from "../pages/UserInfoPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminProductPage from "../pages/AdminProductPage";
import NotFoundPage from "../pages/NotFoundPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/product/:param",
    element: <ProductPage />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/info/:email",
    element: <UserInfoPage />,
    isPrivate: true,
    isAdmin: false,
  },
  {
    path: "/system/admin/users",
    element: <AdminUserPage />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/system/admin/products",
    element: <AdminProductPage />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "*",
    element: <NotFoundPage />,
    isPrivate: false,
    isAdmin: false,
  },
];

export default routes;
