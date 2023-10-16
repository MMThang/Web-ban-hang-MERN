import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const cx = classNames.bind(styles);

//sub-component
function SidebarItem(itemName, index) {
  return (
    <li className={cx("sidebar-item")} key={index}>
      {itemName}
      <FontAwesomeIcon
        icon={faAngleRight}
        className={cx("sidebar-arrow-icon")}
      />
    </li>
  );
}

const items = [
  "Laptop",
  "Laptop Gaming",
  "PC làm việc",
  "PC Gaming",
  "Màn hình",
  "Bàn phím",
  "Chuột & Lót chuột",
  "Tai nghe",
  "Linh kiện PC",
];

function SidebarComponent() {
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
          return SidebarItem(item, index);
        })}
      </ul>
    </>
  );
}

export default SidebarComponent;
