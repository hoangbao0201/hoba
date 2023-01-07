import { ReactNode } from 'react';
import classNames from 'classnames/bind'
import styles from './GlobalStyles.module.scss';
const cx = classNames.bind(styles);

import Footer from "../Layouts/Footer"
import Header from "../Layouts/Header"

export interface GlobalStylesProps {
    children: ReactNode
}
const GlobalStyles = ({ children } : GlobalStylesProps ) => {

    return (
       <>
            <Header />

            <div className={cx("content")}>{children}</div>

            <Footer />
       </>
   )
}

export default GlobalStyles