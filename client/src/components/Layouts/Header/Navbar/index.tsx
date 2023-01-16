import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);

import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";

import OverlayLayout from "../../../Layouts/OverlayLayout";
import { iconBars, iconLogin, iconRegister } from "../../../../../public/icons";
import useClickOutSide from "../../../../hooks/useClickOutSide";

export interface NavbarProps {}
const Navbar = () => {
    // const { data: session } = useSession();
    const session = false
    const navbarRef = useRef<HTMLDivElement>(null);
    const [isNavbar, setIsNavbar] = useState(false);

    const handleCloseNavbar = () => {
        setIsNavbar(false);
    };
    useClickOutSide(navbarRef, handleCloseNavbar);

    return (
        <>
            <button
                className={cx("button-show")}
                onClick={() => setIsNavbar(true)}
            >
                {iconBars}
            </button>
            <OverlayLayout active={isNavbar}>
                <div
                    ref={navbarRef}
                    className={cx("navbar", `${isNavbar && "active"}`)}
                >
                    <div className={cx("container")}>
                        <div className={cx("header")}>Navbar</div>

                        <div className={cx("content")}>
                            {session ? (
                                <Link href="/auth/login">
                                    <div className={cx("navbar-item")} >
                                        {iconLogin}Đăng xuất
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/auth/login">
                                        <div className={cx("navbar-item")}>
                                            {iconLogin}Đăng nhập
                                        </div>
                                    </Link>
                                    <Link href="/auth/register">
                                        <div className={cx("navbar-item")}>
                                            {iconRegister}Đăng kí
                                        </div>
                                    </Link>
                                </>
                            )}

                            <Link href="/posts/detail/nguyen-hoang-bao">
                                <div className={cx("navbar-item")}>
                                    {iconRegister}Bài viết
                                </div>
                            </Link>
                            <Link href="/user/hoangbao0201">
                                <div className={cx("navbar-item")}>
                                    {iconRegister}hoangbao0201
                                </div>
                            </Link>
                            <Link href="/book/create">
                                <div className={cx("navbar-item")}>
                                    {iconRegister}Create Book
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </OverlayLayout>
        </>
    );
};

export default Navbar;
