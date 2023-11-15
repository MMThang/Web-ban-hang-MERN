import classNames from "classnames/bind";
import styles from "./UserOrderPage.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import { getUserOrder } from "../../service/OrderService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/esm/Button";

const cx = classNames.bind(styles);

function UserOrderPage() {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const fetchUserOrder = async () => {
    const res = await getUserOrder(user?.access_token, params.id);
    return res;
  };
  const { data: userOrder, isLoading } = useQuery(
    ["getUserOrder"],
    fetchUserOrder,
    {
      retry: 3,
      retryDelay: 1000,
    }
  );

  if (isLoading) return "...loading";

  return (
    <div>
      <HeaderComponent />
      <Container className={cx("user-order-page-container")}>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Đơn hàng của tôi</Breadcrumb.Item>
        </Breadcrumb>
        {userOrder.data.length !== 0 ? (
          userOrder.data.map((order) => [
            <Row
              key={order._id}
              className={cx("order-item")}
              onClick={() => {
                navigate(`/order-success/${order._id}`);
              }}
            >
              <Row>
                <Col lg={10}>
                  {order.shippingAddress.gender}:{" "}
                  <strong>{order.shippingAddress.fullName}</strong>
                </Col>
                <Col lg={2}>
                  Ngày tạo đơn:{" "}
                  <strong>
                    {order.createdAt
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </strong>
                </Col>
              </Row>
              <Row>
                <Col lg={10}>
                  {order.shippingAddress.address}, {order.shippingAddress.ward},
                  {order.shippingAddress.district}, {order.shippingAddress.city}
                </Col>
                <Col lg={2}>
                  Tổng tiền:{" "}
                  <span style={{ color: "red", fontWeight: "600" }}>
                    {order.totalPrice.toLocaleString("en-US")}đ
                  </span>
                </Col>
              </Row>
            </Row>,
          ])
        ) : (
          <div className={cx("no-order-box")}>
            Không tìm thấy đơn hàng
            <Button
              className={cx("home-btn")}
              onClick={() => {
                navigate("/");
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        )}
      </Container>
      <FooterComponent />
    </div>
  );
}

export default UserOrderPage;
