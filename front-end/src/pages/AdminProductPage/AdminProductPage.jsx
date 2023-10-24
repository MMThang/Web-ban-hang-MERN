import classnames from "classnames/bind";
import styles from "./AdminProductPage.module.scss";
import logos from "../../assets/logos";
import PaginationComponent from "../../components/PaginationComponent";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { getBase64 } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getListProduct,
  createProduct,
  deleteProduct,
} from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect, useState } from "react";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import { toLowerCaseNonAccentVietnamese } from "../../utils";

const cx = classnames.bind(styles);

function AdminProductPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [query, setQuery] = useQueryParams({
    type: StringParam,
    page: NumberParam,
  });
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProductsList = async () => {
    const res = await getListProduct(query.type || "laptop-gaming", 8, query);
    return res;
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product", query.type, query.page], fetchProductsList, {
    retry: 3,
    retryDelay: 1000,
  });

  const createMutation = useMutationHook(createProduct);
  const deleteMutation = useMutationHook(deleteProduct);

  useEffect(() => {
    if (createMutation.isSuccess) {
      alert("Tạo sản phẩm thành công");
      setShow(false);
    }
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      alert("Xóa thành công");
    }
  }, [deleteMutation.isSuccess]);

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const handleSetProductType = (value) => {
    setQuery({ type: value });
  };

  const handleCreateProduct = () => {
    createMutation.mutate({
      params_name: toLowerCaseNonAccentVietnamese(name),
      name,
      brand,
      type,
      image,
      price,
      discount,
      rating: 1,
      countInStock,
      description,
    });
    setName("");
    setBrand("");
    setType("");
    setImage("");
    setPrice("");
    setDiscount("");
    setCountInStock("");
    setDescription("");
  };

  const handleDeleteProduct = (id) => {
    let comfirmation = prompt('Nhâp "YES" để xác nhận xóa sản phẩm');
    if (comfirmation === "YES") {
      deleteMutation.mutate(id);
    } else {
      alert("Xóa không thành công");
    }
  };

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
          <div style={{ fontSize: "3rem" }}>Danh sách sản phẩm</div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Form.Select
              className={cx("select-product")}
              onChange={(e) => {
                handleSetProductType(e.target.value);
              }}
            >
              <option>-- Chọn mặt hàng --</option>
              <option value="laptop-gaming">Laptop Gaming</option>
              <option value="laptop">Laptop</option>
              <option value="ban-phim">Bàn phím</option>
            </Form.Select>
            <Button onClick={handleShow} className={cx("add-product-btn")}>
              Thêm mới sản phẩm+
            </Button>
          </div>
          {/* Modal thêm mới sản phẩm (không nên mở ra) */}
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Hãng sản xuất</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => setBrand(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mặt hàng</Form.Label>
                  <Form.Select
                    onChange={(e) => setType(e.target.value)}
                    className={cx("form-control")}
                  >
                    <option>--Chọn mặt hàng--</option>
                    <option value="laptop-gaming">Laptop Gaming</option>
                    <option value="laptop">Laptop</option>
                    <option value="ban-phim">Bàn phím</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ảnh</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => handleAddImage(e)}
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tỉ lệ giảm giá</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => setDiscount(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Số lượng trong kho</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => setCountInStock(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            {createMutation.error?.response.data.status === "input ERR" && (
              <div>Vui lòng nhập hết các miền</div>
            )}
            {createMutation.error?.response.data.status === "replica ERR" && (
              <div>Sản phẩm này đã tồn tại</div>
            )}
            {createMutation.error?.response.data.status === "value ERR" && (
              <div>Giá trị không được thấp hơn 0</div>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="primary" onClick={handleCreateProduct}>
                Tạo
              </Button>
            </Modal.Footer>
          </Modal>
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
                <th>Giá sau khi giảm</th>
                <th>Số lượng trong kho</th>
                <th>Mô tả</th>
                <th>Cập nhật</th>
                <th>Xóa</th>
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
                      <img src={product.image} alt="Ảnh" width="80px" />
                    </td>
                    <td>{product.price.toLocaleString("en-US")}đ</td>
                    <td>{product.discount}%</td>
                    <td style={{ color: "red" }}>
                      {(
                        Math.round(
                          (product.price -
                            (product.price / 100) * product.discount) /
                            1000
                        ) * 1000
                      ).toLocaleString("en-US")}
                      đ
                    </td>
                    <td>{product.countInStock}</td>
                    <td>{product.description}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(
                            `/system/admin/products/${product.params_name}`
                          )
                        }
                      >
                        Cập nhật
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          handleDeleteProduct(product._id);
                        }}
                        variant="danger"
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <PaginationComponent totalPage={products.totalPage} />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminProductPage;
