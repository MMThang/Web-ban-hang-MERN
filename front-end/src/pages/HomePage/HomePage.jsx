import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import HeaderComponent from "../../components/HeaderComponent";
import SidebarComponent from "../../components/SidebarComponent";
import CarouselComponent from "../../components/CarouselComponent";
import { slickerArr, productImgArr } from "../../assets/images";
import SlickComponent from "../../components/SlickComponent";
import FooterComponent from "../../components/FooterComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function HomePage() {
  useEffect(() => {
    document.title = "Cửa hàng điện tử FIFO";
  }, []);
  const fetchLaptopGamingList = async () => {
    const res = await ProductService.getListProduct("laptop-gaming", 12);
    return res;
  };
  const fetchLaptopList = async () => {
    const res = await ProductService.getListProduct("laptop", 12);
    return res;
  };
  const fetchKeyboardList = async () => {
    const res = await ProductService.getListProduct("ban-phim", 12);
    return res;
  };
  const {
    data: laptopGamingProducts,
    isLoading: isLoadingLaptopGaming,
    isError: isErrorLaptopGaming,
  } = useQuery(["productLaptopGaming"], fetchLaptopGamingList, {
    retry: 3,
    retryDelay: 1000,
  });
  const {
    data: laptopProducts,
    isLoading: isLoadingLaptop,
    isError: isErrorLaptop,
  } = useQuery(["productLaptop"], fetchLaptopList, {
    retry: 3,
    retryDelay: 1000,
  });
  const {
    data: keyboardProducts,
    isLoading: isLoadingKeyboard,
    isError: isErrorKeyboard,
  } = useQuery(["productKeyboard"], fetchKeyboardList, {
    retry: 3,
    retryDelay: 1000,
  });

  //Không được xóa
  if (isErrorLaptopGaming)
    return "An error has occurred: " + isErrorLaptopGaming.message;
  //Không được xóa
  //Không được xóa
  if (isErrorLaptop) return "An error has occurred: " + isErrorLaptop.message;
  //Không được xóa
  //Không được xóa
  if (isErrorKeyboard)
    return "An error has occurred: " + isErrorKeyboard.message;
  //Không được xóa

  return (
    <div style={{ position: "relative" }}>
      <HeaderComponent />
      <Container className={cx("first-main-body")}>
        <Row>
          <Col xl={2} lg={3}>
            <SidebarComponent />
          </Col>
          <Col xl={7} lg={9}>
            <CarouselComponent itemArr={slickerArr} />
          </Col>
          <Col xl={3} lg={0} className={cx("third-col")}>
            <Image src={productImgArr[0]} className={cx("product-showcase")} />
            <Image src={productImgArr[1]} className={cx("product-showcase")} />
          </Col>
        </Row>
        <Row>
          {isLoadingLaptopGaming ? (
            <div className={cx("isLoading")}>
              <div className={cx("isLoading-heading")}>Laptop bán chạy</div>
              <div className={cx("isLoading-text-box")}>
                Đang tải dữ liệu...
              </div>
            </div>
          ) : (
            <Col xl={12}>
              <SlickComponent
                itemArr={laptopGamingProducts.data}
                sliderHeader="Laptop Gaming bán chạy"
              />
            </Col>
          )}
        </Row>
        <Row>
          {isLoadingLaptop ? (
            <div className={cx("isLoading")}>
              <div className={cx("isLoading-heading")}>Laptop bán chạy</div>
              <div className={cx("isLoading-text-box")}>
                Đang tải dữ liệu...
              </div>
            </div>
          ) : (
            <Col xl={12}>
              <SlickComponent
                itemArr={laptopProducts.data}
                sliderHeader="Laptop bán chạy"
              />
            </Col>
          )}
        </Row>
        <Row>
          {isLoadingKeyboard ? (
            <div className={cx("isLoading")}>
              <div className={cx("isLoading-heading")}>
                Phím cơ bán chạy bán chạy
              </div>
              <div className={cx("isLoading-text-box")}>
                Đang tải dữ liệu...
              </div>
            </div>
          ) : (
            <Col xl={12}>
              <SlickComponent
                itemArr={keyboardProducts.data}
                sliderHeader="Phím cơ bán chạy bán chạy"
              />
            </Col>
          )}
        </Row>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default HomePage;
