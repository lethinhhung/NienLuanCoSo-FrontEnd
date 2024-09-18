import { Flex, Layout, Affix, FloatButton, Button, Dropdown, Space } from 'antd';
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

import styles from './DefaultLayout.module.scss';
import CustomHeader from './Header';
import CustomFooter from './Footer';
import logo from '~/assets/images/logo.png';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DefaultLayout({ children }) {
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
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Settings
                </a>
            ),
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

    const handleToHome = () => {
        navigate('/');
    };

    const handleToNewCourse = () => {
        navigate('/create-new-course');
    };

    return (
        <Flex gap="middle" wrap>
            <Layout className={cx('wrapper')} style={layoutStyle}>
                <Affix>
                    <Header className={cx('header')}>
                        <Link hidden={isHidden} to={'/'}>
                            <img className={cx('logo')} src={logo} alt="logo" />
                        </Link>
                        <CustomHeader></CustomHeader>
                        <Space className={cx('account')} direction="vertical" wrap>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottomRight"
                                arrow
                            >
                                <Button type="text" className={cx('account-btn')} shape="circle">
                                    <div>
                                        <MehOutlined style={{ fontSize: '40px' }} />
                                    </div>
                                </Button>
                            </Dropdown>
                        </Space>
                    </Header>
                </Affix>
                <Layout className={cx('content-wrapper')}>
                    {/* <Sider className={cx('slider')} width="20%">
                        Sider
                    </Sider> */}
                    <Content className={cx('content')}>{children}</Content>
                </Layout>

                <Footer className={cx('footer')}>
                    <CustomFooter>Footer</CustomFooter>
                </Footer>
            </Layout>
            <FloatButton.Group className={cx('to-top-btn-group')}>
                <div>
                    <FloatButton
                        className={cx('to-top-btn')}
                        onClick={handleToNewCourse}
                        icon={<PlusOutlined />}
                    ></FloatButton>
                </div>
                <div hidden={!isHidden}>
                    <FloatButton
                        className={cx('to-top-btn')}
                        onClick={handleToHome}
                        icon={<HomeOutlined />}
                    ></FloatButton>
                </div>
                <div>
                    <FloatButton.BackTop className={cx('to-top-btn')} icon={<CaretUpOutlined />}></FloatButton.BackTop>
                </div>
            </FloatButton.Group>
        </Flex>
    );
}

export default DefaultLayout;
