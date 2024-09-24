import {
    LeftOutlined,
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    DashboardOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Flex, Menu, Button, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import { useGetBrighterColor, useGetTextColorFromBackground } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const cx = classNames.bind(styles);

    const navigate = useNavigate();

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

    const cardColor = '#624e88';

    const textColor = useGetTextColorFromBackground(cardColor);

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <Flex className={cx('wrapper')} vertical>
            <Flex
                style={{ backgroundColor: cardColor }}
                justify="space-between"
                align="center"
                wrap
                className={cx('menu')}
            >
                <Button
                    style={{ color: textColor }}
                    type="text"
                    className={cx('btn')}
                    size="large"
                    shape="circle"
                    onClick={handleBackClick}
                >
                    <LeftOutlined />
                </Button>
                <h1 style={{ color: textColor }}>This is the course name</h1>
                {/* <Button className={cx('btn')} size="large" shape="circle">
                    More
                </Button> */}
            </Flex>

            <Breadcrumb
                className={cx('bread-crumb')}
                style={{}}
                separator=">"
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
