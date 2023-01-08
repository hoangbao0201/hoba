import classNames from "classnames/bind";
import styles from "./FormLogin.module.scss";
const cx = classNames.bind(styles);

import { iconFacebook, iconGithub, iconGoogle } from "../../public/icons";
import { useRouter } from "next/router";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import BreadcrumbLayout from "../Layouts/BreadcrumbLayout";
import { signIn } from "next-auth/react";

export interface FormLoginProps {}
const FormLogin = () => {
    const router = useRouter();
    const newRouter = useBreadcrumbs(router);

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("container")}>
                    <BreadcrumbLayout data={newRouter} />

                    <div className={cx("content-auth")}>
                        <form className={cx("form-login")}>
                            <div className={cx("form-header")}>
                                <div className={cx("header-title")}>
                                    <span
                                        className={cx("header-under-line")}
                                    ></span>{" "}
                                    <h3>Đăng nhập</h3>
                                </div>
                            </div>

                            <div className={cx("form-group")}>
                                <div className={cx("form-title")}>
                                    Tài khoản
                                </div>
                                <div className={cx("form-input")}>
                                    <input />
                                </div>
                            </div>
                            <div className={cx("form-group")}>
                                <div className={cx("form-title")}>Mật khẩu</div>
                                <div className={cx("form-input")}>
                                    <input />
                                </div>
                            </div>

                            <div className={cx("form-action")}>
                                <input id="inputMemo" type="checkbox" />
                                <label
                                    className={cx("text-checkInput")}
                                    htmlFor="inputMemo"
                                >
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>

                            <div className={cx("form-group-button")}>
                                <div
                                    className={cx(
                                        "button-auth",
                                        "auth-submit-form"
                                    )}
                                >
                                    Đăng nhập
                                </div>
                            </div>

                            <div className={cx("form-devider")}>
                                <div className={cx("text")}>Đăng nhập bằng</div>
                                <div className={cx("devider-line")}></div>
                            </div>
                        </form>
                        <div
                            className={cx(
                                "form-group-button",
                                "login-with-social"
                            )}
                        >
                            <button
                                className={cx("button-auth", "auth-google")}
                                onClick={() => signIn("google")}
                            >
                                <span className={cx("grid-icon")}>
                                    {iconGoogle}
                                </span>
                                Google
                            </button>
                            <button
                                className={cx("button-auth", "auth-facebook")}
                            >
                                <span className={cx("grid-icon")}>
                                    {iconFacebook}
                                </span>
                                Facebook
                            </button>
                            <button
                                className={cx("button-auth", "auth-github")}
                            >
                                <span className={cx("grid-icon")}>
                                    {iconGithub}
                                </span>
                                Github
                            </button>
                        </div>
                    </div>
                    <div className={cx("content-side")}></div>
                </div>
            </div>
        </>
    );
};

export default FormLogin;
