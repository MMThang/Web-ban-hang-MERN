import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useDispatch } from "react-redux";
import className from "classnames/bind";
import styles from "./SignInPage.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import { getUser, signInUser } from "../../service/UserService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import jwt_decode from "jwt-decode";
import { updateUser } from "../../redux/slices/userSlice";

const cx = className.bind(styles);

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutationHook(signInUser);
  const mutationData = mutation.data;

  const handleGetUser = useCallback(
    async (id, accessToken) => {
      const res = await getUser(id, accessToken);
      dispatch(updateUser({ ...res?.data, access_token: accessToken }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (mutation.isSuccess) {
      localStorage.setItem(
        "access_token",
        JSON.stringify(mutationData?.access_token)
      );
      navigate("/");

      if (mutationData.access_token) {
        const decoded = jwt_decode(mutationData.access_token);
        if (decoded.id) {
          handleGetUser(decoded?.id, mutationData.access_token);
        }
      }
    }
  }, [mutation.isSuccess, handleGetUser, mutationData?.access_token, navigate]);

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className={cx("sign-in-container")}>
      <HeaderComponent />
      <div className={cx("sign-in-main-body")}>
        <Form className={cx("form-wrapper")}>
          <h1 className={cx("header")}>Chào mừng bạn đến với FIFO</h1>
          <h1
            style={{
              marginBottom: "12px",
              fontWeight: "600",
            }}
          >
            Đăng nhập vào FIFO
          </h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className={cx("label")}>Email</Form.Label>
            <Form.Control
              type="email"
              className={cx("input")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          {mutation.error?.response.data.status === "email ERR" && (
            <span>Tài khoản là email</span>
          )}
          {mutation.error?.response.data.status === "input ERR" && (
            <span>Vui lòng nhập tài khoản và mật khẩu</span>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={cx("label")}>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              className={cx("input")}
              value={password}
              onChange={(e) => {
                // const trimValue = e.target.value.trim();
                // setPassword(trimValue);
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          {mutation.error?.response.data.status === "user not found ERR" && (
            <span>Tài khoản hoặc mật khẩu không đúng</span>
          )}
          {mutation.isLoading && <LoadingComponent />}
          <Button
            variant="primary"
            // type="submit"
            className={cx("submit-btn")}
            onClick={handleSignIn}
          >
            Đăng nhập
          </Button>
          <p
            style={{
              marginTop: "20px",
              height: "30px",
            }}
          >
            Chưa có tài khoản?{" "}
            <span
              className={cx("navigate-span")}
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Đăng kí ngay!
            </span>
          </p>
        </Form>
      </div>
      <FooterComponent />
    </div>
  );
}

export default SignInPage;
