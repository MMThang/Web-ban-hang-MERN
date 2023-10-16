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
import { laptop } from "../../assets/images";
import FooterComponent from "../../components/FooterComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../service/ProductService";

const cx = classNames.bind(styles);

const testItem = [
  {
    image: laptop,
    brand: "LG",
    name: "Laptop 1F6B LGLGLGLGLGLGLGLGGLfsadfasdfasdf",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
  {
    image: laptop,
    brand: "Acer",
    name: "Laptop 1F6B LG",
    price: 100000,
    old_price: 300000,
    navigate: "/product",
  },
];

function HomePage() {
  const fetchLaptopGamingList = async () => {
    const res = await ProductService.getListProduct("laptop-gaming", 12);
    return res;
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product"], fetchLaptopGamingList, {
    retry: 3,
    retryDelay: 1000,
  });

  console.log(products);

  //Không được xóa
  if (isLoading) return "Loading...";
  if (isError) return "An error has occurred: " + isError.message;
  //Không được xóa

  return (
    <div style={{ position: "relative" }}>
      <HeaderComponent />
      <Container className={cx("first-main-body")}>
        <Row>
          <Col xl={2} lg={3}>
            <SidebarComponent />
          </Col>
          <Col xl={7} lg={9} className={cx("carousel-holder")}>
            <CarouselComponent itemArr={slickerArr} />
          </Col>
          <Col xl={3} lg={0} className={cx("third-col")}>
            <Image src={productImgArr[0]} className={cx("product-showcase")} />
            <Image src={productImgArr[1]} className={cx("product-showcase")} />
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <SlickComponent
              itemArr={products.data}
              sliderHeader="Laptop bán chạy"
            />
          </Col>
        </Row>
        {/* <Row>
          <Col xl={12}>
            <SlickComponent
              itemArr={products.data}
              sliderHeader="Phím cơ bán chạy bán chạy"
            />
          </Col>
        </Row> */}
      </Container>
      <FooterComponent />
    </div>
  );
}

export default HomePage;
