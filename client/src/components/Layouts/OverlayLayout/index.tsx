import classNames from 'classnames/bind'
import { ReactNode } from 'react';
import styles from './OverlayLayout.module.scss';
const cx = classNames.bind(styles);

export interface OverlayLayoutProps {
    children: ReactNode
    active: boolean
}
const OverlayLayout = ({ children, active } : OverlayLayoutProps ) => {

    return (
       <div className={cx("overlay", `${active ? "active" : ""}`)}>
            {children}
       </div>
   )
}

export default OverlayLayout