import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductsCollectionPage from "../pages/ProductsCollectionPage";
import SearchedProductPage from "../pages/SearchedProductPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import UserInfoPage from "../pages/UserInfoPage";
import OrderPage from "../pages/OrderPage";
import OrderInfoPage from "../pages/OrderInfoPage";
import OrderSuccessfulPage from "../pages/OrderSuccessfulPage";
import UserOrderPage from "../pages/UserOrderPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminProductPage from "../pages/AdminProductPage";
import AdUpdateProductPage from "../pages/AdUpdateProductPage";
import NotFoundPage from "../pages/NotFoundPage";

//isPrivate: phải có tài khoản mới vào
//isAdmin: phải là admin mới vào

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
    path: "/collections/:type",
    element: <ProductsCollectionPage />,
    isPrivate: false,
    isAdmin: false,
  },
  {
    path: "/search/result",
    element: <SearchedProductPage />,
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
    path: "/order",
    element: <OrderPage />,
    isPrivate: true,
    isAdmin: false,
  },
  {
    path: "/order-info",
    element: <OrderInfoPage />,
    isPrivate: true,
    isAdmin: false,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessfulPage />,
    isPrivate: true,
    isAdmin: false,
  },
  {
    path: "/my-order/:id",
    element: <UserOrderPage />,
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
    path: "/system/admin/products/:params",
    element: <AdUpdateProductPage />,
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
