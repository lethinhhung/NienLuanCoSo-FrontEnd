import { AppstoreOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const items = [
        {
            label: <Link to={'/dashboard'}>Dashboard</Link>,
            key: 'dashboard',
            icon: <DashboardOutlined />,
        },
        {
            label: <Link to={'/courses'}>Courses</Link>,
            key: 'courses',
            icon: <AppstoreOutlined />,
        },
        {
            label: <Link to={'/profile'}>Profile</Link>,
            key: 'profile',
            icon: <ProfileOutlined />,
        },
    ];

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu className={cx('menu')} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default Header;
