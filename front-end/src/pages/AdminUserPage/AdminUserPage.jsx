import classnames from "classnames/bind";
import styles from "./AdminUserPage.module.scss";
import logos from "../../assets/logos";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { getAllUser } from "../../service/UserService";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);

function AdminUserPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const params = useParams();
  const access_token = localStorage.getItem("access_token");

  const fetchAllUser = async () => {
    const res = await getAllUser(access_token);
    return res;
  };

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["getallusers"], fetchAllUser);

  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + isError.message;

  return (
    <Container fluid style={{ padding: "0" }}>
      <Navbar className={cx("navbar")}>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src={logos} alt="Fifo logo" className={cx("navbar-logo")} />
          </Navbar.Brand>
          <Navbar.Text className={cx("navbar-name")}>
            Admin: <strong>{user?.email}</strong>
          </Navbar.Text>
        </Container>
      </Navbar>

      <Row style={{ width: "100%" }}>
        <Col
          xl={2}
          style={{
            padding: "0",
            borderRight: "1px solid black",
            height: "95vh",
          }}
        >
          <button
            onClick={() => navigate("/system/admin/users")}
            className={cx("admin-btn")}
          >
            Người dùng
          </button>
          <button
            onClick={() => navigate("/system/admin/products")}
            className={cx("admin-btn")}
          >
            Sản phẩm
          </button>
        </Col>
        <Col xl={10} style={{ padding: "0" }}>
          <Table striped bordered hover variant="white">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Điện thoại</th>
                <th>Thành phố</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.city}</td>
                    <td>
                      {user.isAdmin ? <FontAwesomeIcon icon={faCheck} /> : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUserPage;
