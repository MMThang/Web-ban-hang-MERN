import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./NotFoundPage.module.scss";
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function NotFoundPage() {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div className={cx("not-found-main-body")}>
        <h1 className={cx("header")}>404</h1>
        <p className={cx("text")}>Trang không tồn tại</p>
        <p>Bạn sẽ được đưa về trang chủ sau {seconds}s</p>
        <Link to="/">Quay về trang chủ</Link>
      </div>
      <FooterComponent />
    </div>
  );
}

export default NotFoundPage;
