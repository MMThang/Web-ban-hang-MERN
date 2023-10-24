import classNames from "classnames/bind";
import styles from "./ProductsCollectionPage.module.scss";
import PaginationComponent from "../../components/PaginationComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../../components/CardComponent";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Slider from "react-slider";
import LoadingComponent from "../../components/LoadingComponent";
import { useParams } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import {
  useQueryParams,
  NumberParam,
  StringParam,
  DelimitedArrayParam,
  DelimitedNumericArrayParam,
} from "use-query-params";
import { useState } from "react";

const cx = classNames.bind(styles);

function ProductsCollectionPage() {
  const params = useParams();
  const [brandArray, setBrandArray] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  const [query, setQuery] = useQueryParams({
    brand: DelimitedArrayParam,
    page: NumberParam,
    range: DelimitedNumericArrayParam,
    sortType: StringParam,
    sort: StringParam,
  });

  const fetchProductsCollection = async () => {
    const res = await ProductService.getListProduct(params.type, 12, query);
    return res;
  };

  const {
    data: productsCollection,
    isLoading,
    isError,
  } = useQuery(["productscollection", query], fetchProductsCollection, {
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) return <LoadingComponent />;
  if (isError) return "ERR";

  var priceRangeMin = productsCollection?.priceRange[0];
  var priceRangeMax = productsCollection?.priceRange[1];

  const handleSetBrandArray = (brand) => {
    const hasBrandInQuery = brandArray.every((brandItem) => {
      return brandItem !== brand;
    });
    if (hasBrandInQuery) {
      setBrandArray([...brandArray, brand]);
    } else {
      setBrandArray(
        [...brandArray].filter((brandItem) => {
          return brandItem !== brand;
        })
      );
    }
  };

  const handleResetQuery = () => {
    setBrandArray([]);
    setPriceRange([0, Infinity]);
    setQuery({ brand: [], range: [0, Infinity] });
  };
  return (
    <>
      <HeaderComponent />
      <Container className={cx("filter-section")}>
        <div className={cx("responsive-group")}>
          <OverlayTrigger
            trigger="click"
            placement={"bottom-start"}
            overlay={
              <Popover style={{ boxShadow: "0 2px 20px rgba(0, 0, 0, 0.5)" }}>
                <Popover.Body style={{ width: "256px" }}>
                  <Stack direction="horizontal" className={cx("badge-grid")}>
                    {brandArray.map((brand) => {
                      return (
                        <Badge
                          className={cx("brand-badge")}
                          key={brand}
                          pill
                          bg="warning"
                          text="dark"
                        >
                          {brand}
                        </Badge>
                      );
                    })}
                  </Stack>
                  <div className={cx("brand-btn-display")}>
                    {productsCollection.brands.map((brand) => {
                      return (
                        <Button
                          onClick={() => handleSetBrandArray(brand)}
                          key={brand}
                          className={cx("brand-btn")}
                        >
                          {brand}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    className={cx("popover-btn")}
                    onClick={handleResetQuery}
                    variant="outline-secondary"
                  >
                    Bỏ chọn
                  </Button>
                  <Button
                    className={cx("popover-btn")}
                    onClick={() => setQuery({ brand: brandArray })}
                    variant="outline-primary"
                  >
                    Lọc
                  </Button>
                </Popover.Body>
              </Popover>
            }
          >
            <Button className={cx("filter-btn")} variant="outline-primary">
              Hãng
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            trigger="click"
            placement={"bottom-start"}
            overlay={
              <Popover style={{ boxShadow: "0 2px 20px rgba(0, 0, 0, 0.5)" }}>
                <Popover.Body style={{ width: "256px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginBottom: "8px",
                    }}
                  >
                    <div className={cx("price-range")}>
                      {priceRange[0] === 0
                        ? priceRangeMin.toLocaleString("en-US")
                        : priceRange[0].toLocaleString("en-US")}
                      đ
                    </div>
                    <div className={cx("price-range")}>
                      {priceRange[1] === Infinity
                        ? priceRangeMin.toLocaleString("en-US")
                        : priceRange[1].toLocaleString("en-US")}
                      đ
                    </div>
                  </div>

                  <Slider
                    min={priceRangeMin}
                    max={priceRangeMax}
                    value={priceRange}
                    onChange={setPriceRange}
                    className={cx("price-range-slider")}
                    thumbClassName={cx("thumb")}
                    minDistance={0}
                  />
                  <Button
                    className={cx("popover-btn")}
                    onClick={handleResetQuery}
                    variant="outline-secondary"
                  >
                    Bỏ chọn
                  </Button>
                  <Button
                    className={cx("popover-btn")}
                    onClick={() => setQuery({ range: priceRange })}
                    variant="outline-primary"
                  >
                    Lọc
                  </Button>
                </Popover.Body>
              </Popover>
            }
          >
            <Button className={cx("filter-btn")} variant="outline-primary">
              Giá
            </Button>
          </OverlayTrigger>
        </div>
        <Form.Select
          className={cx("select-price-sort")}
          onChange={(e) =>
            setQuery({ sortType: "price", sort: e.target.value })
          }
        >
          <option>Sắp xếp</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </Form.Select>
      </Container>
      <Container className={cx("products-collection-container")}>
        {/* <div className={cx("products-collection-main-body")}> */}
        <Row className={cx("products-collection-main-body")}>
          {productsCollection.data.map((product, index) => {
            return (
              <CardComponent
                key={index}
                params_name={product.params_name}
                brand={product.brand}
                name={product.name}
                image={product.image}
                price={
                  Math.round(
                    (product.price - (product.price / 100) * product.discount) /
                      1000
                  ) * 1000
                }
                old_price={product.price}
                discount={product.discount}
              />
            );
          })}
        </Row>
        {/* </div> */}
        <PaginationComponent
          totalPage={productsCollection.totalPage}
          size="lg"
        />
      </Container>
      <FooterComponent />
    </>
  );
}

export default ProductsCollectionPage;
