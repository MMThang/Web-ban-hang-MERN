import classNames from "classnames/bind";
import styles from "./PaginationComponent.module.scss";
import Pagination from "react-bootstrap/Pagination";
import { useQueryParam, NumberParam } from "use-query-params";

const cx = classNames.bind(styles);

function PaginationComponent({ totalPage, size }) {
  const [page, setPage] = useQueryParam("page", NumberParam);
  let items = [];
  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => {
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleNextPage = () => {
    if (page !== totalPage) {
      setPage(page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <Pagination size={size} className={cx("pagination")}>
        <Pagination.First onClick={() => setPage(1)} />
        <Pagination.Prev onClick={handlePrevPage} />
        {items}
        <Pagination.Next onClick={handleNextPage} />
        <Pagination.Last onClick={() => setPage(totalPage)} />
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
