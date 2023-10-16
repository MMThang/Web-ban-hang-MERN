import classNames from "classnames/bind";
import styles from "./Slick.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardComponent from "../CardComponent";

const cx = classNames.bind(styles);

function SlickComponent({ itemArr, sliderHeader }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={cx("slick-container")}>
      <p className={cx("slider-header")}>{sliderHeader}</p>
      <Slider {...settings} className={cx("slider-container")}>
        {itemArr.map((item, index) => {
          return (
            <CardComponent
              key={index}
              params_name={item.params_name}
              brand={item.brand}
              name={item.name}
              image={item.image}
              price={
                Math.round(
                  (item.price - (item.price / 100) * item.discount) / 1000
                ) * 1000
              }
              old_price={item.price}
              discount={item.discount}
            />
          );
        })}
      </Slider>
    </div>
  );
}

export default SlickComponent;
