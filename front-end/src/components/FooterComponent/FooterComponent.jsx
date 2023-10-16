import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const cx = classNames.bind(styles);

function FooterComponent() {
  return (
    <div className={cx("footer-container")}>
      <Container style={{ height: "100%" }}>
        <p className={cx("footer-header")}>Website bán hàng điện tử FIFO</p>

        <Row className={cx("footer-row")}>
          <Col xxl={4} lg={6}>
            <p>
              <span className={cx("strong")}>Người thực hiện:</span> Mai Minh
              Thắng
            </p>
          </Col>
          <Col xxl={4} lg={6}>
            <p>
              <span className={cx("strong")}>Email:</span>{" "}
              maiminhthang240902@gmail.com
            </p>
            <p>
              <span className={cx("strong")}>Điện thoại:</span> +84 37 206 2846
            </p>
          </Col>
          <Col xxl={4} lg={6}>
            <p>
              <span className={cx("strong")}>Địa chỉ:</span> Gò Vấp. TPHCM
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FooterComponent;
