import Link from "next/link";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import styles from "./BreadcrumbLayout.module.scss";

export interface BreadcrumbLayoutProps {
    data: dataValue[] | undefined
}

type dataValue = {
    href: string;
    title: string;
}

const BreadcrumbLayout = ({ data }: BreadcrumbLayoutProps) => {
    if(data) {
        return (
            <div className={cx("container")}>
                {data.map((item: dataValue, index: number) => {
                    return (
                        <span className={cx("item")} key={index}>
                            <Link href={item.href}>
                                <span className={cx("text")}>{item.title}</span>
                            </Link>
                        </span>
                    );
                })}
            </div>
        );
    }
    else {
        return null;
    }
};

export default BreadcrumbLayout;
