import { Flex, Layout, Affix, FloatButton, Dropdown, Space, Tooltip, Spin } from 'antd';
import { CaretUpOutlined, HomeOutlined, PlusOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import CustomHeader from './Header';
import CustomFooter from './Footer';
import logo from '~/assets/images/logo.png';
import { useWindowDimensions } from '~/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/contexts/Auth';
import { getAccountInfoApi } from '~/utils/api';
import convertAvatarPath from '~/utils/convertAvatarPath';
import defaultAvatar from '~/assets/images/default-avatar.png';

function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);

    const { Header, Content, Footer } = Layout;
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { logout } = useAuth();

    const [isHidden, setIsHidden] = useState(true);
    const [loading, setLoading] = useState(true);

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
            // eslint-disable-next-line
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

    //BTN
    const location = useLocation();
    const isCoursePage = location.pathname === '/courses';
    const isTermsPage = location.pathname === '/terms';

    let pageName;
    let isCreate = false;
    if (isCoursePage) {
        pageName = 'course';
        isCreate = true;
    } else if (isTermsPage) {
        pageName = 'term';
        isCreate = true;
    }

    const handleToHome = () => {
        navigate('/');
    };

    const handleToNewCourse = () => {
        navigate('/create-new-course');
    };

    const handleToNewTerm = () => {
        navigate('/create-new-term');
    };

    const [info, setInfo] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchAccountInfo = async () => {
            const accountInfo = await getAccountInfoApi();

            setInfo(accountInfo.info);
            setLoading(false);
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
                                    style={{ backgroundColor: 'white', borderRadius: '999px' }}
                                    className={cx('account-btn')}
                                >
                                    <div
                                        style={{
                                            borderRadius: '9999px',
                                            padding: '10px',
                                        }}
                                    >
                                        {loading ? (
                                            <Spin style={{ marginTop: '-8px' }} spinning={loading}></Spin>
                                        ) : (
                                            <img
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '9999px',
                                                }}
                                                src={
                                                    info.avatarPath ? convertAvatarPath(info.avatarPath) : defaultAvatar
                                                }
                                                alt="avatar"
                                            />
                                        )}
                                    </div>
                                </button>
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
                <div hidden={!isCreate}>
                    <Tooltip placement="left" title={'Create a new ' + pageName}>
                        <div>
                            <FloatButton
                                className={cx('to-top-btn')}
                                onClick={isCoursePage ? handleToNewCourse : isTermsPage ? handleToNewTerm : null}
                                icon={<PlusOutlined />}
                            ></FloatButton>
                        </div>
                    </Tooltip>
                </div>

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
                    {/* <Tooltip placement="left" title="Back to top">
                        <div> */}
                    <FloatButton.BackTop className={cx('to-top-btn')} icon={<CaretUpOutlined />}></FloatButton.BackTop>
                    {/* </div>
                    </Tooltip> */}
                </div>
            </FloatButton.Group>
        </Flex>
    );
}

export default DefaultLayout;
