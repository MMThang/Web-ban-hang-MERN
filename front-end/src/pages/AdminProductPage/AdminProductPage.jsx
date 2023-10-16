import classnames from "classnames/bind";
import styles from "./AdminProductPage.module.scss";
import logos from "../../assets/logos";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { getListProduct } from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const cx = classnames.bind(styles);

function AdminProductPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [productType, setProductType] = useState("");
  const fetchProductsList = async () => {
    const res = await getListProduct(productType || "laptop-gaming", 12);
    return res;
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product"], fetchProductsList, {
    retry: 3,
    retryDelay: 1000,
  });

  console.log(products);

  //Không được xóa
  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + isError.message;
  //Không được xóa

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
          <Form.Select
            onChange={(e) => {
              setProductType(e.target.value);
            }}
          >
            <option>Open this select menu</option>
            <option value="laptop-gaming">Laptop Gaming</option>
            <option value="ban-phim">Bàn phím</option>
          </Form.Select>
          <Table striped bordered hover variant="white">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Hãng sản xuất</th>
                <th>Mặt hàng</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Tỉ lệ giảm giá</th>
                <th>Số lượng trong kho</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.type}</td>
                    <td>
                      <img src={product.image} alt="Ảnh" />
                    </td>
                    <td>{product.price}</td>
                    <td>{product.discount}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      {product.isAdmin ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : null}
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

export default AdminProductPage;
