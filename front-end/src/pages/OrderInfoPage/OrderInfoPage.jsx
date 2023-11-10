import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./OrderInfoPage.module.scss";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { resetCartUser } from "../../redux/slices/userSlice";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createOrder } from "../../service/OrderService";
import { updateProduct } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function OrderInfoPage() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(user?.city);
  const [district, setDistrict] = useState(user?.district);
  const [ward, setWard] = useState(user?.ward);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cityOption, setCityOption] = useState([]);
  const [districtOption, setDistrictOption] = useState([]);
  const [wardOption, setWardOption] = useState([]);

  const createOrderMutation = useMutationHook(createOrder);
  const updateAmountMutation = useMutationHook((data) => {
    const { id, ...rest } = data;
    updateProduct(id, rest);
  });

  useEffect(() => {
    if (name === "") {
      setName(user?.name);
    }
    if (phone === "") {
      setPhone(user?.phone);
    }
    if (paymentMethod === "") {
      setPaymentMethod("Tiền mặt");
    }
  }, []);

  const handleCalculate = (cartArr) => {
    let total = 0;
    for (var i = 0; i < cartArr.length; i++) {
      total = total + cartArr[i].price * cartArr[i].amountBuy;
    }
    return total;
  };

  //useEffect lấy dữ liệu về 63 tỉnh thành
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCityOption(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getCity() {
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );

        const getCity = res.data.find((cityItem) => cityItem.Name === city);

        setDistrictOption(getCity.Districts);
      } catch (error) {
        console.log(error);
      }
    }
    getCity();
  }, [city, user?.city]);

  useEffect(() => {
    async function getDistrict() {
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );

        const getCity = res.data.find((cityItem) => cityItem.Name === city);

        const getDistrict = getCity.Districts.find(
          (districtItem) => districtItem.Name === district
        );
        setWardOption(getDistrict.Wards);
      } catch (error) {
        console.log(error);
      }
    }
    getDistrict();
  }, [district, user?.district]);

  useEffect(() => {
    if (createOrderMutation?.isSuccess) {
      user?.cart.map((product) => {
        let calculatedAmount = product.amountInStock - product.amountBuy;
        return updateAmountMutation.mutate({
          id: product.productId,
          countInStock: calculatedAmount,
        });
      });
      dispatch(resetCartUser());
      navigate(`/order-success/${createOrderMutation?.data.data._id}`);
    }
  }, [createOrderMutation?.isSuccess]);

  useEffect(() => {
    if (user.cart.length === 0) {
      navigate("/");
    }
  }, []);

  const handleCreateOrder = () => {
    createOrderMutation.mutate({
      access_token: user?.access_token,
      cart: user?.cart,
      name,
      gender,
      phone,
      city,
      district,
      ward,
      address,
      paymentMethod,
      itemsPrice: handleCalculate(user?.cart),
      shippingPrice: 16000,
      totalPrice: handleCalculate(user?.cart) + 16000,
      userId: user?._id,
      note,
    });
  };

  return (
    <div>
      <HeaderComponent />

      <Container className={cx("order-info-page-container")}>
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
              navigate("/order");
            }}
          >
            Giỏ hàng
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Thông tin đặt hàng</Breadcrumb.Item>
        </Breadcrumb>
        <Form style={{ padding: "8px", backgroundColor: "white" }}>
          <Row>
            <Col lg={12}>
              <span style={{ fontWeight: "600" }}>Thông tin khách hàng</span>
              <Form.Group onChange={(e) => setGender(e.target.value)}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Form.Check
                    type="radio"
                    label="Anh"
                    name="genderRadios"
                    value="Anh"
                  />
                  <Form.Check
                    style={{ marginLeft: "24px" }}
                    type="radio"
                    label="Chị"
                    name="genderRadios"
                    value="Chị"
                  />
                </div>
              </Form.Group>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className={cx("form-input")}
                      required
                      type="text"
                      placeholder="Họ và tên"
                      defaultValue={user?.name}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => {
                        setPhone(e.target.value || user?.phone);
                      }}
                      className={cx("form-input")}
                      required
                      type="text"
                      placeholder="Số điện thoại"
                      defaultValue={user?.phone}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <span style={{ fontWeight: "600" }}>Địa chỉ nhận hàng</span>
              <Row>
                <Col lg={6}>
                  <Form.Select
                    className={cx("form-input")}
                    aria-label="Default select example"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">-- Chọn Tỉnh, Thành phố --</option>
                    {cityOption.map((city) => {
                      return (
                        <option key={city.Id} value={city.Name}>
                          {city.Name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col lg={6}>
                  <Form.Select
                    className={cx("form-input")}
                    aria-label="Default select example"
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">-- Chọn Quận, Huyện --</option>
                    {districtOption.map((district) => {
                      return (
                        <option key={district.Id} value={district.Name}>
                          {district.Name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Form.Select
                    className={cx("form-input")}
                    aria-label="Default select example"
                    onChange={(e) => setWard(e.target.value)}
                  >
                    <option value="">-- Chọn Xã, Phường --</option>
                    {wardOption.map((ward) => {
                      return (
                        <option key={ward.Id} value={ward.Name}>
                          {ward.Name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
                <Col lg={6}>
                  <Form.Control
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className={cx("form-input")}
                    required
                    type="text"
                    placeholder="Số nhà, tên đường"
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <Col lg={12}>
                  <Form.Control
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                    className={cx("form-input")}
                    type="text"
                    name="firstName"
                    placeholder="Lưu ý, yêu cầu khác (Không bắt buộc)"
                  />
                </Col>
              </Row>

              <hr />
              <span style={{ fontWeight: "600" }}>Phương thức thanh toán</span>
              <Form.Group onChange={(e) => setPaymentMethod(e.target.value)}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Form.Check
                    type="radio"
                    label="Tiền mặt"
                    name="paymentMethodRadios"
                    value="Tiền mặt"
                    defaultChecked
                  />
                  <Form.Check
                    style={{ marginLeft: "24px" }}
                    type="radio"
                    label="Chuyển khoản"
                    name="paymentMethodRadios"
                    value="Chuyển khoản"
                  />
                </div>
              </Form.Group>
              <hr />
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.8rem",
                    fontWeight: "600",
                  }}
                >
                  <span>Phí vận chuyển</span>
                  <span>{(16000).toLocaleString("en-US")}đ</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.8rem",
                    fontWeight: "600",
                  }}
                >
                  <span>Tiền hàng</span>
                  <span>
                    {handleCalculate(user?.cart).toLocaleString("en-US")}đ
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.8rem",
                    fontWeight: "600",
                  }}
                >
                  <span>Tổng tiền</span>
                  <span style={{ color: "red" }}>
                    {(handleCalculate(user?.cart) + 16000).toLocaleString(
                      "en-US"
                    )}
                    đ
                  </span>
                </div>
                <span>*Vui lòng kiểm tra lại thông tin trước khi đặt hàng</span>
                {createOrderMutation.error?.response.data.status ===
                  "input ERR" && (
                  <div style={{ color: "red", fontWeight: "600" }}>
                    *Vui lòng điền vào các miền
                  </div>
                )}
              </div>

              <Button
                className={cx("buy-btn")}
                variant="danger"
                onClick={handleCreateOrder}
              >
                Đặt hàng ngay
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default OrderInfoPage;
