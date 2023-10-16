import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import className from "classnames/bind";
import styles from "./SignUpPage.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import { signUpUser } from "../../service/UserService";

const cx = className.bind(styles);

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const mutation = useMutationHook(signUpUser);

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/");
    }
  }, [mutation.isSuccess]);

  const handleSignUp = () => {
    mutation.mutate({
      name,
      email,
      password,
      comfirmPassword,
    });
    setName("");
    setEmail("");
    setPassword("");
    setComfirmPassword("");
  };

  return (
    <div className={cx("sign-up-container")}>
      <HeaderComponent />
      <div className={cx("sign-up-main-body")}>
        <Form className={cx("form-wrapper")}>
          <h1 className={cx("header")}>Chào mừng bạn đến với FIFO</h1>
          <h1
            style={{
              marginBottom: "12px",
              fontWeight: "600",
            }}
          >
            Đăng ký tài khoản
          </h1>
          <Form.Group className="mb-3" controlId="formPlaintext">
            <Form.Label className={cx("label")}>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              className={cx("input")}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

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
          {mutation.error?.response.data.status === "email replica ERR" && (
            <span className={cx("error-msg")}>
              Email này đã có người sử dụng
            </span>
          )}
          {mutation.error?.response.data.status === "email ERR" && (
            <span className={cx("error-msg")}>Vui lòng nhập email</span>
          )}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={cx("label")}>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              className={cx("input")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCofrimPassword">
            <Form.Label className={cx("label")}>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              type="password"
              className={cx("input")}
              value={comfirmPassword}
              onChange={(e) => {
                setComfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          {mutation.error?.response.data.status === "comfirm password ERR" && (
            <span className={cx("error-msg")}>
              Nhập lại mật khẩu không khớp với mật khẩu vừa nhập
            </span>
          )}
          {mutation.error?.response.data.status === "input ERR" && (
            <span className={cx("error-msg")}>
              Vui lòng nhập tất cả các miền
            </span>
          )}
          <Button
            variant="primary"
            // type="submit"
            className={cx("submit-btn")}
            onClick={handleSignUp}
          >
            Tạo tài khoản
          </Button>
          {mutation.data?.status === "OK" && <span>Đăng ký thành công</span>}
          <p
            style={{
              marginTop: "20px",
              height: "30px",
            }}
          >
            Bạn có tài khoản?{" "}
            <span
              className={cx("navigate-span")}
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Đăng nhập!
            </span>
          </p>
        </Form>
      </div>
      <FooterComponent />
    </div>
  );
}

export default SignUpPage;
