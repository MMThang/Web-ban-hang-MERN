import classnames from "classnames/bind";
import styles from "./AdminUserPage.module.scss";
import logos from "../../assets/logos";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import LoadingComponent from "../../components/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { getAllUser, deleteUser } from "../../service/UserService";
import { useQuery } from "@tanstack/react-query";
import { useMutationHook } from "../../hooks/useMutationHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const cx = classnames.bind(styles);

function AdminUserPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const deleteUserMutation = useMutationHook(deleteUser);

  useEffect(() => {
    if (deleteUserMutation.isSuccess) {
      alert("Xóa thành công");
    }
  }, [deleteUserMutation.isSuccess]);

  const fetchAllUser = async () => {
    const res = await getAllUser(user?.access_token);
    return res;
  };

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["getallusers"], fetchAllUser);

  if (isLoading) return <LoadingComponent />;
  if (isError) return "An error has occurred: " + isError.message;

  const handleDeleteUser = (id) => {
    let comfirmation = prompt('Nhâp "YES" để xác nhận xóa người dùng');
    if (comfirmation === "YES") {
      deleteUserMutation.mutate({ id, access_token: user?.access_token });
    } else {
      alert("Xóa không thành công");
    }
  };

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
            style={{ backgroundColor: "#ccc" }}
          >
            Người dùng
          </button>
          <button
            onClick={() => navigate("/system/admin/products?page=1")}
            className={cx("admin-btn")}
          >
            Sản phẩm
          </button>
        </Col>
        <Col xl={10} style={{ padding: "0" }}>
          <div style={{ fontSize: "3rem" }}>Danh sách người dùng</div>
          <Table striped bordered hover variant="white">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Họ và tên</th>
                <th>Điện thoại</th>
                <th>Thành phố</th>
                <th>Admin</th>
                <th>Xóa</th>
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
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Xóa
                      </Button>
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
