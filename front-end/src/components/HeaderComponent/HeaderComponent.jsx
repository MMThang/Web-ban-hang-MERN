import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logos";
import InputComponent from "../InputComponent";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { nullProfile } from "../../assets/images";
import { signOutUser } from "../../service/UserService";
import { logoutUser } from "../../redux/slices/userSlice";
import jwtDecode from "jwt-decode";

const cx = classNames.bind(styles);

function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    const res = await signOutUser();
    dispatch(logoutUser());
    navigate("/");
  };

  const adminPageDisplay = () => {
    const auth = localStorage.getItem("access_token");
    const decoded = auth ? jwtDecode(auth) : null;
    return decoded?.isAdmin ? true : false;
  };

  return (
    <Navbar expand="lg md" className={cx("bg-custom-primary")}>
      <Container className={cx("navbar-container")}>
        <Navbar.Brand
          className={cx("navbar-logo")}
          onClick={() => navigate("/")}
        >
          <Image src={logo} className={cx("navbar-logo-image")} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={cx("navbar-toggler-icon")}
        />

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={cx("navbar-collapse")}
        >
          <Nav className={cx("me-auto", "navbar-collapse")}>
            <InputComponent />
            <div className={cx("navbar-link-group")}>
              <Nav.Item href="/gio-hang" className={cx("navbar-item")}>
                <div>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Badge bg="danger" style={{ marginLeft: "4px" }}>
                    0
                  </Badge>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    marginLeft: "8px",
                  }}
                >
                  <span className={cx("responsive-span")}>Giỏ hàng</span>
                  <span className={cx("responsive-span")}>của bạn</span>
                </div>
              </Nav.Item>
              {user?.email ? (
                <OverlayTrigger
                  trigger="click"
                  placement="bottom-start"
                  overlay={
                    <Popover arrowProps="none">
                      <Popover.Header className={cx("popover-header")}>
                        {user?.email}
                      </Popover.Header>
                      <Popover.Body className={cx("popover-body")}>
                        {adminPageDisplay() ? (
                          <div
                            className={cx("popover-body-item")}
                            onClick={() => {
                              navigate(`/system/admin/users`);
                            }}
                          >
                            Trang Admin
                          </div>
                        ) : null}
                        <div
                          className={cx("popover-body-item")}
                          onClick={() => {
                            navigate(`/info/${user.email}`);
                          }}
                        >
                          Thông tin người dùng
                        </div>
                        <div
                          className={cx("popover-body-item")}
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </div>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Nav.Item className={cx("navbar-item", "navbar-login")}>
                    {user?.avatar ? (
                      <Image
                        src={user?.avatar}
                        className={cx("profile-pic")}
                        roundedCircle
                      />
                    ) : (
                      <Image
                        src={nullProfile}
                        className={cx("profile-pic")}
                        roundedCircle
                      />
                    )}
                    <span className={cx("user-name", "responsive-span")}>
                      {user?.name.split(" ")[user?.name.split(" ").length - 1]}
                    </span>
                  </Nav.Item>
                </OverlayTrigger>
              ) : (
                <Nav.Item
                  className={cx("navbar-item", "navbar-login")}
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      marginLeft: "8px",
                    }}
                  >
                    <span className={cx("responsive-span")}>Đăng kí</span>
                    <span className={cx("responsive-span")}>Đăng nhập</span>
                  </div>
                </Nav.Item>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
