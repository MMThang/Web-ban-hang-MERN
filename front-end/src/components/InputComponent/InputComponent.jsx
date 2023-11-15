import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import * as ProductService from "../../service/ProductService";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";

const cx = classNames.bind(styles);

function InputComponent() {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setShow(false));
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(true);
  const debouncedValue = useDebounce(search, 500);

  const fetchSearchResult = async () => {
    const res = await ProductService.searchProduct(
      { q: debouncedValue, page: 1 },
      6
    );
    return res;
  };

  const { data: searchResult } = useQuery(
    ["searchResult", debouncedValue],
    fetchSearchResult,
    {
      retry: 3,
      retryDelay: 1000,
      enabled: !!debouncedValue,
    }
  );

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    // setQuery({ q: search, page: 1 });
    navigate(`/search/result?q=${search}&page=${1}`);
  };

  return (
    <>
      <InputGroup className={cx("search-group")}>
        <Form.Control
          className={cx("search-input")}
          onChange={handleOnChange}
          ref={wrapperRef}
          onClick={() => setShow(true)}
          spellCheck={false}
        />
        <Button
          id="button-addon2"
          className={cx("search-button")}
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
      <div className={cx("search-result")}>
        {show && searchResult && (
          <div ref={wrapperRef}>
            {searchResult?.data.map((result) => {
              return (
                <div
                  key={result.name}
                  className={cx("search-result-item-container")}
                  onClick={() => {
                    navigate(`/product/${result.params_name}`);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div className={cx("search-result-item-name")}>
                        {result.name}
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ color: "red", marginRight: "8px" }}>
                          {(
                            Math.round(
                              (result.price -
                                (result.price / 100) * result.discount) /
                                1000
                            ) * 1000
                          ).toLocaleString("en-US")}
                          đ
                        </div>
                        <div
                          style={{
                            color: "#8a8686",
                            textDecoration: "line-through",
                          }}
                        >
                          {result.price.toLocaleString("en-US")}đ
                        </div>
                      </div>
                    </div>
                    <Image
                      src={result.image}
                      width="50px"
                      style={{ border: "1px solid #ccc" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default InputComponent;
