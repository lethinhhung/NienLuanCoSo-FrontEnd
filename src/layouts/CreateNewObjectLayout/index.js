import { Flex, Layout, Affix, FloatButton, Button, Dropdown, Space, Tooltip } from 'antd';
import { HomeOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import defaultAvatar from '~/assets/images/default-avatar.png';
import styles from './CreateNewObjectLayout.module.scss';
import CustomHeader from '~/layouts/DefaultLayout/Header';
import CustomFooter from '~/layouts/DefaultLayout/Footer';
import logo from '~/assets/images/logo.png';
import { useConvertAvatarPath, useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/Auth';
import { getAccountInfoApi } from '~/utils/api';

function CreateNewObjectLayout({ children }) {
    const cx = classNames.bind(styles);

    const { Header, Footer } = Layout;
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { logout } = useAuth();

    const [isHidden, setIsHidden] = useState(true);

    const layoutStyle = {
        overflow: 'hidden',
    };

    const handleLogout = () => {
        logout();
    };

    const items = [
        {
            key: 'settings',
            label: <Link to={'/profile'}>Settings</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: 'logout',
            label: <a onClick={handleLogout}>Logout</a>,
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

    const [info, setInfo] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const accountInfo = await getAccountInfoApi();

            setInfo(accountInfo.info);
        };

        fetchAccountInfo();
    }, []);

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
                                <button
                                    style={{ backgroundColor: 'transparent' }}
                                    type="text"
                                    className={cx('account-btn')}
                                    shape="circle"
                                >
                                    <div
                                        style={{
                                            borderRadius: '9999px',
                                            padding: '10px',
                                        }}
                                    >
                                        {/* <MehOutlined style={{ fontSize: '40px' }} /> */}
                                        <img
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '9999px',
                                            }}
                                            src={useConvertAvatarPath(info.avatarPath)}
                                            alt="avatar"
                                        />
                                    </div>
                                </button>
                            </Dropdown>
                        </Space>
                    </Header>
                </Affix>
                <Layout className={cx('content-wrapper')}>{children}</Layout>

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
            </FloatButton.Group>
        </Flex>
    );
}

export default CreateNewObjectLayout;
