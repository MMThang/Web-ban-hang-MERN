import Card from "react-bootstrap/Card";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function CardComponent({
  params_name,
  brand,
  name,
  image,
  price,
  old_price,
  discount,
  ...rest
}) {
  const navigate = useNavigate();

  function itemNameDisplay(name) {
    const nameArr = name.split(" ");
    let firstNameArr = [];
    let secondNameArr = [];
    firstNameArr.push(nameArr[0], nameArr[1]);
    for (var i = 2; i < nameArr.length; i++) {
      secondNameArr.push(nameArr[i]);
    }

    return {
      firstNameArr: firstNameArr.join(" "),
      secondNameArr: secondNameArr.join(" "),
    };
  }
  return (
    <Card
      className={cx("card-container")}
      onClick={() => navigate(`/product/${params_name}`)}
    >
      <Card.Img
        variant="top"
        src={image}
        className={cx("card-img")}
        alt="sản phẩm"
      />
      <Card.Body className={cx("card-body")}>
        <Card.Text className={cx("card-brand")}>{brand}</Card.Text>
        <Card.Title className={cx("card-name")}>
          {itemNameDisplay(name).firstNameArr}
        </Card.Title>
        <Card.Title className={cx("card-second-name")}>
          {itemNameDisplay(name).secondNameArr}
        </Card.Title>
        <Card.Text className={cx("card-price")}>
          {price.toLocaleString("en-US")}đ
        </Card.Text>
        {discount ? (
          <div style={{ display: "flex" }}>
            <Card.Text className={cx("card-old-price")}>
              {old_price.toLocaleString("en-US")}đ
            </Card.Text>
            <Card.Text className={cx("card-discount")}>{discount}%</Card.Text>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
