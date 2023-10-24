import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const cx = classNames.bind(styles);

function InputComponent() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // const debouncedValue = useDebounce(search, 1000);
  const [query, setQuery] = useQueryParams({
    q: StringParam,
    page: NumberParam,
  });

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setQuery({ q: search, page: 1 });
  };

  useEffect(() => {
    if (query.q !== undefined) {
      navigate(`/search/result?q=${query.q}&page=${query.page}`);
    }
  }, [query]);

  return (
    <InputGroup className={cx("search-group")}>
      <Form.Control className={cx("search-input")} onChange={handleOnChange} />
      <Button
        id="button-addon2"
        className={cx("search-button")}
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </InputGroup>
  );
}

export default InputComponent;
