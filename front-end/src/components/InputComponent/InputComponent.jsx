import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const cx = classNames.bind(styles);

function InputComponent() {
  return (
    <InputGroup className={cx("search-group")}>
      <Form.Control className={cx("search-input")} />
      <Button id="button-addon2" className={cx("search-button")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </InputGroup>
  );
}

export default InputComponent;
