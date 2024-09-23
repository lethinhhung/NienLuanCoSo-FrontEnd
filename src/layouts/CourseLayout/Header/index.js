import { HomeOutlined, UserOutlined, AppstoreOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Menu } from 'antd';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const cx = classNames.bind(styles);

    const location = useLocation();

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
            label: <Link to={'/terms'}>Terms</Link>,
            key: 'term',
            icon: <ProfileOutlined />,
        },
    ];
    const currentPath = location.pathname.replace(/^\//, '');
    const [current, setCurrent] = useState(currentPath);

    useEffect(() => {
        if (currentPath === 'profile') {
            setCurrent('none');
        }
    }, [currentPath]);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Flex className={cx('wrapper')} vertical>
            <Menu className={cx('menu')} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Breadcrumb
                className={cx('bread-crumb')}
                items={[
                    {
                        title: (
                            <Link to="/">
                                <HomeOutlined />
                            </Link>
                        ),
                    },
                    {
                        title: (
                            <Link to="/courses">
                                <AppstoreOutlined />
                                <span>Courses</span>
                            </Link>
                        ),
                    },
                    {
                        title: 'Current course',
                    },
                ]}
            />
        </Flex>
    );
}

export default Header;
