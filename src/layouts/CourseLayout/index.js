import { Image, Flex, Layout, Affix, FloatButton, Button, Dropdown, Space, Tooltip } from 'antd';
import {
    CaretUpOutlined,
    HomeOutlined,
    PlusOutlined,
    MehOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CourseLayout.module.scss';
import CustomHeader from './Header';
import CustomFooter from './Footer';
import logo from '~/assets/images/logo.png';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CourseLayout({ children }) {
    const cx = classNames.bind(styles);

    const { Header, Content, Footer } = Layout;
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    const [isHidden, setIsHidden] = useState(true);

    const layoutStyle = {
        overflow: 'hidden',
    };

    const items = [
        {
            key: 'settings',
            label: <Link to={'/profile'}>Settings</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: 'logout',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    Logout
                </a>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    useEffect(() => {
        if (width <= 500) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    }, [width]);

    useEffect(() => {});

    const handleToHome = () => {
        navigate('/');
    };

    const handleToNewCourse = () => {
        navigate('/create-new-course');
    };

    ///

    return (
        <Flex gap="middle" wrap>
            <Layout className={cx('wrapper')} style={layoutStyle}>
                <Affix>
                    <Header className={cx('header')}>
                        <CustomHeader></CustomHeader>
                    </Header>
                </Affix>
                <Layout className={cx('content-wrapper')}>
                    <Content className={cx('content')}>{children}</Content>
                </Layout>

                <Footer className={cx('footer')}>
                    <CustomFooter>Footer</CustomFooter>
                </Footer>
            </Layout>
            <FloatButton.Group className={cx('to-top-btn-group')}>
                <div hidden={!isHidden}>
                    <Tooltip placement="left" title="Home">
                        <div>
                            <FloatButton
                                className={cx('to-top-btn')}
                                onClick={handleToHome}
                                icon={<HomeOutlined />}
                            ></FloatButton>
                        </div>
                    </Tooltip>
                </div>

                <div>
                    <FloatButton.BackTop className={cx('to-top-btn')} icon={<CaretUpOutlined />}></FloatButton.BackTop>
                </div>
            </FloatButton.Group>
        </Flex>
    );
}

export default CourseLayout;
