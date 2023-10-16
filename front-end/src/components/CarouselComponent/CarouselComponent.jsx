import classNames from "classnames/bind";
import styles from "./Carousel.module.scss";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

const cx = classNames.bind(styles);

function CarouselComponent({ itemArr }) {
  return (
    <Carousel
      fade={true}
      indicators={false}
      className={cx("carousel-container")}
    >
      {itemArr.map((item, index) => {
        return (
          <Carousel.Item
            key={index}
            className={cx("carousel-item")}
            interval={3000}
          >
            <Image src={item} className={cx("carousel-item-img")} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;
