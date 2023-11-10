import classNames from "classnames/bind";
import styles from "./ProductPage.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartProduct } from "../../redux/slices/userSlice";
import { useState } from "react";

const cx = classNames.bind(styles);

function ProductPage() {
  const { param } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const location = useLocation();

  const fetchProduct = async () => {
    const res = await ProductService.getProduct(param);
    return res;
  };

  const {
    data: productData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["getProduct"], fetchProduct, {
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + isError.message;
  if (isSuccess) document.title = productData.data.name;

  const handleSetDecreaseAmount = () => {
    if (amount !== 1) {
      setAmount(amount - 1);
    }
  };
  const handleSetIncreaseAmount = () => {
    if (amount !== productData?.data.countInStock) {
      setAmount(amount + 1);
    }
  };

  const handleBuy = () => {
    const hasToken = localStorage.getItem("access_token");
    if (!hasToken) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addCartProduct({
          product: {
            productId: productData?.data._id,
            name: productData?.data.name,
            amountInStock: productData?.data.countInStock,
            amountBuy: amount,
            image: productData?.data.image,
            price:
              Math.round(
                (productData?.data.price -
                  (productData?.data.price / 100) *
                    productData?.data.discount) /
                  1000
              ) * 1000,
          },
        })
      );
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <HeaderComponent />
      <Container className={cx("first-main-body")}>
        <Breadcrumb style={{ backgroundColor: "none" }}>
          <Breadcrumb.Item
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </Breadcrumb.Item>

          <Breadcrumb.Item
            onClick={() => {
              navigate(`/collections/${productData?.data.type}?page=1`);
            }}
          >
            Danh sách sản phẩm
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{productData?.data.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row style={{ backgroundColor: "white" }}>
          <Col xxl={4} className={cx("product-image-column")}>
            <Image
              src={productData.data.image}
              className={cx("product-image")}
            />
          </Col>
          <Col xxl={6} className={cx("product-info-column")}>
            <p className={cx("product-name")}>{productData.data.name}</p>
            <div className={cx("product-brand")}>{productData.data.brand}</div>
            <hr />
            <div className={cx("product-price")}>
              {(
                Math.round(
                  (productData.data.price -
                    (productData.data.price / 100) *
                      productData.data.discount) /
                    1000
                ) * 1000
              ).toLocaleString("en-US")}
              đ
            </div>

            <div style={{ display: "flex", marginBottom: "4px" }}>
              <div className={cx("product-old-price")}>
                {productData.data.price.toLocaleString("en-US")}đ
              </div>
              <div className={cx("product-discount")}>
                {productData.data.discount}%
              </div>
            </div>
            <hr />
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <Button
                style={{
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
                variant="outline-primary"
                onClick={handleSetDecreaseAmount}
                size="lg"
              >
                -
              </Button>
              <div
                style={{
                  borderTop: "1px solid #0d6efd",
                  borderBottom: "1px solid #0d6efd",
                  padding: "4px 8px",

                  userSelect: "none",
                }}
              >
                {amount}
              </div>
              <Button
                style={{
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
                variant="outline-primary"
                onClick={handleSetIncreaseAmount}
                size="lg"
              >
                +
              </Button>
            </div>

            <div>Số lượng hàng trong kho: {productData?.data.countInStock}</div>

            {productData?.data.countInStock !== 0 ? (
              <Button className={cx("product-buy-button")} onClick={handleBuy}>
                Mua ngay
              </Button>
            ) : (
              <Button
                className={cx("product-buy-button")}
                variant="secondary"
                disabled
              >
                Hết hàng
              </Button>
            )}
          </Col>
        </Row>
      </Container>

      <FooterComponent />
    </div>
  );
}

export default ProductPage;
