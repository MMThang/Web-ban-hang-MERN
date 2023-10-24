import classNames from "classnames/bind";
import styles from "./ProductPage.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import HeaderComponent from "../../components/HeaderComponent";
import { laptop } from "../../assets/images";
import FooterComponent from "../../components/FooterComponent";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function ProductPage() {
  const { param } = useParams();

  const fetchProduct = async () => {
    const res = await ProductService.getProduct(param);
    return res;
  };

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery(["getProduct"], fetchProduct, {
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + isError.message;

  return (
    <div style={{ width: "100%" }}>
      <HeaderComponent />
      <Container className={cx("first-main-body")}>
        <Row>
          <Col xxl={4} className={cx("product-image-column")}>
            <Image
              src={productData.data.image}
              className={cx("product-image")}
            />
          </Col>
          <Col xxl={6} className={cx("product-info-column")}>
            <p className={cx("product-name")}>{productData.data.name}</p>
            <div className={cx("product-brand")}>{productData.data.brand}</div>
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

            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div className={cx("product-old-price")}>
                {productData.data.price.toLocaleString("en-US")}đ
              </div>
              <div className={cx("product-discount")}>
                {productData.data.discount}%
              </div>
            </div>

            <Button className={cx("product-buy-button")}>Mua ngay</Button>
          </Col>
        </Row>
      </Container>

      <FooterComponent />
    </div>
  );
}

export default ProductPage;
