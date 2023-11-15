import classNames from "classnames/bind";
import styles from "./SearchedProductPage.module.scss";
import PaginationComponent from "../../components/PaginationComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CardComponent from "../../components/CardComponent";
import LoadingComponent from "../../components/LoadingComponent";
import * as ProductService from "../../service/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useQueryParams, NumberParam, StringParam } from "use-query-params";

const cx = classNames.bind(styles);

function SearchedProductPage() {
  const [query, setQuery] = useQueryParams({
    q: StringParam,
    page: NumberParam,
  });

  console.log("page query", query.q);

  const fetchSearchedProduct = async () => {
    const res = await ProductService.searchProduct(query, 12);
    return res;
  };

  const {
    data: searchProduct,
    isLoading,
    isError,
  } = useQuery(["searchProduct", query], fetchSearchedProduct, {
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) return <LoadingComponent />;
  if (isError) return "ERR";

  return (
    <>
      <HeaderComponent />
      <Container className={cx("searched-product-container")}>
        {searchProduct.totalProduct ? (
          <div style={{ margin: "0 auto", width: "fit-content" }}>
            Kết quả tìm kiếm <strong>"{query.q}"</strong>
          </div>
        ) : null}
        <Row className={cx("searched-product-main-body")}>
          {searchProduct.totalProduct !== 0 ? (
            searchProduct.data.map((product, index) => {
              return (
                <CardComponent
                  key={index}
                  params_name={product.params_name}
                  brand={product.brand}
                  name={product.name}
                  image={product.image}
                  price={
                    Math.round(
                      (product.price -
                        (product.price / 100) * product.discount) /
                        1000
                    ) * 1000
                  }
                  old_price={product.price}
                  discount={product.discount}
                />
              );
            })
          ) : (
            <div
              style={{ width: "fit-content", margin: "auto", fontSize: "2rem" }}
            >
              Không có kết quả cho từ khóa bạn đang tìm kiếm
            </div>
          )}
        </Row>
        {/* </div> */}
        <PaginationComponent totalPage={searchProduct.totalPage} size="lg" />
      </Container>
      <FooterComponent />
    </>
  );
}

export default SearchedProductPage;
