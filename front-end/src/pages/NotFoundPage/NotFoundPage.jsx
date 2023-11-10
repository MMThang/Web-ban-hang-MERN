import classNames from "classnames/bind";
import styles from "./NotFoundPage.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function NotFoundPage() {
  return (
    <div>
      <HeaderComponent />
      <div className={cx("not-found-main-body")}>
        <h1 className={cx("header")}>404</h1>
        <p className={cx("text")}>Trang không tồn tại</p>
        <Link to="/">Quay về trang chủ</Link>
      </div>
      <FooterComponent />
    </div>
  );
}

export default NotFoundPage;
