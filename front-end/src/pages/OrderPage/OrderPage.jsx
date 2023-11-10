import classNames from "classnames/bind";
import styles from "./OrderPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartProduct,
  increaseAmount,
  decreaseAmount,
} from "../../redux/slices/userSlice";

import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function OrderPage() {
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.cart.length !== 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, []);

  const handleCalculate = (cartArr) => {
    let total = 0;
    for (var i = 0; i < cartArr.length; i++) {
      total = total + cartArr[i].price * cartArr[i].amountBuy;
    }
    return total;
  };

  return (
    <div>
      <HeaderComponent />

      <Container fluid="lg" className={cx("order-page-container")}>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Giỏ hàng</Breadcrumb.Item>
        </Breadcrumb>
        <Row xs={12} style={{ height: "100%", margin: "0" }}>
          <Col lg={9} sm={12} xs={12} className={cx("order-item-list")}>
            <Row className={cx("order-header")} fluid>
              <Col
                lg={5}
                className={cx("order-header-item")}
                style={{ display: "flex" }}
              >
                Tất cả
              </Col>
              <Col lg={2} className={cx("order-header-item")}>
                Đơn giá{" "}
              </Col>
              <Col lg={2} className={cx("order-header-item")}>
                Số lượng
              </Col>
              <Col lg={2} className={cx("order-header-item")}>
                Thành tiền
              </Col>
              <Col lg={1} className={cx("order-header-item")}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Col>
            </Row>

            {user?.cart.length !== 0 ? (
              user?.cart.map((item, index) => {
                return (
                  <Row className={cx("order-item")} key={index} fluid>
                    <Col lg={5} xs={12}>
                      <div style={{ display: "flex" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={item.image}
                            style={{ width: "80px", height: "80px" }}
                          />
                        </div>
                        <div className={cx("order-item-name")}>{item.name}</div>
                      </div>
                    </Col>
                    <Col lg={2} xs={7} className={cx("order-item-info")}>
                      {item.price.toLocaleString("en-US")}đ
                    </Col>
                    <Col lg={2} xs={5} className={cx("order-item-info")}>
                      <div style={{ display: "flex" }}>
                        <Button
                          style={{
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                          variant="outline-primary"
                          size="lg"
                          onClick={() => {
                            dispatch(
                              decreaseAmount({ productId: item.productId })
                            );
                          }}
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
                          {item.amountBuy.toLocaleString("en-US")}
                        </div>
                        <Button
                          style={{
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                          }}
                          variant="outline-primary"
                          size="lg"
                          onClick={() => {
                            dispatch(
                              increaseAmount({ productId: item.productId })
                            );
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col
                      lg={2}
                      xs={12}
                      style={{ color: "red", fontWeight: "600" }}
                      className={cx("order-item-info")}
                    >
                      {(item.price * item.amountBuy).toLocaleString("en-US")}đ
                    </Col>
                    <Col className={cx("order-item-info")}>
                      <Button
                        onClick={() => {
                          dispatch(
                            removeCartProduct({
                              productId: item.productId,
                            })
                          );
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </Col>
                  </Row>
                );
              })
            ) : (
              <Row className={cx("order-item")} style={{ height: "152px" }}>
                <Col
                  lg={12}
                  xs={12}
                  style={{
                    textAlign: "center",
                    height: "fit-content",
                    width: "100%",
                    margin: "auto 0",
                    fontSize: "1.8rem",
                    fontWeight: "600",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  Giỏ hàng trống
                  <Button
                    variant="link"
                    size="lg"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
          <Col
            lg={3}
            sm={12}
            xs={12}
            style={{ display: "flex", flexDirection: "column", padding: "0" }}
          >
            <div className={cx("order-preview-container")}>
              <div className={cx("order-preview-item-wrapper")}>
                <div>Tạm tính</div>
                <div>
                  {user.cart?.length !== 0
                    ? handleCalculate(user?.cart).toLocaleString("en-US")
                    : 0}
                  đ
                </div>
              </div>
              <div className={cx("order-preview-item-wrapper")}>
                <div>Phí giao hàng</div>
                <div>
                  {user.cart?.length !== 0 ? (
                    <span>16,000đ</span>
                  ) : (
                    <span>0đ</span>
                  )}
                </div>
              </div>
              <div className={cx("order-preview-item-wrapper")}>
                <div>Tổng tiền</div>
                <div style={{ fontWeight: "600", color: "red" }}>
                  {user.cart?.length !== 0
                    ? (handleCalculate(user?.cart) + 16000).toLocaleString(
                        "en-US"
                      )
                    : 0}
                  đ
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                navigate("/order-info");
              }}
              disabled={disable}
              size="lg"
              variant="danger"
              style={{ width: "100%", margin: "8px 0", fontSize: "1.8rem" }}
            >
              Mua hàng
            </Button>
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default OrderPage;
