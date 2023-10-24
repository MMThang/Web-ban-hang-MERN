import classNames from "classnames/bind";
import styles from "./AdUpdateProductPage.module.scss";
import { useParams } from "react-router-dom";
import logos from "../../assets/logos";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { getBase64 } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function AdUpdateProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const fetchProducts = async () => {
    const res = await getProduct(params.params);
    return res;
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["productupdate"], fetchProducts, {
    retry: 3,
    retryDelay: 1000,
  });

  const updateMutation = useMutationHook((data) => {
    const { id, ...updateData } = data;
    updateProduct(id, updateData);
  });

  useEffect(() => {
    if (updateMutation.isSuccess) {
      alert("Cập nhật thành công");
      navigate(`/system/admin/products?type=${product.data.type}`);
    }
  }, [updateMutation.isSuccess, navigate, product.data.type]);

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await getBase64(file);
    setImage(base64);
  };

  const handleUpdateProduct = (id) => {
    updateMutation.mutate({
      id,
      name: name ? name : product.data.name,
      brand: brand ? brand : product.data.brand,
      type: type ? type : product.data.type,
      image: image ? image : product.data.image,
      price: price ? price : product.data.price,
      discount: discount ? discount : product.data.discount,
      countInStock: countInStock ? countInStock : product.data.countInStock,
      description: description ? description : product.data.description,
    });
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
          <Form as={Row} style={{ height: "100%" }}>
            <Col xl={6}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form.Group>
                  <Form.Label className={cx("form-label")}>
                    Tên sản phẩm
                  </Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder={product.data.name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>
                    Hãng sản xuất
                  </Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder={product.data.brand}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>Mặt hàng</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    placeholder={product.data.type}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>Ảnh</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="file"
                    onChange={(e) => handleAddImage(e)}
                    accept=".jpg, .jpeg, .png, .webp"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>Giá</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={product.data.price}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>
                    Tỉ lệ giảm giá
                  </Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder={product.data.discount}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>
                    Số lượng trong kho
                  </Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => setCountInStock(e.target.value)}
                    placeholder={product.data.countInStock}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className={cx("form-label")}>Mô tả</Form.Label>
                  <Form.Control
                    className={cx("form-control")}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={product.data.description}
                  />
                </Form.Group>
                <div
                  style={{
                    width: "500px",
                  }}
                >
                  <Button
                    className={cx("form-btn")}
                    onClick={() => {
                      navigate(
                        `/system/admin/products?type=${product.data.type}`
                      );
                    }}
                    variant="secondary"
                  >
                    Hủy
                  </Button>
                  <Button
                    className={cx("form-btn")}
                    onClick={() => {
                      handleUpdateProduct(product.data._id);
                    }}
                  >
                    Cập nhật
                  </Button>
                </div>
              </div>
            </Col>
            <Col xl={6}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="ảnh sản phẩm"
                    style={{
                      width: "700px",
                    }}
                  />
                ) : (
                  <img
                    src={product.data.image}
                    alt="ảnh sản phẩm"
                    style={{
                      width: "700px",
                    }}
                  />
                )}
              </div>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdUpdateProductPage;
