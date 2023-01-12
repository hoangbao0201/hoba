import classNames from "classnames/bind";
import styles from "./FormUserDetail.module.scss";
const cx = classNames.bind(styles);

import { iconAddFriend, iconMore } from "../../../public/icons";
import StyledBadgeBlue from "../Layouts/StyledBadgeBlue";

export interface FormUserDetailProps {}
const FormUserDetail = () => {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <div className={cx("head-form")}>
                        <div className={cx("grid-avatar")}>
                            <img
                                src="/images/avatar-default-2.png"
                                alt="avatar"
                                className={cx("avatar")}
                            />
                        </div>

                        <div className={cx("grid-info")}>
                            <div className={cx("info-head")}>
                                <div className={cx("head-name")}>
                                    <h2 className={cx("name")}>hoangbao0201</h2>
                                    {/* <StyledBadgeBlue /> */}
                                </div>

                                <div className={cx("head-button")}>
                                    <button
                                        className={cx(
                                            "button-action",
                                            "button-follow"
                                        )}
                                    >
                                        Theo dõi
                                    </button>
                                    <button
                                        className={cx(
                                            "button-action",
                                            "button-message"
                                        )}
                                    >
                                        Nhắn tin
                                    </button>
                                    <button
                                        className={cx(
                                            "button-action",
                                            "button-more"
                                        )}
                                    >
                                        {iconAddFriend}
                                    </button>
                                    <button
                                        className={cx(
                                            "button-action",
                                            "button-more"
                                        )}
                                    >
                                        {iconMore}
                                    </button>
                                </div>
                            </div>

                            <div className={cx("grid-count")}>
                                <div className={cx("grid-posts")}>
                                    <span className={cx("posts-number")}>
                                        1,362
                                    </span>
                                    <span>bài viết</span>
                                </div>
                                <div className={cx("grid-follow")}>
                                    <span className={cx("follow-number")}>
                                        6,7M
                                    </span>
                                    <span>người theo dõi</span>
                                </div>
                                <div className={cx("grid-watching")}>
                                    <span>Đang theo dõi</span>
                                    <span className={cx("watching-number")}>
                                        5
                                    </span>
                                    <span>người dùng</span>
                                </div>
                            </div>

                            <div className={cx("grid-description")}>
                                <h3 className={cx("description-text")}>
                                    Nguyễn Hoàng Bảo
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className={cx("grid-count-mobile")}>
                        <div className={cx("grid-posts", "dev-col-4")}>
                            <div className={cx("posts-number")}>1,362</div>
                            <span>bài viết</span>
                        </div>
                        <div className={cx("grid-follow", "dev-col-4")}>
                            <div className={cx("follow-number")}>6,7M</div>
                            <span>người theo dõi</span>
                        </div>
                        <div className={cx("grid-watching", "dev-col-4")}>
                            <div className={cx("watching-number")}>5</div>
                            <span>Đang theo dõi</span>
                        </div>
                    </div>

                    <div className={cx("content-form")}>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormUserDetail;
