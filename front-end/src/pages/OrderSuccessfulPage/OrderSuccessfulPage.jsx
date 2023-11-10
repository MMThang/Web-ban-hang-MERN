import classNames from "classnames/bind";
import styles from "./OrderSuccessfulPage.module.scss";
import logo from "../../assets/logos";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import Breadcrumb from "react-bootstrap/esm/Breadcrumb";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../service/OrderService";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

function OrderSuccessfulPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const fetchOrder = async () => {
    const res = await getOrder(user?.access_token, params.id);
    return res;
  };

  const { data: orderData } = useQuery(["getOrder"], fetchOrder, {
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <div>
      <HeaderComponent />

      <Container className={cx("order-successful-page-container")}>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              navigate(`/my-order/${user._id}`);
            }}
          >
            Đơn hàng của tôi
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Xác nhận đơn hàng</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ backgroundColor: "white", padding: "8px" }}>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              width: "fit-content",
              margin: "0 auto 8px",
            }}
          >
            Xác nhận đơn hàng
          </div>
          <hr />
          <Row>
            <Col className={cx("col-item")} lg={4}>
              {orderData?.data.shippingAddress.gender}
              {": "}
              <strong>{orderData?.data.shippingAddress.fullName}</strong>
            </Col>
            <Col className={cx("col-item")} lg={4}>
              SĐT: <strong>{orderData?.data.shippingAddress.phone}</strong>
            </Col>
            <Col className={cx("col-item")} lg={4}>
              Phương thức thanh toán:{" "}
              <strong>{orderData?.data.paymentMethod}</strong>
            </Col>
          </Row>
          <Row>
            <Col className={cx("col-item")} lg={12}>
              <span>Địa chỉ giao hàng: </span>
              <strong>
                <span>{orderData?.data.shippingAddress.address}, </span>
                <span>{orderData?.data.shippingAddress.ward}, </span>
                <span>{orderData?.data.shippingAddress.district}, </span>
                <span>{orderData?.data.shippingAddress.city}</span>
              </strong>
            </Col>
          </Row>
          <Row>
            <Col className={cx("col-item")} lg={12}>
              <span>Ghi chú: </span>
              <span>
                {orderData?.data.shippingAddress.note || (
                  <span style={{ color: "#aaa" }}>Không có ghi chú</span>
                )}
              </span>
            </Col>
          </Row>
          <Row>
            <Col className={cx("col-item")} lg={12}>
              <span>Ngày tạo đơn hàng: </span>
              <span>
                <strong>
                  {orderData?.data.createdAt
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                </strong>
              </span>
            </Col>
          </Row>
          <hr />
          <div style={{ width: "100%", margin: "40px 0", overflow: "auto" }}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.data.orderItems.map((item, index) => [
                  <tr key={item.productId}>
                    <th>{index + 1}</th>
                    <th>{item.name}</th>
                    <th>{item.price.toLocaleString("en-US")}đ</th>
                    <th>{item.amountBuy}</th>
                    <th>
                      {(item.amountBuy * item.price).toLocaleString("en-US")}
                    </th>
                  </tr>,
                ])}
              </tbody>
            </Table>
          </div>

          <hr />
          <Row>
            <Col className={cx("col-item")} lg={4}>
              Thành tiền các sản phẩm:{" "}
              <strong>
                {orderData?.data.itemsPrice.toLocaleString("en-US")}đ
              </strong>
            </Col>
            <Col className={cx("col-item")} lg={4}>
              Phí giao hàng:{" "}
              <strong>
                {orderData?.data.shippingPrice.toLocaleString("en-US")}đ
              </strong>
            </Col>
            <Col className={cx("col-item")} lg={4}>
              Tổng tiền:{" "}
              <strong style={{ color: "red" }}>
                {orderData?.data.totalPrice.toLocaleString("en-US")}đ
              </strong>
            </Col>
          </Row>
        </div>
      </Container>

      <Container style={{ marginTop: "8px", padding: "0" }}>
        <div className={cx("thank-you-wrapper")}>
          <div className={cx("thank-you-text")}>
            <span>Cảm ơn bạn đã mua hàng tại</span>{" "}
            <Image src={logo} height={"50px"} style={{ marginLeft: "8px" }} />
          </div>
          <Button
            variant="warning"
            size="lg"
            onClick={() => {
              navigate("/");
            }}
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default OrderSuccessfulPage;
