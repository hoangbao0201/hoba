import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

export interface FooterProps {}
const Footer = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>Footer</div>
        </div>
    );
};

export default Footer;
