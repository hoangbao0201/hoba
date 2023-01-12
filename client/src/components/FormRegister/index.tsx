import classNames from "classnames/bind";
import styles from "./FormRegister.module.scss";
const cx = classNames.bind(styles);

import { iconFacebook, iconGithub, iconGoogle } from "../../../public/icons";
import { useRouter } from "next/router";
import useBreadcrumbs from "../../hooks/useBreadcrumbs";
import { ChangeEvent, useState } from "react";
import BreadcrumbLayout from "../Layouts/BreadcrumbLayout";
import { useMutation } from "@apollo/client";
// import { registerMutation } from "../../graphql/mutations/mutations";

export interface FormRegisterProps {}

interface UserMutationResponse {
    code: number
    success: boolean
    message: string
    user: string
    errors: string
}

interface NewUserInput {
    username: string
    email: string
    password: string
}

const FormRegister = () => {
    const [dataForm, setDataForm] = useState({
        username: "",
        email: "",
        password: "",
        // rePassword: "",
    });

    const router = useRouter();
    const newRouter = useBreadcrumbs(router);

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });
    };

    // Apollo client

    // const [registerUser, { data, error }] = useMutation<
    //     { register: UserMutationResponse },
    //     { registerInput: NewUserInput }
    // >(registerMutation);

    const handleSubmitFormRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // console.log(dataForm)

        // await registerUser({
        //     variables: {
        //         registerInput: dataForm
        //     }
        // })
    }

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("container")}>

                    {/* { data?.register.success && <p>{JSON.stringify(data.register)}</p> } */}

                    <BreadcrumbLayout data={newRouter} />

                    <div className={cx("content-auth")}>
                        <div className={cx("grid-form")}>
                            <form className={cx("form-register")}>
                                <div className={cx("form-header")}>
                                    <div className={cx("header-title")}>
                                        <span
                                            className={cx("header-under-line")}
                                        ></span>{" "}
                                        <h3>Đăng kí</h3>
                                    </div>
                                </div>

                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-username"
                                        className={cx("form-title")}
                                    >
                                        Tên tài khoản
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-username"
                                            value={dataForm.username}
                                            name="username"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-email"
                                        className={cx("form-title")}
                                    >
                                        Email
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-email"
                                            value={dataForm.email}
                                            name="email"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-password"
                                        className={cx("form-title")}
                                    >
                                        Mật khẩu
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-password"
                                            type="password"
                                            value={dataForm.password}
                                            name="password"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div>
                                {/* <div className={cx("form-group")}>
                                    <label
                                        htmlFor="input-register-rePassword"
                                        className={cx("form-title")}
                                    >
                                        Nhập lại mật khẩu
                                    </label>
                                    <div className={cx("form-input")}>
                                        <input
                                            id="input-register-rePassword"
                                            type="password"
                                            value={dataForm.rePassword}
                                            name="rePassword"
                                            onChange={eventChangeValueInput}
                                        />
                                    </div>
                                </div> */}

                                <div className={cx("form-group-button", "grid-button-submit")}>
                                    <button
                                        className={cx(
                                            "button-auth",
                                            "auth-submit-form"
                                        )}
                                        onClick={handleSubmitFormRegisterUser}
                                    >
                                        Đăng kí
                                    </button>
                                </div>
                            </form>
                            <div className={cx("form-devider")}>
                                <div className={cx("text")}>Đăng nhập bằng</div>
                                <div className={cx("devider-line")}></div>
                            </div>

                            <div
                                className={cx(
                                    "form-group-button",
                                    "login-with-social"
                                )}
                            >
                                <button
                                    className={cx("button-auth", "auth-google")}
                                >
                                    <span className={cx("grid-icon")}>
                                        {iconGoogle}
                                    </span>
                                    Google
                                </button>
                                <button
                                    className={cx(
                                        "button-auth",
                                        "auth-facebook"
                                    )}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormRegister;
