import { useEffect, useState } from "react";
import { getBase64, isJsonString } from "../../utils";
import { nullProfile } from "../../assets/images";
import classNames from "classnames/bind";
import styles from "./UserInfoPage.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import jwt_decode from "jwt-decode";
import { getUser, updateUser } from "../../service/UserService";
import { updateUser as updateUserSlide } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent";
import axios from "axios";

const cx = classNames.bind(styles);

function UserInfoPage() {
  const dispatch = useDispatch();
  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rest } = data;
    updateUser(id, rest, access_token);
  });
  const user = useSelector((state) => state.user);

  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [cityOption, setCityOption] = useState([]);

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
    if (mutation.isSuccess) {
      const { storageData } = handleDecoded();
      dispatch(
        updateUserSlide({
          email: user?.email,
          name: name ? name : user?.name,
          phone: phone ? phone : user?.phone,
          address: address ? address : user?.address,
          city: city ? city : user?.city,
          access_token: storageData,
        })
      );
      alert("Cập nhật thành công!");
    }
  }, [mutation.isSuccess]);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);

      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  const handleUpdateUser = () => {
    const { decoded, storageData } = handleDecoded();

    mutation.mutate({
      id: decoded?.id,
      name: name ? name : user?.name,
      phone: phone ? phone : user?.phone,
      address: address ? address : user?.address,
      city: city ? city : user?.city,
      access_token: storageData,
    });
    setDisabled(true);
  };

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];
    const base64 = await getBase64(file);
    // setAvatar(base64);
    // dispatch(updateUser({ avatar }));
    const { decoded, storageData } = handleDecoded();

    mutation.mutate({
      id: decoded?.id,
      avatar: base64,
      access_token: storageData,
    });
  };

  return (
    <div className={cx("user-info-container")}>
      <HeaderComponent />
      <Container className={cx("user-info-main-body")}>
        <Form as={Row} className={cx("form-wrapper")}>
          <h1 className={cx("header")}>Thông tin cá nhân</h1>

          <Col sm={12} xl={3}>
            <Form.Group
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Form.Label className={cx("label")}>Ảnh đại diện</Form.Label>
              {user?.avatar ? (
                <Image
                  src={user?.avatar}
                  className={cx("avatar-img")}
                  roundedCircle
                />
              ) : (
                <Image
                  src={nullProfile}
                  className={cx("avatar-img")}
                  roundedCircle
                />
              )}
              <Form.Control
                className={cx("avatar-upload-btn")}
                accept=".jpg, .jpeg, .png"
                type="file"
                onChange={(e) => {
                  handleUpdateAvatar(e);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={12} xl={9}>
            <Form.Group className="mb-3">
              <Form.Label className={cx("label")}>Email</Form.Label>
              <Form.Control
                className={cx("input")}
                type="email"
                placeholder={user?.email}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={cx("label")}>Họ và tên</Form.Label>
              <Form.Control
                className={cx("input")}
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder={user?.name}
                disabled={disabled}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={cx("label")}>Điện thoại</Form.Label>
              <Form.Control
                className={cx("input")}
                type="text"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder={user?.phone}
                disabled={disabled}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={cx("label")}>Địa chỉ</Form.Label>
              <Form.Control
                className={cx("input")}
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder={user?.address}
                disabled={disabled}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={cx("label")}>Tỉnh/ thành</Form.Label>
              <Form.Select
                className={cx("input")}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city ? city : user?.city}
                disabled={disabled}
              >
                <option>Open this select menu</option>
                {cityOption.map((city) => {
                  return (
                    <option key={city.Id} value={city.Name}>
                      {city.Name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>

          {!disabled ? (
            <div style={{ padding: "0" }}>
              <Button className={cx("button")} onClick={handleUpdateUser}>
                Xác nhận
              </Button>
              {mutation.isLoading && <LoadingComponent />}
              <Button
                variant="danger"
                className={cx("button")}
                onClick={() => {
                  setDisabled(true);
                }}
              >
                Hủy
              </Button>
            </div>
          ) : (
            <Button
              className={cx("button")}
              style={{ width: "208px" }}
              onClick={() => {
                setDisabled(false);
              }}
            >
              Cập nhật thông tin
            </Button>
          )}
        </Form>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default UserInfoPage;
