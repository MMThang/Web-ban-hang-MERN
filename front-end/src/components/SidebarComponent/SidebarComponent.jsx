import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useNavigate } from "react-router-dom";
import { toLowerCaseNonAccentVietnamese } from "../../utils";

const cx = classNames.bind(styles);

const items = [
  "Laptop",
  "Laptop Gaming",
  "PC làm việc",
  "PC Gaming",
  "Màn hình",
  "Bàn phím",
  "Chuột máy tính",
  "Tai nghe",
];

function SidebarComponent() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { width } = useWindowDimensions();

  const handleToggleSidebar = () => {
    if (sidebar === false) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  };

  return (
    <>
      <div className={cx("responsive-btn")} onClick={handleToggleSidebar}>
        Danh mục
      </div>
      <ul
        className={cx("sidebar-container")}
        style={{
          display: sidebar || width > 992 ? "flex" : "none",
        }}
      >
        {items.map((item, index) => {
          return (
            <li
              className={cx("sidebar-item")}
              key={index}
              onClick={() =>
                navigate(
                  `/collections/${toLowerCaseNonAccentVietnamese(item)}?page=1`
                )
              }
            >
              {item}
              <FontAwesomeIcon
                icon={faAngleRight}
                className={cx("sidebar-arrow-icon")}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default SidebarComponent;
